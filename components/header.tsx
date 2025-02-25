"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Search, User, Menu, Leaf, Moon, Sun, Monitor } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useUser } from "@/components/user-provider"
import { useAuth0 } from "@auth0/auth0-react"
import { Spinner } from "@/components/ui/spinner"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { setTheme } = useTheme()
  const { user, loading } = useUser();
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="lg:hidden" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription>Access all sections of NewsAgg</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-4">
              <Link href="/" className="font-semibold hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/categories" className="font-semibold hover:text-primary transition-colors">
                Categories
              </Link>
              <Link href="/podcasts" className="font-semibold hover:text-primary transition-colors">
                Podcasts
              </Link>
              <Link
                href="/carbon-footprint"
                className="font-semibold hover:text-primary transition-colors flex items-center gap-2"
              >
                <Leaf className="h-4 w-4 text-green-500" />
                Carbon Footprint
              </Link>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-2 text-muted-foreground">Theme</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center justify-center gap-1"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-4 w-4" />
                    <span>Light</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center justify-center gap-1"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-4 w-4" />
                    <span>Dark</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center justify-center gap-1"
                    onClick={() => setTheme("system")}
                  >
                    <Monitor className="h-4 w-4" />
                    <span>Auto</span>
                  </Button>
                </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        <Link
          href="/"
          className="mr-6 flex items-center space-x-2 transition-colors hover:text-primary"
          aria-label="NewsAgg Home"
        >
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            NewsAgg
          </span>
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/categories" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Categories</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/podcasts" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Podcasts</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {user && (
              <NavigationMenuItem>
                <Link href="/carbon-footprint" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Leaf className="h-4 w-4 mr-1 text-green-500" />
                    Carbon Footprint
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center ml-auto gap-4">
          {isSearchOpen ? (
            <div className="relative">
              <Input
                type="search"
                placeholder="Search articles and podcasts..."
                className="w-[200px] sm:w-[300px] pr-8"
                aria-label="Search"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
              className="hover:bg-primary/10 transition-colors"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
          <ThemeToggle />
          {loading ? (
            <Button variant="ghost" size="icon" disabled>
              <Spinner className="h-5 w-5" />
            </Button>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.auth0Id} alt={user.name || 'User avatar'} />
                    <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem 
                  className="text-muted-foreground"
                >
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="default"
              onClick={() => loginWithRedirect()}
              className="shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

