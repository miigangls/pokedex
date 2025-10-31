export function EmptyState({ message = 'No hay resultados' }: { message?: string }) {
  return (
    <div className="rounded-md border bg-white px-4 py-6 text-center text-gray-600">
      {message}
    </div>
  )
}


