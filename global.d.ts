//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type en from "./modules/messages/translations/en.json";
import type { ImportMetaEnv as GeneratedImportMetaEnv } from "./vite-envs";

/// <reference types="vite/client" />

type Messages = typeof en;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}

  // Provides correct import.meta.env variables
  interface ImportMetaEnv extends GeneratedImportMetaEnv {}
}
