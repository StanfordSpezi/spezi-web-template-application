//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { getUserInfo } from "@stanfordspezi/spezi-web-design-system/modules/auth";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { type UserType } from "spezi-firebase-template/models";
import { getCurrentUser } from "@/modules/firebase/app";

export const currentUserQueryOptions = () =>
  queryOptions({
    queryKey: ["getUser"],
    queryFn: async () => {
      const { currentUser, user } = await getCurrentUser();
      return {
        auth: getUserInfo(currentUser),
        user,
      };
    },
  });

export const useUser = () => useSuspenseQuery(currentUserQueryOptions()).data;

export const useIsUserRole = () => {
  const user = useUser();
  const isUserRole = (roles: UserType[]) => roles.includes(user.user.type);
  return { isUserRole };
};
