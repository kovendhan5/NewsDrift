"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, Minimize2, Maximize2, X, AlertCircle } from "lucide-react"
import { formatTime } from "@/lib/utils"
import { useAudioPlayerStore } from "@/lib/store"
import { PlaceholderImage } from "@/components/ui/placeholder-image"

export function AudioPlayer() {
  const { isVisible, currentEpisode, setIsVisible } = useAudioPlayerStore()
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([75])
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMinimized, setIsMinimized] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    const audio = new Audio()
    audioRef.current = audio

    // Set up event listeners
    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration)
      setError(null)
    })
    audio.addEventListener("ended", () => {
      setIsPlaying(false)
      setCurrentTime(0)
    })
    audio.addEventListener("error", (e) => {
      console.error('Audio playback error:', e)
      setError('Failed to load or play audio. Please try again.')
      setIsPlaying(false)
    })
    audio.addEventListener("stalled", () => {
      console.warn('Audio playback stalled')
      setError('Audio playback stalled. Please wait or try again.')
    })
    audio.addEventListener("waiting", () => {
      console.log('Audio buffering...')
    })

    // Clean up
    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("loadedmetadata", () => {})
      audio.removeEventListener("ended", () => {})
      audio.removeEventListener("error", () => {})
      audio.removeEventListener("stalled", () => {})
      audio.removeEventListener("waiting", () => {})
      audio.pause()
    }
  }, [])

  // Update audio source when currentEpisode changes
  useEffect(() => {
    if (audioRef.current && currentEpisode?.url) {
      setError(null)
      const audio = audioRef.current
      audio.src = currentEpisode.url
      
      // Set audio format if available
      const canPlayType = (format: string) => {
        const mimeTypes = {
          mp3: 'audio/mpeg',
          wav: 'audio/wav',
          aac: 'audio/aac',
          m4a: 'audio/mp4',
          ogg: 'audio/ogg',
        }
        return audio.canPlayType(mimeTypes[format as keyof typeof mimeTypes])
      }

      // Get the file extension from the URL
      const extension = currentEpisode.url.split('.').pop()?.toLowerCase()
      if (extension && !canPlayType(extension)) {
        setError(`This browser doesn't support ${extension.toUpperCase()} audio format`)
        return
      }

      audio.load()
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }, [currentEpisode])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100
    }
  }, [volume])

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (error) {
        // Try reloading on error
        setError(null)
        audioRef.current.load()
      }
      
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Playback error:', error)
            setError('Failed to start playback. Please try again.')
          })
        }
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleSkipBack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, currentTime - 15)
    }
  }

  const handleSkipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, currentTime + 15)
    }
  }

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
    setIsVisible(false)
  }

  if (!currentEpisode || !isVisible) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 border-t bg-background/95 dark:bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-background/50 transition-all duration-300 shadow-lg dark:shadow-primary/5 ${
        isMinimized ? 'h-16' : 'h-24'
      }`}
    >
      <div className="container flex h-full items-center gap-4 px-4">
        <div className={`flex items-center gap-4 ${isMinimized ? 'flex-1' : 'w-1/3'}`}>
          {currentEpisode.image && (
            <div className="relative aspect-square h-12 w-12 overflow-hidden rounded-lg">
              <PlaceholderImage
                src={currentEpisode.image}
                alt={currentEpisode.title}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="truncate font-medium">{currentEpisode.title}</div>
            {!isMinimized && currentEpisode.author && (
              <div className="truncate text-sm text-muted-foreground">{currentEpisode.author}</div>
            )}
          </div>
        </div>

        {!isMinimized && (
          <div className="flex w-1/3 flex-col items-center gap-2">
            {error ? (
              <div className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setError(null)
                    if (audioRef.current) {
                      audioRef.current.load()
                    }
                  }}
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleSkipBack}
                    aria-label="Skip back 15 seconds"
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={togglePlayPause}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleSkipForward}
                    aria-label="Skip forward 15 seconds"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex w-full items-center gap-2 text-sm">
                  <span className="tabular-nums">{formatTime(currentTime)}</span>
                  <Slider
                    value={[currentTime]}
                    min={0}
                    max={duration}
                    step={1}
                    onValueChange={handleSeek}
                    className="flex-1"
                    aria-label="Playback progress"
                  />
                  <span className="tabular-nums">{formatTime(duration)}</span>
                </div>
              </>
            )}
          </div>
        )}

        <div className={`flex items-center gap-4 ${isMinimized ? '' : 'w-1/3 justify-end'}`}>
          {!isMinimized && (
            <div className="flex w-32 items-center gap-2">
              <Volume2 className="h-4 w-4" />
              <Slider
                value={volume}
                min={0}
                max={100}
                step={1}
                onValueChange={setVolume}
                aria-label="Volume"
              />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsMinimized(!isMinimized)}
            aria-label={isMinimized ? "Maximize player" : "Minimize player"}
          >
            {isMinimized ? (
              <Maximize2 className="h-4 w-4" />
            ) : (
              <Minimize2 className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleClose}
            aria-label="Close player"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

