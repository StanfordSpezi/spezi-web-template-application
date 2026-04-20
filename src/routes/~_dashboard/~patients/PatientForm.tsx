//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button } from "@stanfordspezi/spezi-web-design-system/components/Button";
import { Input } from "@stanfordspezi/spezi-web-design-system/components/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@stanfordspezi/spezi-web-design-system/components/Select";
import {
  Field,
  FormError,
  useForm,
} from "@stanfordspezi/spezi-web-design-system/forms";
import {
  getUserName,
  type UserInfo,
} from "@stanfordspezi/spezi-web-design-system/modules/auth";
import { z } from "zod";
import { type User } from "@/modules/firebase/models";

export const patientFormSchema = z.object({
  email: z.string().optional(),
  displayName: z.string(),
  clinician: z.string().min(1, "Clinician is required"),
});

export type PatientFormSchema = z.infer<typeof patientFormSchema>;

export interface PatientFormProps {
  clinicians: Array<{
    id: string;
    displayName: string | null;
    email: string | null;
  }>;
  userInfo?: Pick<UserInfo, "email" | "displayName" | "uid">;
  user?: Pick<User, "organization" | "clinician" | "type">;
  onSubmit: (data: PatientFormSchema) => Promise<void>;
  clinicianPreselectId?: string;
}

export const PatientForm = ({
  user,
  clinicians,
  userInfo,
  onSubmit,
  clinicianPreselectId,
}: PatientFormProps) => {
  const isEdit = !!user;
  const form = useForm({
    formSchema: patientFormSchema,
    defaultValues: {
      email: userInfo?.email ?? "",
      displayName: userInfo?.displayName ?? "",
      clinician: user?.clinician ?? clinicianPreselectId ?? "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl">
      <FormError
        prefix={`${isEdit ? "Updating" : "Creating"} patient failed. `}
        formError={form.formError}
      />
      <Field
        control={form.control}
        name="email"
        label="Email"
        render={({ field }) => <Input {...field} />}
      />
      <Field
        control={form.control}
        name="displayName"
        label="Display name"
        render={({ field }) => <Input {...field} />}
      />
      <Field
        control={form.control}
        name="clinician"
        label="Clinician"
        render={({ field }) => (
          <Select search onValueChange={field.onChange} {...field}>
            <SelectTrigger>
              <SelectValue placeholder="Clinician" />
            </SelectTrigger>
            <SelectContent>
              {clinicians.map((clinician) => (
                <SelectItem value={clinician.id} key={clinician.id}>
                  {getUserName(clinician)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <Button type="submit" isPending={form.formState.isSubmitting}>
        {isEdit ? "Update" : "Create"} patient
      </Button>
    </form>
  );
};
