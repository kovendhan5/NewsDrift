"use client"

import * as React from "react"
import { Search, Soccer } from "lucide-react"
import { Button } from "@/components/ui/button"

// Simple custom icons implementation
const Icons = {
  all: () => <Search className="h-4 w-4" />,
  component: () => <Search className="h-4 w-4" />,
  form: () => <Search className="h-4 w-4" />,
  media: () => <Search className="h-4 w-4" />
}

const examples = [
  {
    id: "all",
    name: "All",
    icon: () => <Search className="h-4 w-4" />
  },
  {
    id: "components",
    name: "Components",
    icon: () => <Search className="h-4 w-4" />
  },
  {
    id: "forms",
    name: "Forms",
    icon: () => <Search className="h-4 w-4" />
  },
  {
    id: "media",
    name: "Media",
    icon: () => <Search className="h-4 w-4" />
  },
  {
    id: "sports",
    name: "Sports",
    icon: () => <Soccer className="h-4 w-4" />,
    count: 567,
  },
]

export function NavigationMenu() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4" />
        <input
          type="text"
          placeholder="Search"
          className="flex-1 bg-transparent p-0 text-sm placeholder:text-muted-foreground focus:outline-none"
        />
      </div>
      <div className="flex flex-col space-y-2">
        {examples.map((example) => (
          <Button
            key={example.id}
            variant="ghost"
            className="justify-start"
            onClick={() => console.log(example.name)}
          >
            {example.icon()}
            <span className="ml-2">{example.name}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
