import { Summaries } from "@/components/analytics/summaries/summaries"
import { BingoAd } from "@/components/announcements/bingo-ad/bingo-ad"
import { SearchBar } from "@/components/search-bar/search-bar"
import { Stats } from "@/components/analytics/stats/stats"
import { clsx } from "clsx";

import style from "./app-page.module.scss"

/**
 * Home component
 * @description Includes banner (search bar & announcement), analytics (stats & summaries)
 */

export default function Home() {
  return (
    <main className="flex flex-col">

      {/** Banner */}
      <div className={style.bannerWrapper}>
        <div className={style.bannerDiv}>
          <div className={clsx(style.left, "z-[2]")}>
            <SearchBar />
          </div>
          <div className={style.right}>
            <BingoAd />
          </div>
        </div>
      </div>

      {/** Analytics */}
      <div className="flex flex-col items-center my-[40px] gap-[24px]">
        <Stats />
        <div className={style.pageAnnouncementWrapper}>
          <div className={style.pageAnnouncementDiv}>
            <BingoAd />
          </div>
        </div>
        <Summaries />
      </div>

    </main>
  )
}