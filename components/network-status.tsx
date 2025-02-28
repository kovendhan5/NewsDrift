"use client"

import { Wifi, WifiOff } from "lucide-react"
import { useEffect, useState } from "react"

export function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [showStatus, setShowStatus] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowStatus(true)
      const timer = setTimeout(() => setShowStatus(false), 3000)
      return () => clearTimeout(timer)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowStatus(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!showStatus) return null

  return (
    <div className={`fixed bottom-4 right-4 p-3 rounded-lg shadow-lg flex items-center gap-2 ${
      isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      {isOnline ? (
        <>
          <Wifi className="h-5 w-5" />
          <span>You're back online</span>
        </>
      ) : (
        <>
          <WifiOff className="h-5 w-5" />
          <span>You're offline</span>
        </>
      )}
    </div>
  )
} 