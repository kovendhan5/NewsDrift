import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function LoadingCard() {
  return (
    <Card className="transition-shadow hover:shadow-md dark:hover:shadow-primary/5">
      <CardContent className="p-4">
        <div className="space-y-3">
          <Skeleton className="h-[125px] w-full rounded-lg animate-pulse dark:opacity-[0.07] dark:hover:opacity-[0.09] transition-opacity" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4 animate-pulse dark:opacity-[0.07] dark:hover:opacity-[0.09] transition-opacity" />
            <Skeleton className="h-4 w-1/2 animate-pulse dark:opacity-[0.07] dark:hover:opacity-[0.09] transition-opacity" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

