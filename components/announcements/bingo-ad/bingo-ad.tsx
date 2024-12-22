import Link from "next/link"

import style from "./bingo-ad.module.scss"

/**
 * Bingo Advert Component
 * @description Displays a Bingo ad, uses container queries
 */

export function BingoAd() {
  return <div className={style.bingoAdWrapper}>
    <Link
      href=""
      className="w-full"
      rel="noopener noreferrer">
      <div className={style.bingoAdDiv}>
        <div className={style.bingoAdBg}>
          <h2 className="text-lg font-bold opacity-70 text-balance mx-3">Data displayed are fictional</h2>
        </div>
      </div>
    </Link>
  </div>
}