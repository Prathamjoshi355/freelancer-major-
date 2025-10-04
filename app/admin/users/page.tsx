import Link from "next/link"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Badge } from "../../../components/ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"

const rows = [
  { name: "Jane Cooper", role: "Client", email: "jane@acme.com", status: "Active" },
  { name: "Cody Fisher", role: "Freelancer", email: "cody@devs.io", status: "Suspended" },
  { name: "Marvin McKinney", role: "Freelancer", email: "marvin@studio.dev", status: "Active" },
]

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-sm text-muted-foreground">Manage freelancers and clients.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild size="sm">
            <Link href="/admin/users?create=1">Add User</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3 sm:grid-cols-3">
            <div className="grid gap-1.5">
              <Label htmlFor="search">Search</Label>
              <Input id="search" placeholder="Name or email" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="role">Role</Label>
              <Input id="role" placeholder="Client or Freelancer" />
            </div>
            <div className="grid items-end">
              <Button type="submit">Apply</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Latest registered users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.email}>
                <TableCell className="font-medium">{r.name}</TableCell>
                <TableCell>{r.role}</TableCell>
                <TableCell className="truncate">{r.email}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={r.status === "Active" ? "secondary" : "outline"}>{r.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
