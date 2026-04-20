//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button } from "@stanfordspezi/spezi-web-design-system/components/Button";
import { PageTitle } from "@stanfordspezi/spezi-web-design-system/molecules/DashboardLayout";
import { createFileRoute, Link } from "@tanstack/react-router";
import { query, where } from "firebase/firestore";
import { UserPlus, Users } from "lucide-react";
import { UserType } from "spezi-firebase-template/models";
import { ensureType, getCurrentUser, refs } from "@/modules/firebase/app";
import { mapAuthData } from "@/modules/firebase/user";
import { getDocsData } from "@/modules/firebase/utils";
import { routes } from "@/modules/routes";
import {
  getUserOrganizationsMap,
  parseAuthToUser,
} from "@/modules/user/queries";
import { getTitle } from "@/utils/head";
import { UsersTable } from "./UsersTable";
import { DashboardLayout } from "../DashboardLayout";

const listUsers = async () => {
  const { user } = await getCurrentUser();
  const organizationMap = await getUserOrganizationsMap();

  let usersQuery = query(refs.users(), where("type", "!=", UserType.patient));
  if (user.type !== UserType.admin && user.organization) {
    usersQuery = query(
      usersQuery,
      where("organization", "==", user.organization),
    );
  }

  const usersData = await getDocsData(usersQuery);
  const userIds = usersData.map((u) => u.id);

  return mapAuthData(
    { userIds, includeUserData: true },
    ({ auth, user }, id) => ({
      ...parseAuthToUser(id, auth),
      disabled: user?.disabled,
      organization: organizationMap.get(user?.organization ?? ""),
      type: user?.type,
    }),
  );
};

export type User = Awaited<ReturnType<typeof listUsers>>[number];

const UsersPage = () => {
  const users = Route.useLoaderData();

  return (
    <DashboardLayout
      actions={
        <Button asChild>
          <Link to={routes.users.invite}>
            <UserPlus />
            Create User
          </Link>
        </Button>
      }
      title={<PageTitle title="Users" icon={<Users />} />}
    >
      <title>{getTitle("Users")}</title>
      <UsersTable data={users} />
    </DashboardLayout>
  );
};

export const Route = createFileRoute("/_dashboard/users/")({
  component: UsersPage,
  loader: () => listUsers(),
  beforeLoad: () => ensureType([UserType.admin, UserType.owner]),
});
