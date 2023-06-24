
export interface BaseResponse<T={}, E={}> {
  status: "ok" | "error"
  statusCode?: number,
  message?: string
  data: T | E
}

export default async function fetcher<T, E>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<BaseResponse<T,E>> {
  try {
    const res = await fetch(input, init)
    if (res.ok) {
      return ({
        status: "ok",
        statusCode: res.status,
        data: await res.json() as T,
        message: res.statusText
      })
    }

    const error: any = {
      status: "error",
      message: res.statusText,
      statusCode: res.status,
      data: {}
    }

    const isResponseJson = res.headers
      .get('content-type')
      ?.includes('application/json')

    if (isResponseJson) {
      let data

      try {
        data = (await res.json()) as E
        error.data = data
      } catch (err: any) {
        error.message = err.message
      }
    }
    return error
  } catch (error: any) {
    return await Promise.reject(error)
  }
}
