//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button } from "@stanfordspezi/spezi-web-design-system/components/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@stanfordspezi/spezi-web-design-system/components/Table";
import { Link } from "@tanstack/react-router";
//import { routes } from "@/modules/routes";
import { Trash2 } from "lucide-react";
import { type Questionnaire } from "./models";

interface QuestionnairesTableProps {
  data: Questionnaire[];
  onDelete: (id: string) => void;
}

export const QuestionnairesTable = ({
  data,
  onDelete,
}: QuestionnairesTableProps) => {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Title</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Modified</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((questionnaire) => (
            <TableRow key={questionnaire.id}>
              <TableCell>
                <Link
                  to="/questionnaires/$id"
                  params={{ id: questionnaire.id }}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {questionnaire.title}
                </Link>
              </TableCell>
              <TableCell>{questionnaire.version}</TableCell>
              <TableCell>{questionnaire.status}</TableCell>
              <TableCell>{questionnaire.lastModified}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="default"
                  onClick={() => onDelete(questionnaire.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
