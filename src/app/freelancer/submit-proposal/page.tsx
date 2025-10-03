import { PageContainer } from "@/components/page"
export default function SubmitProposalPage() {
  return (
    <PageContainer title="Submit Proposal" description="Apply to a job with your best pitch.">
      <form className="grid gap-4">
        <div>
          <label className="block text-sm font-medium">Cover letter</label>
          <textarea className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" rows={6} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Proposed budget</label>
            <input className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Timeline (days)</label>
            <input className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
        </div>
        <button className="rounded-md bg-primary px-4 py-2 text-white">Send proposal</button>
      </form>
    </PageContainer>
  )
}
