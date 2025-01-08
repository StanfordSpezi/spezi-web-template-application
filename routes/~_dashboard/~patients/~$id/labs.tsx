//
// This source file is part of the Stanford Biodesign Digital Health ENGAGE-HF open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Patient, type Observation } from '@medplum/fhirtypes'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  DataTable,
} from '@stanfordspezi/spezi-web-design-system'
import { ObservationForm } from '@stanfordspezi/spezi-web-health-components'
import { useRouter } from '@tanstack/react-router'
import { createColumnHelper } from '@tanstack/table-core'
import { addDoc, deleteDoc } from 'firebase/firestore'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { docRefs, refs } from '@/modules/firebase/app'

interface LabsProps {
  patient: Patient
  labs: Observation[]
}
export const Labs = ({ patient, labs }: LabsProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }
  const columnHelper = createColumnHelper<Observation>()

  const handleSubmit = async (data: Observation) => {
    try {
      console.log('handle submit observation')
      const labRef = refs.observations()
      await addDoc(labRef, {
        ...data,
        subject: { reference: `Patient/${patient.id}` },
        resourceType: 'Observation',
      })
      setOpen(false)
      await router.invalidate()
    } catch (error) {
      console.error('Error adding observation:', error)
    }
  }

  const handleDelete = async (observation: Observation) => {
    try {
      if (!observation.id) {
        throw new Error('Allergy ID is required')
      }
      await deleteDoc(docRefs.observation(observation.id))
      await router.invalidate()
    } catch (error) {
      console.error('Error deleting allergy:', error)
    }
  }

  const columns = [
    { header: 'Date', accessorKey: 'effectiveDateTime' },
    { header: 'Status', accessorKey: 'status' },
    { header: 'Code', accessorKey: 'code.coding.0.display' },
    { header: 'Value', accessorKey: 'valueQuantity.value' },
    { header: 'Unit', accessorKey: 'valueQuantity.unit' },
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
        data={labs}
        columns={columns}
        header={
          <Button className="ml-2" onClick={() => setOpen(true)}>
            Add Observation
          </Button>
        }
      />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Observation</DialogTitle>
          </DialogHeader>
          <ObservationForm onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </>
  )
}
