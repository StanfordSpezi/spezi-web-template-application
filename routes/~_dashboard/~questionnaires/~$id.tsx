//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

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
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { type Question } from "@/modules/questionnaire/models";
import {
  useAddQuestionToQuestionnaire,
  useDeleteQuestionFromQuestionnaire,
  useGetQuestionnaireById,
  useUpdateQuestionInQuestionnaire,
} from "@/modules/questionnaire/queries";
import { routes } from "@/modules/routes";
import { DashboardLayout } from "@/routes/~_dashboard/DashboardLayout";
import {
  QuestionForm,
  type QuestionFormData,
} from "@/modules/questionnaire/QuestionForm";

const QuestionnaireDetails = () => {
  const { questionnaireId } = Route.useLoaderData();
  const { data: questionnaire, isLoading } =
    useGetQuestionnaireById(questionnaireId);

  // State for modals
  const [isQuestionFormOpen, setIsQuestionFormOpen] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState<Question | null>(null);
  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(
    null,
  );

  // Mutations
  const addQuestionMutation = useAddQuestionToQuestionnaire();
  const updateQuestionMutation = useUpdateQuestionInQuestionnaire();
  const deleteQuestionMutation = useDeleteQuestionFromQuestionnaire();

  // Loading and error handling
  if (isLoading) {
    return (
      <DashboardLayout title={<PageTitle title="Loading..." />}>
        <div className="p-8">
          <p>Loading details...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!questionnaire) {
    throw notFound();
  }

  // The Handlers
  const openEditForm = (question: Question) => {
    setQuestionToEdit(question);
    setIsQuestionFormOpen(true);
  };

  const openCreateForm = () => {
    setQuestionToEdit(null);
    setIsQuestionFormOpen(true);
  };

  const openDeleteConfirm = (question: Question) => {
    setQuestionToDelete(question);
  };

  const closeForm = () => {
    setIsQuestionFormOpen(false);
    setQuestionToEdit(null);
  };

  const handleQuestionFormSubmit = (data: QuestionFormData) => {
    if (questionToEdit) {
      // Edit existing question
      updateQuestionMutation.mutate(
        {
          questionnaireId: questionnaire.id,
          questionId: questionToEdit.id,
          data,
        },
        { onSuccess: closeForm },
      );
    } else {
      // Creating new questions
      addQuestionMutation.mutate(
        {
          questionnaireId: questionnaire.id,
          questionData: {
            text: data.text,
            type: data.type,
            options:
              data.options ? data.options.split(",").map((s) => s.trim()) : [],
          },
        },
        { onSuccess: closeForm },
      );
    }
  };

  const handleDeleteConfirm = () => {
    if (questionToDelete) {
      deleteQuestionMutation.mutate(
        {
          questionnaireId: questionnaire.id,
          questionId: questionToDelete.id,
        },
        {
          onSuccess: () => setQuestionToDelete(null),
        },
      );
    }
  };

  const isSubmitting =
    addQuestionMutation.isPending || updateQuestionMutation.isPending;

  return (
    <DashboardLayout
      title={<PageTitle title={questionnaire.title} />}
      actions={
        <Button onClick={openCreateForm}>
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button>
      }
    >
      <Link
        to={routes.questionnaires.index}
        className="mb-6 flex items-center text-sm text-blue-600 hover:underline"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to All Questionnaires
      </Link>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-semibold">Questions</h2>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>
              <strong>Status:</strong> {questionnaire.status}
            </span>
            <span>
              <strong>Version:</strong> {questionnaire.version}
            </span>
          </div>
        </div>

        <div>
          {questionnaire.questions.length > 0 ?
            <ul className="space-y-4">
              {questionnaire.questions.map((question, index) => (
                <li
                  key={question.id}
                  className="flex items-center justify-between rounded-lg border bg-gray-50 p-4"
                >
                  <div>
                    <p className="font-semibold text-gray-700">
                      {index + 1}. {question.text}
                    </p>
                    <p className="ml-6 text-sm text-gray-500">
                      Type: {question.type}
                    </p>
                    {question.options && question.options.length > 0 && (
                      <div className="mt-2 ml-6 text-sm text-gray-600">
                        <strong>Options:</strong> {question.options.join(", ")}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="default"
                      onClick={() => openEditForm(question)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="default"
                      onClick={() => openDeleteConfirm(question)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          : null}
        </div>
      </div>

      {/* Edit/Create Question Dialog */}
      <Dialog open={isQuestionFormOpen} onOpenChange={setIsQuestionFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {questionToEdit ? "Edit Question" : "Add a New Question"}
            </DialogTitle>
          </DialogHeader>
          <QuestionForm
            onCancel={closeForm}
            onSubmit={handleQuestionFormSubmit}
            isSubmitting={isSubmitting}
            initialData={questionToEdit ?? undefined}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog
        open={!!questionToDelete}
        onOpenChange={() => setQuestionToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will permanently delete the question: "
              {questionToDelete?.text}"
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setQuestionToDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleteQuestionMutation.isPending}
            >
              {deleteQuestionMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export const Route = createFileRoute("/_dashboard/questionnaires/$id")({
  component: QuestionnaireDetails,
  loader: ({ params }) => {
    if (!params.id) {
      throw notFound();
    }
    return { questionnaireId: params.id };
  },
});
