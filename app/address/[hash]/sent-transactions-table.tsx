"use client"

import { Table, TableBody, TableBodySkeleton, TableFooter, TableHeader } from "@/components/table/table"
import { EllipsisCell } from "@/components/table/custom-cells/ellipsis-cell/ellipsis-cell"
import { HashCell } from "@/components/table/custom-cells/hash-cell/hash-cell"
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns"
import style from "@/app/address/[hash]/address-page.module.scss"
import { placeholderTransactions } from "@/data/transactions"
import { getAPIClient } from "@/utils/api-clients"
import { PublicAddress } from "pchain-types-js"
import { gweiToETH } from "@/utils/numbers"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { networkAtom } from "@/jotai/app"
import { useAtom } from "jotai/index"
import Link from "next/link"

export function SentTransactionsTable() {
  const [rows, setRows] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [network] = useAtom(networkAtom)

  const client = getAPIClient(network)

  const params: { hash: string } = useParams()

  const columns = [
    {
      className: style.hashCol,
      header: "Transaction hash",
    },
    {
      className: style.amountCol,
      header: "Amount",
    },
    {
      className: style.gasCol,
      header: "Gas used",
    },
    {
      className: style.ageCol,
      header: "Age",
    },
  ]

  // useEffect(() => {
  //   async function fetchData() {
  //     setLoading(true)
  //     await client.getTxsBy([{ param: "page_idx", value: 1 }],
  //       [{ param: "signer", value: new PublicAddress(params.hash) }],
  //       "summary_only",
  //       5,
  //       "desc")
  //       .then(data => setRows(defineCells(data)))
  //       .catch(err => console.log(err))
  //     setLoading(false)
  //   }
  //
  //   fetchData()
  // }, [params.hash, client, network])

  useEffect(() => {
    setLoading(true)
    setRows(defineCells(placeholderTransactions.slice(0, 5)))
    setLoading(false)
  }, [])

  function defineCells(data: any) {
    if (!data) return
    const rows = []

    for (let i = 0; i < data.length; i++) {
      let { amount, gas_consumed, hash, timestamp } = data[i]
      hash = <HashCell hash={hash} withCopyButton className={style.hashCol} url={`/transaction/${hash}`}
                       shortenHashOptions={{ showFirstAndLast: 5 }} />
      amount = (amount.toFixed(3) + " ETH") || "-"
      timestamp = formatDistanceToNowStrict(timestamp, { addSuffix: true }) + " ago"
      gas_consumed = gas_consumed / 10000 + " gas"
      rows.push([hash, amount, gas_consumed, timestamp])
    }
    return rows
  }


  return <Table className="w-full">
    <TableHeader columns={[{ header: "Sent transactions" }]} />
    {loading ?
      <TableBodySkeleton rowCount={5} columns={columns} className={style.tableBody} /> :
      <TableBody rows={rows} columns={columns} className={style.tableBody} />}
    {!loading && rows?.length === 0 && <tbody>
    <tr className="min-h-[400px] flex justify-center items-center">
      <td>No transactions</td>
    </tr>
    </tbody>}
    <TableFooter className={style.tableFooter}> <Link href={`/`}>See more</Link> </TableFooter>
  </Table>
}
