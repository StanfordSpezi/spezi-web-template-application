//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { queryOptions } from "@tanstack/react-query";
import { query, where } from "firebase/firestore";
import { UserType } from "spezi-firebase-template/models";
import { getCurrentUser, refs } from "@/modules/firebase/app";
import { mapAuthData } from "@/modules/firebase/user";
import { getDocsData } from "@/modules/firebase/utils";
import {
  getUserOrganizationsMap,
  parseAuthToUser,
} from "@/modules/user/queries";

export const parsePatientsQuery = async () => {
  const patients = await getDocsData(
    query(refs.users(), where("type", "==", UserType.patient)),
  );

  const userIds = patients.map((patient) => patient.id);
  const organizationMap = await getUserOrganizationsMap();

  const patientsData = await mapAuthData(
    { userIds, includeUserData: true },
    ({ auth, user }, id) => ({
      ...parseAuthToUser(id, auth),
      organization: organizationMap.get(user?.organization as string ?? ""),
      disabled: user?.disabled as boolean | undefined,
    }),
  );

  return patientsData;
};

export const patientsQueries = {
  listUserPatients: () =>
    queryOptions({
      queryKey: ["listUserPatients"],
      queryFn: async () => {
        const { user, currentUser } = await getCurrentUser();
        const organizationId = user.organization;
        if (!organizationId) return [];

        const patients = await getDocsData(
          query(
            refs.users(),
            where("type", "==", UserType.patient),
            where("organization", "==", organizationId),
            where("clinician", "==", currentUser.uid),
          ),
        );

        const userIds = patients.map((patient) => patient.id);
        const organizationMap = await getUserOrganizationsMap();

        return mapAuthData(
          { userIds, includeUserData: true },
          ({ auth, user }, id) => ({
            ...parseAuthToUser(id, auth),
            organization: organizationMap.get(user?.organization as string ?? ""),
            disabled: user?.disabled as boolean | undefined,
          }),
        );
      },
    }),
};
