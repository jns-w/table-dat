import { ReceivedTransactionsTable } from "@/app/address/[hash]/received-transactions-table"
import { SentTransactionsTable } from "@/app/address/[hash]/sent-transactions-table"

import style from "./address-page.module.scss"

export default function AddressPage() {

  return <main className={style.addressPageMain}>
    <div
      className={style.addressDiv}>
      <div className="flex w-full">
        <h2>Account Details</h2>
      </div>
      <div className={style.tablesGrid}>
        <SentTransactionsTable />
        <ReceivedTransactionsTable />
      </div>
    </div>
  </main>
}
