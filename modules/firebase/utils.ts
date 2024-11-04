//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Functions, httpsCallable } from '@firebase/functions'
import {
  type Medication,
  type Patient,
  type AllergyIntolerance,
  type Observation,
} from '@medplum/fhirtypes'
import {
  type Organization,
  type CreateInvitationInput,
  type CreateInvitationOutput,
  type DeleteUserInput,
  type DeleteUserOutput,
  type DismissMessageInput,
  type DismissMessageOutput,
  type ExportHealthSummaryInput,
  type ExportHealthSummaryOutput,
  type GetUsersInformationInput,
  type GetUsersInformationOutput,
  type UpdateUserInformationInput,
  type UpdateUserInformationOutput,
} from '@stanfordbdhg/engagehf-models'
import {
  collection,
  type CollectionReference,
  doc,
  type DocumentReference,
  type Firestore,
  getDoc,
  getDocs,
  type Query,
} from 'firebase/firestore'
import { type User } from './models'

export const collectionNames = {
  users: 'users',
  patients: 'patients',
  organizations: 'organizations',
  medicationClasses: 'medication_classes',
  medications: 'medications',
  allergyIntolerances: 'allergy_intolerances',
  observations: 'observations',
}

export const getCollectionRefs = (db: Firestore) => ({
  users: () =>
    collection(db, collectionNames.users) as CollectionReference<User>,
  organizations: () =>
    collection(
      db,
      collectionNames.organizations,
    ) as CollectionReference<Organization>,
  patients: () =>
    collection(db, collectionNames.patients) as CollectionReference<Patient>,
  medicationClasses: () =>
    collection(db, collectionNames.medicationClasses) as CollectionReference<{
      name: string
      medications: CollectionReference<Medication>
    }>,
  allergyIntolerances: () =>
    collection(
      db,
      collectionNames.allergyIntolerances,
    ) as CollectionReference<AllergyIntolerance>,
  observations: () =>
    collection(
      db,
      collectionNames.observations,
    ) as CollectionReference<Observation>,
})

export const getDocumentsRefs = (db: Firestore) => ({
  user: (...segments: string[]) =>
    doc(db, collectionNames.users, ...segments) as DocumentReference<
      User,
      User
    >,
  organization: (...segments: string[]) =>
    doc(
      db,
      collectionNames.organizations,
      ...segments,
    ) as DocumentReference<Organization>,
  patient: (...segments: string[]) =>
    doc(
      db,
      collectionNames.patients,
      ...segments,
    ) as DocumentReference<Patient>,
  medicationClass: (...segments: string[]) =>
    doc(
      db,
      collectionNames.medicationClasses,
      ...segments,
    ) as DocumentReference<{
      name: string
    }>,
  allergyIntolerance: (id: string) =>
    doc(
      db,
      collectionNames.allergyIntolerances,
      id,
    ) as DocumentReference<AllergyIntolerance>,
  observation: (id: string) =>
    doc(db, collectionNames.observations, id) as DocumentReference<Observation>,
})

export interface UserAuthenticationInformation {
  displayName: string | null
  email: string | null
  phoneNumber: string | null
  photoURL: string | null
}

export const getCallables = (functions: Functions) => ({
  createInvitation: httpsCallable<
    CreateInvitationInput,
    CreateInvitationOutput
  >(functions, 'createInvitation'),
  getUsersInformation: httpsCallable<
    GetUsersInformationInput,
    GetUsersInformationOutput
  >(functions, 'getUsersInformation'),
  deleteUser: httpsCallable<DeleteUserInput, DeleteUserOutput>(
    functions,
    'deleteUser',
  ),
  updateUserInformation: httpsCallable<
    UpdateUserInformationInput,
    UpdateUserInformationOutput
  >(functions, 'updateUserInformation'),
  exportHealthSummary: httpsCallable<
    ExportHealthSummaryInput,
    ExportHealthSummaryOutput
  >(functions, 'exportHealthSummary'),
  dismissMessage: httpsCallable<DismissMessageInput, DismissMessageOutput>(
    functions,
    'dismissMessage',
  ),
})

export const getDocData = async <T>(reference: DocumentReference<T>) => {
  const doc = await getDoc(reference)
  const data = doc.data()
  return data ?
      {
        ...data,
        id: doc.id,
      }
    : undefined
}

export const getDocDataOrThrow = async <T>(reference: DocumentReference<T>) => {
  const data = await getDocData(reference)
  if (!data) {
    throw new Error(`Doc not found: ${reference.path}`)
  }
  return data
}

export const getDocsData = async <T>(query: Query<T>) => {
  const docs = await getDocs(query)
  return docs.docs.map((doc) => {
    const data = doc.data()
    if (!data) throw new Error(`No data for ${doc.id} ${doc.ref.path}`)
    return {
      ...data,
      id: doc.id,
    }
  })
}
