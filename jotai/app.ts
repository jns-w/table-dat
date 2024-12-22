import { atomWithStorage } from "jotai/utils"

type Network = "Mainnet" | "Testnet"

type ViewingOptions = {
  timeOption: "age" | "utc"
}

export const networkAtom = atomWithStorage<Network>("xplorer.network", "Mainnet")

export const viewingOptionsAtom = atomWithStorage<undefined | ViewingOptions>("xplorer.viewingOptions", undefined)