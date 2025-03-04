"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Users, Trophy, Calendar, ArrowRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock challenges data
const mockChallenges = [
  {
    id: "c1",
    title: "Meat-Free Week",
    description: "Reduce your carbon footprint by going meat-free for a full week.",
    participants: 1245,
    startDate: "2024-02-20",
    endDate: "2024-02-27",
    status: "active",
    progress: 65,
  },
  {
    id: "c2",
    title: "Public Transport Challenge",
    description: "Use public transportation instead of personal vehicles for all your commutes this month.",
    participants: 876,
    startDate: "2024-02-15",
    endDate: "2024-03-15",
    status: "active",
    progress: 42,
  },
  {
    id: "c3",
    title: "Zero Waste Weekend",
    description: "Try to produce zero waste for an entire weekend. Reduce, reuse, recycle!",
    participants: 543,
    startDate: "2024-03-01",
    endDate: "2024-03-03",
    status: "upcoming",
    progress: 0,
  },
]

// Mock leaderboard data
const mockLeaderboard = [
  { id: "u1", name: "Sarah J.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&q=80", points: 1250 },
  { id: "u2", name: "Michael T.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&q=80", points: 980 },
  { id: "u3", name: "Emma W.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&q=80", points: 875 },
  { id: "u4", name: "David L.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&q=80", points: 720 },
  { id: "u5", name: "Jessica M.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&q=80", points: 650 },
]

export function CommunityChallenges() {
  const [loading, setLoading] = useState(true)
  const [challenges, setChallenges] = useState<typeof mockChallenges>([])
  const [leaderboard, setLeaderboard] = useState<typeof mockLeaderboard>([])
  const [joinedChallenges, setJoinedChallenges] = useState<string[]>([])

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setChallenges(mockChallenges)
      setLeaderboard(mockLeaderboard)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const toggleJoinChallenge = (challengeId: string) => {
    setJoinedChallenges((prev) =>
      prev.includes(challengeId) ? prev.filter((id) => id !== challengeId) : [...prev, challengeId],
    )
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="animate-pulse bg-muted h-8 w-3/4 rounded"></CardTitle>
          <CardDescription className="animate-pulse bg-muted h-4 w-1/2 rounded"></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <div className="animate-pulse bg-muted h-6 w-3/4 rounded mb-2"></div>
                <div className="animate-pulse bg-muted h-4 w-full rounded mb-4"></div>
                <div className="animate-pulse bg-muted h-4 w-1/4 rounded mb-2"></div>
                <div className="animate-pulse bg-muted h-8 w-full rounded mb-2"></div>
                <div className="flex justify-between">
                  <div className="animate-pulse bg-muted h-8 w-1/4 rounded"></div>
                  <div className="animate-pulse bg-muted h-8 w-1/4 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-800 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Community Challenges
        </CardTitle>
        <CardDescription className="text-white/80">
          Join challenges with other users to reduce your carbon footprint together
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold mb-2">Active & Upcoming Challenges</h3>
            {challenges.map((challenge) => (
              <Card 
                key={challenge.id} 
                className="overflow-hidden group hover:shadow-md dark:hover:shadow-primary/5 transition-all"
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">{challenge.title}</h4>
                    <Badge 
                      variant={challenge.status === "active" ? "default" : "outline"}
                      className="dark:shadow-none dark:hover:shadow-primary/10"
                    >
                      {challenge.status === "active" ? "Active" : "Upcoming"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors mb-3">
                    {challenge.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Users className="h-4 w-4 group-hover:text-primary transition-colors" />
                    <span>{challenge.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4 group-hover:text-primary transition-colors" />
                    <span>
                      {formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}
                    </span>
                  </div>
                  {challenge.status === "active" && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <Progress 
                        value={challenge.progress} 
                        className="h-2 dark:bg-muted/30"
                      />
                    </div>
                  )}
                  <div className="flex justify-end">
                    <Button
                      variant={joinedChallenges.includes(challenge.id) ? "outline" : "default"}
                      onClick={() => toggleJoinChallenge(challenge.id)}
                      className="shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all"
                    >
                      {joinedChallenges.includes(challenge.id) ? "Leave Challenge" : "Join Challenge"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="flex justify-center mt-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-1 shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all"
              >
                View All Challenges
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
              Leaderboard
            </h3>
            <Card className="hover:shadow-md dark:hover:shadow-primary/5 transition-all">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {leaderboard.map((user, index) => (
                    <div 
                      key={user.id} 
                      className="flex items-center justify-between group hover:bg-muted/50 dark:hover:bg-muted/20 rounded-lg p-2 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-transform group-hover:scale-110 ${
                            index === 0
                              ? "bg-yellow-500 dark:bg-yellow-500/90 text-white"
                              : index === 1
                                ? "bg-gray-300 dark:bg-gray-400 text-gray-800 dark:text-gray-900"
                                : index === 2
                                  ? "bg-amber-700 dark:bg-amber-700/90 text-white"
                                  : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <Avatar className="h-8 w-8 transition-transform group-hover:scale-105">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium group-hover:text-primary transition-colors">{user.name}</span>
                      </div>
                      <span className="font-semibold group-hover:text-primary transition-colors">{user.points} pts</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t dark:border-muted/30">
                  <div 
                    className="flex items-center justify-between group hover:bg-muted/50 dark:hover:bg-muted/20 rounded-lg p-2 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-muted text-muted-foreground transition-transform group-hover:scale-110">
                        24
                      </div>
                      <Avatar className="h-8 w-8 transition-transform group-hover:scale-105">
                        <AvatarFallback>YO</AvatarFallback>
                      </Avatar>
                      <span className="font-medium group-hover:text-primary transition-colors">You</span>
                    </div>
                    <span className="font-semibold group-hover:text-primary transition-colors">320 pts</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

