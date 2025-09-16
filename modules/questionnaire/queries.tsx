//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type Question,
  type Questionnaire,
  type QuestionnaireData,
} from "./models";
import { type QuestionFormData } from "./QuestionForm";

//Mock database for our questions. Though can be integrated with backend functionality
let mockQuestionnaireDB: Questionnaire[] = [
  {
    id: "1",
    title: "Daily Mood Survey",
    version: "1.2",
    status: "Active",
    lastModified: "2025-09-14T10:00:00Z",
    questions: [
      {
        id: "q1",
        text: "How would you rate your mood today?",
        type: "multiple-choice",
        options: ["Good", "Okay", "Bad"],
      },
      { id: "q2", text: "Any additional comments?", type: "text" },
    ],
  },
  {
    id: "2",
    title: "Weekly Activity Log",
    version: "1.0",
    status: "Draft",
    lastModified: "2025-09-12T14:30:00Z",
    questions: [
      {
        id: "q3",
        text: "How many days did you exercise this week?",
        type: "text",
      },
    ],
  },
  {
    id: "3",
    title: "PHQ-9 Depression Screening",
    version: "2.0",
    status: "Active",
    lastModified: "2025-09-10T08:00:00Z",
    questions: [],
  },
];

// This function now reads from our mock database
const getQuestionnaires = async (): Promise<Questionnaire[]> => {
  console.log("Fetching questionnaires...");
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...mockQuestionnaireDB]; // Return a copy of the array
};

const getQuestionnaireById = async (
  id: string,
): Promise<Questionnaire | undefined> => {
  console.log(`Fetching questionnaire with id: ${id}`);
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockQuestionnaireDB.find((q) => q.id === id);
};

const deleteQuestionnaire = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  mockQuestionnaireDB = mockQuestionnaireDB.filter(
    (q: { id: string }) => q.id !== id,
  );
};

const addQuestionToQuestionnaire = async ({
  questionnaireId,
  questionData,
}: {
  questionnaireId: string;
  questionData: Omit<Question, "id">;
}) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const questionnaire = mockQuestionnaireDB.find(
    (q) => q.id === questionnaireId,
  );

  if (!questionnaire) {
    throw new Error("Questionnaire not found");
  }

  const newQuestion: Question = {
    ...questionData,
    id: `q${new Date().getTime()}`, // Create a unique ID for the new question
  };

  questionnaire.questions.push(newQuestion);
  return questionnaire;
};

const createQuestionnaire = async (
  data: QuestionnaireData,
): Promise<Questionnaire> => {
  console.log("Creating questionnaire with data:", data);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newQuestionnaire: Questionnaire = {
    id: new Date().getTime().toString(),
    ...data,
    version: "1.0",
    status: "Draft",
    lastModified: new Date().toISOString(),
    questions: [],
  };

  mockQuestionnaireDB.push(newQuestionnaire);
  return newQuestionnaire;
};

const deleteQuestionFromQuestionnaire = async ({
  questionnaireId,
  questionId,
}: {
  questionnaireId: string;
  questionId: string;
}) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const questionnaire = mockQuestionnaireDB.find(
    (q) => q.id === questionnaireId,
  );
  if (!questionnaire) throw new Error("Questionnaire not found");

  questionnaire.questions = questionnaire.questions.filter(
    (q) => q.id !== questionId,
  );
  return questionnaire;
};

const updateQuestionInQuestionnaire = async ({
  questionnaireId,
  questionId,
  data,
}: {
  questionnaireId: string;
  questionId: string;
  data: QuestionFormData;
}) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const questionnaire = mockQuestionnaireDB.find(
    (q) => q.id === questionnaireId,
  );
  if (!questionnaire) throw new Error("Questionnaire not found");

  const questionIndex = questionnaire.questions.findIndex(
    (q) => q.id === questionId,
  );
  if (questionIndex === -1) throw new Error("Question not found");

  questionnaire.questions[questionIndex] = {
    ...questionnaire.questions[questionIndex],
    text: data.text,
    type: data.type,
    options:
      data.options ? data.options.split(",").map((s: string) => s.trim()) : [],
  };
  return questionnaire;
};

export const useGetQuestionnaires = () => {
  return useQuery<Questionnaire[]>({
    queryKey: ["questionnaires"],
    queryFn: getQuestionnaires,
  });
};

export const useGetQuestionnaireById = (id: string) => {
  return useQuery({
    queryKey: ["questionnaires", id],
    queryFn: () => getQuestionnaireById(id),
  });
};

export const useCreateQuestionnaire = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuestionnaire,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["questionnaires"] });
    },
  });
};

export const useDeleteQuestionnaire = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteQuestionnaire,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["questionnaires"] });
    },
  });
};

export const useAddQuestionToQuestionnaire = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addQuestionToQuestionnaire,
    onSuccess: (data) => {
      // After adding a question, we invalidate the specific questionnaire's data
      // to trigger a re-render of the details page.
      void queryClient.invalidateQueries({
        queryKey: ["questionnaires", data.id],
      });
    },
  });
};

export const useDeleteQuestionFromQuestionnaire = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteQuestionFromQuestionnaire,
    onSuccess: (data) => {
      void queryClient.invalidateQueries({
        queryKey: ["questionnaires", data.id],
      });
    },
  });
};

export const useUpdateQuestionInQuestionnaire = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateQuestionInQuestionnaire,
    onSuccess: (data) => {
      void queryClient.invalidateQueries({
        queryKey: ["questionnaires", data.id],
      });
    },
  });
};
