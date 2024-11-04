//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { docRefs } from '@/modules/firebase/app'
import {
  getDocData,
  type UserAuthenticationInformation,
} from '@/modules/firebase/utils'

export const parseAuthToUser = (
  id: string,
  auth: UserAuthenticationInformation,
) => ({
  resourceId: id,
  resourceType: 'user' as const,
  uid: id,
  email: auth.email,
  displayName: auth.displayName,
})

export const getPatientData = async (patientId: string) => {
  const patient = await getDocData(docRefs.patient(patientId))
  if (patient) {
    return { patient, resourceType: 'patient' as const }
  }
}
