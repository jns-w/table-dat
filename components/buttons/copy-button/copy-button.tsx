import { Check, Copy } from "@/components/icons"
import { useState } from "react"
import clsx from "clsx"

import style from "./copy-button.module.scss"

type CopyButtonProps = {
  className?: string
  fn?: () => void
  size?: number
  textToCopy?: string
}

/**
 * This component is a button that copies the content of the input field to the clipboard
 * by default it copies the text passed as props.textToCopy
 * and shows a check icon when the text is copied
 *
 * @param props
 *  className: string
 *  fn: () => void
 *  textToCopy: string
 */

export function CopyButton(props: CopyButtonProps) {
  const [showCopied, setShowCopied] = useState(false)

  async function copyToClipboard(text: string) {
    const clipboardItem = new ClipboardItem({ "text/plain": new Blob([text], { type: "text/plain" }) })
    await navigator.clipboard.write([clipboardItem])
    setShowCopied(true)
    setTimeout(() => {
      setShowCopied(false)
    }, 2000)
  }

  return <button
    className={
      clsx(style.copyButton,
        props.className,
        showCopied && style.showCopied,
      )}
    onClick={async () => {
      if (props.fn) {
        props.fn()
      } else if (props.textToCopy) {
        await copyToClipboard(props.textToCopy)
      }
    }}
  >
    <Copy size={props.size} className={style.copyIcon} />
    <Check size={props.size} className={style.checkIcon} />
  </button>
}