import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import type { SectionId } from './Sidebar'

function getSectionId(hash: string): SectionId | undefined {
  const id = hash.slice(1)
  if (id === 'overview' || id === 'transaction-explorer' || id === 'benchmarks') return id
}

interface AppShellProps {
  children: ReactNode
}

function AppShell({ children }: AppShellProps) {
  const [activeSection, setActiveSection] = useState<SectionId>(() => getSectionId(window.location.hash) ?? 'overview')

  useEffect(() => {
    function focusDestination() {
      const id = window.location.hash.slice(1)
      document.getElementById(id)?.focus({ preventScroll: true })
    }

    function handleHashChange() {
      const section = getSectionId(window.location.hash)
      if (section) setActiveSection(section)
      else if (!window.location.hash) setActiveSection('overview')
      focusDestination()
    }

    // Support direct section links and browser Back/Forward as well as clicks.
    focusDestination()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <>
      <a
        href="#main-content"
        onClick={(event) => {
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
          document.getElementById('main-content')?.focus({ preventScroll: true })
        }}
        className="sr-only z-10 rounded-lg bg-surface px-4 py-3 font-semibold focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to main content
      </a>
      <div className="grid min-h-dvh grid-cols-1 grid-rows-[auto_auto_1fr] lg:grid-cols-[224px_minmax(0,1fr)] lg:grid-rows-[auto_1fr]">
        <div className="min-w-0 lg:col-start-2"><Header /></div>
        <div className="min-w-0 bg-surface lg:col-start-1 lg:row-start-1 lg:row-span-2"><Sidebar activeSection={activeSection} /></div>
        <main id="main-content" tabIndex={-1} className="min-w-0 px-4 py-6 sm:px-6 lg:col-start-2 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-[1600px] space-y-8">{children}</div>
        </main>
      </div>
    </>
  )
}

export default AppShell
