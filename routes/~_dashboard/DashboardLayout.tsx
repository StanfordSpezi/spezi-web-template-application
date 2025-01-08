/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  DashboardLayout as DashboardLayoutBase,
  type DashboardLayoutProps as DashboardLayoutPropsBase,
} from '@stanfordspezi/spezi-web-design-system'
import { Link } from '@tanstack/react-router'
// import { getUserInfo } from "@stanfordspezi/spezi-web-design-system";
import { MenuLinks } from '@/routes/~_dashboard/MenuLinks'
// import { User } from "@/routes/~_dashboard/User";

interface DashboardLayoutProps
  extends Omit<DashboardLayoutPropsBase, 'aside' | 'mobile'> {}

export const DashboardLayout = (props: DashboardLayoutProps) => {
  // const userUI = <User user={getUserInfo(auth)} />;

  return (
    <DashboardLayoutBase
      aside={
        <>
          <Link to="/" className="interactive-opacity w-full pt-4">
            <div>Spezi Template Application</div>
          </Link>
          <nav className="mt-9 flex flex-col gap-1 xl:w-full">
            <MenuLinks />
          </nav>
          {/* {userUI} */}
        </>
      }
      mobile={
        <>
          <nav className="mt-9 flex flex-col gap-1 px-4">
            <MenuLinks />
          </nav>
          {/* {userUI} */}
        </>
      }
      {...props}
    />
  )
}
