import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Create a single Supabase client for the middleware
const supabaseUrl = "https://ourgrtalclzrtyouisob.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91cmdydGFsY2x6cnR5b3Vpc29iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MDEzNTcsImV4cCI6MjA5MjA3NzM1N30.xdeBgtkzcLbxo9G7XWp6-mQGgewV4FyCzfVT8hzkero"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Get the auth token from the request
  const authToken = req.cookies.get('sb-access-token')?.value

  let session = null
  
  // If there's a token, try to get the session
  if (authToken) {
    try {
      const { data } = await supabase.auth.getUser(authToken)
      session = data.user ? { user: data.user } : null
    } catch (error) {
      // Invalid token, continue without session
      console.error('Error validating auth token:', error)
    }
  }

  const { pathname } = req.nextUrl

  // If user is logged in and trying to access the landing page, redirect to dashboard
  if (session && pathname === '/') {
    return NextResponse.redirect(new URL('/userdashboard', req.url))
  }

  // If user is not logged in and trying to access protected routes, redirect to landing page
  if (!session && pathname.startsWith('/userdashboard')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: ['/', '/userdashboard/:path*']
}
