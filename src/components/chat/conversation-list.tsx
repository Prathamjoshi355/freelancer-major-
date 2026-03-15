"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

type Conversation = {
  id: string
  name: string
  lastMessage: string
  time: string
}

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: {
  conversations: Conversation[]
  selectedId?: string | null
  onSelect: (id: string) => void
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="p-3">
        <Input placeholder="Search messages" aria-label="Search messages" />
      </div>
      <ScrollArea className="h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)]">
        <ul className="px-2">
          {conversations.map((c) => {
            const active = c.id === selectedId
            return (
              <li key={c.id}>
                <button
                  onClick={() => onSelect(c.id)}
                  className={`w-full rounded-md p-3 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                    active ? "bg-muted" : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/diverse-avatars.png" alt={`${c.name} avatar`} />
                      <AvatarFallback>{c.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{c.name}</p>
                      <p className="truncate text-sm text-muted-foreground">{c.lastMessage}</p>
                    </div>
                    <span className="ml-auto shrink-0 text-xs text-muted-foreground">{c.time}</span>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </ScrollArea>
    </div>
  )
}
