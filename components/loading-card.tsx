import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function LoadingCard() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Skeleton className="aspect-video md:aspect-square rounded-lg" />
          </div>
          <div className="md:w-2/3 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-7 w-full mb-2" />
              <Skeleton className="h-7 w-3/4" />
            </div>
            <div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

