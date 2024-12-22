"use client"
import {
  burgerMenu2Item, burgerMenu2List,
  burgerMenuItem,
  burgerMenuList,
  burgerWrapper,
} from "@/components/navbar/burger-menu/burger-menu-animations"
import {
  burgerMenuAnimationAtom,
  menuAtom,
  sublistsAtom,
} from "@/components/navbar/burger-menu/burger-menu-state"
import { BurgerMenuItemData } from "@/components/navbar/burger-menu/burger-menu-types"
import { ChevronLeft, ChevronRight } from "@/components/icons"
import { AnimatePresence, motion } from "motion/react"
import { themeUserPreferenceAtom } from "@/jotai/ui"
import { useOnClickOutside } from "usehooks-ts"
import { capitalise } from "@/utils/strings"
import { RESET } from "jotai/vanilla/utils";
import { RefObject, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { networkAtom } from "@/jotai/app"
import { cn } from "@/utils/styling"
import { useAtom } from "jotai"
import { clsx } from "clsx"

import style from "./burger-menu.module.scss"


type BurgerMenuProps = {
  items?: BurgerMenuItemData[]
  navbarRef: RefObject<HTMLDivElement>
  openFn: Function
}


/**
 * Burger Menu
 * @description A burger menu for mobile navigation, consists of multiple menus that transits horizontally, and submenu items that expands vertically
 * @param props.items - Navigation items
 * @param props.navbarRef - Navbar reference
 * @param props.openFn - Function to open/close the menu
 */

export function BurgerMenu(props: BurgerMenuProps) {
  const router = useRouter()
  const [theme, setTheme] = useAtom(themeUserPreferenceAtom)
  const [menu, setMenu] = useAtom(menuAtom)
  const [network, setNetwork] = useAtom(networkAtom)
  const [sublists, setSublists] = useAtom(sublistsAtom)
  /** Note: This state sets how entry and exit animations apply*/
  const [animationSet, setAnimationSet] = useAtom(burgerMenuAnimationAtom)

  function expandSubList(name: string) {
    setSublists(sublists.map(sublist => {
      if (sublist.name === name) {
        return {
          ...sublist,
          isShown: !sublist.isShown,
        }
      }
      return sublist
    }))
  }

  function switchMenu(menu: string) {
    setAnimationSet("switch")
    setMenu(menu)
  }

  const mainMenuItems: BurgerMenuItemData[] = [
    {
      href: "/",
      label: "Home",
    },
    {
      label: "Blockchain",
      subList: [
        {
          href: "/blocks",
          label: "Blocks",
        },
        {
          href: "/transactions",
          label: "Transactions",
        },
        {
          href: "/top-accounts",
          label: "Top Accounts",
        },
        {
          href: "/validators",
          label: "Validators",
        },
        {
          href: "/",
          label: "Verified Contracts",
        },
      ],
    },
    {
      label: "Tokens",
      subList: [
        {
          href: "/token-transfers",
          label: "Token Transfers",
        },
        {
          href: "/top-tokens",
          label: "Top Tokens",
        },
      ],
    },
    {
      href: "/stake",
      label: "Staking",
    },
    {
      label: "Resources",
      subList: [
        {
          href: "/",
          label: "Xplorer Tutorial",
        },
        {
          href: "/",
          label: "Tutorial Documentation",
        },
      ],
    },
    {
      label: "Settings",
      subList: [
        {
          fn: () => switchMenu("theme"),
          icon: <ChevronRight size={20} />,
          label: "Theme",
          mode: theme ? capitalise(theme) : "System Default",
        },
        {
          fn: () => switchMenu("explorer"),
          icon: <ChevronRight size={20} />,
          label: "Explorer",
          mode: network,
        },
      ],
    },
  ]

  const themeMenuItems = [
    {
      fn: () => setTheme(RESET),
      label: "System Default",
      type: "radio",
    },
    {
      fn: () => setTheme("light"),
      label: "Light",
      type: "radio",
    },
    {
      fn: () => setTheme("dark"),
      label: "Dark",
      type: "radio",
    },
  ]

  const explorerMenuItems = [
    {
      fn: () => {
        router.push("/")
        setNetwork("Mainnet")
        props.openFn(false)
      },
      label: "Mainnet",
      type: "radio",
    },
    {
      fn: () => {
        router.push("/testnet")
        setNetwork("Testnet")
        props.openFn(false)
      },
      label: "Testnet",
      type: "radio",
    },
  ]

  useOnClickOutside(props.navbarRef, () => {
    setAnimationSet("open")
    setTimeout(() => props.openFn(false), 100)
  })

  return <div className={style.burgerMenuWrapper}>
    <motion.div
      variants={burgerWrapper}
      className={style.burgerMenuDiv}
      exit={animationSet === "switch" ? "switchExit" : "openExit"}
      animate={animationSet === "switch" ? "switchAnimate" : "openAnimate"}
      initial={animationSet === "switch" ? "switchInitial" : "openInitial"}
    >
      {
        menu === "main" && <motion.div
          variants={burgerMenuList}
          className={style.scrollFadeDiv}
        />
      }
      <motion.nav className={style.burgerMenuNav}>
        <AnimatePresence>
          {/** Main Menu */}
          {menu === "main" ? <motion.ul
              variants={burgerMenuList}
              className={style.burgerMenuList}
            >
              {mainMenuItems.map((item, index) => {
                return <motion.li
                  key={index}
                  variants={burgerMenuItem}
                  className={clsx(
                    style.burgerMenuItem,
                    sublists.find(sublist => sublist.name === item.label)?.isShown && style.subListIsShown,
                  )}
                  {...(item.fn && { onClick: item.fn })}
                  {...item.href && {
                    onClick: () => {
                      if (item.href) {
                        router.push(item.href)
                        props.openFn(false)
                      }
                    },
                  }}
                >
                  <div className={style.backing} />
                  <div
                    className={style.labelDiv}
                    {...item.subList && {
                      onClick: () => {
                        expandSubList(item.label)
                      },
                    }}
                  >
                    {item.label}
                    {item.subList && <ChevronDown size={20} className={style.subListChevron} />}
                  </div>
                  {
                    item.subList && <BurgerMenuSubList
                      items={item.subList}
                      menuOpenFn={props.openFn}
                      isShown={sublists.find(sublist => sublist.name === item.label)?.isShown}
                    />
                  }
                </motion.li>
              })}
            </motion.ul> :
            menu === "theme" ? <motion.ul
                variants={burgerMenu2List}
                className={cn(
                  style.burgerMenuList,
                  style.shown,
                )}
              >
                <motion.li
                  variants={burgerMenu2Item}
                  className="flex justify-between pl-[20px] pr-[24px]"
                >
                  <div onClick={() => switchMenu("main")} className="cursor-pointer flex w-[20px]">
                    <ChevronLeft size={20} />
                  </div>
                  <p className="font-[500] text-[15px]">Theme</p>
                  <div />
                </motion.li>
                {themeMenuItems.map((item, index) => {
                  return <motion.li
                    key={index}
                    variants={burgerMenu2Item}
                    className={style.burgerMenuItem}
                    {...item.fn && { onTap: item.fn }}
                  >
                    <div className={cn(style.labelDiv, "!pl-[24px] !pr-[20px]")}>
                      <label>{item.label}</label>
                      <input
                        type="radio"
                        className={style.radio}
                        {...theme === item.label.toLowerCase() ? { checked: true } :
                          theme === undefined && item.label === "System Default" ? { checked: true } : { checked: false }
                        }
                      />
                    </div>
                  </motion.li>
                })}
              </motion.ul> :
              menu === "explorer" && <motion.ul
                variants={burgerMenu2List}
                className={cn(
                  style.burgerMenuList,
                  style.shown,
                )}
              >
                <motion.li
                  variants={burgerMenu2Item}
                  className="flex justify-between pl-[20px] pr-[24px]"
                >
                  <div onClick={() => switchMenu("main")} className="cursor-pointer w-[20px]">
                    <ChevronLeft size={20} />
                  </div>
                  <p className="font-[500] text-[15px]">
                    Explorer
                  </p>
                  <div />
                </motion.li>
                {explorerMenuItems.map((item, index) => {
                  return <motion.li
                    key={index}
                    variants={burgerMenu2Item}
                    className={style.burgerMenuItem}
                    {...item.fn && { onClick: item.fn }}
                  >
                    <div className={cn(style.labelDiv, "!pl-[24px] !pr-[20px]")}>
                      <label>{item.label}</label>
                      <input
                        type="radio"
                        className={style.radio}
                        {...network.toLowerCase() === item.label.toLowerCase() ? { checked: true } : { checked: false }}
                      />
                    </div>
                  </motion.li>
                })}
              </motion.ul>
          }

        </AnimatePresence>

      </motion.nav>
    </motion.div>
  </div>
}

type BurgerMenuSubListProps = {
  isShown?: boolean | undefined
  items: BurgerMenuItemData[],
  menuOpenFn: Function
}

export function BurgerMenuSubList(props: BurgerMenuSubListProps) {
  const router = useRouter()

  return <AnimatePresence>
    {
      props.isShown &&
      <motion.ul
        // variants={burgerMenuSubList}
        className={clsx(
          style.burgerMenuSubList,
        )}
      >
        {
          props.items.map((item, index) => {
            return <motion.li
              key={index}
              // variants={burgerMenuSubItem}
              className={style.burgerMenuSubItem}
              {...item.fn && { onClick: item.fn }}
              {...item.href && {
                onClick: (ev) => {
                  router.push(item.href as string)
                  props.menuOpenFn(false)
                },
              }}
            >
              <div className={style.labelDiv}>
                <label>
                  {item.label}
                </label>
                <div className="flex justify-center items-center">
                  {item.mode && <span className={style.mode}>{item.mode}</span>}
                  {item.icon && item.icon}
                </div>
              </div>
            </motion.li>
          })
        }
      </motion.ul>
    }
  </AnimatePresence>
}