'use client'
import { signIn } from 'next-auth/react'
import React from 'react'

export default function LoginNav() {
  return (
    <button onClick={() => signIn('google')}>
      <span>Login </span>
    </button>
  )
}
