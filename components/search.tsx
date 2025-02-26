import { Input } from "@/components/ui/input"
import { Search as SearchIcon } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import { useDebounce } from "@/lib/hooks/use-debounce"

interface SearchProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
  initialValue?: string
  debounceMs?: number
}

export function Search({
  onSearch,
  placeholder = "Search...",
  className = "",
  initialValue = "",
  debounceMs = 500
}: SearchProps) {
  const [value, setValue] = useState(initialValue)
  const debouncedValue = useDebounce(value, debounceMs)

  useEffect(() => {
    onSearch(debouncedValue)
  }, [debouncedValue, onSearch])

  return (
    <div className={`relative ${className}`}>
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-9 w-full dark:shadow-none dark:hover:shadow-primary/10 transition-shadow"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}