//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { RowDropdownMenu } from "@stanfordspezi/spezi-web-design-system/components/DataTable";
import { DropdownMenuItem } from "@stanfordspezi/spezi-web-design-system/components/DropdownMenu";
import { getUserName } from "@stanfordspezi/spezi-web-design-system/modules/auth";
import { ConfirmDeleteDialog } from "@stanfordspezi/spezi-web-design-system/molecules/ConfirmDeleteDialog";
import { useOpenState } from "@stanfordspezi/spezi-web-design-system/utils/useOpenState";
import { Link, useRouter } from "@tanstack/react-router";
import { Pencil, Trash } from "lucide-react";
import { callables } from "@/modules/firebase/app";
import { routes } from "@/modules/routes";
import { type Patient } from "@/routes/~_dashboard/~patients/~index";

interface PatientMenuProps {
  patient: Patient;
}

export const PatientMenu = ({ patient }: PatientMenuProps) => {
  const router = useRouter();
  const deleteConfirm = useOpenState();

  const handleDelete = async () => {
    await callables.deleteUser({ userId: patient.resourceId });
    deleteConfirm.close();
    await router.invalidate();
  };

  return (
    <>
      <ConfirmDeleteDialog
        open={deleteConfirm.isOpen}
        onOpenChange={deleteConfirm.setIsOpen}
        entityName="patient"
        itemName={getUserName(patient)}
        onDelete={handleDelete}
      />
      <RowDropdownMenu>
        <DropdownMenuItem asChild>
          <Link to={routes.patients.patient(patient.resourceId)}>
            <Pencil />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={deleteConfirm.open}>
          <Trash />
          Delete
        </DropdownMenuItem>
      </RowDropdownMenu>
    </>
  );
};
