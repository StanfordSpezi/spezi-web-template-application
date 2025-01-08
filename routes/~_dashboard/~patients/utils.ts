//
// This source file is part of the Stanford Biodesign Digital Health ENGAGE-HF open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Medication } from '@medplum/fhirtypes'
import { query, collection, getDocs, where } from 'firebase/firestore'
import { db, refs } from '@/modules/firebase/app'
import { getDocsData } from '@/modules/firebase/utils'

export const getMedicationsData = async () => {
  const medicationClassDocs = await getDocs(refs.medicationClasses())
  const medicationsByClass: Record<string, Medication[]> = {}

  await Promise.all(
    medicationClassDocs.docs.map(async (medicationClass) => {
      const medicationsSnapshot = await getDocs(
        collection(db, 'medication_classes', medicationClass.id, 'medications'),
      )
      medicationsByClass[medicationClass.id] = medicationsSnapshot.docs.map(
        (doc) => doc.data() as Medication,
      )
    }),
  )

  const medicationsClasses = medicationClassDocs.docs.map(
    (medicationClass) => ({
      id: medicationClass.id,
      name: medicationClass.data().name,
      medications: medicationsByClass[medicationClass.id],
    }),
  )

  return { medicationsClasses }
}

export const getAllergiesData = async (userId: string) => {
  const allergiesRef = refs.allergyIntolerances()
  const allergies = await getDocsData(
    query(allergiesRef, where('patient.reference', '==', `Patient/${userId}`)),
  )
  return allergies
}

export const getLabsData = async (userId: string) => {
  const labsRef = refs.observations()
  const labs = await getDocsData(
    query(labsRef, where('subject.reference', '==', `Patient/${userId}`)),
  )
  return labs
}

export const getPatientsData = async () => {
  console.log('getPatientsData')
  const patientRef = refs.patients()
  console.log(patientRef)
  const query1 = query(patientRef)
  console.log(query1)
  const patients = await getDocsData(refs.patients())
  console.log(patients)
  return patients
}
