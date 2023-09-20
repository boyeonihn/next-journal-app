import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

const PROTECTED_PATHNAMES = ['/edit', '/new']

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (!session) {
    const url = new URL(req.url)
    const pathname = url.pathname
    if (PROTECTED_PATHNAMES.includes(pathname)) {
      return NextResponse.redirect(
        new URL(
          `/login?redirect_to=${encodeURIComponent(pathname)}`,
          url.origin
        )
      )
    }
  }

  return res
}
