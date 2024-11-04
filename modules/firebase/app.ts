//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//
import { initializeApp } from '@firebase/app'
import { queryOptions } from '@tanstack/react-query'
import { connectAuthEmulator, getAuth, OAuthProvider } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { env } from '@/env'
import { firebaseConfig } from '@/modules/firebase/config'
import {
  getCollectionRefs,
  getDocDataOrThrow,
  getDocumentsRefs,
} from '@/modules/firebase/utils'

const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
const enableEmulation = env.VITE_PUBLIC_EMULATOR
if (enableEmulation)
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })

export const authProvider = {
  stanford: new OAuthProvider('oidc.stanford'),
  apple: new OAuthProvider('apple.com'),
}

export const db = getFirestore(firebaseApp)
if (enableEmulation) connectFirestoreEmulator(db, '127.0.0.1', 8080)

export const refs = getCollectionRefs(db)
export const docRefs = getDocumentsRefs(db)

export const userQueryOptions = (opts: { id: string }) =>
  queryOptions({
    queryKey: ['user', opts],
    queryFn: () => getDocDataOrThrow(docRefs.user(opts.id)),
  })

export const getCurrentUser = () => {
  if (!auth.currentUser) throw new Error('UNAUTHENTICATED')

  return {
    currentUser: auth.currentUser,
  }
}
