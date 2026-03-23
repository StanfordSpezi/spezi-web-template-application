//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type DateInput } from "@stanfordspezi/spezi-web-design-system/utils/date";
import { type Nil } from "@stanfordspezi/spezi-web-design-system/utils/misc";
import { UserType } from "spezi-firebase-template/models";
import { getCurrentUser, refs } from "@/modules/firebase/app";
import { mapAuthData } from "@/modules/firebase/user";
import { getDocsData } from "@/modules/firebase/utils";
import { queryClient } from "@/modules/query/queryClient";
import {
  type UserData,
  userOrganizationQueryOptions,
} from "@/modules/user/queries";

const getUserClinicians = async () => {
  const { user } = await getCurrentUser();
  const usersQuery = refs.users();
  const users = await getDocsData(usersQuery);
  const clinicians = users.filter(
    (u) =>
      (u.type === UserType.clinician || u.type === UserType.owner) &&
      (user.type === UserType.admin ||
        u.organization === user.organization),
  );
  return mapAuthData(
    { userIds: clinicians.map((u) => u.id) },
    ({ auth }, id) => ({
      id,
      displayName: auth.displayName,
      email: auth.email,
    }),
  );
};

export const getFormProps = async () => ({
  clinicians: await getUserClinicians(),
  organizations: await queryClient.ensureQueryData(
    userOrganizationQueryOptions(),
  ),
});

export interface PatientInfoData {
  email: string | null;
  lastActiveDate: Nil<DateInput>;
}

export const getPatientInfo = async ({
  user,
  authUser,
}: UserData): Promise<PatientInfoData> => ({
  email: authUser.email,
  lastActiveDate: user.lastActiveDate,
});

/**
 * Transforms a Date object into a string formatted as YYYY-MM-DD, without timezone offset.
 * */
export const formatBirthDate = (date: Nil<Date>) => {
  if (!date) return null;
  const offset = date.getTimezoneOffset();
  const utcDate = new Date(date.getTime() - offset * 60 * 1000);
  return utcDate.toISOString().split("T")[0];
};
