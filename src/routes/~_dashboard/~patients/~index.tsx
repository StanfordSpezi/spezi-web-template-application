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
import { Contact, UserPlus } from "lucide-react";
import { UserType } from "spezi-firebase-template/models";
import { getCurrentUser, refs } from "@/modules/firebase/app";
import { routes } from "@/modules/routes";
import { DashboardLayout } from "@/routes/~_dashboard/DashboardLayout";
import { PatientsTable } from "@/routes/~_dashboard/~patients/PatientsTable";
import { getTitle } from "@/utils/head";
import { mapAuthData } from "@/modules/firebase/user";
import { getDocsData } from "@/modules/firebase/utils";
import {
  getUserOrganizationsMap,
  parseAuthToUser,
} from "@/modules/user/queries";

const listPatients = async () => {
  const { user } = await getCurrentUser();
  const organizationMap = await getUserOrganizationsMap();

  let usersQuery = query(refs.users(), where("type", "==", UserType.patient));
  if (user.type !== UserType.admin && user.organization) {
    usersQuery = query(
      usersQuery,
      where("organization", "==", user.organization),
    );
  }

  const patients = await getDocsData(usersQuery);
  const userIds = patients.map((patient) => patient.id);

  return mapAuthData({ userIds, includeUserData: true }, ({ auth, user }, id) => ({
    ...parseAuthToUser(id, auth),
    organization: organizationMap.get((user?.organization as string) ?? ""),
    disabled: user?.disabled as boolean | undefined,
  }));
};

export type Patient = Awaited<ReturnType<typeof listPatients>>[number];

const PatientsPage = () => {
  const patients = Route.useLoaderData();

  return (
    <DashboardLayout
      title={<PageTitle title="Patients" icon={<Contact />} />}
      actions={
        <Button asChild>
          <Link to={routes.patients.invite}>
            <UserPlus />
            Create Patient
          </Link>
        </Button>
      }
    >
      <title>{getTitle("Patients")}</title>
      <PatientsTable data={patients} />
    </DashboardLayout>
  );
};

export const Route = createFileRoute("/_dashboard/patients/")({
  component: PatientsPage,
  loader: () => listPatients(),
});
