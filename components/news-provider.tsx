"use client"

import { createContext, useContext, ReactNode, useEffect } from 'react'
import config from '@/lib/config'

interface NewsContextType {
  isReady: boolean;
  apiKey: string;
}

const NewsContext = createContext<NewsContextType>({
  isReady: false,
  apiKey: '',
})

export function useNews() {
  const context = useContext(NewsContext)
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider')
  }
  return context
}

interface NewsProviderProps {
  children: ReactNode;
}

export function NewsProvider({ children }: NewsProviderProps) {
  // Initialize News API configuration
  const apiKey = config.newsApi.apiKey || ''
  const isReady = Boolean(apiKey)

  useEffect(() => {
    if (!isReady) {
      console.warn('News API key is not configured')
    }
  }, [isReady])

  return (
    <NewsContext.Provider value={{ isReady, apiKey }}>
      {children}
    </NewsContext.Provider>
  )
}