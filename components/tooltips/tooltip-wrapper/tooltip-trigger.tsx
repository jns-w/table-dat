"use client"
import { arrow, FloatingArrow, FloatingPortal, offset, shift, useFloating } from "@floating-ui/react"
import { AnimatePresence } from "motion/react";
import { ReactNode, useRef, useState } from "react"
import { cn } from "@/utils/styling"

type TooltipWrapperProps = {
  allowTooltipHover?: boolean
  children: ReactNode
  className?: string
  fromBottom?: boolean
  tabIndex?: number
  tooltipContent: ReactNode | string
}

/**
 * Tooltip Trigger Component
 * @description Wrapper component that shows a tooltip when hovered
 * @param props.children - ReactNode
 * @param props.className - string
 * @param props.fromBottom - boolean
 * @param props.tabIndex - number
 * @param props.tooltipContent - ReactNode | string
 * @param props.allowTooltipHover - boolean (keeps tooltip open when hovered)
 */

export function TooltipTrigger(props: TooltipWrapperProps) {
  const [isHovered, setIsHovered] = useState(false)

  const { context, floatingStyles, refs } = useFloating({
    middleware: [
      offset(8),
      shift(),
    ],
    onOpenChange: setIsHovered,
    open: isHovered,
    placement: props.fromBottom ? "bottom" : "top",
  })

  return <>
    <div
      ref={refs.setReference}
      tabIndex={props.tabIndex}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("relative flex justify-center", props.className)}>
      {props.children}

      {/* Tooltip is within hover detection - allows user to interact with tooltip */}
      {
        props.allowTooltipHover &&
        <AnimatePresence>
          {isHovered && <FloatingPortal>
            <div className="z-[100]" ref={refs.setFloating} style={floatingStyles}>
              {props.tooltipContent}
            </div>
          </FloatingPortal>}
        </AnimatePresence>
      }
    </div>
    {/** Tooltip is outside of hover detection - closes when cursor moves to tooltip */}
    {!props.allowTooltipHover && <AnimatePresence>
      {isHovered &&
        <FloatingPortal>
          <div className="z-[100]" ref={refs.setFloating} style={floatingStyles}>
            {props.tooltipContent}
          </div>
        </FloatingPortal>
      }
    </AnimatePresence>
    }
  </>
}