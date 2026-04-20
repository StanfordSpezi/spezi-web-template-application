//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Functions, httpsCallable } from "@firebase/functions";
import {
  collection,
  type CollectionReference,
  doc,
  type DocumentReference,
  type Firestore,
  getDoc,
  getDocs,
  type Query,
} from "firebase/firestore";
import {
  type CreateUserInput,
  type CreateUserOutput,
  type DeleteUserInput,
  type DeleteUserOutput,
  type DismissMessagesInput,
  type DismissMessagesOutput,
  type GetUsersInformationInput,
  type GetUsersInformationOutput,
  type UpdateUserInformationInput,
  type UpdateUserInformationOutput,
} from "spezi-firebase-template/models";
import {
  type Organization,
  type User,
  type UserMessage,
} from "@/modules/firebase/models";

export const collectionNames = {
  users: "users",
  organizations: "organizations",
  messages: "messages",
};

export const getCollectionRefs = (db: Firestore) => ({
  users: () =>
    collection(db, collectionNames.users) as CollectionReference<User>,
  organizations: () =>
    collection(
      db,
      collectionNames.organizations,
    ) as CollectionReference<Organization>,
  userMessages: ({ userId }: { userId: string }) =>
    collection(
      db,
      `/${collectionNames.users}/${userId}/${collectionNames.messages}`,
    ) as CollectionReference<UserMessage>,
});

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
  userMessage: ({ userId, messageId }: { userId: string; messageId: string }) =>
    doc(
      db,
      `/${collectionNames.users}/${userId}/${collectionNames.messages}/${messageId}`,
    ) as DocumentReference<UserMessage>,
});

export interface UserAuthenticationInformation {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
}

export const getCallables = (functions: Functions) => ({
  createUser: httpsCallable<CreateUserInput, CreateUserOutput>(
    functions,
    "createUser",
  ),
  getUsersInformation: httpsCallable<
    GetUsersInformationInput,
    GetUsersInformationOutput
  >(functions, "getUsersInformation"),
  deleteUser: httpsCallable<DeleteUserInput, DeleteUserOutput>(
    functions,
    "deleteUser",
  ),
  updateUserInformation: httpsCallable<
    UpdateUserInformationInput,
    UpdateUserInformationOutput
  >(functions, "updateUserInformation"),
  dismissMessages: httpsCallable<DismissMessagesInput, DismissMessagesOutput>(
    functions,
    "dismissMessages",
  ),
});

export const getDocData = async <T>(reference: DocumentReference<T>) => {
  const doc = await getDoc(reference);
  const data = doc.data();
  return data ?
      {
        ...data,
        id: doc.id,
      }
    : undefined;
};

export const getDocDataOrThrow = async <T>(reference: DocumentReference<T>) => {
  const data = await getDocData(reference);
  if (!data) {
    throw new Error(`Doc not found: ${reference.path}`);
  }
  return data;
};

export const getDocsData = async <T>(query: Query<T>) => {
  const docs = await getDocs(query);
  return docs.docs.map((doc) => {
    const data = doc.data();
    if (!data) throw new Error(`No data for ${doc.id} ${doc.ref.path}`);
    return {
      ...data,
      id: doc.id,
    };
  });
};
