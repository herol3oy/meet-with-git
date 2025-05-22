'use client'

import { ReactNode, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { AuthEvent } from '@/types/auth-event'
import { createClient } from '@/utils/supabase/client'

export default function AuthProvider({
  children,
}: {
  children: ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === AuthEvent.SIGNED_IN) {
        router.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  return children
}
