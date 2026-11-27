import { useLayoutEffect, useState, useSyncExternalStore } from 'react'
import type { ReactNode } from 'react'
import { applyTheme, getSystemTheme, readThemePreference, subscribeToSystemTheme, themeStorageKey } from './theme'
import type { ThemePreference } from './theme'
import { ThemeContext } from './useTheme'

const subscribeToExplicitTheme = () => () => {}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [{ preference, persistenceAvailable }, setSelection] = useState(readThemePreference)
  // The device is an external source. React rechecks it when subscribing, including
  // when returning to System after the OS changed during an explicit selection.
  const resolvedTheme = useSyncExternalStore(
    preference === 'system' ? subscribeToSystemTheme : subscribeToExplicitTheme,
    preference === 'system' ? getSystemTheme : () => preference,
  )

  useLayoutEffect(() => {
    applyTheme(resolvedTheme)
  }, [resolvedTheme])

  function setPreference(nextPreference: ThemePreference) {
    let canPersist = true
    try {
      window.localStorage.setItem(themeStorageKey, nextPreference)
    } catch {
      canPersist = false
    }
    setSelection({ preference: nextPreference, persistenceAvailable: canPersist })
  }

  return (
    <ThemeContext.Provider value={{ preference, resolvedTheme, setPreference, persistenceAvailable }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
