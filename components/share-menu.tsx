"use client"

import type { ReactNode } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Facebook, Twitter, Linkedin, Mail, Copy } from "lucide-react"
import { toast } from "sonner"

interface ShareMenuProps {
  children: ReactNode
  url: string
  title: string
}

export function ShareMenu({ children, url, title }: ShareMenuProps) {
  const fullUrl = `https://newsagg.com${url}`

  const handleShare = (platform: string) => {
    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`
        break
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this link: ${fullUrl}`)}`
        break
      case "copy":
        navigator.clipboard
          .writeText(fullUrl)
          .then(() => toast.success("Link copied to clipboard"))
          .catch(() => toast.error("Failed to copy link"))
        return
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        <DropdownMenuItem 
          onClick={() => handleShare("facebook")}
          className="group cursor-pointer"
        >
          <Facebook className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-500 group-hover:scale-110 transition-transform" />
          <span className="group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">Facebook</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleShare("twitter")}
          className="group cursor-pointer"
        >
          <Twitter className="mr-2 h-4 w-4 text-sky-500 dark:text-sky-400 group-hover:scale-110 transition-transform" />
          <span className="group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">Twitter</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleShare("linkedin")}
          className="group cursor-pointer"
        >
          <Linkedin className="mr-2 h-4 w-4 text-blue-700 dark:text-blue-600 group-hover:scale-110 transition-transform" />
          <span className="group-hover:text-blue-700 dark:group-hover:text-blue-600 transition-colors">LinkedIn</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleShare("email")}
          className="group cursor-pointer"
        >
          <Mail className="mr-2 h-4 w-4 text-orange-600 dark:text-orange-500 group-hover:scale-110 transition-transform" />
          <span className="group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors">Email</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleShare("copy")}
          className="group cursor-pointer"
        >
          <Copy className="mr-2 h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
          <span className="group-hover:text-primary transition-colors">Copy Link</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

