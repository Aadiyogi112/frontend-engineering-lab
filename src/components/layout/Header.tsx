import ThemeSelector from './ThemeSelector'

function Header() {
  return (
    <header className="border-b border-subtle bg-surface px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="mb-2 text-sm font-medium text-muted">Performance Command Center</p>
          <h1 className="text-2xl leading-8 font-semibold tracking-tight lg:text-[28px] lg:leading-9">
            Financial Transaction Performance Lab
          </h1>
        </div>
        <ThemeSelector />
      </div>
    </header>
  )
}

export default Header
