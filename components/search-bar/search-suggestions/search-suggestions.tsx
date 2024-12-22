import { highlightedSuggestionAtom, InputState, searchHistoryAtom } from "@/components/search-bar/search-bar-state"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { DropdownMenuItem } from "@/components/dropdown/dropdown"
import { FiltersOpts } from "@/components/search-bar/search-bar"
import { Clock4, Close } from "@/components/icons"
import { useEventListener } from "usehooks-ts"
import { motion } from "motion/react"
import { useAtom } from "jotai"
import { clsx } from "clsx"

import style from "./search-suggestions.module.scss"

type SearchSuggestionsProps = {
  autocompletes?: string[]
  filters?: DropdownMenuItem[]
  history?: string[]
  inputState: InputState
  selectedFilter?: string
  setFilterFn: Dispatch<SetStateAction<FiltersOpts>>
  setInputStateFn: Dispatch<SetStateAction<InputState>>
}

type SuggestionItem = {
  filterType?: "address" | "block" | "transaction"
  index?: number
  text: string
  type: "autocomplete" | "header" | "history"
}

const containerAnimation = {
  hide: {
    height: 0,
    opacity: 0,
    transition: {
      delay: 0.2,
      duration: 0.2,
      height: { damping: 50, stiffness: 900, type: "spring" },
      opacity: { duration: 0.2, type: "tween" },
    },
  },
  show: {
    height: "auto",
    opacity: 1,
    transition: {
      delay: 0.05,
      height: { damping: 50, stiffness: 900, type: "spring" },
      opacity: { duration: 0.1, type: "tween" },
    },
  },
}

const filtersAnimation = {
  hide: {
    transition: {
      staggerChildren: 0.01,
      staggerDirection: -1,
    },
  },
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
}

const filterAnimation = {
  hide: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
  show: {
    delay: 0.2,
    opacity: 1,
    transition: {
      duration: 0.2,
      opacity: {
        duration: 0.5,
        type: "ease",
      },
    },
  },
}

const listAnimation = {
  hide: {
    opacity: 0,
    transition: {
      delay: 0.1,
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
}

const itemAnimation = {
  hide: { opacity: 0 },
  show: { opacity: 1 },
}

/**
 * Search Suggestions Component
 * @description Displays search suggestions based on user input
 * @param props.autocompletes - string[]
 * @param props.filters - DropDownMenuItem[]
 * @param props.history - string[]
 * @param props.inputState - InputState
 * @param props.selectedFilter - string
 * @param props.setFilterFn - (filter: string) => void
 * @param props.setInputStateFn - Dispatch<SetStateAction<InputState>>
 */

export function SearchSuggestions(props: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([])
  const [suggestionsCount, setSuggestionsCount] = useState(0)
  const [highlightedSuggestion, setHighlightedSuggestion] = useAtom(highlightedSuggestionAtom)
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)


  function highlightSuggestion(index: null | number) {
    setHighlightedSuggestion(index)

    if (index === null) {
      props.setInputStateFn((prevState: InputState) => ({
        ...prevState,
        display: prevState.input,
      }))
      return
    }

    let i = suggestions.findIndex(suggestion => suggestion.index === index)
    if (i > -1) {
      props.setInputStateFn((prevState: InputState) => ({
        ...prevState,
        display: suggestions[i].text,
      }))
    }
  }

  function clearSearchHistory() {
    setSearchHistory([])
  }

  function deleteSuggestionFromHistory(suggestion: string) {
    setSearchHistory((prevState) => {
      const index = prevState.indexOf(suggestion)
      if (index !== -1) {
        prevState.splice(index, 1)
        return [...prevState]
      }
      return prevState
    })
  }

  useEventListener("keydown", (ev: KeyboardEvent) => {
    switch (ev.key) {
      case "ArrowDown":
        ev.preventDefault()
        highlightSuggestion(highlightedSuggestion === null || highlightedSuggestion === suggestionsCount - 1 ? 0 : highlightedSuggestion + 1)
        break
      case "ArrowUp":
        ev.preventDefault()
        highlightSuggestion(highlightedSuggestion === null || highlightedSuggestion === 0 ? suggestionsCount - 1 : highlightedSuggestion - 1)
        break
      case "Enter":
        ev.preventDefault()
        console.log("search")
        break
      case "Escape":
        ev.preventDefault()
        highlightSuggestion(null)
        break
    }
  })

  useEffect(() => {
    // This is where we organise suggestions from various sources (autocompletes of all types, search history, etc)
    let arr: SuggestionItem[] = []
    let count = 0

    if (!props.inputState.input && searchHistory) {
      arr.push({ text: "Recent Searches", type: "header" })
      for (let i = 0; i < searchHistory.length; i++) {
        arr.push({ index: count++, text: searchHistory[i], type: "history" })
        if (count === 5) break
      }
    }
    setSuggestionsCount(count)
    setSuggestions(arr)

  }, [searchHistory, props.inputState.input])

  return <motion.div
    exit="hide"
    initial="hide"
    animate="show"
    variants={containerAnimation}
    className={style.searchSuggestionsDiv}
  >
    {
      props.filters &&
      <motion.div
        variants={filtersAnimation}
        className={style.filtersDiv}
      >
        {
          props.filters.map((filter) => <motion.div
            variants={filterAnimation}
            key={`suggestions-filter-${filter.label}`}
            onClick={() => {
              props.setFilterFn(filter.label as FiltersOpts)
            }}
            className={clsx(
              style.filter,
              filter.label === props.selectedFilter && style.selected,
            )}
          >
            {filter.label}
          </motion.div>)
        }
      </motion.div>
    }
    <motion.div
      initial="hide"
      animate="show"
      variants={listAnimation}
      className={style.suggestionsDiv}
    >
      {
        suggestions.map((suggestion, i) => <motion.div
          exit="hide"
          initial="hide"
          animate="show"
          key={`suggestion-${i}`}
          variants={itemAnimation}
          className={clsx(
            suggestion.type === "header" ?
              style.suggestionHeader :
              style.suggestion,
            suggestion.index === highlightedSuggestion && style.highlighted,
          )}
        >
          {
            suggestion.type === "history" ?
              <HistorySuggestion text={suggestion.text} /> :
              suggestion.text
          }
          {
            suggestion.text === "Recent Searches" &&
            <button
              onClick={() => clearSearchHistory()}
              className={style.clearAllHistoryBtn}
            >
              Clear all
            </button>
          }
        </motion.div>)
      }
    </motion.div>
  </motion.div>
}

function HistorySuggestion(props: { text: string }) {
  const [, setSearchHistory] = useAtom(searchHistoryAtom)

  function deleteSuggestionFromHistory(suggestion: string) {
    setSearchHistory((prevState) => {
      const index = prevState.indexOf(suggestion)
      if (index !== -1) {
        prevState.splice(index, 1)
        return [...prevState]
      }
      return prevState
    })
  }

  return <>
    <span className={style.suggestionTypeIcon}><Clock4 size={14} /></span>
    <p className="overflow-hidden overflow-ellipsis mr-[15px]">
      {props.text}
    </p>
    <button
      className={style.deleteHistoryBtn}
      onClick={() => deleteSuggestionFromHistory(props.text)}
    >
      <Close size={15} />
    </button>
  </>
}