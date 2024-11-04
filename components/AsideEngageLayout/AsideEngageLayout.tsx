//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  type AsideBrandLayoutProps,
  AsideBrandLayout,
} from '@stanfordbdhg/spezi-web-design-system'

export const AsideEngageLayout = (
  props: Omit<AsideBrandLayoutProps, 'aside'>,
) => (
  <AsideBrandLayout
    aside={
      <>
        <img
          src="/stanfordbiodesign.png"
          alt="Stanford Biodesign Logo"
          className="h-[117px] w-[317px]"
        />
      </>
    }
    {...props}
  />
)
