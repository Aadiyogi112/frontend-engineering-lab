import { createContext, useContext } from 'react'
import type { ResolvedTheme, ThemePreference } from './theme'

interface ThemeContextValue {
  preference: ThemePreference
  resolvedTheme: ResolvedTheme
  setPreference: (preference: ThemePreference) => void
  persistenceAvailable: boolean
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function useTheme() {
  const theme = useContext(ThemeContext)
  if (!theme) throw new Error('useTheme must be used within a ThemeProvider')
  return theme
}
