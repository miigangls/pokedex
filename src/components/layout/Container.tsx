import type { PropsWithChildren } from 'react'

export function Container({ children }: PropsWithChildren) {
  return <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
}


