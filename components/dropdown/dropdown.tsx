import { MouseEventHandler, ReactNode } from "react"
import { motion } from "motion/react"
import { clsx } from "clsx"

import style from "./dropdown.module.scss"

type DropdownProps = {
  children?: ReactNode
  className?: string,
  currentItem?: string,
  items: DropdownMenuItem[],
  pathname?: string,
  showFn: Function,
}

export type DropdownMenuItem = {
  fn?: MouseEventHandler
  href?: string,
  label: string,
}

/**
 * Dropdown Component
 * @description Displays a dropdown menu through passed in items from props
 * @param props.items - DropDownMenuItem[]
 * @param props.showFn - Function
 * @param props.currentItem - string
 * @param props.pathname - string to match with href and set current item
 */

export function Dropdown(props: DropdownProps) {

  function handleItemClick(fn: Function | undefined) {
    if (fn) {
      fn()
      props.showFn(false)
    }
  }

  return <div 
    className={clsx("absolute w-full top-0 left-0")}>
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
      className={clsx(
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
            className={clsx(
              style.dropdownItem,
              props.currentItem === el.label && style.current,
              el.href && props.pathname === el.href && style.current,
            )}
          >
            {el.label}
          </li>
        )
      })}
    </motion.ul>
  </div>
}