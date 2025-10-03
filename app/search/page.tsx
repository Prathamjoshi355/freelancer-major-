"use client"

import { useState } from "react"
import { SearchFilters, type SearchMode } from "@/components/search/search-filters"
import { SearchResults } from "@/components/search/search-results"

export default function SearchPage() {
  const [params, setParams] = useState<{ mode: SearchMode; q: string; category: string; remoteOnly: boolean }>({
    mode: "freelancers",
    q: "",
    category: "all",
    remoteOnly: false,
  })

  return (
    <main className="container mx-auto p-4 md:p-6">
      <h1 className="mb-3 text-balance text-2xl font-semibold">Search</h1>
      <SearchFilters onChange={setParams} />
      <div className="mt-4">
        <SearchResults mode={params.mode} q={params.q} category={params.category} remoteOnly={params.remoteOnly} />
      </div>
    </main>
  )
}
