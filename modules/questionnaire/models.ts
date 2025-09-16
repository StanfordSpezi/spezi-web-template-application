//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

//This is the question data structure
export interface Question {
  id: string;
  text: string;
  type: "text" | "multiple-choice";
  options?: string[];
}

export interface Questionnaire {
  id: string;
  title: string;
  version: string;
  status: "Active" | "Draft" | "Archived";
  lastModified: string;
  questions: Question[];
}

export interface QuestionnaireData {
  title: string;
}
