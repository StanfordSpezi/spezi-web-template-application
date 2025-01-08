//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

// import type { PatientPageTab } from '@/routes/~_dashboard/~patients/~$id/~index'

export const routes = {
  home: '/',
  patients: {
    index: '/patients',
    patient: (patientId: string) => `/patients/${patientId}`,
  },
  signIn: '/sign-in',
}
