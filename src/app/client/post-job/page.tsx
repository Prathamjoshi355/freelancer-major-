import { PageContainer } from "@/components/page"
export default function PostJobPage() {
  return (
    <PageContainer title="Post a Job" description="Create and publish a new job listing.">
      <form className="grid gap-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" rows={5} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Budget</label>
            <input className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Category</label>
            <input className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
        </div>
        <button className="rounded-md bg-primary px-4 py-2 text-white">Publish</button>
      </form>
    </PageContainer>
  )
}
