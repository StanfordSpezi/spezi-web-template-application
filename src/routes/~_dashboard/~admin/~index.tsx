//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Card,
  PageTitle,
  CardHeader,
  CardTitle,
} from "@stanfordspezi/spezi-web-design-system";
import { createFileRoute } from "@tanstack/react-router";
import { MonitorCog } from "lucide-react";
import { UserType } from "spezi-firebase-template/models";
import { ensureType } from "@/modules/firebase/app";
import { getTitle } from "@/utils/head";
import { DashboardLayout } from "../DashboardLayout";

const AdminPage = () => (
  <DashboardLayout title={<PageTitle title="Admin" icon={<MonitorCog />} />}>
    <title>{getTitle("Admin")}</title>
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>Admin panel</CardTitle>
      </CardHeader>
      <div className="p-5 pt-0">
        <p>
          This page is only visible to users with administrator privileges.
          Manage application settings and access administrative tools from here.
        </p>
      </div>
    </Card>
  </DashboardLayout>
);

export const Route = createFileRoute("/_dashboard/admin/")({
  component: AdminPage,
  beforeLoad: () => ensureType([UserType.admin]),
});
