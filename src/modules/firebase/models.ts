//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  type fhirAllergyIntoleranceConverter,
  type fhirAppointmentConverter,
  type fhirMedicationRequestConverter,
  type fhirObservationConverter,
  type fhirQuestionnaireResponseConverter,
  type InferEncoded,
  type invitationConverter,
  type medicationClassConverter,
  type organizationConverter,
  type userConverter,
  type userMessageConverter,
} from "@stanfordbdhg/engagehf-models";

export type Organization = InferEncoded<typeof organizationConverter> & {
  id: string;
};

export type Invitation = InferEncoded<typeof invitationConverter>;

export type User = InferEncoded<typeof userConverter> & { id: string };

export type FHIRMedicationRequest = InferEncoded<
  typeof fhirMedicationRequestConverter
>;

export type MedicationClass = InferEncoded<typeof medicationClassConverter>;

export type FHIRObservation = InferEncoded<typeof fhirObservationConverter>;

export type FHIRAllergyIntolerance = InferEncoded<
  typeof fhirAllergyIntoleranceConverter
>;

export type FHIRAppointment = InferEncoded<typeof fhirAppointmentConverter> & {
  id: string;
};

export type UserMessage = InferEncoded<typeof userMessageConverter> & {
  id: string;
};

export type QuestionnaireResponse = InferEncoded<
  typeof fhirQuestionnaireResponseConverter
> & {
  id: string;
};

export type LocalizedText = string | Record<string, string>;
