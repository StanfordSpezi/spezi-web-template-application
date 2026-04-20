//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { updateDoc } from "@firebase/firestore";
import { toast } from "@stanfordspezi/spezi-web-design-system/components/Toaster";
import { getUserName } from "@stanfordspezi/spezi-web-design-system/modules/auth";
import { PageTitle } from "@stanfordspezi/spezi-web-design-system/molecules/DashboardLayout";
import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { UserType } from "spezi-firebase-template/models";
import { NotFound } from "@/components/NotFound";
import { callables, docRefs, ensureType } from "@/modules/firebase/app";
import { queryClient } from "@/modules/query/queryClient";
import { routes } from "@/modules/routes";
import {
  getUserData,
  parseUserId,
  userOrganizationQueryOptions,
} from "@/modules/user/queries";
import {
  UserForm,
  type UserFormSchema,
} from "@/routes/~_dashboard/~users/UserForm";
import { getTitle } from "@/utils/head";
import { DashboardLayout } from "../DashboardLayout";

const UserPage = () => {
  const router = useRouter();
  const { authUser, user, organizations, userId } = Route.useLoaderData();

  const updateUser = async (form: UserFormSchema) => {
    await callables.updateUserInformation({
      userId,
      data: {
        auth: {
          displayName: form.displayName,
          email: form.email,
        },
      },
    });
    await updateDoc(docRefs.user(userId), {
      organization: form.organizationId ?? undefined,
      type: form.type,
    });
    toast.success("User has been successfully updated!");
    await router.invalidate();
  };

  const userName = getUserName(authUser);
  return (
    <DashboardLayout
      title={
        <PageTitle title="Edit user" subTitle={userName} icon={<Users />} />
      }
    >
      <title>{getTitle(`Edit ${userName}`)}</title>
      <UserForm
        organizations={organizations}
        type={user.type}
        user={user}
        userInfo={authUser}
        onSubmit={updateUser}
      />
    </DashboardLayout>
  );
};

export const Route = createFileRoute("/_dashboard/users/$id")({
  component: UserPage,
  beforeLoad: () => ensureType([UserType.admin, UserType.owner]),
  notFoundComponent: () => (
    <NotFound
      backPage={{ name: "users list", href: routes.users.index }}
      entityName="user"
    />
  ),
  loader: async ({ params }) => {
    const { userId } = parseUserId(params.id);
    const userData = await getUserData(userId, [
      UserType.clinician,
      UserType.admin,
      UserType.owner,
    ]);
    if (!userData) throw notFound();
    const { user, authUser } = userData;

    return {
      user,
      userId,
      authUser,
      organizations: await queryClient.ensureQueryData(
        userOrganizationQueryOptions(),
      ),
    };
  },
});
