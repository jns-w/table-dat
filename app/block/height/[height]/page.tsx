"use client"
import { BlockTransactionsTable } from "@/app/block/height/[height]/block-transactions-table";
import { PageLimitButton } from "@/components/table/page-limit-button/page-limit-button";
import { Pagination } from "@/components/table/pagination/pagination";
import { SearchBar } from "@/components/search-bar/search-bar";
import { BlockOverview } from "@/components/overview";
import { useParams, useRouter } from "next/navigation"
import { getAPIClient } from "@/utils/api-clients"
import { ChevronsUp } from "@/components/icons";
import { networkAtom } from "@/jotai/app"
import { useAtom } from "jotai"

import style from "./block-height-page.module.scss"

type BlockDetailsPageParams = {
  hash?: string
  height?: string
}

/** Block Details Page
 *  @description This is a page that displays the details of a block based on its height or hash.
 * */

export default function BlockDetailsPage() {
  const params: BlockDetailsPageParams = useParams()
  const [network] = useAtom(networkAtom)
  const client = getAPIClient(network)
  const router = useRouter()

  // useEffect(() => {
  //   async function fetchData() {
  //     await client.getBlocksBy("block_hash", params.height, 1)
  //       .then(data => data)
  //       .catch(err => {
  //         console.log(err)
  //         router.push("/not-found")
  //       })
  //   }
  //
  //   fetchData()
  // }, [network, client, params.height, router])


  return <main className="flex flex-col w-full items-center mt-[48px] mb-[64px]">
    <div className="w-full max-w-[var(--max-width)] flex justify-center px-[var(--global-padding)]">
      <div className={style.blockDetailsPageDiv}>
        <div className={style.blockDetailsTopDiv}>
          <h2 className={style.blockDetailsHeader}>Block Details</h2>
          <SearchBar hideFilters />
        </div>
        <div className={style.blockDetailsSectionDiv}>
          <h3 className={style.sectionHeader}>Overview</h3>
          {params.height ? <BlockOverview height={params.height} /> :
            params.hash ? <BlockOverview hash={params.hash} /> : null}
        </div>

        <div className={style.blockDetailsSectionDiv}>
          <div className={style.transactionsTopDiv}>
            <h3 className={style.sectionHeader}>Transactions contained in this Block</h3>
            <Pagination 
              totalPages={5}
              currentPage={1} 
              className={style.pagination} 
              setCurrentPage={() => {
            }} />
            <PageLimitButton 
              pageLimit={10}
              className={style.pageLimitBtn} 
              setPageLimit={() => {
            }} />
          </div>
          <BlockTransactionsTable />
        </div>

        <div className="flex w-full justify-end mt-[24px]">
          <div
            onClick={() => window.scroll({ top: 0 })}
            className="flex justify-end items-center gap-[8px] cursor-pointer text-[var(--accent-primary)] w-fit">
            Back to Top <ChevronsUp color="var(--accent-primary)" />
          </div>
        </div>
      </div>
    </div>
  </main>
}