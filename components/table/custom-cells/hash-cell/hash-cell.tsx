"use client"

import type { ShortenHashOptions } from "@/utils/strings"

import { HashTooltip } from "@/components/tooltips/hash-tooltip/hash-tooltip"
import { CopyButton } from "@/components/buttons/copy-button/copy-button"
import { ReactNode, useRef, useState } from "react"
import { AnimatePresence } from "motion/react"
import { useEventListener } from "usehooks-ts"
import { shortenHash } from "@/utils/strings"
import { cn } from "@/utils/styling";
import Link from "next/link"

import style from "./hash-cell.module.scss"

type HashCellProps = {
  children?: ReactNode
  className?: string
  displayString?: string
  hash: string
  hasTooltip?: boolean
  shortenHashOptions?: ShortenHashOptions
  url?: string
  withCopyButton?: boolean
}

/**
 * Hash Cell
 * @description A cell that displays a hash with a tooltip and copy button
 * @param props.className - Additional styles
 * @param props.displayString - The string to display
 * @param props.hash - The hash to display
 * @param props.hasTooltip - Whether to show the tooltip
 * @param props.shortenHashOptions - Options for shortening the hash
 * @param props.url - The URL to link to
 * @param props.withCopyButton - Whether to show the copy button
 */

export function HashCell(props: HashCellProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  useEventListener("mouseover", (event) => {
    setShowTooltip(true)
  }, ref)
  useEventListener("mouseout", (event) => {
    setShowTooltip(false)
  }, ref)

  // If displayString is not provided, shorten the hash
  // If shortenHashOptions are not provided, show the first and last 8 characters

  const displayString = props.displayString ? props.displayString : shortenHash(props.hash, { ...(props.shortenHashOptions ? props.shortenHashOptions : { showFirstAndLast: 8 }) })

  return <div
    ref={ref}
    className={cn(style.hashCellDiv, props.className)}
  >
    <div className={style.textWrapper}>
      {
        props.url ? <Link href={props.url}>{displayString}</Link> : displayString
      }
    </div>
    {
      props.withCopyButton &&
      <CopyButton size={16} textToCopy={props.hash} className="text-[var(--text-mild)] ml-[8px]" />
    }
    <AnimatePresence>
      {(showTooltip && props.hasTooltip) && <HashTooltip>{props.hash}</HashTooltip>}
    </AnimatePresence>
  </div>
}