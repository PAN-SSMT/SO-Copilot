import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import * as data from '../data'

type MaturityLevel = 'G' | 'S' | 'B' | '-'
type PriorityItem = {
  customerId: string
  urgency: 'high' | 'medium'
  description: string
  dueLabel: string
  isOverdue?: boolean
}

const TODAY = new Date('2026-04-15T00:00:00')

const customerSessionDates: Record<string, { last: string | null; next: string | null }> = {
  'cust-001': { last: '2026-04-01', next: '2026-04-29' },
  'cust-002': { last: '2026-03-10', next: '2026-04-22' },
  'cust-003': { last: null, next: '2026-04-21' },
  'cust-004': { last: '2026-04-05', next: '2026-04-23' },
  'cust-005': { last: '2026-04-10', next: '2026-04-24' },
  'cust-006': { last: '2026-04-08', next: '2026-04-20' },
  'cust-007': { last: '2026-04-12', next: '2026-04-19' },
  'cust-008': { last: '2026-04-11', next: '2026-04-18' },
  'cust-009': { last: '2026-02-28', next: '2026-04-30' },
  'cust-010': { last: '2026-02-01', next: '2026-04-28' },
  'cust-011': { last: null, next: '2026-04-22' },
}

const customerMaturity: Record<string, [MaturityLevel, MaturityLevel, MaturityLevel]> = {
  'cust-001': ['G', 'S', 'S'],
  'cust-002': ['B', 'B', '-'],
  'cust-003': ['-', '-', '-'],
  'cust-004': ['S', 'S', 'B'],
  'cust-005': ['S', 'S', 'B'],
  'cust-006': ['S', 'B', 'B'],
  'cust-007': ['S', 'B', 'S'],
  'cust-008': ['G', 'G', 'G'],
  'cust-009': ['S', 'B', 'B'],
  'cust-010': ['B', '-', '-'],
  'cust-011': ['S', 'S', 'B'],
}

const priorities: PriorityItem[] = [
  {
    customerId: 'cust-003',
    urgency: 'medium',
    description: 'Customer kickoff is Tuesday. Prepare kickoff deck and opening session plan.',
    dueLabel: 'Due Apr 21',
  },
  {
    customerId: 'cust-002',
    urgency: 'high',
    description: 'No session in 5 weeks. Schedule session immediately or escalate through AM.',
    dueLabel: 'Overdue',
    isOverdue: true,
  },
  {
    customerId: 'cust-005',
    urgency: 'high',
    description: 'LoE is at 80% after 3 months. Discuss realignment with CSE Manager.',
    dueLabel: 'Due Apr 18',
  },
  {
    customerId: 'cust-004',
    urgency: 'high',
    description: 'Renewal is within 6 months. Align with AM on renewal conversation and blockers.',
    dueLabel: 'Due Apr 24',
  },
  {
    customerId: 'cust-010',
    urgency: 'high',
    description: 'Cadence violation risk is rising (10 weeks). Re-engage customer this week.',
    dueLabel: 'Overdue',
    isOverdue: true,
  },
  {
    customerId: 'cust-011',
    urgency: 'medium',
    description: 'Customer kickoff is next week. Review historical maturity assessments first.',
    dueLabel: 'Due Apr 20',
  },
  {
    customerId: 'cust-009',
    urgency: 'medium',
    description: 'Specialist support request is still pending. Follow up with manager.',
    dueLabel: 'Due Apr 17',
  },
  {
    customerId: 'cust-006',
    urgency: 'medium',
    description: 'Track open Sev 2 support blockers and update alternative session plan.',
    dueLabel: 'Due Apr 19',
  },
]

function formatDate(date: string | null) {
  if (!date) return '—'

  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function toTitleCase(text: string) {
  return text
    .split('_')
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ')
}

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1)}...`
}

function monthsUntil(date: string) {
  const renewalDate = new Date(`${date}T00:00:00`)
  const diffMs = renewalDate.getTime() - TODAY.getTime()
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24 * 30))
}

export function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const customerById = useMemo(
    () => new Map(data.customers.map((customer) => [customer.id, customer])),
    [],
  )

  const engagementByCustomerId = useMemo(
    () => new Map(data.engagements.map((engagement) => [engagement.customerId, engagement])),
    [],
  )

  const cadenceViolationCustomerIds = useMemo(
    () =>
      new Set(
        data.riskAlerts
          .filter((risk) => risk.type === 'cadence_violation')
          .map((risk) => risk.customerId),
      ),
    [],
  )

  const isEscalationRelatedRisk = (risk: (typeof data.riskAlerts)[number]) =>
    risk.type.includes('blocker') ||
    risk.recommendedAction.toLowerCase().includes('escalat') ||
    risk.resolutionNotes.toLowerCase().includes('escalat')

  const escalationCountByCustomerId = useMemo(() => {
    const counts = new Map<string, number>()
    data.riskAlerts.forEach((risk) => {
      if (isEscalationRelatedRisk(risk)) {
        counts.set(risk.customerId, (counts.get(risk.customerId) ?? 0) + 1)
      }
    })
    return counts
  }, [])

  const healthCounts = useMemo(
    () =>
      data.customers.reduce(
        (acc, customer) => {
          acc[customer.healthStatus] += 1
          return acc
        },
        { green: 0, amber: 0, red: 0 },
      ),
    [],
  )

  const renewalsUnderSixMonthsCount = useMemo(
    () => data.customers.filter((customer) => monthsUntil(customer.renewalDate) < 6).length,
    [],
  )

  const sortedCustomers = useMemo(() => {
    const healthOrder: Record<(typeof data.customers)[number]['healthStatus'], number> = {
      red: 0,
      amber: 1,
      green: 2,
    }

    return [...data.customers]
      .filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
      )
      .sort((a, b) => {
        const healthCompare = healthOrder[a.healthStatus] - healthOrder[b.healthStatus]
        if (healthCompare !== 0) return healthCompare

        const aNext = customerSessionDates[a.id]?.next
          ? new Date(`${customerSessionDates[a.id].next}T00:00:00`).getTime()
          : Number.MAX_SAFE_INTEGER
        const bNext = customerSessionDates[b.id]?.next
          ? new Date(`${customerSessionDates[b.id].next}T00:00:00`).getTime()
          : Number.MAX_SAFE_INTEGER
        return aNext - bNext
      })
  }, [searchTerm])

  const risksByCustomer = useMemo(() => {
    const grouped = new Map<string, (typeof data.riskAlerts)>()
    data.riskAlerts.forEach((risk) => {
      const existing = grouped.get(risk.customerId) ?? []
      existing.push(risk)
      grouped.set(risk.customerId, existing)
    })
    return grouped
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Portfolio Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">
          {data.currentEngineer.name} ({data.currentEngineer.region.toUpperCase()}) reporting to{' '}
          {data.currentManager.name}
        </p>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Total Customers
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{data.customers.length}</p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Health</p>
          <div className="mt-2 flex gap-2">
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
              G {healthCounts.green}
            </span>
            <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
              A {healthCounts.amber}
            </span>
            <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700">
              R {healthCounts.red}
            </span>
          </div>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Sessions This Week
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">3</p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Overdue Tasks</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">2</p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Upcoming PSRs</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">2</p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Renewals &lt; 6 months
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{renewalsUnderSixMonthsCount}</p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Active Escalations
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {data.riskAlerts.filter(isEscalationRelatedRisk).length}
          </p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Cadence Violations
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {data.riskAlerts.filter((risk) => risk.type === 'cadence_violation').length}
          </p>
        </article>
      </section>

      <div className="grid gap-6 xl:grid-cols-10">
        <div className="space-y-6 xl:col-span-7">
          <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Today&apos;s Priorities</h2>
            <ul className="mt-4 divide-y divide-slate-100">
              {priorities.map((item) => {
                const customer = customerById.get(item.customerId)
                if (!customer) return null

                return (
                  <li
                    key={`${item.customerId}-${item.description}`}
                    className="flex cursor-pointer items-start gap-3 py-3 transition hover:bg-slate-50"
                  >
                    <span
                      className={`mt-2 h-2.5 w-2.5 rounded-full ${
                        item.urgency === 'high' ? 'bg-red-500' : 'bg-amber-500'
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">{customer.name}</span> -{' '}
                        {item.description}
                      </p>
                    </div>
                    {item.isOverdue ? (
                      <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                        Overdue
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                        {item.dueLabel}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-slate-900">My Customers</h2>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by customer name..."
                className="h-9 rounded-md border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-3 py-2 font-medium">Customer</th>
                    <th className="px-3 py-2 font-medium">Health</th>
                    <th className="px-3 py-2 font-medium">Phase</th>
                    <th className="px-3 py-2 font-medium">Last Session</th>
                    <th className="px-3 py-2 font-medium">Next Session</th>
                    <th className="px-3 py-2 font-medium">Cadence</th>
                    <th className="px-3 py-2 font-medium">Maturity</th>
                    <th className="px-3 py-2 font-medium">LoE</th>
                    <th className="px-3 py-2 font-medium">Renewal</th>
                    <th className="px-3 py-2 font-medium">Escalations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sortedCustomers.map((customer) => {
                    const engagement = engagementByCustomerId.get(customer.id)
                    const loe = engagement?.loePercentage ?? 0
                    const maturity = customerMaturity[customer.id] ?? ['-', '-', '-']
                    const hasCadenceViolation = cadenceViolationCustomerIds.has(customer.id)
                    const monthsRemaining = monthsUntil(customer.renewalDate)

                    return (
                      <tr key={customer.id} className="hover:bg-slate-50">
                        <td className="px-3 py-3">
                          <Link
                            to={`/customers/${customer.id}`}
                            className="font-semibold text-blue-600 hover:text-blue-700"
                          >
                            {customer.name}
                          </Link>
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${
                              customer.healthStatus === 'green'
                                ? 'bg-emerald-100 text-emerald-700'
                                : customer.healthStatus === 'amber'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-rose-100 text-rose-700'
                            }`}
                          >
                            {customer.healthLabel}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-slate-700">
                          {toTitleCase(customer.lifecyclePhase)}
                        </td>
                        <td className="px-3 py-3 text-slate-700">
                          {formatDate(customerSessionDates[customer.id]?.last ?? null)}
                        </td>
                        <td className="px-3 py-3 text-slate-700">
                          {formatDate(customerSessionDates[customer.id]?.next ?? null)}
                        </td>
                        <td className="px-3 py-3">
                          {hasCadenceViolation ? (
                            <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                              Overdue
                            </span>
                          ) : (
                            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                              On Track
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1">
                            {maturity.map((level, idx) => (
                              <span
                                key={`${customer.id}-${idx}`}
                                className={`inline-flex h-6 w-6 items-center justify-center rounded text-xs font-semibold ${
                                  level === 'G'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : level === 'S'
                                      ? 'bg-slate-100 text-slate-700'
                                      : level === 'B'
                                        ? 'bg-orange-100 text-orange-700'
                                        : 'bg-slate-50 text-slate-400'
                                }`}
                              >
                                {level}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="w-28">
                            <div className="h-2 rounded-full bg-slate-100">
                              <div
                                className={`h-2 rounded-full ${
                                  loe > 80
                                    ? 'bg-red-500'
                                    : loe >= 60
                                      ? 'bg-amber-500'
                                      : 'bg-emerald-500'
                                }`}
                                style={{ width: `${Math.min(loe, 100)}%` }}
                              />
                            </div>
                            <p className="mt-1 text-xs text-slate-600">{loe}%</p>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <p
                            className={`text-sm ${
                              monthsRemaining < 6 ? 'font-semibold text-red-700' : 'text-slate-700'
                            }`}
                          >
                            {formatDate(customer.renewalDate)}
                          </p>
                          <p className="text-xs text-slate-500">
                            {monthsRemaining <= 0 ? 'Due now' : `${monthsRemaining} mo`}
                          </p>
                        </td>
                        <td className="px-3 py-3 text-slate-700">
                          {escalationCountByCustomerId.get(customer.id) ?? '—'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <aside className="xl:col-span-3">
          <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Active Risks</h2>
            <div className="mt-4 max-h-[42rem] space-y-4 overflow-y-auto pr-1">
              {[...risksByCustomer.entries()].map(([customerId, risks]) => {
                const customerName = customerById.get(customerId)?.name ?? customerId
                return (
                  <div key={customerId} className="rounded-md border border-slate-100 p-3">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {customerName} ({risks.length})
                    </h3>
                    <ul className="mt-2 space-y-2">
                      {risks.map((risk) => (
                        <li key={risk.id} className="rounded-md bg-slate-50 p-2">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-semibold text-slate-700">
                              {toTitleCase(risk.type)}
                            </p>
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                risk.severity === 'high'
                                  ? 'bg-red-100 text-red-700'
                                  : risk.severity === 'medium'
                                    ? 'bg-amber-100 text-amber-700'
                                    : 'bg-yellow-100 text-yellow-700'
                              }`}
                            >
                              {risk.severity}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-slate-600">
                            {truncateText(risk.description, 100)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
