import { atomWithStorage, createJSONStorage } from "jotai/utils"
import { atom } from "jotai";

type Notification = {
  description?: string
  title?: string
  type?: "failed" | "success"
  visible: boolean
}

// const cookieStorage = createJSONStorage(() => {
//   return {
//     getItem: (key: string) => Cookies.get(key),
//     removeItem: (key: string) => Cookies.remove(key),
//     setItem: (key: string, value: string) => Cookies.set(key, value)
//   }
// })

export const themeUserPreferenceAtom = atomWithStorage<"dark" | "light" | undefined>("td.theme", undefined)

export const notificationAtom = atom<Notification>({
  description: undefined,
  title: undefined,
  type: undefined,
  visible: false
})
