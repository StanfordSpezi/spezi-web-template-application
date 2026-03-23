//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { queryOptions } from "@tanstack/react-query";
import { UserType } from "spezi-firebase-template/models";
import { docRefs, getCurrentUser, refs } from "@/modules/firebase/app";
import { type Organization } from "@/modules/firebase/models";
import { mapAuthData } from "@/modules/firebase/user";
import {
  getDocData,
  getDocDataOrThrow,
  getDocsData,
  type UserAuthenticationInformation,
} from "@/modules/firebase/utils";
import { queryClient } from "@/modules/query/queryClient";

export const parseAuthToUser = (
  id: string,
  auth: UserAuthenticationInformation,
) => ({
  resourceId: id,
  uid: id,
  email: auth.email,
  displayName: auth.displayName,
});

export const userOrganizationQueryOptions = () =>
  queryOptions({
    queryKey: ["userOrganizations"],
    queryFn: async () => {
      const { user } = await getCurrentUser();
      let organizations: Organization[] = [];
      if (user.type === UserType.admin) {
        organizations = await getDocsData(refs.organizations());
      } else if (user.organization) {
        organizations = [
          await getDocDataOrThrow(docRefs.organization(user.organization)),
        ];
      }
      return organizations;
    },
  });

export const getUserOrganizationsMap = async () => {
  const organizations = await queryClient.ensureQueryData(
    userOrganizationQueryOptions(),
  );
  return new Map(
    organizations.map(
      (organization) => [organization.id, organization] as const,
    ),
  );
};

const getUserAuthData = async (userId: string) => {
  const user = await getDocData(docRefs.user(userId));
  const allAuthData = await mapAuthData({ userIds: [userId] }, (data, id) => ({
    uid: id,
    email: data.auth.email,
    displayName: data.auth.displayName,
  }));
  const authUser = allAuthData.at(0);
  if (!authUser || !user) return null;
  return { user, authUser };
};

export const parseUserId = (userId: string) => ({ userId });

export const getUserData = async (
  userId: string,
  validUserTypes: UserType[],
) => {
  const data = await getUserAuthData(userId);
  return data && validUserTypes.includes(data.user.type) ? data : null;
};

export type UserData = Exclude<Awaited<ReturnType<typeof getUserData>>, null>;
