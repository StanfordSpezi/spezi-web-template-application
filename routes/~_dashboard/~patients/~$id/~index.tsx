//
// This source file is part of the Stanford Biodesign Digital Health ENGAGE-HF open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Patient } from '@medplum/fhirtypes'
import {
  PageTitle,
  DashboardLayout,
  TabsTrigger,
  Tabs,
  TabsContent,
  TabsList,
} from '@stanfordbdhg/spezi-web-design-system'
import { createFileRoute } from '@tanstack/react-router'
import { Contact } from 'lucide-react'
import { Helmet } from 'react-helmet'
import { getPatientData } from '@/modules/user/queries'
import { Allergies } from './allergies'
import { Labs } from './labs'
import { MenuLinks } from '../../MenuLinks'
import { getAllergiesData, getLabsData, getMedicationsData } from '../utils'

export enum PatientPageTab {
  allergies = 'allergies',
  labs = 'labs',
}

const PatientPage = () => {
  const { patient, medicationsClasses, allergies, labs } = Route.useLoaderData()
  const { tab } = Route.useSearch<{ tab?: PatientPageTab }>()

  const toName = (patient: Patient) => {
    const givenName = patient.name?.[0]?.given?.join(' ') ?? ''
    const familyName = patient.name?.[0]?.family ?? ''
    return `${givenName} ${familyName}`.trim()
  }

  return (
    <DashboardLayout
      title={<PageTitle title={toName(patient)} icon={<Contact />} />}
      aside={<MenuLinks />}
      mobile={<MenuLinks />}
    >
      <Helmet>
        <title>{patient.id}</title>
      </Helmet>
      <Tabs defaultValue={tab ?? PatientPageTab.allergies}>
        <TabsList className="mb-6 w-full">
          <TabsTrigger value={PatientPageTab.allergies} className="grow">
            Allergies
          </TabsTrigger>
          <TabsTrigger value={PatientPageTab.labs} className="grow">
            Observations
          </TabsTrigger>
        </TabsList>
        <TabsContent value={PatientPageTab.allergies}>
          <div className="flex flex-col gap-6 xl:flex-row">
            <Allergies
              patient={patient}
              medicationsClasses={medicationsClasses}
              allergies={allergies}
            />
          </div>
        </TabsContent>
        <TabsContent value={PatientPageTab.labs}>
          <div className="flex flex-col gap-6 xl:flex-row">
            <Labs patient={patient} labs={labs} />
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

export const Route = createFileRoute('/_dashboard/patients/$id/')({
  component: PatientPage,
  loader: async ({ params }) => {
    const patientId = params.id
    const patientData = await getPatientData(patientId)
    if (!patientData) {
      throw new Error('Patient data not found')
    }
    const { medicationsClasses } = await getMedicationsData()
    const allergies = await getAllergiesData(patientId)
    const labs = await getLabsData(patientId)

    const { patient, resourceType } = patientData

    return {
      patient,
      medicationsClasses,
      allergies,
      labs,
      resourceType,
    }
  },
})
