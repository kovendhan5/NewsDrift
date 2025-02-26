import { NextResponse } from "next/server"
import { invalidateCache } from "@/lib/redis"
import { headers } from "next/headers"
import config from "@/lib/config"

// Secret key for cache invalidation
const CACHE_INVALIDATION_KEY = process.env.CACHE_INVALIDATION_KEY

export async function POST(request: Request) {
  try {
    const headersList = headers()
    const authKey = headersList.get('x-cache-invalidation-key')

    // Validate the request
    if (!authKey || authKey !== CACHE_INVALIDATION_KEY) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { pattern = 'news:*' } = await request.json()
    
    // Invalidate cache with the specified pattern
    await invalidateCache(pattern)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Cache invalidation error:', error)
    return NextResponse.json(
      { error: 'Failed to invalidate cache' },
      { status: 500 }
    )
  }
}