"use client"
import { FloatingPortal, offset, shift, useFloating } from "@floating-ui/react";
import { AnimatePresence } from "motion/react"
import { ReactNode, useState } from "react"
import { Info } from "@/components/icons"
import clsx from "clsx"

type InfoButtonProps = {
  children?: ReactNode
  className?: string
  fromBottom?: boolean
  tooltipClassName?: string
}

/**
 * Button that shows a tooltip with additional information when hovered
 * @param props.children - Takes in tooltip component
 * @param props.className - Styling of the button
 */

export function TooltipButton(props: InfoButtonProps) {
  const [showInfo, setShowInfo] = useState(false)

  const { floatingStyles, refs } = useFloating({
    middleware: [
      offset(8),
      shift(),
    ],
    onOpenChange: setShowInfo,
    open: showInfo,
    placement: props.fromBottom ? "bottom" : "top",
  })

  return <>
    <div
      tabIndex={0}
      ref={refs.setReference}
      onFocus={() => setShowInfo(true)}
      onBlur={() => setShowInfo(false)}
      onMouseOver={() => setShowInfo(true)}
      onMouseOut={() => setShowInfo(false)}
      className={clsx("relative flex justify-center", props.className)}
    >
      <span className="hover:text-[var(--accent-primary)]">
      <Info />
    </span>
    </div>
    <AnimatePresence>
      {showInfo &&
        <FloatingPortal>
          <div className="z-[100]" ref={refs.setFloating} style={floatingStyles}>
            {props.children}
            </div>
        </FloatingPortal>
      }
    </AnimatePresence>
  </>
}