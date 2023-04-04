import axios, { AxiosResponse } from "axios"

// eslint-disable-next-line import/prefer-default-export
export const fetch = async <T>(
  url: string,
  queryParams?: { [key: string]: any }
): Promise<T | null> => {
  let response: AxiosResponse
  try {
    response = await axios.get<T>(url, {
      params: queryParams,
    })
    return response.data
  } catch (err) {
    console.error(`call to ${url} failed - ${(err as Error).message}`)
    return null
  }
}
