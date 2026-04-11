import { SignInForm } from '@/components/Auth/SignIn/SignInForm'
import Link from 'next/link'
import { Brain } from 'lucide-react'
import { routeGuard } from '@/utils/auth'

export const metadata = {
  title: 'Sign In - FocusFlow',
  description: 'Access your account and start your deep work sessions.',
}

export default async function SignIn() {
  await routeGuard()

  return (
    <div className="flex flex-col items-center justify-center h-svh w-full">
      <div className="w-full flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col justify-center items-center">
          <Brain size={64} className="mb-4" />
          <h1 className="font-bold text-4xl">Welcome to FocusFlow</h1>
          <p>Master your time, achieve your goals.</p>
        </div>

        <SignInForm />

        <span>
          Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
        </span>
      </div>
    </div>
  )
}
