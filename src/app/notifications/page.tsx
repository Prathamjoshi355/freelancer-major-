import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function NotificationsPage() {
  const items = [
    {
      id: 1,
      type: "proposal",
      text: "New proposal from Jordan Doe for 'Dashboard UI revamp'",
      time: "2m",
      unread: true,
    },
    { id: 2, type: "message", text: "Acme Inc. sent you a message", time: "1h", unread: true },
    { id: 3, type: "payment", text: "Invoice #1021 paid", time: "Yesterday", unread: false },
  ]

  return (
    <main className="container mx-auto max-w-3xl p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notifications</CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {items.map((n) => (
            <div key={n.id} className={`flex items-start justify-between gap-3 py-4 ${n.unread ? "bg-muted/50" : ""}`}>
              <div>
                <p className="text-pretty leading-6">{n.text}</p>
                <p className="text-xs text-muted-foreground">{n.time}</p>
              </div>
              <div>{n.unread ? <Badge>New</Badge> : <Badge variant="secondary">Read</Badge>}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  )
}
