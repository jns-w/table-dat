"use client"
import { HeaderCell } from "@/components/table/custom-headers/header-with-tooltip/header-cell"
import { PageLimitButton } from "@/components/table/page-limit-button/page-limit-button";
import { HashCell } from "@/components/table/custom-cells/hash-cell/hash-cell"
import { InfoTooltip } from "@/components/tooltips/info-tooltip/info-tooltip";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import tableTopStyle from "@/styles/shared/table-top-grid.module.scss"
import { Pagination } from "@/components/table/pagination/pagination"
import { SearchBar } from "@/components/search-bar/search-bar"
import { useMotionValueEvent, useSpring } from "motion/react"
import { useCallback, useEffect, useState } from "react"
import { formatDistanceToNowStrict } from "date-fns"
import { getAPIClient } from "@/utils/api-clients"
import { placeholderBlocks } from "@/data/blocks"
import { Table } from "@/components/table/table"
import { ChevronsUp } from "@/components/icons"
import { useEventListener } from "usehooks-ts"
import { formatInTimeZone } from "date-fns-tz"
import { ChangeEvent, useRef } from "react"
import { networkAtom } from "@/jotai/app"
import { cn } from "@/utils/styling";
import { useAtom } from "jotai"
import Link from "next/link"

import style from "./blocks-page.module.scss"

/**
 * Blocks Table Component
 * @description Displays table of all blocks in paginated format, has animated header and supports sticky column
 */

export function BlocksTable() {
  const [rows, setRows] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [network] = useAtom(networkAtom)
  const [scrolledX, setScrolledX] = useState(false)
  const [stickyHeader, setStickyHeader] = useState(false)
  const [headerIsMoving, setHeaderIsMoving] = useState(false)
  const [timeOption, setTimeOption] = useState<"age" | "utc">("age")
  const [blocksCount, setBlocksCount] = useState(182401293)

  const client = getAPIClient(network)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const page = searchParams.get("page") || "1"
  const limit = searchParams.get("limit") || "25"

  const markerRef = useRef<HTMLDivElement>(null)
  const headerOffsetValue = useSpring(0, { damping: 50, stiffness: 700 })

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
      className: style.blockHeightColumn,
      header: <HeaderCell
        header="Block Height"
        tooltipContent={
          <InfoTooltip fromBottom className="!translate-x-[20px]">
            <div className="flex flex-col items-start w-[224px] text-wrap">Block height refers to the number of blocks
              added to the blockchain since the Genesis Block, indicating the chain&#39;s length and the position of a
              specific block within it.
            </div>
          </InfoTooltip>
        }
      />,
    },
    {
      className: style.blockHashColumn,
      header: <HeaderCell
        header="Block Hash"
        tooltipContent={
          <InfoTooltip fromBottom>
            <div className="flex flex-col items-start w-[224px] text-wrap">
              <p>
                A block hash is a unique string created by a cryptographic algorithm that represents block data and
                links
                it to the previous block.
              </p>
              <br />
              <p>
                Block hashes are used during transactions to verify the integrity of the blockchain, ensure that the
                transaction is recorded and confirm that the block hasn’t been altered.
              </p>
            </div>
          </InfoTooltip>
        }
      />,
    },
    {
      className: style.utcColumn,
      // fn: () => setTimeOption(timeOption === "utc" ? "age" : "utc"),
      // header: "Date & Time (UTC)",
      header: <HeaderCell
        fn={() => setTimeOption(timeOption === "utc" ? "age" : "utc")}
        header={
          <p className="cursor-pointer">Date & Time (UTC)</p>
        }
        tooltipContent={
          <InfoTooltip fromBottom>
            <div className="flex w-[224px] text-wrap">Date & Time displayed in UTC (Coordinated Universal Time) format
              provides a standard time reference for transaction timestamps. This ensures synchronization, verification,
              and preventing double-spending across the global network.
            </div>
          </InfoTooltip>
        }
      />,
    },
    {
      className: style.ageColumn,
      // fn: () => setTimeOption(timeOption === "utc" ? "age" : "utc"),
      header: <HeaderCell
        tooltipClassName="top-[40px]"
        fn={() => setTimeOption(timeOption === "utc" ? "age" : "utc")}
        header={
          <p className="cursor-pointer">Age</p>
        }
        tooltipContent={
          <InfoTooltip fromBottom>
            <div className="flex w-[224px] text-wrap">
              This refers to the time elapsed since the block was added to the blockchain. As new blocks are added,
              older
              blocks become more difficult to modify.
            </div>
          </InfoTooltip>
        }
      />,
    },
    {
      className: style.transactionsColumn,
      header: <HeaderCell
        header="Txns"
        tooltipContent={
          <InfoTooltip fromBottom>
            <div className="flex w-[224px] text-wrap">
              Transactions in a block refers to data being committed to the ParallelChain Blockchain signed by an
              originating account, targeting a specific address that are grouped together and validated
            </div>
          </InfoTooltip>
        } />,
    },
    {
      className: style.proposerColumn,
      header: <HeaderCell
        header="Proposer"
        tooltipContent={
          <InfoTooltip fromBottom>
            <div className="flex w-[224px] text-wrap">
              The proposer of a block is the entity that creates and broadcasts a new block, compiling valid
              transactions
              and adding it to the blockchain, ensuring network integrity.
            </div>
          </InfoTooltip>
        }
      />,
    },
    {
      className: style.epochRewardColumn,
      header: <HeaderCell
        header="Epoch Reward"
        tooltipContent={
          <InfoTooltip fromBottom>
            <div className="flex w-[224px] text-wrap">
              Epoch reward refers to the incentives distributed to validators or miners for their participation and
              contributions during a specific time period, namely, an Epoch.
            </div>
          </InfoTooltip>
        }
      />,
    },
    {
      className: style.gasUsedColumn,
      header: <HeaderCell
        header="Gas used (Gas Used %)"
        tooltipContent={
          <InfoTooltip fromBottom>
            <div className="flex flex-col w-[224px] text-wrap">
              <p>
                Gas used in a block represents the computational effort required to execute transactions and smart
                contracts, measured in units. This influences fees and resource allocation within the ParallelChain
                blockchain network.
              </p>
              <br />
              <p>
                Gas Used % =
              </p>
              <p>
                (Gas used in this block) / (Target gas usage in this block)
              </p>
            </div>
          </InfoTooltip>
        }
      />,
    },
    {
      className: style.baseFeeColumn,
      header: <HeaderCell
        header="Base Fee"
        tooltipClassName="top-[40px]"
        tooltipContent={
          <InfoTooltip fromBottom>
            <div className="flex w-[224px] text-wrap">
              <p>
                The minimum number of gweis that a transaction must pay for every gas used to be
                included in this block. It is adjusted based on the network demand to optimise
                transaction processing.
              </p>
            </div>
          </InfoTooltip>
        } />,
    },
    {
      className: style.gasFeeBurntColumn,
      header: <HeaderCell
        header="Gas Fee Burnt"
        tooltipContent={
          <InfoTooltip fromBottom>
            <div className="flex flex-col w-[224px] text-wrap">
              <p>
                The gas fee burnt in a block refers to the portion of transaction fees permanently removed from
                circulation, reducing the total supply and potentially increasing the value of the remaining tokens.
              </p>
              <br />
              <p>
                Gas Fee Burnt =
              </p>
              <p>
                (Total Gas Used) * (Base Fee) * 0.8
              </p>
              <br />
              <p>
                where the Total Gas Used = Receipt + Inclusion Cost
              </p>
            </div>
          </InfoTooltip>
        }
      />,
    },
  ]

  function defineCells(data: any) {
    if (!data) return []

    const rows = []

    for (let i = 0; i < data.length; i++) {
      let { base_fee, block_hash, gas_used, height, proposer, timestamp, tx_count } = data[i]
      height = <Link href={`/block/height/${height}`}>{height}</Link>
      block_hash =
        <HashCell withCopyButton hash={block_hash} url={`/block/hash/${block_hash}`}
                  shortenHashOptions={{ showFirstAndLast: 5 }} />
      proposer = <HashCell withCopyButton hash={proposer} url={`/address/${proposer}`}
                           shortenHashOptions={{ showFirstAndLast: 5 }} />
      const utcTime = formatInTimeZone(timestamp * 1000, "UTC", "yyyy-MM-dd HH:mm:ss")
      const ageTime = formatDistanceToNowStrict(timestamp, { addSuffix: true })
      timestamp = timestamp * 1000
      tx_count = <Link href="/">3</Link>
      const gas_fee_burnt = <div>{(10 * 20 * 0.8)} Gwei</div>
      const epoch_reward = <div>5 ETH</div>
      base_fee = <div>{base_fee} Gwei</div>
      gas_used = <div> 10 GAS (20%)</div>
      rows.push([height, block_hash, utcTime, ageTime, tx_count, proposer, epoch_reward, gas_used, base_fee, gas_fee_burnt])
    }
    return rows
  }

  function setCurrentPage(number: number) {
    router.push(`${pathname}?${createQueryString("page", number.toString())}`, { scroll: false })
  }

  function setPageLimit(limit: number) {
    router.push(`${pathname}?${createQueryString("limit", limit.toString())}`, { scroll: false })
  }

  // useEffect(() => {
  //   async function fetchData() {
  //     setLoading(true)
  //     await client.getBlockSummariesBy("latest", "", limit, "desc")
  //       .then(data => setRows(defineCells(data)))
  //       .catch(err => console.log(err))
  //     setLoading(false)
  //   }
  //
  //   fetchData()
  // }, [client, network, limit])

  useEffect(() => {
    setLoading(true)
    setRows(defineCells(placeholderBlocks))
    setLoading(false)
  }, [])


  return <>
    <div className={tableTopStyle.tableTopGrid}>
      <div className={tableTopStyle.tableTitleDiv}>
        <h2>Blocks</h2>
      </div>
      <div className={tableTopStyle.tableSearchBar}>
        <SearchBar hideFilters />
      </div>
      <div className={tableTopStyle.tableItemsCountDiv}>
        <h3>A total of {blocksCount.toLocaleString("en-US")} blocks found</h3>
      </div>
      <div className={tableTopStyle.tablePaginationDiv}>
        <Pagination totalPages={50120} currentPage={parseInt(page)}
                    setCurrentPage={setCurrentPage} />
      </div>
      <div className={tableTopStyle.tablePageLimitDiv}>
        <PageLimitButton setPageLimit={setPageLimit} pageLimit={parseInt(limit)} />
      </div>
    </div>

    <div className="w-full">
      <div ref={markerRef} className="sticky" />
      <Table
        onScroll={handleScrollX}
        className={
          cn(style.blocksTable,
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
        {loading ? <Table.BodySkeleton columns={columns} rowCount={parseInt(limit)} /> :
          <Table.Body rows={rows} columns={columns} />}
      </Table>
    </div>
    <div className="flex justify-end">
      <div className="flex flex-col gap-2">
        <Pagination totalPages={5} currentPage={parseInt(page)}
                    setCurrentPage={setCurrentPage} />
        <div onClick={() => window.scroll({ top: 0 })}
             className="flex justify-end items-center gap-3 cursor-pointer text-[var(--accent-primary)]">Back to
          Top <ChevronsUp /></div>
      </div>
    </div>
  </>
}