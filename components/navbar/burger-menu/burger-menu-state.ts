import { BurgerMenuAnimationSets } from "@/components/navbar/burger-menu/burger-menu-animations";
import { atom } from "jotai/index"

type SublistState = {
  isShown: boolean
  name: string
}

export const burgerMenuIsOpenAtom = atom<boolean>(false)

export const menuAtom = atom("main")

export const sublistsAtom = atom<SublistState[]>([
    {
      isShown: false,
      name: "Blockchain",
    },
    {
      isShown: false,
      name: "Tokens",
    },
    {
      isShown: false,
      name: "Resources",
    },
    {
      isShown: false,
      name: "Settings",
    },
  ])

export const burgerMenuAnimationAtom = atom<BurgerMenuAnimationSets>("open")