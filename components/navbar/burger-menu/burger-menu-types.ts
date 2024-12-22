import { ReactNode } from "react"

export type BurgerMenuItemData = {
  fn?: () => void
  href?: string
  icon?: ReactNode | string
  label: string
  mode?: string
  subList?: BurgerMenuItemData[]
}