export function capitalise(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}


/*
  @use: Shorten a hash string with middle ellipsis
  @params: string, options
  @returns: string

  There are many options to choose from:
  - shortenBy (number): Shorten the hash by a certain number of characters
  - showFirstAndLast (number): Show the first and last n characters
  - showFirst (number): Show the first n characters (default: 6)
  - showLast (number): Show the last n characters (default: 6)
 */

interface ShortenHashAllOptions {
  showFirstAndLast: number
  shortenBy: number
  showFirst: number
  showLast: number
}

type ShowFirstAndLastOptions = Pick<ShortenHashAllOptions, "showFirstAndLast">
type ShortenByOptions = Pick<ShortenHashAllOptions, "shortenBy">
type ShowFirstLastOptions = Partial<Pick<ShortenHashAllOptions, "showFirst" | "showLast">>

export type ShortenHashOptions = ShortenByOptions | ShowFirstAndLastOptions | ShowFirstLastOptions

export function shortenHash(string: string, options?: ShortenHashOptions) {
  if (options && "shortenBy" in options && options.shortenBy) {
    if (string.length <= options.shortenBy) return string
    const shownLength = (string.length - options.shortenBy) / 2
    return string.slice(0, shownLength) + "..." + string.slice(-shownLength)
  } else if (options && "showFirstAndLast" in options) {
    const opts = options as ShowFirstAndLastOptions
    const shownLength = opts.showFirstAndLast
    if (string.length <= shownLength) return string
    return string.slice(0, shownLength) + "..." + string.slice(-shownLength)
  } else if (options && ("showFirst" in options || "showLast" in options)) {
    const opts = options as ShowFirstLastOptions
    const frontCount = opts.showFirst || 6
    const backCount = opts.showLast ? -Math.abs(opts.showLast) : -6
    if (string.length > 25) {
      return string.slice(0, frontCount) + "..." + string.slice(backCount)
    }
  }
  return string
}