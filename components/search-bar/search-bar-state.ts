import { atomWithStorage } from "jotai/utils"
import { atom } from "jotai/index"

export type InputState = {
  display: string
  input: string
}

export const inputStateAtom = atom<InputState>({
  display: "",
  input: "",
})

export const highlightedSuggestionAtom = atom<null | number>(null)

export const searchHistoryAtom = atomWithStorage<string[]>("xplorer.searchHistory", [
  "9NK8lCsbuJtcnLxnXzmPH12RnfOOhDCLxvf5hqa6UWk",
  "m-vBvskS9B_MyAj9Mp0HLMX1mGj71gcwI7_OMOneDeY",
  "_G2mANINJZUIdukS6B3zZ43st9HDe3HjShgJOUNMiAc",
  "ILDrzBVvVRqhLNGsE7eJJW7KA4vLU20fKWL8oZbS8Gs",
  "uSPGT6Rit6TCDCvWA6B5LJMq72jTaklNM2gtaFjlo6Q",
])
