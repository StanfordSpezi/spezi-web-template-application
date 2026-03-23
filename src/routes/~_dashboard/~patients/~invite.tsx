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
import { Contact } from "lucide-react";
import { UserType } from "spezi-firebase-template/models";
import { callables, docRefs } from "@/modules/firebase/app";
import { useUser } from "@/modules/firebase/UserProvider";
import { getDocDataOrThrow } from "@/modules/firebase/utils";
import { routes } from "@/modules/routes";
import { DashboardLayout } from "@/routes/~_dashboard/DashboardLayout";
import {
  PatientForm,
  type PatientFormSchema,
} from "@/routes/~_dashboard/~patients/PatientForm";
import { getFormProps } from "@/routes/~_dashboard/~patients/utils";
import { getTitle } from "@/utils/head";

const CreatePatientPage = () => {
  const navigate = useNavigate();
  const { formProps } = Route.useLoaderData();
  const { auth, user } = useUser();

  const createPatient = async (form: PatientFormSchema) => {
    const clinician = await getDocDataOrThrow(docRefs.user(form.clinician));
    await callables.updateUserInformation({
      userId: auth.uid,
      data: {
        auth: {
          displayName: form.displayName,
          email: form.email,
        },
      },
    });
    toast.success("Patient has been successfully created!");
    await navigate({ to: routes.patients.index });
  };

  return (
    <DashboardLayout
      title={<PageTitle title="Create patient" icon={<Contact />} />}
    >
      <title>{getTitle("Create patient")}</title>
      <PatientForm
        onSubmit={createPatient}
        clinicianPreselectId={
          user.type === UserType.admin ? undefined : auth.uid
        }
        {...formProps}
      />
    </DashboardLayout>
  );
};

export const Route = createFileRoute("/_dashboard/patients/invite")({
  component: CreatePatientPage,
  loader: async () => ({ formProps: await getFormProps() }),
});
