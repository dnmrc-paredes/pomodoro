'use server'

import { createServerClient } from '@supabase/ssr'
import { type Session } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export const serverClient = async () => {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? '',
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (toSetCookies) => {
          try {
            toSetCookies.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch (error) {
            console.log(error)
          }
        },
      },
      cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      },
    },
  )
}

export async function getServerSession() {
  const supabase = await serverClient()
  const user = await supabase.auth.getUser()

  const {
    data: { session },
  } = (await supabase?.auth.getSession()) as {
    data: { session: Session | null }
  }

  return { session, user }
}
