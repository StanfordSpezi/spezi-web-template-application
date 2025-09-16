//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Input } from "@stanfordspezi/spezi-web-design-system";
import { Button } from "@stanfordspezi/spezi-web-design-system/components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@stanfordspezi/spezi-web-design-system/components/Dialog";
import { PageTitle } from "@stanfordspezi/spezi-web-design-system/molecules/DashboardLayout";
import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, Plus, Search } from "lucide-react";
import { useState } from "react";
import { type QuestionnaireData } from "@/modules/questionnaire/models";
import {
  useCreateQuestionnaire,
  useDeleteQuestionnaire,
  useGetQuestionnaires,
} from "@/modules/questionnaire/queries";
import { QuestionnaireForm } from "@/modules/questionnaire/QuestionnaireForm";
import { QuestionnairesTable } from "@/modules/questionnaire/QuestionnairesTable";
import { DashboardLayout } from "@/routes/~_dashboard/DashboardLayout";

const QuestionnaireManagement = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data: questionnaires, isLoading } = useGetQuestionnaires();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [questionnaireToDelete, setQuestionnaireToDelete] = useState<
    string | null
  >(null);

  const createQuestionnaireMutation = useCreateQuestionnaire();
  const deleteMutation = useDeleteQuestionnaire();

  const handleCreateSubmit = (data: QuestionnaireData) => {
    createQuestionnaireMutation.mutate(data, {
      onSuccess: () => {
        setIsFormOpen(false);
      },
    });
  };

  const handleOpenDeleteConfirm = (id: string) => {
    setQuestionnaireToDelete(id);
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (questionnaireToDelete) {
      deleteMutation.mutate(questionnaireToDelete, {
        onSuccess: () => {
          setIsDeleteConfirmOpen(false);
          setQuestionnaireToDelete(null);
        },
      });
    }
  };

  return (
    <DashboardLayout
      title={<PageTitle title="Questionnaires" icon={<ClipboardList />} />}
      actions={
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Questionnaire
        </Button>
      }
    >
      <div className="relative mb-4">
        <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search questionnaires..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {isLoading && (
        <div className="rounded-lg border-2 border-dashed bg-gray-50 p-12 text-center">
          <p className="text-gray-500">Loading questionnaires...</p>
        </div>
      )}

      {questionnaires && (
        <QuestionnairesTable
          data={questionnaires}
          onDelete={handleOpenDeleteConfirm}
        />
      )}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Questionnaire</DialogTitle>
          </DialogHeader>
          <QuestionnaireForm
            onCancel={() => setIsFormOpen(false)}
            onSubmit={handleCreateSubmit}
            isSubmitting={createQuestionnaireMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              questionnaire.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export const Route = createFileRoute("/_dashboard/questionnaires/")({
  component: QuestionnaireManagement,
});
