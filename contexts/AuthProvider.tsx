'use client'

import { createContext, useEffect, useState } from 'react'
import { browserClient } from '@/lib/browserClient'
import { User } from '@supabase/supabase-js'

const AuthContext = createContext({
  user: null as User | null,
})

export const AuthProvider = ({
  initialUser,
  children,
}: {
  initialUser: User | null
  children: React.ReactNode
}) => {
  const supabase = browserClient()
  const [user, setUser] = useState<User | null>(initialUser)

  useEffect(() => {
    supabase?.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const data = supabase?.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      data?.data.subscription?.unsubscribe()
    }
  }, [supabase])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export default AuthContext
