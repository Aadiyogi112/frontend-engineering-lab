const destinations = [
  { id: 'overview', label: 'Overview' },
  { id: 'transaction-explorer', label: 'Transaction Explorer' },
  { id: 'benchmarks', label: 'Benchmarks' },
] as const

export type SectionId = (typeof destinations)[number]['id']

interface SidebarProps {
  activeSection: SectionId
}

function Sidebar({ activeSection }: SidebarProps) {
  return (
    <nav aria-label="Main navigation" className="border-b border-subtle bg-surface p-4 sm:px-6 lg:border-r lg:border-b-0 lg:px-4 lg:py-8">
      <p className="mb-5 hidden px-3 text-sm font-semibold tracking-wide lg:block">FRONTEND ENGINEERING LAB</p>
      {/* Keep navigation visible on compact screens until the modal drawer is implemented. */}
      <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:flex-col">
        {destinations.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={activeSection === id ? 'location' : undefined}
              onClick={(event) => {
                if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
                document.getElementById(id)?.focus({ preventScroll: true })
              }}
              className={`flex min-h-11 items-center rounded-lg border-l-4 px-3 py-2 text-sm ${
                activeSection === id
                  ? 'border-accent bg-selection font-semibold'
                  : 'border-transparent text-muted hover:bg-hover hover:text-foreground'
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Sidebar
