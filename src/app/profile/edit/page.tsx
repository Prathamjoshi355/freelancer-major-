import { PageContainer } from "@/components/page"
export default function EditProfilePage() {
  return (
    <PageContainer title="Edit Profile" description="Update personal info, bio, and portfolio.">
      <form className="grid gap-4">
        <div>
          <label className="block text-sm font-medium">Display name</label>
          <input className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" rows={5} />
        </div>
        <button className="rounded-md bg-primary px-4 py-2 text-white">Save changes</button>
      </form>
    </PageContainer>
  )
}
