"use client"
import { SkeletonBlock } from "@/components/skeletons/text-block-skeleton/skeleton-block"
import { ReactNode, RefObject } from "react"
import { motion } from "motion/react"
import { clsx } from "clsx"

import style from "./table.module.scss"

export type TableProps = {
  children: ReactNode
  className?: string
  onScroll?: (event: any) => void
  ref?: RefObject<HTMLTableElement>
}

export type TableHeaderProps = {
  className?: string
  columns: TableColumn[]
  height?: string
  style?: any
}

export type TableBodyProps = {
  className?: string
  columns: TableColumn[]
  height?: string
  rows: any
}

type TableColumn = {
  className?: string
  header: ReactNode | string
  width?: string
}

type TableSkeletonProps = {
  className?: string
  columns: TableColumn[]
  rowCount: number
}

/**
 * Table component
 * @param props.children - ReactNode
 * @param props.className - string
 * @param props.onScroll - (event: any) => void
 * @param props.ref - RefObject<HTMLTableElement>
 */

export function Table(props: TableProps) {
  return <div
    className={style.tableWrapper}
    {...props.onScroll && { onScroll: props.onScroll }}
  >
    <table
      className={clsx(
        style.table,
        props.className,
      )}>
      {props.children}
    </table>
  </div>
}

Table.Header = TableHeader
Table.Body = TableBody
Table.Footer = TableFooter
Table.BodySkeleton = TableBodySkeleton


export function TableHeader(props: TableHeaderProps) {
  return <motion.thead
    style={props.style}
    className={props.className}
  >
    <tr className={clsx(style.tableRow, style.headerRow)}>
      {props.columns.map((column: any, index: number) => {
        return <th key={`header-${index}`}
                   className={clsx(
                     column.className,
                     column.headerClassName,
                   )}
        >
          <div
            {...column.fn && { onClick: column.fn }}
          >
            {column.header}
          </div>
        </th>
      })}
    </tr>
  </motion.thead>
}

export function TableBody(props: TableBodyProps) {
  return <tbody className={props.className}>
  {
    props.rows?.map((row: any, index: number) => {
      return <tr key={`row-${index}`} className={clsx(style.tableRow)}>
        {
          row.map((cell: any, index: number) => (
            <td key={`cell-${index}`}
                className={props.columns[index].className}
            >
              {cell}
            </td>
          ))}
      </tr>
    })
  }
  </tbody>
}

export function TableFooter(props: { children: ReactNode }) {
  return <tfoot>
  <tr className={clsx(style.footerRow)}>
    <td>
      {props.children}
    </td>
  </tr>
  </tfoot>
}

export function TableBodySkeleton(props: TableSkeletonProps) {
  return <tbody className={props.className}>
  {
    Array.from({ length: props.rowCount }).map((_, index) => {
      return <tr key={`row-${index}`} className={style.tableRow}>
        {
          props.columns.map((column: any, index: number) => <td key={`cell-${index}`} className={column.className}
          >
            <SkeletonBlock /></td>)
        }
      </tr>
    })
  }
  </tbody>
}