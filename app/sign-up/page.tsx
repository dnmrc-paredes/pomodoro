import { SignUpForm } from '@/components/Auth/SignUp/SignUpForm'
import { Brain } from 'lucide-react'
import Link from 'next/link'
import { routeGuard } from '@/utils/auth'

export const metadata = {
  title: 'Sign Up - FocusFlow',
  description: 'Create an account to start your deep work sessions.',
}

export default async function SignUp() {
  await routeGuard()

  return (
    <div className="flex flex-col items-center justify-center h-svh w-full">
      <div className="w-full flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col justify-center items-center">
          <Brain size={64} className="mb-4" />
          <h1 className="font-bold text-4xl">Create Account</h1>
          <p>Join our community of deep workers.</p>
        </div>

        <SignUpForm />

        <span>
          Already have an account? <Link href="/sign-in">Sign In</Link>
        </span>
      </div>
    </div>
  )
}
