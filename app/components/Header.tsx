"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { UserNav } from "./UserNav"


const navigationLinks = [
  { href: "/highlights", label: "Highlights" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/predictions", label: "Predictions" },
]

const commonButtonStyles = "bg-white/10 text-white hover:bg-white/20 px-6 py-2 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105 focus:scale-105"
const logoButtonStyles = "bg-blue-600 text-white font-bold transition-all duration-200 px-6 py-2 rounded-full hover:bg-blue-700 hover:shadow-lg scale-105 focus:scale-105"
const commonLinkStyles = "text-white hover:text-blue-300 px-4 py-2 font-medium transition-all duration-200"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 left-0 right-0 z-50 transition-colors transition-opacity duration-300 ease-in-out border-b border-gray-800 
      ${isScrolled 
        ? 'bg-gray-900/75 backdrop-blur-md' 
        : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'
      }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-white">
          <span className="text-blue-300">MLB</span> FanFeed ⚾️
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          {navigationLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={commonLinkStyles}
            >
              {link.label}
            </Link>
          ))}
          <UserNav />
        </div>
      </nav>
    </header>
  )
}