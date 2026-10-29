'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/about') return pathname === '/about'
    if (href === '/case-studies') return pathname.startsWith('/case-studies')
    return false
  }

  const ariaCurrent = (href: string) => (isActive(href) ? 'page' : undefined)

  const navLinkClass = (href: string) =>
    `text-sm no-underline transition-colors ${
      isActive(href) ? 'text-ink font-semibold' : 'text-secondary hover:text-ink'
    }`

  return (
    <nav className="w-full border-b border-rule" role="navigation" aria-label="Main navigation">
      <div className="mx-auto max-w-content px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-lg font-bold text-ink no-underline hover:text-accent transition-colors"
        >
          AJJ
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/case-studies" className={navLinkClass('/case-studies')} aria-current={ariaCurrent('/case-studies')}>
            Case Studies
          </Link>
          <Link href="/about" className={navLinkClass('/about')} aria-current={ariaCurrent('/about')}>
            About
          </Link>
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-rule">
            <a href="https://www.linkedin.com/in/aju-joseph-john/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-secondary hover:text-ink transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" rx="0" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="https://github.com/ajujosephj09-hungryexplorer" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-flex items-center gap-1.5 text-secondary hover:text-ink transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              <span className="text-sm">GitHub</span>
            </a>
            <a href="https://ajujosephjohn.substack.com/" target="_blank" rel="noopener noreferrer" aria-label="Substack" className="inline-flex items-center gap-1.5 text-secondary hover:text-ink transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16" />
                <path d="M4 8h16" />
                <path d="M4 12l8 6 8-6" />
              </svg>
              <span className="text-sm">Substack</span>
            </a>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-secondary hover:text-ink transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </>
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-rule px-6 py-4 flex flex-col gap-1">
          <Link href="/case-studies" className={`${navLinkClass('/case-studies')} py-2 focus-visible:text-ink`} aria-current={ariaCurrent('/case-studies')} onClick={() => setMenuOpen(false)}>
            Case Studies
          </Link>
          <Link href="/about" className={`${navLinkClass('/about')} py-2 focus-visible:text-ink`} aria-current={ariaCurrent('/about')} onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <div className="flex items-center gap-4 pt-2 border-t border-rule">
            <a href="https://www.linkedin.com/in/aju-joseph-john/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-secondary hover:text-ink transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" rx="0" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="https://github.com/ajujosephj09-hungryexplorer" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-flex items-center gap-1.5 text-secondary hover:text-ink transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              <span className="text-sm">GitHub</span>
            </a>
            <a href="https://ajujosephjohn.substack.com/" target="_blank" rel="noopener noreferrer" aria-label="Substack" className="inline-flex items-center gap-1.5 text-secondary hover:text-ink transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16" />
                <path d="M4 8h16" />
                <path d="M4 12l8 6 8-6" />
              </svg>
              <span className="text-sm">Substack</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
