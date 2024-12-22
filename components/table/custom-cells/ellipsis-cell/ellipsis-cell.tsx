import { InfoTooltip } from "@/components/tooltips/info-tooltip/info-tooltip";
import { AnimatePresence } from "motion/react";
import { cn } from "@/utils/styling";
import { useState } from "react";
import Link from "next/link"

import style from "./ellipsis-cell.module.scss"

type EllipsisCellProps = {
  className?: string
  string: string
  url?: string
}

/**
 * Ellipsis Cell
 * @description A cell that displays a hash with an ellipsis in the middle
 * @param props.className - Additional styles
 * @param props.string - Full string
 * @param props.url - URL to link
 */

export function EllipsisCell(props: EllipsisCellProps) {
  const [hovered, setHovered] = useState(false)
  const split = -6
  const front = props.string.slice(0, split)
  const back = props.string.slice(split)


  /** Anchor tags has issue with overflow in the grid when row flex. Apply display: contents to fix. Do not remove. */
  return <div tabIndex={0}
              onFocus={() => setHovered(true)}
              onBlur={() => setHovered(false)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="relative flex justify-center"
  >
    {props.url ? <Link href={props.url} className="contents">
        <div
          className={cn(
            style.ellipsisCell,
            props.url && style.clickable,
            props.className && props.className)}
        >
          <span>{front}</span>
          <span>{back}</span>
        </div>
      </Link> :
      <div
        className={cn(style.ellipsisCell, props.className && props.className)}
      >
        <span>{front}</span>
        <span>{back}</span>
      </div>
    }
    <AnimatePresence>
      {props.url && hovered &&
        <InfoTooltip className="absolute !bottom-[24px]"><p className="text-nowrap">Click to Open</p></InfoTooltip>
      }
    </AnimatePresence>
  </div>
}
