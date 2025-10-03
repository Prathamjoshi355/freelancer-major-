"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"

type Message = {
  id: string
  author: "me" | "them"
  text: string
  time: string
}

export function ChatThread({ initial }: { initial: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initial)
  const [text, setText] = useState("")
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function send() {
    const trimmed = text.trim()
    if (!trimmed) return
    const now = new Date()
    setMessages((m) => [
      ...m,
      { id: String(now.getTime()), author: "me", text: trimmed, time: now.toLocaleTimeString() },
    ])
    setText("")
  }

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="h-[60vh] md:h-[calc(100vh-16rem)] px-2">
        <div className="space-y-3 py-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.author === "me" ? "justify-end" : "justify-start"}`}
              aria-label={m.author === "me" ? "Your message" : "Partner message"}
            >
              <div
                className={`max-w-[80%] rounded-md border px-3 py-2 text-sm ${
                  m.author === "me" ? "bg-primary text-primary-foreground" : "bg-background"
                }`}
              >
                <p className="whitespace-pre-wrap text-pretty">{m.text}</p>
                <span className="mt-1 block text-[10px] opacity-70">{m.time}</span>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </ScrollArea>
      <div className="mt-auto flex items-center gap-2 p-2">
        <Input
          placeholder="Type a message"
          aria-label="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send()
          }}
        />
        <Button onClick={send} aria-label="Send message">
          <Send className="mr-2 h-4 w-4" />
          Send
        </Button>
      </div>
    </div>
  )
}
