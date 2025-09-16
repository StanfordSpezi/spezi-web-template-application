//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@stanfordspezi/spezi-web-design-system/components/Button";
import { Input } from "@stanfordspezi/spezi-web-design-system/components/Input";
import { Label } from "@stanfordspezi/spezi-web-design-system/components/Label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { type QuestionnaireData } from "./models";

const questionnaireSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
});

interface QuestionnaireFormProps {
  onCancel: () => void;
  onSubmit: (data: QuestionnaireData) => void;
  isSubmitting: boolean;
}

export const QuestionnaireForm = ({
  onCancel,
  onSubmit,
  isSubmitting,
}: QuestionnaireFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionnaireData>({
    resolver: zodResolver(questionnaireSchema),
  });

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="e.g., Daily Mood Survey"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>
      <div className="flex justify-end gap-4">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Questionnaire"}
        </Button>
      </div>
    </form>
  );
};
