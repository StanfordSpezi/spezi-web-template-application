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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@stanfordspezi/spezi-web-design-system/components/Select";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { type Question } from "./models";

// Defines the data structure and validation rules for a new question
const questionSchema = z.object({
  text: z.string().min(3, { message: "Question text is required." }),
  type: z.enum(["text", "multiple-choice"]),
  options: z.string().optional(),
});

// Defines the data shape that the form will output
export type QuestionFormData = z.infer<typeof questionSchema>;

interface QuestionFormProps {
  onCancel: () => void;
  onSubmit: (data: QuestionFormData) => void;
  isSubmitting: boolean;
  initialData?: Question;
}

export const QuestionForm = ({
  onCancel,
  onSubmit,
  isSubmitting,
  initialData,
}: QuestionFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      text: initialData?.text ?? "",
      type: initialData?.type ?? "text",
      options: initialData?.options?.join(", ") ?? "",
    },
  });

  const questionType = watch("type");

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="text">Question Text</Label>
        <Input
          id="text"
          placeholder="e.g., How are you feeling today?"
          {...register("text")}
        />
        {errors.text && (
          <p className="text-sm text-red-600">{errors.text.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Question Type</Label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text Input</SelectItem>
                <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {questionType === "multiple-choice" && (
        <div className="space-y-2">
          <Label htmlFor="options">Options (comma-separated)</Label>
          <Input
            id="options"
            placeholder="e.g., Good, Okay, Bad"
            {...register("options")}
          />
        </div>
      )}

      <div className="flex justify-end gap-4">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Question"}
        </Button>
      </div>
    </form>
  );
};
