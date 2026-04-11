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
import { toast } from 'sonner'

export const SignUpForm = () => {
  const [registerDetails, setRegisterDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePassword = () => setShowPassword((prev) => !prev)
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev)

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (registerDetails.password !== registerDetails.confirmPassword) {
      return toast('Password must match')
    }

    try {
      const client = browserClient()
      await client?.auth.signUp({
        email: registerDetails.email,
        password: registerDetails.password,
        options: {
          data: {
            displayName: registerDetails.name,
          },
        },
      })

      toast(
        'Registration successful! Please check your email to confirm your account.',
      )
    } catch (error) {
      console.log(error)
      toast('Error signing up. Please try again.')
    }
  }

  const handleChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) =>
    setRegisterDetails((prev) => ({ ...prev, [name]: e.target.value }))

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-125 w-full flex flex-col gap-4 border-white/10 border-2 rounded-xl bg-white/10 items-center"
    >
      <div className="w-full flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="name" className="uppercase text-white/50">
            Name
          </FieldLabel>
          <InputGroup className="rounded-xl h-14">
            <InputGroupAddon align="inline-start">
              <Mail />
            </InputGroupAddon>
            <InputGroupInput
              id="name"
              placeholder="sample@example.com"
              onChange={handleChange('name')}
            />
          </InputGroup>
        </Field>
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
        <Field>
          <FieldLabel htmlFor="password" className="uppercase text-white/50">
            Confirm Password
          </FieldLabel>
          <InputGroup className="rounded-xl h-14">
            <InputGroupAddon align="inline-start">
              <Lock />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <button onClick={toggleConfirmPassword} type="button">
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </InputGroupAddon>
            <InputGroupInput
              id="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              onChange={handleChange('confirmPassword')}
            />
          </InputGroup>
        </Field>
        <button
          type="submit"
          className="text-black bg-white flex gap-1 items-center justify-center py-4 rounded-xl"
        >
          Sign Up <ArrowRight />
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
          Sign Up with Google
        </button>
      </div>
    </form>
  )
}
