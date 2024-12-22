import { animate, motion, useAnimate, useMotionValue, useSpring } from "motion/react"
import { tooltipMotionProps } from "@/components/tooltips/tooltip.motion"
import { ReactNode, useEffect, useRef, useState } from "react"
import { Copy } from "lucide-react"

import style from "./hash-tooltip.module.scss"

type TooltipProps = {
  children?: ReactNode
}

/**
 * Tooltip that shows a hash and allows the user to copy it
 * @param props.children - ReactNode
 */

export function HashTooltip(props: TooltipProps) {
  const ref = useRef<HTMLDivElement>(null)


  return <motion.div
    ref={ref}
    {...tooltipMotionProps}
    className={style.container}
  >
    <motion.div
      className="flex gap-2"
    >
      {props.children}
      <Copy size={15} className="cursor-pointer" />
    </motion.div>
  </motion.div>
}