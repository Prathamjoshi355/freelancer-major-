import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { TrendingUp, Briefcase, FileText, DollarSign, Clock, AlertCircle } from "lucide-react"

interface Stat {
  label: string
  value: string | number
  trend: string
  color: string
  icon: string
}

interface Proposal {
  id: number
  title: string
  count: number
  status: string
  time: string
}

interface Payment {
  id: number
  amount: number
  project: string
  due: string
  status: string
}

interface DashboardData {
  stats: Stat[]
  recentProposals: Proposal[]
  upcomingPayments: Payment[]
}

interface ClientDashboardPageProps {
  data?: DashboardData
}

const iconMap = {
  briefcase: Briefcase,
  fileText: FileText,
  clock: Clock,
  trendingUp: TrendingUp,
  alertCircle: AlertCircle,
  dollarSign: DollarSign,
}

// Default mock data for preview
const defaultData: DashboardData = {
  stats: [
    { label: "Posted Jobs", value: 4, icon: "briefcase", trend: "+2 this month", color: "text-blue-600" },
    { label: "Proposals", value: 18, icon: "fileText", trend: "+5 new", color: "text-purple-600" },
    { label: "Ongoing Projects", value: 2, icon: "clock", trend: "On track", color: "text-emerald-600" },
    { label: "Active Contracts", value: 2, icon: "trendingUp", trend: "All active", color: "text-orange-600" },
    { label: "Payments Due", value: "$1,250", icon: "alertCircle", trend: "2 invoices", color: "text-red-600" },
    { label: "Total Spend", value: "$8,430", icon: "dollarSign", trend: "+12% vs last month", color: "text-green-600" },
  ],
  recentProposals: [
    { id: 1, title: "Landing page redesign", count: 3, status: "active", time: "2 hours ago" },
    { id: 2, title: "iOS bug fix", count: 1, status: "review", time: "5 hours ago" },
    { id: 3, title: "Shopify theme tweaks", count: 2, status: "active", time: "1 day ago" },
    { id: 4, title: "API integration", count: 4, status: "active", time: "2 days ago" },
  ],
  upcomingPayments: [
    { id: 1023, amount: 450.00, project: "Landing page design", due: "Due in 3 days", status: "pending" },
    { id: 1022, amount: 800.00, project: "Mobile app development", due: "Due in 5 days", status: "pending" },
    { id: 1021, amount: 350.00, project: "SEO optimization", due: "Due in 7 days", status: "scheduled" },
  ]
}

export default function ClientDashboardPage({ data = defaultData }: ClientDashboardPageProps) {
  const { stats, recentProposals, upcomingPayments } = data

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Client Dashboard
          </h1>
          <p className="text-slate-600">Welcome back! Here's what's happening with your projects today.</p>
        </div>

        {/* Stats Grid */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon as keyof typeof iconMap] || Briefcase
            return (
              <Card key={stat.label} className="group relative overflow-hidden border-slate-200 transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="relative flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">{stat.label}</CardTitle>
                  <div className={`rounded-lg bg-slate-50 p-2 group-hover:bg-white transition-colors ${stat.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                  <p className="text-xs text-slate-500 mt-2">{stat.trend}</p>
                </CardContent>
              </Card>
            )
          })}
        </section>

        {/* Main Content Grid */}
        <section className="grid gap-6 lg:grid-cols-3">
          {/* Recent Proposals - Takes 2 columns */}
          <Card className="lg:col-span-2 border-slate-200 shadow-md">
            <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-purple-600" />
                Recent Proposals
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {recentProposals.map((proposal) => (
                  <div
                    key={proposal.id}
                    className="group flex items-center justify-between rounded-lg border border-slate-100 p-4 transition-all hover:border-purple-200 hover:bg-purple-50/50 cursor-pointer"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium text-slate-900 group-hover:text-purple-700 transition-colors">
                          {proposal.title}
                        </h4>
                        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700">
                          {proposal.count} new
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{proposal.time}</p>
                    </div>
                    <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm border border-slate-200 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all">
                      Review
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Payments - Takes 1 column */}
          <Card className="border-slate-200 shadow-md">
            <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
                Upcoming Payments
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {upcomingPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="group rounded-lg border border-slate-100 p-4 transition-all hover:border-green-200 hover:bg-green-50/50 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-xs font-medium text-slate-500">Invoice #{payment.id}</div>
                        <div className="text-lg font-bold text-slate-900 group-hover:text-green-700 transition-colors">
                          ${payment.amount.toFixed(2)}
                        </div>
                      </div>
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                        payment.status === 'pending' 
                          ? 'bg-orange-100 text-orange-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">{payment.project}</p>
                    <p className="text-xs text-slate-500">{payment.due}</p>
                  </div>
                ))}
                <button className="w-full rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:from-green-700 hover:to-emerald-700 transition-all">
                  View All Payments
                </button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Actions */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Post New Job", icon: Briefcase, color: "from-blue-600 to-blue-700" },
            { label: "Review Proposals", icon: FileText, color: "from-purple-600 to-purple-700" },
            { label: "Manage Contracts", icon: TrendingUp, color: "from-orange-600 to-orange-700" },
            { label: "Payment History", icon: DollarSign, color: "from-green-600 to-green-700" },
          ].map((action) => {
            const Icon = action.icon
            return (
              <button
                key={action.label}
                className={`group relative overflow-hidden rounded-xl bg-gradient-to-r ${action.color} p-6 text-left text-white shadow-lg transition-all hover:shadow-xl hover:scale-105`}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                <Icon className="h-8 w-8 mb-3 opacity-90" />
                <div className="font-semibold">{action.label}</div>
              </button>
            )
          })}
        </section>
      </div>
    </div>
  )
}