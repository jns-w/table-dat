"use client"
import { Table, TableBody, TableBodySkeleton, TableFooter, TableHeader } from "@/components/table/table"
import { HashCell } from "@/components/table/custom-cells/hash-cell/hash-cell"
import style from "@/app/address/[hash]/address-page.module.scss"
import { getAPIClient } from "@/utils/api-clients"
import { PublicAddress } from "pchain-types-js"
import { formatDistanceToNow } from "date-fns"
import { gweiToETH } from "@/utils/numbers"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { networkAtom } from "@/jotai/app"
import { useAtom } from "jotai/index"
import Link from "next/link"

export function ReceivedTransactionsTable() {
  const [rows, setRows] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [network] = useAtom(networkAtom)
  const client = getAPIClient(network)
  const params: {hash: string} = useParams()

  const columns = [
    {
      header: "Transaction hash",
      width: "160px",
    },
    {
      header: "Amount",
      width: "100px",
    },
    {
      header: "Gas used",
      width: "100px",
    },
    {
      header: "Age",
      width: "150px",
    },
  ]

  function defineCells(data: any) {
    if (!data) return
    const rows = []

    for (let i = 0; i < data.length; i++) {
      let { amount, gas_consumed, hash, timestamp } = data[i]
      hash = <HashCell hash={hash} withCopyButton url={`/transaction/${hash}`} />
      amount = (gweiToETH(amount) + " XPLL") || "-"
      timestamp = formatDistanceToNow(timestamp * 1000) + " ago"
      rows.push([hash, amount, gas_consumed, timestamp])
    }

    return rows
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      await client.getTxsBy(
        [{ param: "page_idx", value: 1 }],
        [{ param: "recipient", value: new PublicAddress(params.hash) }],
        "summary_only",
        5,
        "desc",
      ).then(data => setRows(defineCells(data)))
        .catch(err => {
          console.log(err)
        })
      setLoading(false)
    }

    fetchData()
  }, [params.hash, client, network])


  return <Table className="min-w-[532px]">
    <TableHeader columns={[{ header: "Received transactions" }]} />
    {loading ?
      <TableBodySkeleton rowCount={5} columns={columns} className={style.tableBody} /> :
      <TableBody rows={rows} columns={columns} className={style.tableBody} />
    }
    {!loading && rows?.length === 0 && <tbody>
    <tr className="min-h-[400px] flex justify-center items-center">
      <td className="w-full align-center text-center">No transactions</td>
    </tr>
    </tbody>}
    <TableFooter> <Link href={`/`}>See more</Link> </TableFooter>
  </Table>
}
