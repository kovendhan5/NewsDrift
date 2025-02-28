"use client"

import { Button } from "@/components/ui/button"
import { debugApiEndpoint } from "@/lib/debug-api"
import { useState } from "react"

export function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [apiResponse, setApiResponse] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null

  const testNewsApi = async (category?: string) => {
    setIsLoading(true)
    const url = `/api/news${category ? `?category=${category}` : ''}`
    const result = await debugApiEndpoint(url)
    setApiResponse(result)
    setIsLoading(false)
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200"
      >
        {isOpen ? 'Close Debug' : 'Debug Tools'}
      </Button>
      
      {isOpen && (
        <div className="mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-80">
          <h3 className="font-medium mb-2">API Tests</h3>
          <div className="space-y-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => testNewsApi()}
              disabled={isLoading}
            >
              Test News API
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => testNewsApi('technology')}
              disabled={isLoading}
            >
              Test Tech News
            </Button>
          </div>
          
          {apiResponse && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-1">Response:</h4>
              <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded overflow-auto max-h-40">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 