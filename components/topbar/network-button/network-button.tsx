"use client"

import { SkeletonBlock } from "@/components/skeletons/text-block-skeleton/skeleton-block"
import { useEffect, useMemo, useRef, useState } from "react"
import { Dropdown } from "@/components/dropdown/dropdown"
import { ChevronDown } from "@/components/icons"
import { AnimatePresence } from "motion/react"
import { useOnClickOutside } from "usehooks-ts"
import { useRouter } from "next/navigation"
import { networkAtom } from "@/jotai/app"
import { useAtom } from "jotai"
import clsx from "clsx";

import style from "./network-button.module.scss"

/**
 * Network Button Component with modes:
 * - Mainnet
 * - Testnet
 */

export function NetworkButton() {
  const [network, setNetwork] = useAtom(networkAtom)
  const [showDropdown, setShowDropdown] = useState(false)
  const [indicateUpdate, setIndicateUpdate] = useState(false)

  const router = useRouter()

  const ref = useRef<HTMLButtonElement>(null)

  useOnClickOutside(ref, () => setShowDropdown(false))

  const dropdownItems = useMemo(() => [
    {
      fn: () => {
        setNetwork("Mainnet")
        // setShowDropdown(false)
        router.push("/")
      }, label: "Mainnet",
    },
    {
      fn: () => {
        setNetwork("Testnet")
        // setShowDropdown(false)
        router.push("/testnet")
      }, label: "Testnet",
    },
  ], [router, setNetwork])

  useEffect(() => {
    setIndicateUpdate(true)
    setTimeout(() => {
      setIndicateUpdate(false)
    }, 400)
  }, [network])

  return <div className={style.networkButtonWrapper}>
    <button
      ref={ref}
      className={style.networkButton}
      onClick={() => setShowDropdown(prevState => !prevState)}
    >
      {network === "Mainnet" ? "Mainnet" : "Testnet"}
      <ChevronDown
        size={16}
        strokeWidth={2}
        className={clsx(
          style.chevron,
          showDropdown && style.opened,
        )}
      />
    </button>
    <AnimatePresence>
      {showDropdown && <Dropdown
        items={dropdownItems}
        currentItem={network}
        showFn={setShowDropdown}
        className={style.networkDropdown} />}
    </AnimatePresence>
  </div>
}

export function NetworkButtonSkeleton() {
  return <SkeletonBlock className="min-w-[161px] min-h-[42px] !rounded-[var(--standard-radius)]" />
}