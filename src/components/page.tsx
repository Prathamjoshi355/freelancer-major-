import type React from "react"

type Props = {
  title: string
  description?: string
  children?: React.ReactNode
  actions?: React.ReactNode
}

export function PageContainer({ title, description, actions, children }: Props) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-balance text-2xl font-semibold">{title}</h1>
          {description ? <p className="text-sm text-muted">{description}</p> : null}
        </div>
        {actions}
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-4">{children}</div>
    </section>
  )
}
