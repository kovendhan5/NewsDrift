import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface PodcastGridErrorProps {
  message: string;
  onRetry?: () => void;
}

export function PodcastGridError({ message, onRetry }: PodcastGridErrorProps) {
  return (
    <div className="text-center py-12 bg-muted/5 rounded-lg">
      <h3 className="text-lg font-medium text-red-500 mb-2">{message}</h3>
      {onRetry && (
        <Button 
          onClick={onRetry} 
          variant="outline"
          className="mt-4 gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  )
}