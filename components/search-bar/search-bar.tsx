"use client"
import { SearchFilterDropdown } from "@/components/search-bar/search-filter-dropdown/search-filter-dropdown"
import { SearchSuggestions } from "@/components/search-bar/search-suggestions/search-suggestions"
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react"
import { inputStateAtom, searchHistoryAtom } from "@/components/search-bar/search-bar-state"
import { useDebounceValue, useEventListener, useOnClickOutside } from "usehooks-ts"
import { DropdownMenuItem } from "@/components/dropdown/dropdown"
import { AnimatePresence, motion } from "motion/react"
import { Close, Search } from "@/components/icons"
import { useAtom } from "jotai"
import { clsx } from "clsx"

import style from "./search-bar.module.scss"

type SearchBarProps = {
  hideFilters?: boolean
}

export type FiltersOpts = "Addresses" | "All" | "Blocks" | "Transactions"

/**
 * Search Bar Component
 * @param props.hideFilters - boolean
 */

export function SearchBar(props: SearchBarProps) {
  const [filtersDropdown, setFiltersDropdown] = useState(false)
  const [searchFilter, setSearchFilter] = useState<FiltersOpts>("All")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [inputState, setInputState] = useAtom(inputStateAtom)
  const [inputIsFocused, setInputIsFocused] = useState(false)
  const [debouncedInput, setDebouncedInput] = useDebounceValue("", 300)
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

  const [autocompletes, setAutocompletes] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const searchBarAndSuggestionsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEventListener("focusin", () => setInputIsFocused(true), inputRef)

  useOnClickOutside(searchBarAndSuggestionsRef, () => setInputIsFocused(false))


  const handleFilterClick = useCallback((filter: FiltersOpts) => {
    setSearchFilter(filter)
    setFiltersDropdown(false)
  }, [])

  const filters: DropdownMenuItem[] = [
    { fn: () => handleFilterClick("All"), label: "All" },
    { fn: () => handleFilterClick("Addresses"), label: "Addresses" },
    { fn: () => handleFilterClick("Blocks"), label: "Blocks" },
    { fn: () => handleFilterClick("Transactions"), label: "Transactions" },
  ]

  async function fetchAutocompletes() {
  }

  async function search(value: string) {
    setSearchHistory(prevState => {
      // check if value exists
      const index = prevState.indexOf(value)
      if (index !== -1) {
        // remove value from the array
        prevState.splice(index, 1)

        return [value, ...prevState]
      }
      return [value, ...prevState]
    })
  }

  function keyPressHandler(ev: KeyboardEvent<HTMLInputElement>) {
    switch (ev.key) {
      case "Escape":
        ev.preventDefault()
        setInputState({
          display: "",
          input: "",
        })
        break
      case "Enter":
        ev.preventDefault()
        search(inputState.display)
        break
      case "ArrowDown":
        ev.preventDefault()
        console.log("down")
        break
      case "ArrowUp":
        ev.preventDefault()
        console.log("up")
    }
  }

  function inputHandler(ev: ChangeEvent<HTMLInputElement>) {
    setInputState({
      display: ev.target.value,
      input: ev.target.value,
    })
    setDebouncedInput(ev.target.value)
  }

  useEffect(() => {
    if (debouncedInput.length >= 3) {
      fetchAutocompletes()
    }
  }, [debouncedInput])

  useEffect(() => {
    if (inputIsFocused && searchHistory.length > 0) {
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [inputIsFocused, inputState, searchHistory.length])

  return <div className={clsx(style.searchBarWrapper)}>
    <div className={style.searchBar} ref={searchBarAndSuggestionsRef}>
      <div className="flex w-full h-full relative">
        <div className="flex">
          <button className={style.searchButton}>
            <Search size={20} color="var(--icon)" />
          </button>
          {/** Filter button hidden */}
          {/*{*/}
          {/*  !props.hideFilters &&*/}
          {/*  <button*/}
          {/*    className={style.filterButton}*/}
          {/*    onClick={() => setFiltersDropdown(true)}*/}
          {/*    onMouseOver={() => setFiltersDropdown(true)}*/}
          {/*    onMouseLeave={() => setFiltersDropdown(false)}*/}
          {/*  >*/}
          {/*    {searchFilter}*/}
          {/*    <ChevronDown size={16} strokeWidth={2} className={clsx(*/}
          {/*      style.chevron,*/}
          {/*      filtersDropdown && style.opened,*/}
          {/*    )} />*/}

          {/*    {filtersDropdown &&*/}
          {/*      <SearchFilterDropdown*/}
          {/*        items={filters}*/}
          {/*        className="mt-[47px]"*/}
          {/*        currentItem={searchFilter}*/}
          {/*        showFn={setFiltersDropdown}*/}
          {/*      />*/}
          {/*    }*/}
          {/*  </button>*/}
          {/*}*/}
        </div>
        <div className="w-full">
          <input
            ref={inputRef}
            value={inputState.display}
            className={style.searchBarInput}
            onChange={ev => inputHandler(ev)}
            onKeyDown={ev => keyPressHandler(ev)}
            placeholder="Search by Block Hash, Txn Hash, Account Address"
          />
          <AnimatePresence>
            {inputState.display && <motion.div
              exit={{ scale: 0 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onTap={() => setInputState({ display: "", input: "" })}
              onClick={() => setInputState({ display: "", input: "" })}
              className="absolute top-0 h-full right-2 flex justify-center items-center">
              <Close className="cursor-pointer" />
            </motion.div>}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {/** When bar is focused w no input, & search history is available, we show search history */}
        {/** filters temporarily added for testing */}
        {showSuggestions && !inputState.input && searchHistory.length > 0 && <SearchSuggestions
          filters={filters}
          inputState={inputState}
          selectedFilter={searchFilter}
          setFilterFn={setSearchFilter}
          setInputStateFn={setInputState}
        />}
        {/** When bar is focused w input, & autocompletes are available, we show autocompletes */}
        {showSuggestions && inputState.input && autocompletes.length > 0 && <SearchSuggestions
          filters={filters}
          inputState={inputState}
          autocompletes={autocompletes}
          setFilterFn={setSearchFilter}
          setInputStateFn={setInputState}
        />}
      </AnimatePresence>
    </div>
  </div>
}