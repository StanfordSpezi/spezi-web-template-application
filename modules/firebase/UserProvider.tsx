//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { getUserInfo } from '@stanfordbdhg/spezi-web-design-system'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { getCurrentUser } from '@/modules/firebase/app'

export const currentUserQueryOptions = () =>
  queryOptions({
    queryKey: ['getUser'],
    queryFn: () => {
      const { currentUser } = getCurrentUser()
      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        auth: getUserInfo(currentUser),
      }
    },
  })

export const useUser = () => useSuspenseQuery(currentUserQueryOptions()).data
