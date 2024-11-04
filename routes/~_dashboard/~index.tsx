//
// This source file is part of the Stanford Biodesign Digital Health ENGAGE-HF open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  PageTitle,
  DashboardLayout,
} from '@stanfordbdhg/spezi-web-design-system'
import { createFileRoute } from '@tanstack/react-router'
import { Home } from 'lucide-react'
import { Helmet } from 'react-helmet'
import { MenuLinks } from './MenuLinks'

const DashboardPage = () => {
  return (
    <DashboardLayout
      title={<PageTitle title="Home" icon={<Home />} />}
      aside={<MenuLinks />}
      mobile={<MenuLinks />}
    >
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="grid gap-5 xl:grid-cols-2">
        Welcome to the Spezi Web Template App
      </div>
    </DashboardLayout>
  )
}

export const Route = createFileRoute('/_dashboard/')({
  component: DashboardPage,
})
