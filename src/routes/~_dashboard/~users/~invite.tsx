//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { toast } from "@stanfordspezi/spezi-web-design-system/components/Toaster";
import { PageTitle } from "@stanfordspezi/spezi-web-design-system/molecules/DashboardLayout";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { UserType } from "spezi-firebase-template/models";
import { callables, ensureType } from "@/modules/firebase/app";
import { queryClient } from "@/modules/query/queryClient";
import { routes } from "@/modules/routes";
import { userOrganizationQueryOptions } from "@/modules/user/queries";
import { DashboardLayout } from "@/routes/~_dashboard/DashboardLayout";
import {
  UserForm,
  type UserFormSchema,
} from "@/routes/~_dashboard/~users/UserForm";
import { getTitle } from "@/utils/head";

const CreateUserPage = () => {
  const navigate = useNavigate();
  const { organizations } = Route.useLoaderData();

  const createUser = async (form: UserFormSchema) => {
    const result = await callables.createUser({
      auth: {
        email: form.email,
        displayName: form.displayName || undefined,
      },
      user: {
        type: form.type,
        organization: form.organizationId ?? undefined,
      },
    });
    toast.success("User has been successfully created!");
    void navigate({ to: routes.users.user(result.data.userId) });
  };

  return (
    <DashboardLayout title={<PageTitle title="Create user" icon={<Users />} />}>
      <title>{getTitle("Create user")}</title>
      <UserForm organizations={organizations} onSubmit={createUser} />
    </DashboardLayout>
  );
};

export const Route = createFileRoute("/_dashboard/users/invite")({
  component: CreateUserPage,
  loader: async () => ({
    organizations: await queryClient.ensureQueryData(
      userOrganizationQueryOptions(),
    ),
  }),
  beforeLoad: () => ensureType([UserType.admin, UserType.owner]),
});
