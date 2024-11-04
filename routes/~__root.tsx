//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//
import '../modules/globals.css'
import { lightTheme, Toaster } from '@stanfordbdhg/spezi-web-design-system'
import { createRootRoute, Outlet, redirect } from '@tanstack/react-router'
import { NextIntlClientProvider } from 'next-intl'
import { useLayoutEffect } from 'react'
import { Helmet } from 'react-helmet'
import { auth } from '@/modules/firebase/app'
import { AuthProvider } from '@/modules/firebase/AuthProvider'
import messages from '@/modules/messages/translations/en.json'
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
      <ReactQueryClientProvider>
        <NextIntlClientProvider
          locale="en"
          timeZone="Europe/Warsaw"
          messages={messages}
        >
          <Helmet
            defaultTitle="Spezi Web Template"
            titleTemplate="%s - Spezi Web Template"
          />
          <Outlet />
          <Toaster />
        </NextIntlClientProvider>
      </ReactQueryClientProvider>
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
