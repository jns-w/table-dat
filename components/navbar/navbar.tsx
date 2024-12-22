"use client"
import { burgerMenuAnimationAtom, burgerMenuIsOpenAtom } from "@/components/navbar/burger-menu/burger-menu-state"
import { BurgerMenu } from "@/components/navbar/burger-menu/burger-menu"
import { Dropdown } from "@/components/dropdown/dropdown"
import { usePathname, useRouter } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { themeUserPreferenceAtom } from "@/jotai/ui"
import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "@/components/icons"
import { cn } from "@/utils/styling";
import { useAtom } from "jotai"
import Image from "next/image"
import Link from "next/link"
import { clsx } from "clsx"

import style from "./navbar.module.scss"


export function Navbar() {
  const [theme] = useAtom(themeUserPreferenceAtom)
  const [blockchainDropdown, setBlockchainDropdown] = useState(false)
  const [resourcesDropdown, setResourcesDropdown] = useState(false)
  const [tokenDropdown, setTokenDropdown] = useState(false)
  const [burgerMenuIsOpen, setBurgerMenuIsOpen] = useAtom(burgerMenuIsOpenAtom)
  const [burgerMenuAnimation, setBurgerMenuAnimation] = useAtom(burgerMenuAnimationAtom)

  const router = useRouter()
  const pathname = usePathname()
  console.log("pathname", pathname)
  const navbarRef = useRef<HTMLDivElement>(null)

  const blockchainDropdownItems = [
    {
      fn: () => router.push("/blocks"),
      href: "/blocks",
      label: "Blocks",
    },
    {
      fn: () => router.push("/transactions"),
      href: "/transactions",
      label: "Transactions",
    },
  ]

  /** these paths should highlight nav item as well (even though they are not in the list aboe) */
  const blockchainAdditionalPathnames = ["/block", "/transaction"]

  const tokenDropdownItems = [
    {
      href: "/",
      label: "Token Transfers",
    },
    {
      href: "/",
      label: "Top Tokens",
    },
  ]

  const resourcesDropdownItems = [
    {
      href: "/",
      label: "Tutorial",
    },
    {
      href: "/",
      label: "Docs",
    },
  ]

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 })
    // lock scroll when burger menu is open
    if (burgerMenuIsOpen) {
      document.body.classList.add("noScroll")
    } else {
      document.body.classList.remove("noScroll")
    }
  }, [burgerMenuIsOpen])

  return (
    <div ref={navbarRef} className={style.navBarWrapper}>
      <div className={style.navBarDiv}>
        <Link href="/" className={
          cn(
            style.logo,
            style.shown
          )}>
          <Image alt="" width={40} height={40}
                 src={theme === "dark" ? "/logos/c-logo.svg" : "/logos/c-logo.svg"}
          />
        </Link>
        <div className="gap-[16px] h-full flex items-center">
          <nav className={style.nav}>
            <button
              className={style.navItem}
              onClick={() => router.push("/")}
            >
              Home
            </button>
            <button
              onClick={() => setBlockchainDropdown(true)}
              onMouseEnter={() => setBlockchainDropdown(true)}
              onMouseLeave={() => setBlockchainDropdown(false)}
              className={cn(
                style.navItem,
                blockchainDropdown && "text-[var(--accent-primary)]",
                blockchainDropdownItems.some(item => item.href === pathname) && "text-[var(--accent-primary)]",
                blockchainAdditionalPathnames.some(item => pathname.indexOf(item) > -1) && "text-[var(--accent-primary)]",
              )}
            >
              Blockchain
              <ChevronDown
                size={16}
                className={clsx(
                  style.chevron,
                  blockchainDropdown && style.opened,
                )}
              />
              <AnimatePresence>
                {
                  blockchainDropdown &&
                  <Dropdown
                    pathname={pathname}
                    className={style.navDropdown}
                    showFn={setBlockchainDropdown}
                    items={blockchainDropdownItems}
                  />
                }
              </AnimatePresence>
            </button>
            <button
              onClick={() => setTokenDropdown(true)}
              onMouseEnter={() => setTokenDropdown(true)}
              onMouseLeave={() => setTokenDropdown(false)}
              className={clsx(
                style.navItem,
                tokenDropdown && "text-[var(--accent-primary)]")}
            >
              Tokens
              <ChevronDown
                size={16}
                className={clsx(
                  style.chevron,
                  tokenDropdown && style.opened,
                )} />
              <AnimatePresence>
                {tokenDropdown &&
                  <Dropdown
                    showFn={setTokenDropdown} items={tokenDropdownItems}
                    className={style.navDropdown} />}
              </AnimatePresence>
            </button>
            <button
              onClick={() => setResourcesDropdown(true)}
              onMouseEnter={() => setResourcesDropdown(true)}
              onMouseLeave={() => setResourcesDropdown(false)}
              className={clsx(
                style.navItem,
                resourcesDropdown && "text-[var(--accent-primary)]")}
            >
              Resources
              <ChevronDown
                size={16}
                className={clsx(
                  style.chevron,
                  resourcesDropdown && style.opened,
                )}
              />
              <AnimatePresence>
                {resourcesDropdown &&
                  <Dropdown className={style.navDropdown} showFn={setResourcesDropdown}
                            items={resourcesDropdownItems} />}
              </AnimatePresence>
            </button>
          </nav>

          <div className="flex gap-1">
            {/*<AccountButton />*/}
            <motion.button
              // onClick={() => setBurgerMenuIsOpen(prevState => !prevState)}
              className={clsx(
                style.hamburger,
                burgerMenuIsOpen && style.opened,
              )}
              onClick={() => {
                setBurgerMenuAnimation("open")
                setTimeout(() => {
                  setBurgerMenuIsOpen(prevState => !prevState)
                }, 100)
              }}>
              <div className={style.line} />
              <div className={style.line} />
              <div className={style.line} />
            </motion.button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {burgerMenuIsOpen && <BurgerMenu navbarRef={navbarRef} openFn={setBurgerMenuIsOpen} />}
      </AnimatePresence>
    </div>
  )
}