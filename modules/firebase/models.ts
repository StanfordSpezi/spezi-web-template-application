//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  type InferEncoded,
  type userConverter,
} from '@stanfordbdhg/engagehf-models'

export type User = InferEncoded<typeof userConverter> & { id: string }
