"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, Minimize2, Maximize2, X } from "lucide-react"
import { formatTime } from "@/lib/utils"
import { useAudioPlayerStore } from "@/lib/store"

export function AudioPlayer() {
  const { isVisible, currentEpisode, setIsVisible } = useAudioPlayerStore()
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([75])
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMinimized, setIsMinimized] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    const audio = new Audio()
    audioRef.current = audio

    // Set up event listeners
    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration)
    })
    audio.addEventListener("ended", () => {
      setIsPlaying(false)
      setCurrentTime(0)
    })

    // Clean up
    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("loadedmetadata", () => {})
      audio.removeEventListener("ended", () => {})
      audio.pause()
    }
  }, [])

  // Update audio source when currentEpisode changes
  useEffect(() => {
    if (audioRef.current && currentEpisode?.audio) {
      audioRef.current.src = currentEpisode.audio;
      audioRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
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
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
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
      audioRef.current.pause();
      setIsPlaying(false);
    }
    setIsVisible(false);
  }

  if (!currentEpisode || !isVisible) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 border-t bg-background/95 dark:bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-background/50 transition-all duration-300 shadow-lg dark:shadow-primary/5 ${
        isMinimized ? "h-14" : "h-20"
      }`}
    >
      <div className="container flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="relative overflow-hidden rounded-lg">
            <img
              alt={`Cover for ${currentEpisode.title}`}
              className="h-10 w-10 object-cover transition-transform duration-300 hover:scale-105"
              src={currentEpisode.image || "/placeholder.svg"}
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/5 dark:hover:bg-black/20 transition-colors duration-300" />
          </div>
          <div className={`transition-opacity duration-300 ${isMinimized ? "hidden sm:block" : ""}`}>
            <h3 className="font-semibold line-clamp-1 hover:text-primary transition-colors">{currentEpisode.title}</h3>
            <p className="text-sm text-muted-foreground hover:text-muted-foreground/80 transition-colors">{currentEpisode.source}</p>
          </div>
        </div>
        <div className={`flex flex-col items-center gap-2 max-w-xl w-full px-4 ${isMinimized ? "hidden sm:flex" : ""}`}>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleSkipBack} 
              aria-label="Skip backward 15 seconds"
              className="hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button 
              variant="secondary" 
              size="icon" 
              onClick={togglePlayPause} 
              aria-label={isPlaying ? "Pause" : "Play"}
              className="shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all hover:scale-105"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleSkipForward} 
              aria-label="Skip forward 15 seconds"
              className="hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-2 w-full">
            <span className="text-sm text-muted-foreground">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              className="w-full hover:cursor-pointer"
              onValueChange={handleSeek}
              aria-label="Seek audio position"
            />
            <span className="text-sm text-muted-foreground">{formatTime(duration)}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 ${isMinimized ? "hidden sm:flex" : ""}`}>
            <Volume2 className="h-5 w-5 text-muted-foreground" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-24 hover:cursor-pointer"
              aria-label="Adjust volume"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(!isMinimized)}
            aria-label={isMinimized ? "Maximize player" : "Minimize player"}
            className="hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
          >
            {isMinimized ? <Maximize2 className="h-5 w-5" /> : <Minimize2 className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground hover:bg-destructive/10 dark:hover:bg-destructive/20 transition-colors"
            aria-label="Close player"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

