export function ErrorState({ message = 'Algo salió mal' }: { message?: string }) {
  return (
    <div role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-800">
      {message}
    </div>
  )
}


