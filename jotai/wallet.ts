import { atomWithStorage, createJSONStorage, RESET } from "jotai/utils"
import { decryptData, encryptData } from "@/utils/encryption"
import { atom, useSetAtom } from "jotai"


type Wallet = {
  address: string
  balance: number
  connectedAt: Date
  isConnected: boolean
}

export const userHasBrowserExtensionAtom = atomWithStorage<boolean>("xplorer.browserExtension", false)

export const activeAddressAtom = atomWithStorage<string | undefined>("xplorer.activeAddress", undefined)

// export const permissionAtom = atomWithStorage<boolean | undefined>("xplorer.xperiencePermission", undefined, {
//     getItem(key, initialValue) {
//       const item = JSON.parse(localStorage.getItem(key) || "null")
//       if (!item) return undefined
//       // permission expires after 1min
//       if (item.givenAt + 1000 * 60 < new Date().getTime() || item.userAgent !== navigator.userAgent) {
//         localStorage.removeItem(key)
//         return undefined
//       }
//       return item.value
//     },
//     removeItem(key) {
//       localStorage.removeItem(key)
//     },
//     setItem(key, newValue) {
//       if (newValue === false || newValue === undefined) {
//         localStorage.removeItem(key)
//         return
//       }
//       const givenAt = new Date().getTime()
//       const userAgent = navigator.userAgent
//       const item = { givenAt, userAgent, value: newValue }
//       localStorage.setItem(key, JSON.stringify(item))
//     },
//   },
// )


export const walletAtom = atomWithStorage<undefined | Wallet>("xplorer.wallet", undefined)

type EncryptedDataWithExpiry = {
  givenAt: number
  payload: any
  userAgent: string
}

const permissionAtom = atomWithStorage<string | undefined>("xplorer.p", undefined)

export const encryptedPermissionAtom = atom(
  async (get) => {
    const encryptedData = get(permissionAtom)
    if (!encryptedData) return undefined
    if (!process.env.NEXT_PUBLIC_SECRET) return undefined
    const data = await decryptData(JSON.parse(String(encryptedData)), process.env.NEXT_PUBLIC_SECRET).then((res) => res).catch(() => undefined)
    if (!data) {
      console.log("unable to decrypt")
      return undefined
    }
    const parsedData = JSON.parse(data) as EncryptedDataWithExpiry
    // permission expires after 7 days
    if (parsedData.givenAt + 1000 * 60 * 60 * 24 * 7 < new Date().getTime() || parsedData.userAgent !== navigator.userAgent) {
      console.log("permission expired or user agent changed")
      return undefined
    }
    return data
  },
  async (get, set, payload) => {
    if (!payload || payload === RESET) {
      set(permissionAtom, RESET)
      return
    }
    if (!process.env.NEXT_PUBLIC_SECRET) return
    const givenAt = new Date().getTime()
    const userAgent = navigator.userAgent
    const data = { givenAt, payload, userAgent }
    const encryptedData = await encryptData(JSON.stringify(data), process.env.NEXT_PUBLIC_SECRET)
    set(permissionAtom, JSON.stringify(encryptedData))
    return
  },
)