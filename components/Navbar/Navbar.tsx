'use client'

import { useAuth } from '@/hooks/useAuth'
import { browserClient } from '@/lib/browserClient'
import { Brain, LogOut, LogIn } from 'lucide-react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const Navbar = () => {
  const { user } = useAuth()
  const router = useRouter()
  const client = browserClient()

  const handleLogout = async () => {
    await client?.auth.signOut()
    return router.replace('/')
  }

  return (
    <nav className="w-full px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center glass rounded-2xl px-6 py-3 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black shadow-lg">
            <Brain size={20} />
          </div>
          <span className="text-lg font-semibold tracking-tight hidden sm:block">
            FocusFlow
          </span>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-medium">
                  Focused User
                </span>
                <span className="text-xs font-medium text-white/80">
                  {user.user_metadata['display_name']}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium text-white/80 hover:text-white"
              >
                <LogOut size={16} />
                <span className="hidden xs:block">Sign Out</span>
              </button>
            </>
          ) : (
            !user && (
              <Link
                href="/sign-in"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white text-black hover:bg-white/90 transition-all text-sm font-semibold shadow-lg shadow-white/5"
              >
                <LogIn size={16} />
                <span>Sign In</span>
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  )
}
