import { useId } from 'react'
import { useTheme } from '../../theme/useTheme'

function ThemeSelector() {
  const descriptionId = useId()
  const { preference, resolvedTheme, setPreference, persistenceAvailable } = useTheme()

  return (
    <div className="self-start sm:shrink-0 sm:self-auto">
      <div
        role="group"
        aria-label="Theme"
        className="inline-flex gap-1 rounded-full border border-control bg-background p-1"
      >
        {(['light', 'dark'] as const).map((theme) => (
          <button
            key={theme}
            type="button"
            aria-pressed={resolvedTheme === theme}
            aria-describedby={descriptionId}
            onClick={() => setPreference(theme)}
            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm ${
              resolvedTheme === theme
                ? 'border-accent bg-selection font-semibold text-foreground'
                : 'border-transparent text-muted hover:bg-hover hover:text-foreground'
            }`}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 shrink-0"
            >
              {theme === 'light' ? (
                <>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
                </>
              ) : (
                <path d="M20.9 13.1A9 9 0 0 1 10.9 3.1a9 9 0 1 0 10 10Z" />
              )}
            </svg>
            {theme === 'light' ? 'Light' : 'Dark'}
          </button>
        ))}
      </div>
      <p
        id={descriptionId}
        className={persistenceAvailable ? 'sr-only' : 'mt-2 max-w-60 text-sm text-muted'}
        aria-live="polite"
      >
        {!persistenceAvailable
          ? 'Unable to save preference; applies to this session.'
          : preference === 'system'
            ? 'Following system appearance. Choose Light or Dark to override.'
            : `${resolvedTheme === 'dark' ? 'Dark' : 'Light'} appearance selected.`}
      </p>
    </div>
  )
}

export default ThemeSelector
