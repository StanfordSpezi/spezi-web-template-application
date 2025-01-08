//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//
import '../modules/globals.css'
import { lightTheme, Toaster } from '@stanfordspezi/spezi-web-design-system'
import { SpeziProvider } from '@stanfordspezi/spezi-web-design-system/SpeziProvider'
import { createRootRoute, Outlet, redirect } from '@tanstack/react-router'
import { useLayoutEffect } from 'react'
import { Helmet } from 'react-helmet'
import { auth } from '@/modules/firebase/app'
import { AuthProvider } from '@/modules/firebase/AuthProvider'
import { ReactQueryClientProvider } from '@/modules/query/ReactQueryClientProvider'
import { routes } from '@/modules/routes'

const Root = () => {
  useLayoutEffect(() => {
    Object.entries(lightTheme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value)
    })
  }, [])

  return (
    <AuthProvider>
      <SpeziProvider>
        <ReactQueryClientProvider>
          <Helmet
            defaultTitle="Spezi-Web-Template"
            titleTemplate="%s - Spezi-Web-Template"
          />
          <Outlet />
          <Toaster />
        </ReactQueryClientProvider>
      </SpeziProvider>
    </AuthProvider>
  )
}

export const Route = createRootRoute({
  component: Root,
  beforeLoad: async ({ location }) => {
    await auth.authStateReady()
    const user = auth.currentUser
    const isSignIn = location.pathname === routes.signIn
    if (isSignIn && user) {
      throw redirect({ to: routes.home })
    } else if (!isSignIn && !user) {
      throw redirect({ to: routes.signIn })
    }
  },
})
