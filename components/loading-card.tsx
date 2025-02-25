import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function LoadingCard() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-[2fr_1fr] gap-4 p-6">
          <div className="space-y-3">
            <Skeleton className="h-6 w-[80%]" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[70%]" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="md:order-last order-first">
            <Skeleton className="aspect-video md:aspect-square w-full rounded-lg" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

