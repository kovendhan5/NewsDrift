export async function invalidateStaleCache() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/news/invalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-cache-invalidation-key': process.env.CACHE_INVALIDATION_KEY || '',
      },
      body: JSON.stringify({
        pattern: 'news:*', // Invalidate all news cache
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to invalidate cache: ${response.statusText}`)
    }

    console.log('Successfully invalidated stale cache')
  } catch (error) {
    console.error('Error invalidating cache:', error)
  }
}

// Run cache invalidation every 15 minutes
if (typeof window === 'undefined') { // Only run on server
  setInterval(invalidateStaleCache, 15 * 60 * 1000)
}