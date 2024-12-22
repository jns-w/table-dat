import { TransactionsTable } from "@/app/transactions/transactions-table"
import { Suspense } from "react";

export default function TransactionsPage() {

  return <main className="flex flex-col mt-[48px] mb-[64px] w-full items-center">
    <div className="w-full max-w-[var(--max-width)] flex justify-center px-[var(--global-padding)]">
      <div className="flex flex-col justify-center gap-10 w-full">
        <Suspense>
          <TransactionsTable />
        </Suspense>
      </div>
    </div>
  </main>
}