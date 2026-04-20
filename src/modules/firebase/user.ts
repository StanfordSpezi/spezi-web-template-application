//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { chunk } from "es-toolkit";
import { type GetUsersInformationInput } from "spezi-firebase-template/models";
import { callables } from "@/modules/firebase/app";
import { type User } from "@/modules/firebase/models";
import { type UserAuthenticationInformation } from "@/modules/firebase/utils";

interface UserInformation {
  auth: UserAuthenticationInformation;
  user?: User;
}

export const mapAuthData = async <T>(
  input: GetUsersInformationInput,
  callback: (userInformation: UserInformation, id: string) => T,
) => {
  const chunks = chunk(input.userIds, 100);
  if (chunks.length > 5) {
    // If we reach that stage, we should implement server side pagination
    console.warn("More than 500 users batched together");
  }
  const promises = chunks.map(async (chunkIds) => {
    const usersRecord = await callables.getUsersInformation({
      ...input,
      userIds: chunkIds,
    });
    return chunkIds.map((id) => {
      const user = usersRecord.data[id];
      const userData = "data" in user ? user.data : undefined;
      if (!userData) {
        console.error(`Cannot locate user ${id}.`, {
          user,
          id,
        });
        return null;
      }
      // Auth data comes as Record<string, unknown> from the callable but contains UserAuthenticationInformation fields
      return callback(userData as unknown as UserInformation, id);
    });
  });
  const results = await Promise.all(promises);
  return results.flat(1).filter(Boolean) as Array<Exclude<T, null | undefined>>;
};
