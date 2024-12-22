import { Dropdown, DropdownMenuItem } from "@/components/dropdown/dropdown";
import { ChevronDown } from "@/components/icons";
import { AnimatePresence } from "motion/react";
import { useOnClickOutside } from "usehooks-ts";
import { useRef, useState } from "react";
import { cn } from "@/utils/styling";

import style from "./page-limit-button.module.scss"

type PageLimitButtonProps = {
  className?: string
  pageLimit: number
  setPageLimit: Function
}

export function PageLimitButton(props: PageLimitButtonProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const items: DropdownMenuItem[] = [
    { fn: () => props.setPageLimit(25), label: "Show 25 rows per page" },
    { fn: () => props.setPageLimit(50), label: "Show 50 rows per page" },
    { fn: () => props.setPageLimit(100), label: "Show 100 rows per page" },
  ]

  const ref = useRef(null)

  useOnClickOutside(ref, () => setShowDropdown(false))

  return <div
    className={cn(style.pageLimitBtnWrapper, props.className)}
  >
    <button
      ref={ref}
      className={style.pageLimitBtn}
      onClick={() => setShowDropdown(!showDropdown)}
    >
      Show {props.pageLimit} rows per page<ChevronDown className="ml-[8px]" />
    </button>
    <AnimatePresence>
      {showDropdown && <Dropdown items={items} showFn={setShowDropdown} className={style.pageLimitBtnDropdown} />}
    </AnimatePresence>
  </div>
}