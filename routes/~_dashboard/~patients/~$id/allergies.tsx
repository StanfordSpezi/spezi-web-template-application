//
// This source file is part of the Stanford Biodesign Digital Health ENGAGE-HF open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  type Medication,
  type Patient,
  type AllergyIntolerance,
} from '@medplum/fhirtypes'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  DataTable,
} from '@stanfordspezi/spezi-web-design-system'
import { AllergyForm } from '@stanfordspezi/spezi-web-health-components'
import { useRouter } from '@tanstack/react-router'
import { createColumnHelper } from '@tanstack/table-core'
import { addDoc, deleteDoc } from 'firebase/firestore'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { docRefs, refs } from '@/modules/firebase/app'

interface AllergiesProps {
  patient: Patient
  medicationsClasses: Array<{
    id: string
    name: string
    medications: Medication[]
  }>
  allergies: AllergyIntolerance[]
}
export const Allergies = ({
  patient,
  medicationsClasses,
  allergies,
}: AllergiesProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }
  const columnHelper = createColumnHelper<AllergyIntolerance>()

  const handleSubmit = async (data: AllergyIntolerance) => {
    console.log(data)
    try {
      const allergyRef = refs.allergyIntolerances()
      await addDoc(allergyRef, {
        ...data,
        patient: { reference: `Patient/${patient.id}` },
        resourceType: 'AllergyIntolerance',
      })
      setOpen(false)
      await router.invalidate()
    } catch (error) {
      console.error('Error adding allergy:', error)
    }
  }

  const handleDelete = async (allergy: AllergyIntolerance) => {
    try {
      if (!allergy.id) {
        throw new Error('Allergy ID is required')
      }
      await deleteDoc(docRefs.allergyIntolerance(allergy.id))
      await router.invalidate()
    } catch (error) {
      console.error('Error deleting allergy:', error)
    }
  }

  const columns = [
    { header: 'Type', accessorKey: 'type' },
    { header: 'Medication', accessorKey: 'code.coding.0.display' },
    { header: 'Criticality', accessorKey: 'criticality' },
    { header: 'Status', accessorKey: 'clinicalStatus.coding.0.display' },
    columnHelper.display({
      id: 'actions',
      cell: (props) => (
        <Button
          variant="destructive"
          onClick={() => handleDelete(props.row.original)}
        >
          <Trash />
        </Button>
      ),
    }),
  ]

  return (
    <>
      <DataTable
        data={allergies}
        columns={columns}
        header={
          <Button className="ml-2" onClick={() => setOpen(true)}>
            Add Allergy
          </Button>
        }
      />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Allergy</DialogTitle>
          </DialogHeader>
          <AllergyForm
            medicationClasses={medicationsClasses}
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
