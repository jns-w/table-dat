"use client"
import { TransactionOverview } from "@/components/overview/transaction-overview/transaction-overview";
import { TransactionCommands } from "@/app/transaction/[hash]/details/transaction-commands";
import { SearchBar } from "@/components/search-bar/search-bar";
import { getAPIClient } from "@/utils/api-clients"
import { ChevronsUp } from "@/components/icons"
import { Sha256Hash } from "pchain-types-js"
import { useParams } from "next/navigation"
import { networkAtom } from "@/jotai/app"
import { useEffect } from "react"
import { useAtom } from "jotai"

import style from "./transaction-page.module.scss"

type TransactionParams = {
  hash: string
}
export default function TransactionPage() {
  const params: TransactionParams = useParams()
  const [network] = useAtom(networkAtom)
  const client = getAPIClient(network)

  useEffect(() => {
    async function fetchData() {
      await client.getTxsBy(
        [{ param: "tx_hash", value: new Sha256Hash(params.hash) }],
        [],
        "summary_only",
        1,
        "asc")
        .then(res => res && console.log(res[0]))
        .catch(err => console.log(err))
    }

    fetchData()
  }, [params.hash, network, client])

  return <main className="flex flex-col w-full items-center mt-[48px] mb-[64px]">
    <div className="w-full max-w-[var(--max-width)] flex justify-center px-[var(--global-padding)]">
      <div className={style.blockDetailsPageDiv}>
        <div className={style.blockDetailsTopDiv}>
          <h2 className={style.blockDetailsHeader}>Transaction Details</h2>
          <SearchBar hideFilters />
        </div>
        <div className={style.blockDetailsSectionDiv}>
          <h3 className={style.sectionHeader}>Overview</h3>
          <TransactionOverview hash={params.hash} />
        </div>

        <div className={style.blockDetailsSectionDiv}>
          <h3 className={style.sectionHeader}>Commands</h3>
          <TransactionCommands commands={[]}/>
        </div>

        {/*<div className={style.blockDetailsSectionDiv}>*/}
        {/*  <h3 className={style.sectionHeader}>Receipts</h3>*/}
        {/*</div>*/}

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

