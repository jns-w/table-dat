"use client"
import { SkeletonBlock } from "@/components/skeletons/text-block-skeleton/skeleton-block"
import { themeUserPreferenceAtom } from "@/jotai/ui"
import { useCallback, useEffect } from "react"
import { Moon, Sun } from "@/components/icons"
import { useAtom } from "jotai"

import style from "./theme-toggle-button.module.scss"

/**
 * Theme Toggle Button
 * Note: when switching theme, we add a class to the body temporarily to hide css transitions
 */

export function ThemeToggleButton() {
  const [themeUserPreference, setThemeUserPreference] = useAtom(themeUserPreferenceAtom)

  const toggleTheme = useCallback(() => {
    // if (!themeUserPreference) {
      // const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      // setThemeUserPreference(systemTheme)
    // }
    // theme defaults to light
    setThemeUserPreference(themeUserPreference === "light" || undefined ? "dark" : "light")
  }, [themeUserPreference, setThemeUserPreference])

  function setThemeAttribute(theme: string) {
    document.body.classList.add("noTransitions")
    document.documentElement.setAttribute("data-theme", theme)
    setTimeout(() => {
      document.body.classList.remove("noTransitions")
    }, 100)
  }

  useEffect(() => {
    // if theme is not defined, we check for the system theme and set data-theme accordingly
    // we do not touch user preference atom, so that the user can still toggle the theme later
    if (!themeUserPreference) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      setThemeAttribute(systemTheme)
      return;
    }
    setThemeAttribute(themeUserPreference)
  }, [themeUserPreference])

  return <button
    onClick={toggleTheme}
    className={style.themeToggleBtn}
  >
      {
        themeUserPreference === "light" ?
          <Moon size={18} /> : <Sun size={18} />
      }
  </button>
}

export function ThemeToggleButtonSkeleton() {
  return <SkeletonBlock className="min-h-[20px] min-w-[20px] !rounded-full" />
}