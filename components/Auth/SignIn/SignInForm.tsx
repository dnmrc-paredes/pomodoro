'use client'

import { ArrowRight, Eye, Lock, Mail, EyeOff } from 'lucide-react'
import { Field, FieldLabel } from '../../ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../../ui/input-group'
import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { browserClient } from '@/lib/browserClient'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const SignInForm = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  })
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => setShowPassword((prev) => !prev)

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!loginDetails.email || !loginDetails.password) {
      return toast('Please fill in all fields.')
    }

    try {
      const client = browserClient()
      await client?.auth
        .signInWithPassword({
          ...loginDetails,
        })
        .then(({ error }) => {
          if (error?.code === 'email_not_confirmed') {
            return toast('Please confirm your email before signing in.')
          }

          if (error?.code === 'invalid_credentials') {
            return toast('Invalid email or password. Please try again.')
          }

          router.replace('/')
        })

      await client?.auth.getSession()

      // router.push('/')
    } catch (error) {
      console.log(error)
      toast('Error signing in. Please check your credentials and try again.')
    }
  }

  const handleChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) =>
    setLoginDetails((prev) => ({ ...prev, [name]: e.target.value }))

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-125 w-full flex flex-col gap-4 border-white/10 border-2 rounded-xl bg-white/10 items-center"
    >
      <div className="w-full flex flex-col gap-4">
        <Field>
          <FieldLabel
            htmlFor="email-address"
            className="uppercase text-white/50"
          >
            Email Address
          </FieldLabel>
          <InputGroup className="rounded-xl h-14">
            <InputGroupAddon align="inline-start">
              <Mail />
            </InputGroupAddon>
            <InputGroupInput
              id="email-address"
              placeholder="sample@example.com"
              onChange={handleChange('email')}
            />
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="password" className="uppercase text-white/50">
            Password
          </FieldLabel>
          <InputGroup className="rounded-xl h-14">
            <InputGroupAddon align="inline-start">
              <Lock />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <button onClick={togglePassword} type="button">
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </InputGroupAddon>
            <InputGroupInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange('password')}
            />
          </InputGroup>
        </Field>
        <button
          type="submit"
          className="text-black bg-white flex gap-1 items-center justify-center py-4 rounded-xl"
        >
          Sign In <ArrowRight />
        </button>
      </div>

      <div>
        <p className="uppercase text-[12px] bg-black p-1">Or continue with</p>
      </div>

      <div className="w-full">
        <button
          type="button"
          className="text-black bg-white flex gap-1 items-center justify-center py-4 rounded-xl w-full"
        >
          Sign In with Google
        </button>
      </div>
    </form>
  )
}
