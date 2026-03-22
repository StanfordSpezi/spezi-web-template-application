//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { UserType } from "@stanfordbdhg/engagehf-models";
import { type Nil } from "@stanfordspezi/spezi-web-design-system/utils/misc";
import { limit, orderBy, query, where } from "firebase/firestore";
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
  let usersQuery = query(
    refs.users(),
    where("type", "in", [UserType.clinician, UserType.owner]),
  );
  if (user.type === UserType.owner || user.type === UserType.clinician) {
    usersQuery = query(
      usersQuery,
      where("organization", "==", user.organization),
    );
  }
  const users = await getDocsData(usersQuery);
  return mapAuthData(
    { userIds: users.map((user) => user.id) },
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

export const getPatientInfo = async ({
  user,
  resourceType,
  authUser,
}: UserData) => {
  const latestQuestionnaires = await getDocsData(
    query(
      refs.questionnaireResponses({ resourceType, userId: authUser.uid }),
      orderBy("authored", "desc"),
      limit(1),
    ),
  );
  return {
    email: authUser.email,
    lastActiveDate: user.lastActiveDate,
    latestQuestionnaireDate: latestQuestionnaires.at(0)?.authored,
    invitationCode: user.invitationCode,
    isInvitation: resourceType === "invitation",
    selfManaged: user.selfManaged,
  };
};

/**
 * Transforms a Date object into a string formatted as YYYY-MM-DD, without timezone offset.
 * */
export const formatBirthDate = (date: Nil<Date>) => {
  if (!date) return null;
  const offset = date.getTimezoneOffset();
  const utcDate = new Date(date.getTime() - offset * 60 * 1000);
  return utcDate.toISOString().split("T")[0];
};
