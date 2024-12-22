import { ReceivedTransactionsTable } from "@/app/address/[hash]/received-transactions-table"
import { SentTransactionsTable } from "@/app/address/[hash]/sent-transactions-table"
export default function AddressPage() {

  // return (
  //   <main className="flex flex-col w-full px-[var(--global-padding)] justify-center items-center h-[calc(100dvh-206px)] text-center">
  //     page is currently in development, please check back later
  //   </main>
  // )
  return <div className="flex flex-col items-center pt-24 gap-7 min-h-screen">
    <div className="flex gap-3">
      <SentTransactionsTable />
      <ReceivedTransactionsTable />
    </div>
  </div>
}
