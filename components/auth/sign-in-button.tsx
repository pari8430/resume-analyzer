"use client"

import { Button, type ButtonProps } from "@/components/ui/button"
import { signIn } from "@/lib/auth"

interface SignInButtonProps extends ButtonProps {}

export function SignInButton({ children, ...props }: SignInButtonProps) {
  return (
    <Button onClick={() => signIn()} {...props}>
      {children || "Sign In"}
    </Button>
  )
}

