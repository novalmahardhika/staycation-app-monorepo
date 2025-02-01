export type ResponseApi<T> = {
  status: string
  message: string
  data: T
}

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const baseUrl = 'http://localhost:8080'
  const res = await fetch(`${baseUrl}${path}`, options)
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }
  const data: T = await res.json()
  return data
}
