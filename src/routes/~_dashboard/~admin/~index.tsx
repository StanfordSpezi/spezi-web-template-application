//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { PageTitle } from "@stanfordspezi/spezi-web-design-system/molecules/DashboardLayout";
import { createFileRoute } from "@tanstack/react-router";
import { MonitorCog } from "lucide-react";
import { UserType } from "spezi-firebase-template/models";
import { ensureType } from "@/modules/firebase/app";
import { getTitle } from "@/utils/head";
import { DashboardLayout } from "../DashboardLayout";

const AdminPage = () => (
  <DashboardLayout title={<PageTitle title="Admin" icon={<MonitorCog />} />}>
    <title>{getTitle("Admin")}</title>
    <p className="text-muted-foreground">Admin panel</p>
  </DashboardLayout>
);

export const Route = createFileRoute("/_dashboard/admin/")({
  component: AdminPage,
  beforeLoad: () => ensureType([UserType.admin]),
});
