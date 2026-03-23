//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Functions, httpsCallable } from "@firebase/functions";
import { strategy } from "@stanfordspezi/spezi-web-design-system/utils/misc";
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
  type DeleteUserInput,
  type DeleteUserOutput,
  type DismissMessageInput,
  type DismissMessageOutput,
  type GetUsersInformationInput,
  type GetUsersInformationOutput,
  type UpdateUserInformationInput,
  type UpdateUserInformationOutput,
} from "spezi-firebase-template/models";
import { type User, type UserMessage } from "@/modules/firebase/models";

export const collectionNames = {
  invitations: "invitations",
  users: "users",
  organizations: "organizations",
  messages: "messages",
};

export type ResourceType = "invitation" | "user";

export const userPath = (resourceType: ResourceType) =>
  strategy(
    {
      invitation: collectionNames.invitations,
      user: collectionNames.users,
    },
    resourceType,
  );

export const getCollectionRefs = (db: Firestore) => ({
  users: () =>
    collection(db, collectionNames.users) as CollectionReference<User>,
  invitations: () =>
    collection(
      db,
      collectionNames.invitations,
    ) as CollectionReference<Invitation>,
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
  invitation: (...segments: string[]) =>
    doc(db, collectionNames.invitations, ...segments) as DocumentReference<
      Invitation,
      Invitation
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
  dismissMessage: httpsCallable<DismissMessageInput, DismissMessageOutput>(
    functions,
    "dismissMessage",
  ),
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
