import type { PropsWithChildren } from 'react'

export function Card({ children, className = '' }: PropsWithChildren & { className?: string }) {
  return <div className={`rounded-xl border bg-white shadow-sm ${className}`}>{children}</div>
}

export function CardContent({ children, className = '' }: PropsWithChildren & { className?: string }) {
  return <div className={`p-4 ${className}`}>{children}</div>
}


