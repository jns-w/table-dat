import { MouseEventHandler, ReactNode } from "react"
import { motion } from "motion/react"
import { cn } from "@/utils/styling"

import style from "./search-filter-dropdown.module.scss"

type DropdownProps = {
  children?: ReactNode
  className?: string,
  currentItem?: string,
  items: DropDownMenuItem[],
  showFn: Function,
}

export type DropDownMenuItem = {
  fn?: MouseEventHandler
  label: string,
}

/**
 * Dropdown Component
 * @description Displays a dropdown menu through passed in items from props
 * @param props.items - DropDownMenuItem[]
 * @param props.showFn - Function
 * @param props.currentItem - string
 */

export function SearchFilterDropdown(props: DropdownProps) {

  function handleItemClick(fn: Function | undefined) {
    if (fn) {
      fn()
      props.showFn(false)
    }
  }

  return <div
    className={cn("absolute top-0 right-0")}>
    <motion.ul
      exit={{
        opacity: 0,
        scale: .9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      initial={{
        opacity: 0,
        scale: .95,
      }}
      className={cn(
        props.className,
        style.dropdownContainer)}
      transition={{
        duration: .15,
        scale: {
          duration: .05,
          type: "easeOut",
        },
      }}
    >
      {props.items.map(el => {
        return (
          <li
            key={el.label}
            onClick={() => handleItemClick(el.fn)}
            className={cn(
              style.dropdownItem,
              props.currentItem === el.label && style.current,
            )}
          >
            {el.label}
          </li>
        )
      })}
    </motion.ul>
  </div>
}
