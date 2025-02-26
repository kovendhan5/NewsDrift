"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Newspaper,
  Headphones,
  Globe,
  Briefcase,
  Lightbulb,
  HeartPulse,
  Film,
  Football,
} from "lucide-react"

const categories = [
  {
    title: "News & Current Affairs",
    items: [
      {
        title: "General",
        href: "/categories/general",
        description: "Top stories and breaking news from around the world",
        icon: Newspaper,
      },
      {
        title: "World",
        href: "/categories/world",
        description: "International news and global developments",
        icon: Globe,
      },
      {
        title: "Business",
        href: "/categories/business",
        description: "Business news, markets, and economic updates",
        icon: Briefcase,
      },
    ],
  },
  {
    title: "Life & Knowledge",
    items: [
      {
        title: "Technology",
        href: "/categories/technology",
        description: "Latest in tech, digital trends, and innovation",
        icon: Lightbulb,
      },
      {
        title: "Health",
        href: "/categories/health",
        description: "Health news, medical research, and wellness",
        icon: HeartPulse,
      },
      {
        title: "Entertainment",
        href: "/categories/entertainment",
        description: "Movies, TV, music, and celebrity news",
        icon: Film,
      },
      {
        title: "Sports",
        href: "/categories/sports",
        description: "Sports news, scores, and highlights",
        icon: Football,
      },
    ],
  },
  {
    title: "Audio Content",
    items: [
      {
        title: "Featured Podcasts",
        href: "/podcasts",
        description: "Discover our curated selection of top podcasts",
        icon: Headphones,
      },
    ],
  },
]

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
  }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
          aria-label={`View ${title} category`}
          role="menuitem"
        >
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" aria-hidden="true" />
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export function MainNav() {
  const pathname = usePathname()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
              {categories.map((section) => (
                <li key={section.title} className="row-span-3">
                  <h3 className="mb-2 text-sm font-medium leading-none text-muted-foreground">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        icon={item.icon}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/podcasts" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Podcasts
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}