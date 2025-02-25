import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface CategoryCardProps {
  icon: LucideIcon
  name: string
  count: number
}

export function CategoryCard({ icon: Icon, name, count }: CategoryCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-primary/5">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 dark:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{count} articles</p>
        </div>
      </CardContent>
    </Card>
  )
}

