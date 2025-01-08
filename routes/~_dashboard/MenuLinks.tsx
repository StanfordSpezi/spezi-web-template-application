//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { MenuItem } from '@stanfordspezi/spezi-web-design-system'
import { useLocation } from '@tanstack/react-router'
import { Contact, Home } from 'lucide-react'
import { routes } from '@/modules/routes'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MenuLinks = () => {
  const location = useLocation()

  const hrefProps = (href: string) => ({
    href,
    isActive: location.pathname === href,
  })

  // const { hasUnreadNotification } = useHasUnreadNotification()

  return (
    <>
      <MenuItem {...hrefProps('/')} label="Home" icon={<Home />} />
      <MenuItem
        {...hrefProps(routes.patients.index)}
        label="Patients"
        icon={<Contact />}
      />
    </>
  )
}
