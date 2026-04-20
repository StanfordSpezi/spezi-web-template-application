//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  type userConverter,
  type userAuthConverter,
  type userMessageConverter,
  type localizedTextConverter,
  type organizationConverter,
  type fhirObservationConverter,
  type fhirQuestionnaireResponseConverter,
} from "spezi-firebase-template/models";

type InferEncoded<T> =
  // any is for arguments only, InferEncoded extracts result type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends { encode: (...args: any[]) => infer R } ? R : never;

export type User = InferEncoded<typeof userConverter> & { id: string };

export type UserAuth = InferEncoded<typeof userAuthConverter>;

export type UserMessage = InferEncoded<typeof userMessageConverter> & {
  id: string;
};

export type Organization = InferEncoded<typeof organizationConverter> & {
  id: string;
};

export type FhirObservation = InferEncoded<typeof fhirObservationConverter> & {
  id: string;
};
export type FhirQuestionnaireResponse = InferEncoded<
  typeof fhirQuestionnaireResponseConverter
> & {
  id: string;
};

export type LocalizedText = InferEncoded<typeof localizedTextConverter>;
