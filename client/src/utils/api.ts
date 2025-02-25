export type ResponseApi<T> = {
  status: string
  message: string
  data: T
}

class ApplicationError extends Error {
  statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const baseUrl = 'http://localhost:8080'
  const res = await fetch(`${baseUrl}${path}`, options)

  if (!res.ok) {
    const errorMessage = await getErrorMessage(res)
    throw new ApplicationError(errorMessage, res.status)
  }
  const data: T = await res.json()
  return data
}

async function getErrorMessage(response: Response) {
  let message
  try {
    const errorData = await response.json()
    message = errorData.message || response.statusText
  } catch {
    message = response.statusText
  }
  return message
}
