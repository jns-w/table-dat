"use client"
import { TransactionStatusTooltip } from "@/components/tooltips/transaction-status-tooltips/transaction-status-tooltip";
import { HeaderCell } from "@/components/table/custom-headers/header-with-tooltip/header-cell"
import { GasUsedCell } from "@/components/table/custom-cells/gas-used-cell/gas-used-cell"
import { PageLimitButton } from "@/components/table/page-limit-button/page-limit-button"
import { TooltipTrigger } from "@/components/tooltips/tooltip-wrapper/tooltip-trigger";
import { HashCell } from "@/components/table/custom-cells/hash-cell/hash-cell"
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import { InfoTooltip } from "@/components/tooltips/info-tooltip/info-tooltip"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import tableTopStyle from "@/styles/shared/table-top-grid.module.scss"
import { Pagination } from "@/components/table/pagination/pagination"
import { ChevronsUp, Clock4, Eye, XCircle } from "@/components/icons"
import { SearchBar } from "@/components/search-bar/search-bar"
import { useMotionValueEvent, useSpring } from "motion/react"
import { TooltipButton } from "@/components/buttons";
import { formatDistanceToNowStrict } from "date-fns"
import { getAPIClient } from "@/utils/api-clients"
import { Table } from "@/components/table/table"
import { useEventListener } from "usehooks-ts"
import { formatInTimeZone } from "date-fns-tz"
import { capitalise } from "@/utils/strings"
import { gweiToETH } from "@/utils/numbers"
import { networkAtom } from "@/jotai/app"
import { cn } from "@/utils/styling"
import { useAtom } from "jotai"

import style from "./transactions-page.module.scss"

/**
 * Transactions Table Component
 * @description Displays table of all transactions in paginated format, has animated header and supports sticky column
 */

export function TransactionsTable() {
  const [rows, setRows] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [network] = useAtom(networkAtom)
  const client = getAPIClient(network)
  const [timeOption, setTimeOption] = useState<"age" | "utc">("age")
  const [transactionsCount, setTransactionsCount] = useState(2401293)


  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const page = searchParams.get("page") || "1"
  const limit = searchParams.get("limit") || "15"

  const markerRef = useRef<HTMLDivElement>(null)
  const headerOffsetValue = useSpring(0, { damping: 50, stiffness: 700 })
  const [stickyHeader, setStickyHeader] = useState(false)
  const [headerIsMoving, setHeaderIsMoving] = useState(false)
  const [scrolledX, setScrolledX] = useState(false)

  useMotionValueEvent(headerOffsetValue, "change", () => {
    const velocity = headerOffsetValue.getVelocity()
    if (velocity > 0.5 || velocity < -0.5) {
      setHeaderIsMoving(true)
    } else {
      setHeaderIsMoving(false)
    }
  })

  useEventListener("scroll", onScroll)

  function onScroll(event: any) {
    if (markerRef.current) {
      if (window.scrollY > markerRef.current.offsetTop) {
        setStickyHeader(true)
        headerOffsetValue.set(window.scrollY - markerRef.current.offsetTop - 1)
      } else if (window.scrollY < markerRef.current.offsetTop && stickyHeader) {
        setStickyHeader(false)
        headerOffsetValue.set(0)
      }
    }
  }

  function handleScrollX(event: ChangeEvent<HTMLTableElement>) {
    if (event.target.scrollLeft > 0) {
      setScrolledX(true)
    } else {
      setScrolledX(false)
    }
  }

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)
    return params.toString()
  }, [searchParams])

  // Define columns
  const columns = [
    {
      className: style.transactionHashColumn,
      header: <HeaderCell
        tooltipContent={
          <InfoTooltip className="!w-[240px]">
            <p>Transaction hash is a unique alphanumeric string that is generated whenever a
              transaction is performed.</p>
            <br />
            <p>It is a unique identifier that is used to track the transaction on the blockchain.</p>
          </InfoTooltip>
        }
        header={<div className="flex items-center gap-[4px]">
          <TooltipButton fromBottom className="self-center w-[24px]">
            <InfoTooltip className="!w-[240px]">
              <p>Hover or click on the icons in this column to see the status of any transaction. The
                states of transaction include:</p>
              <br />
              <ol type="1" className="list-outside list-decimal block ml-[18px] marker:text-[var(--text-mild)]">
                <li>
                  <span className="text-[var(--text-mild)]">Committed:</span> Transaction has been successfully added to
                  the
                  blockchain.
                </li>
                <li>
                  <span className="text-[var(--warning)]">Pending:</span> Transaction is awaiting the required number of
                  network confirmations
                  to be
                  reached. This may vary based on the fee paid by the sender, the asset involved, and
                  network traffic.
                </li>
                <li>
                  <span className="text-[var(--danger)]">Failed:</span> Transaction was not executed due to factors such
                  as
                  low fees or
                  errors.
                </li>
              </ol>
            </InfoTooltip>
          </TooltipButton>
          Transaction Hash
        </div>}
      />,
    },
    {
      className: style.commandsColumn,
      header: <HeaderCell
        header="Commands"
        tooltipContent={
          <InfoTooltip className="!w-[240px]">
            <p>This displays the command specified in the transaction by the signer.</p>
          </InfoTooltip>}
      />,
    },
    {
      className: style.blockColumn,
      header: <HeaderCell
        header="Block"
        tooltipContent={
          <InfoTooltip className="!w-[240px]">
            <p>This shows the Block that contains this particular transaction.</p>
            <br />
            <p>Blocks are bundles of transactions recorded on the blockchain. Each block includes transaction data, a
              timestamp, and a link to the previous block for security.</p>
          </InfoTooltip>
        }
      />,
    },
    {
      className: style.utcColumn,
      header: <HeaderCell
        fn={() => setTimeOption(timeOption === "utc" ? "age" : "utc")}
        header={
          <p className="cursor-pointer">Date & Time (UTC)</p>
        }
        tooltipContent={
          <InfoTooltip fromBottom className="!w-[240px]">
            <p>Date & Time displayed in UTC (Coordinated Universal Time) format
              provides a standard time reference for transaction timestamps. This ensures synchronization, verification,
              and preventing double-spending across the global network.
            </p>
          </InfoTooltip>
        }
      />,
    },
    {
      className: style.ageColumn,
      header: <HeaderCell
        tooltipClassName="top-[40px]"
        fn={() => setTimeOption(timeOption === "utc" ? "age" : "utc")}
        header={
          <p className="cursor-pointer">Age</p>
        }
        tooltipContent={
          <InfoTooltip fromBottom className="!w-[240px]">
            This refers to the time elapsed since the block was added to the blockchain. As new blocks are added,
            older blocks become more secured and enhances immutability.
          </InfoTooltip>
        }
      />,
    },
    {
      className: style.signerColumn,
      header: <HeaderCell
        header="Signer"
        tooltipContent={
          <InfoTooltip className="!w-[240px]">
            <p>Signer refers to the originating account that authorised a transaction with their private key.</p>
          </InfoTooltip>
        } />,
    },
    {
      className: style.amountTransactedColumn,
      header: <HeaderCell
        header="Amount"
        tooltipContent={
          <InfoTooltip className="!w-[240px]">
            <p>Amount transacted in this transaction</p>
          </InfoTooltip>
        } />,
    },
    {
      className: style.transactionFeeColumn,
      header: <HeaderCell
        header="Transaction Fee"
        tooltipContent={<InfoTooltip className="!w-[240px]">
          <p>Amount paid in XPLL to process and verify a transaction on the blockchain.
          </p>
          <br />
          <p>Transaction Fee = </p>
          <p>(Gas Price * Gas Used by Txn) in XPLL</p>
        </InfoTooltip>}
      />,
    },
  ]

  /**
   * Define cells
   * Parse the data & build custom cells (if needed)
   * We should be able to see every cell in this function
   * @param data
   */
  function defineCells(data: any) {
    if (!data) return []

    const definedRows = []

    for (let i = 0; i < data.length; i++) {
      let { amount, block_hash, commands, gas_consumed, hash, signer, status, timestamp, tx_gas_consumption } = data[i]

      const statusString = status === 0 ? "Pending" : status === 1 ? "Committed" : "Failed to Commit"

      /** Transaction Hash */
      hash = <div className="flex gap-[8px]">
        <TooltipTrigger
          fromBottom
          tabIndex={0}
          allowTooltipHover
          tooltipContent={<TransactionStatusTooltip status={statusString}/>}>
          {status === 0 ?
            <Clock4 size={24} strokeWidth={.9} color="var(--warning" /> :
            status === 1 ?
              <Eye size={24} strokeWidth={.9} /> :
              <XCircle size={24} strokeWidth={.9} color="var(--danger)" />
          }
        </TooltipTrigger>
        <HashCell hash={hash} withCopyButton url={`/transaction/${hash}`}
                  shortenHashOptions={{ showFirstAndLast: 5 }} />
      </div>

      /** Commands */
      commands = commands ? commands.map((el: string) => el.split("_").map(el => capitalise(el)).join(" ")).join(", ") : "-"
      block_hash = <HashCell withCopyButton hash={block_hash} url={`/block/${block_hash}`}
                             shortenHashOptions={{ showFirstAndLast: 5 }} />
      signer = <HashCell hash={signer} withCopyButton url={`/address/${signer}`}
                         shortenHashOptions={{ showFirstAndLast: 5 }} />
      amount = amount ? gweiToETH(amount).toFixed(3).toString() + " ETH" : "-"
      const utcTime = formatInTimeZone(timestamp * 1000, "UTC", "yyyy-MM-dd HH:mm:ss")
      const ageTime = formatDistanceToNowStrict(timestamp * 1000) + " ago"
      timestamp = timestamp * 1000
      gas_consumed = gas_consumed ? gweiToETH(gas_consumed) + " " : "-"
      tx_gas_consumption = <GasUsedCell target={800000} gasUsed={tx_gas_consumption} />
      definedRows.push([hash, commands, block_hash, utcTime, ageTime, signer, amount, gas_consumed])
    }

    return definedRows
  }

  function setCurrentPage(number: number) {
    router.push(`${pathname}?${createQueryString("page", number.toString())}`, { scroll: false })
  }

  function setPageLimit(limit: number) {
    router.push(`${pathname}?${createQueryString("limit", limit.toString())}`, { scroll: false })
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      await client.getTxsBy([{ param: "page_idx", value: parseInt(page) }], [], "summary_only", parseInt(limit), "desc")
        .then(data => {
          setRows(defineCells(data))
        })
        .catch(err => console.log(err))
      setLoading(false)
    }

    fetchData()
  }, [client, network, page, limit])


  return <>
    <div className={tableTopStyle.tableTopGrid}>
      <div className={tableTopStyle.tableTitleDiv}>
        <h2>Transactions</h2>
      </div>
      <div className={tableTopStyle.tableSearchBar}>
        <SearchBar hideFilters />
      </div>
      <div className={tableTopStyle.tableItemsCountDiv}>
        <h3>A total of {transactionsCount.toLocaleString("en-US")} transactions found</h3>
      </div>
      <div className={tableTopStyle.tablePaginationDiv}>
        <Pagination totalPages={50120} currentPage={parseInt(page)}
                    setCurrentPage={setCurrentPage} />
      </div>
      <div className={tableTopStyle.tablePageLimitDiv}>
        <PageLimitButton setPageLimit={setPageLimit} pageLimit={parseInt(limit)} />
      </div>
    </div>
    <div ref={markerRef}>
      <Table
        onScroll={handleScrollX}
        className={cn(
          style.transactionsTable,
          scrolledX && style.scrolledX,
          stickyHeader && style.stickyHeader,
          timeOption === "utc" ? style.utcTime : style.ageTime,
        )}>
        <Table.Header
          columns={columns}
          style={{
            opacity: headerIsMoving ? 0.8 : 1,
            y: headerOffsetValue,
          }}
        />
        {loading ? <Table.BodySkeleton columns={columns} rowCount={parseInt(limit)} />
          : <Table.Body rows={rows} columns={columns} />}
      </Table>
    </div>
    <div className="flex justify-end">
      <div className="flex flex-col gap-2">
        <Pagination
          totalPages={5}
          currentPage={parseInt(page)}
          setCurrentPage={setCurrentPage} />
        <div
          onClick={() => window.scroll({ top: 0 })}
          className="flex justify-end items-center gap-3 cursor-pointer text-[var(--accent-primary)]">
          Back to Top <ChevronsUp color="var(--accent-primary)" />
        </div>
      </div>
    </div>
  </>
}
