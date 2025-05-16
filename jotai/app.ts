import { atomWithStorage } from "jotai/utils"

type Network = "Mainnet" | "Testnet"

type ViewingOptions = {
  timeOption: "age" | "utc"
}

export const networkAtom = atomWithStorage<Network>("td.network", "Mainnet")

export const viewingOptionsAtom = atomWithStorage<undefined | ViewingOptions>("td.viewingOptions", undefined)