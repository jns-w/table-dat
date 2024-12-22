"use client"
import { tooltipContentMotionProps, tooltipMotionProps } from "@/components/tooltips/tooltip.motion"
import { ReactNode, useRef } from "react"
import { motion } from "motion/react"
import { cn } from "@/utils/styling"

import style from "./info-tooltip.module.scss"

type InfoTooltipProps = {
  children?: ReactNode
  className?: string
  exitDelay?: number
  fromBottom?: boolean
  overflowOffsetClassName?: string
}

/**
 * Tooltip component that shows additional information
 * - default alignment is center of parent element
 * - checks on screen overflow are done and offsets the position accordingly to offset class
 * @param props.children - ReactNode
 * @param props.className - style
 * @param props.fromBottom - sets the tooltip to appear from the bottom
 * @param props.overflowOffsetClassName - applies class if the tooltip is overflowing
 */

export function InfoTooltip(props: InfoTooltipProps) {
  const ref = useRef<HTMLDivElement>(null)

  return <motion.div
    ref={ref}
    {...tooltipMotionProps}
    className={cn(
      style.infoTooltipDiv,
      props.className,
      props.fromBottom && "top-[20px]",
    )}
  >
    <motion.div
      {...tooltipContentMotionProps}
    >
      {props.children}
    </motion.div>
  </motion.div>
}