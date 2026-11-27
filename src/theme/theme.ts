export type ThemePreference = 'system' | 'light' | 'dark'
export type ResolvedTheme = 'light' | 'dark'

export const themeStorageKey = 'financial-lab.theme'
const darkModeQuery = '(prefers-color-scheme: dark)'

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === 'system' || value === 'light' || value === 'dark'
}

// Keep these fallback rules aligned with the pre-paint bootstrap in index.html.
export function readThemePreference(): { preference: ThemePreference; persistenceAvailable: boolean } {
  try {
    const saved = window.localStorage.getItem(themeStorageKey)
    return { preference: isThemePreference(saved) ? saved : 'system', persistenceAvailable: true }
  } catch {
    return { preference: 'system', persistenceAvailable: false }
  }
}

export function getSystemTheme(): ResolvedTheme {
  try {
    return window.matchMedia(darkModeQuery).matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function subscribeToSystemTheme(onChange: () => void): () => void {
  try {
    const media = window.matchMedia(darkModeQuery)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  } catch {
    return () => {}
  }
}

export function applyTheme(theme: ResolvedTheme) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}
