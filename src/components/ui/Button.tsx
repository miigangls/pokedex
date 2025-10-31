import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
}

export function Button({ className = '', variant = 'primary', ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed'
  const variants = {
    primary:
      'bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600 active:bg-red-700',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-900',
  }
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}


