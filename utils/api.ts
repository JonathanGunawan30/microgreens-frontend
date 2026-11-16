export function getAuthCookieOptions() {
  const isHttps = import.meta.client
    ? window.location.protocol === 'https:'
    : process.env.NODE_ENV === 'production'

  return {
    sameSite: 'lax' as const,
    secure: isHttps,
    path: '/',
  }
}

export interface ApiFetchOptions extends RequestInit {
  auth?: boolean
}

/**
 * Centralized fetch wrapper that injects the Bearer token from cookies,
 * preserves FormData boundaries, and handles 401 Unauthorized responses.
 */
export async function apiFetch(url: string, options: ApiFetchOptions = {}): Promise<Response> {
  const { auth = true, headers: customHeaders, ...rest } = options
  const headers = new Headers(customHeaders)

  const isFormData = typeof FormData !== 'undefined' && rest.body instanceof FormData
  if (!isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const cookieOpts = getAuthCookieOptions()
  const tokenCookie = useCookie<string | null>('token', cookieOpts)
  const hasToken = Boolean(tokenCookie.value)

  if (auth && hasToken && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${tokenCookie.value}`)
  }

  const response = await fetch(url, {
    ...rest,
    headers,
  })

  if (response.status === 401 && auth && hasToken) {
    tokenCookie.value = null
    const userCookie = useCookie<unknown>('user', cookieOpts)
    userCookie.value = null
    if (import.meta.client && window.location.pathname !== '/auth/signin') {
      await navigateTo('/auth/signin')
    }
  }

  return response
}
