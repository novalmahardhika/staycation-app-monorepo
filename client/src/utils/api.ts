export type ResponseApi<T> = {
  status: string
  message: string
  data: T
}

export class ApplicationError extends Error {
  statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export async function api<T>(
  path: string,
  options?: RequestInit
): Promise<ResponseApi<T>> {
  try {
    const baseUrl = import.meta.env.VITE_BASE_URL
    const res = await fetch(`${baseUrl}${path}`, options)
    const data: ResponseApi<T> = await res.json()
    if (!res.ok) {
      throw new ApplicationError(data.message, res.status)
    }
    return data
  } catch (error: unknown) {
    if (error instanceof ApplicationError) throw error
    if (error instanceof Error) throw new ApplicationError(error.message, 500)
    throw new ApplicationError('An unknown error occurred', 500)
  }
}
