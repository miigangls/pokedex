function requiredEnv(name: string, fallback?: string): string {
  const value = import.meta.env[name as keyof ImportMetaEnv] as unknown as string | undefined
  if (value && value.length > 0) return value
  if (fallback) return fallback
  throw new Error(`Missing environment variable: ${name}`)
}

export const env = {
  apiBaseUrl: requiredEnv('VITE_API_BASE_URL', 'https://pokeapi.co/api/v2'),
}


