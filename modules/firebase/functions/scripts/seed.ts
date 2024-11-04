//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { withFunctionTriggersDisabled } from '@firebase/rules-unit-testing'
import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

const projectId = 'hrtex-3-dev'
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080'
process.env.FIREBASE_EMULATOR_HUB = 'localhost:4400'
process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099'

process.env.GOOGLE_APPLICATION_CREDENTIALS =
  '/Users/madlener/git/spezi-web-template-application/modules/firebase/functions/scripts/serviceAccountKey.json'

const app = initializeApp({ projectId })

const seedFirestore = async (): Promise<void> => {
  const db = getFirestore(app)
  const auth = getAuth(app)

  await withFunctionTriggersDisabled(async () => {
    const adminUser = await auth.createUser({
      email: 'admin@stanford.edu',
      password: 'password',
      displayName: 'Admin',
    })

    await auth.setCustomUserClaims(adminUser.uid, {
      admin: true,
    })

    const usersRef = db.collection('users')
    await usersRef.doc(adminUser.uid).set({
      email: adminUser.email,
      displayName: adminUser.displayName,
      role: 'admin',
      createdAt: new Date(),
    })

    const patientsRef = db.collection('patients')
    await patientsRef.add({
      resourceType: 'Patient',
      name: [
        {
          use: 'official',
          given: ['Leland'],
          family: 'Stanford',
        },
      ],
    })

    const medicationClassesRef = db.collection('medicationClasses')

    const thiazideClass = await medicationClassesRef.add({
      name: 'Thiazides',
    })
    await thiazideClass.collection('medications').add({
      resourceType: 'Medication',
      code: {
        coding: [
          {
            system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
            code: '316049',
            display: 'Hydrochlorothiazide',
          },
        ],
      },
      status: 'active',
    })

    const aceClass = await medicationClassesRef.add({
      name: 'ACE Inhibitors',
    })
    await aceClass.collection('medications').add({
      resourceType: 'Medication',
      code: {
        coding: [
          {
            system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
            code: '29046',
            display: 'Lisinopril',
          },
        ],
      },
      status: 'active',
    })
  })
}

void seedFirestore()
