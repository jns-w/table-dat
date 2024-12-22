import { TooltipButton } from "@/components/buttons"
import { ReactNode } from "react"
import { clsx } from "clsx"

import style from "./header-cell.module.scss"

type HeaderCellProps = {
  className?: string
  fn?: Function
  header?: ReactNode | string
  tooltipClassName?: string
  tooltipContent?: ReactNode
}

export function HeaderCell(props: HeaderCellProps) {

  function handleHeaderClick() {
    if (props.fn) {
      props.fn()
    }
  }

  return <div className={clsx(style.headerCellDiv, props.className)}>
    {props.header && <span onClick={handleHeaderClick}>{props.header}</span>}
    {props.tooltipContent && <TooltipButton fromBottom tooltipClassName={props.tooltipClassName}>
      {props.tooltipContent}
    </TooltipButton>}
  </div>
}
