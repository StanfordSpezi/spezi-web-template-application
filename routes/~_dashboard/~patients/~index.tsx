//
// This source file is part of the Stanford Biodesign Digital Health ENGAGE-HF open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Patient } from '@medplum/fhirtypes'
import {
  Button,
  PageTitle,
  DashboardLayout,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@stanfordbdhg/spezi-web-design-system'
import {
  PatientForm,
  PatientsTable,
} from '@stanfordbdhg/spezi-web-health-components'
import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'
import { addDoc, doc, deleteDoc } from 'firebase/firestore'
import { Contact, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { refs } from '@/modules/firebase/app'
import { getPatientsData } from './utils'
import { MenuLinks } from '../MenuLinks'

const PatientsPage = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate({ from: '/patients' })
  const patients = Route.useLoaderData()

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }

  const handleSubmit = async (data: Patient) => {
    try {
      const patientRef = refs.patients()
      await addDoc(patientRef, {
        ...data,
        resourceType: 'Patient',
      })
      setOpen(false)
      await router.invalidate()
    } catch (error) {
      console.error('Error adding patient:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(refs.patients(), id))
      await router.invalidate()
    } catch (error) {
      console.error('Error deleting patient:', error)
    }
  }

  return (
    <DashboardLayout
      title={<PageTitle title="Patients" icon={<Contact />} />}
      aside={<MenuLinks />}
      mobile={<MenuLinks />}
    >
      <Helmet>
        <title>Patients</title>
      </Helmet>
      <PatientsTable
        data={patients}
        header={
          <Button className="ml-2" onClick={() => setOpen(true)} asChild>
            <div>
              <UserPlus />
              Add Patient
            </div>
          </Button>
        }
        onDelete={async (data: Patient) => {
          await handleDelete(data.id ?? '')
        }}
        onRowClick={async (data: Patient) => {
          await navigate({ to: '/patients/$id', params: { id: data.id ?? '' } })
        }}
        editRoute={'/patients/'}
      />

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Patient</DialogTitle>
          </DialogHeader>
          <PatientForm onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}

export const Route = createFileRoute('/_dashboard/patients/')({
  component: PatientsPage,
  loader: () => getPatientsData(),
})
