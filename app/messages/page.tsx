"use client"

import { useMemo, useState } from "react"
import { ConversationList } from "@/components/chat/conversation-list"
import { ChatThread } from "@/components/chat/chat-thread"
import { Card } from "@/components/ui/card"

export default function MessagesPage() {
  const conversations = useMemo(
    () => [
      { id: "c1", name: "Acme Inc.", lastMessage: "Looking great!", time: "10:24" },
      { id: "c2", name: "Nova Labs", lastMessage: "Can we revise the hero?", time: "Yesterday" },
      { id: "c3", name: "Bluebird Co", lastMessage: "Proposal received.", time: "Mon" },
    ],
    [],
  )
  const [selected, setSelected] = useState<string>(conversations[0]?.id || null)

  const initialMessages =
    selected === "c2"
      ? [
          { id: "m1", author: "them" as const, text: "Can we revise the hero?", time: "09:12" },
          { id: "m2", author: "me" as const, text: "Sure, pushing updates in an hour.", time: "09:20" },
        ]
      : [
          { id: "m1", author: "them" as const, text: "Thanks for the proposal!", time: "10:15" },
          { id: "m2", author: "me" as const, text: "Let me know if you have questions.", time: "10:22" },
        ]

  return (
    <main className="container mx-auto p-4 md:p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <ConversationList conversations={conversations} selectedId={selected} onSelect={setSelected} />
        </Card>
        <Card className="md:col-span-2">
          <div className="p-3">
            <h1 className="text-lg font-semibold">Conversation</h1>
          </div>
          <div className="px-3 pb-3">
            <ChatThread initial={initialMessages as any} />
          </div>
        </Card>
      </div>
    </main>
  )
}
