//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { tailwindColors } from '@stanfordbdhg/spezi-web-design-system'
import tailwindCssAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './{app,pages,components,routes,modules,node_modules/@stanfordbdhg/spezi-web-design-system/src}/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: tailwindColors,
    },
  },
  plugins: [tailwindCssAnimate],
}
