//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Patient } from '@medplum/fhirtypes'
import { queryOptions } from '@tanstack/react-query'
import { type Query, query } from 'firebase/firestore'
import { refs } from '@/modules/firebase/app'
import { getDocsData } from '@/modules/firebase/utils'

export const parsePatientsQueries = async ({
  patientsQuery,
}: {
  patientsQuery: Query<Patient>
}) => {
  const patients = await getDocsData(patientsQuery)
  return [...patients]
}

export const patientsQueries = {
  listUserPatients: () =>
    queryOptions({
      queryKey: ['listUserPatients'],
      queryFn: async () => {
        return parsePatientsQueries({
          patientsQuery: query(refs.patients()),
        })
      },
    }),
}
