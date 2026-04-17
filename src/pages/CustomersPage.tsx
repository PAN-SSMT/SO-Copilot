import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import * as data from '../data'

type SortOption = 'name' | 'health' | 'arr' | 'renewal' | 'lastSession'
type HealthFilter = 'all' | 'green' | 'amber' | 'red'

const TODAY = new Date('2026-04-15T00:00:00')

function formatDate(date: string | null) {
  if (!date) return '—'
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function monthsUntil(date: string) {
  const target = new Date(`${date}T00:00:00`)
  const diffMs = target.getTime() - TODAY.getTime()
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24 * 30))
}

function toTitleCase(value: string) {
  return value
    .split('_')
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ')
}

function maturityBadge(level: 'not_started' | 'bronze' | 'silver' | 'gold') {
  if (level === 'gold') return { label: 'G', classes: 'bg-yellow-100 text-yellow-800' }
  if (level === 'silver') return { label: 'S', classes: 'bg-slate-100 text-slate-700' }
  if (level === 'bronze') return { label: 'B', classes: 'bg-orange-100 text-orange-700' }
  return { label: '—', classes: 'bg-slate-50 text-slate-500' }
}

export function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [healthFilter, setHealthFilter] = useState<HealthFilter>('all')
  const [sortBy, setSortBy] = useState<SortOption>('health')

  const latestAssessmentByCustomer = useMemo(() => {
    const map = new Map<string, (typeof data.maturityAssessments)[number]>()
    data.maturityAssessments.forEach((assessment) => {
      const existing = map.get(assessment.customerId)
      if (!existing || new Date(assessment.assessmentDate) > new Date(existing.assessmentDate)) {
        map.set(assessment.customerId, assessment)
      }
    })
    return map
  }, [])

  const engagementByCustomer = useMemo(
    () => new Map(data.engagements.map((engagement) => [engagement.customerId, engagement])),
    [],
  )

  const riskCountByCustomer = useMemo(() => {
    const map = new Map<string, number>()
    data.riskAlerts.forEach((risk) => {
      map.set(risk.customerId, (map.get(risk.customerId) ?? 0) + 1)
    })
    return map
  }, [])

  const cadenceViolationSet = useMemo(
    () => new Set(data.riskAlerts.filter((risk) => risk.type === 'cadence_violation').map((risk) => risk.customerId)),
    [],
  )

  const lastSessionByCustomer = useMemo(() => {
    const map = new Map<string, string | null>()
    data.sessionPlans.forEach((plan) => {
      const deliveredDates = plan.entries
        .filter((entry) => entry.status === 'delivered')
        .map((entry) => entry.targetDate)
      if (deliveredDates.length === 0) {
        map.set(plan.customerId, null)
        return
      }
      const latest = deliveredDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0]
      map.set(plan.customerId, latest)
    })
    return map
  }, [])

  const filteredCustomers = useMemo(() => {
    const healthOrder: Record<(typeof data.customers)[number]['healthStatus'], number> = {
      red: 0,
      amber: 1,
      green: 2,
    }

    const filtered = data.customers.filter((customer) => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      const matchesHealth = healthFilter === 'all' ? true : customer.healthStatus === healthFilter
      return matchesSearch && matchesHealth
    })

    return filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'health') return healthOrder[a.healthStatus] - healthOrder[b.healthStatus]
      if (sortBy === 'arr') return b.arr - a.arr
      if (sortBy === 'renewal') return new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime()

      const aDate = lastSessionByCustomer.get(a.id)
      const bDate = lastSessionByCustomer.get(b.id)
      if (!aDate && !bDate) return 0
      if (!aDate) return 1
      if (!bDate) return -1
      return new Date(bDate).getTime() - new Date(aDate).getTime()
    })
  }, [searchTerm, healthFilter, sortBy, lastSessionByCustomer])

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Customers</h1>
            <p className="mt-1 text-sm text-slate-600">
              Portfolio detail view across all managed accounts.
            </p>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search customers by name..."
            className="h-9 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-700 outline-none lg:w-80"
          />
        </div>

        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'green', label: 'On Track' },
              { id: 'amber', label: 'At Risk' },
              { id: 'red', label: 'Off Track' },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setHealthFilter(option.id as HealthFilter)}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  healthFilter === option.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortOption)}
            className="h-9 rounded-md border border-slate-200 px-3 text-sm text-slate-700 outline-none"
          >
            <option value="name">Sort by Name</option>
            <option value="health">Sort by Health</option>
            <option value="arr">Sort by ARR</option>
            <option value="renewal">Sort by Renewal Date</option>
            <option value="lastSession">Sort by Last Session</option>
          </select>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
        {filteredCustomers.map((customer) => {
          const assessment = latestAssessmentByCustomer.get(customer.id)
          const posture =
            assessment?.pillars.find((pillar) => pillar.pillarName === 'Posture Security')?.overallBadge ??
            'not_started'
          const runtime =
            assessment?.pillars.find((pillar) => pillar.pillarName === 'Runtime Security')?.overallBadge ??
            'not_started'
          const appSec =
            assessment?.pillars.find((pillar) => pillar.pillarName === 'Application Security')?.overallBadge ??
            'not_started'
          const engagement = engagementByCustomer.get(customer.id)
          const riskCount = riskCountByCustomer.get(customer.id) ?? 0
          const lastSessionDate = lastSessionByCustomer.get(customer.id) ?? null
          const renewalMonths = monthsUntil(customer.renewalDate)

          const postureBadge = maturityBadge(posture)
          const runtimeBadge = maturityBadge(runtime)
          const appSecBadge = maturityBadge(appSec)

          return (
            <Link
              key={customer.id}
              to={`/customers/${customer.id}`}
              className="block rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-base font-semibold text-slate-900">{customer.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{customer.industry}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    customer.healthStatus === 'green'
                      ? 'bg-emerald-100 text-emerald-700'
                      : customer.healthStatus === 'amber'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                  }`}
                >
                  {customer.healthLabel}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-slate-500">ARR</p>
                  <p className="font-semibold text-slate-800">{formatCurrency(customer.arr)}</p>
                </div>
                <div>
                  <p className="text-slate-500">Phase</p>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-700">
                    {toTitleCase(customer.lifecyclePhase)}
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-xs text-slate-500">Maturity (P / R / A)</p>
                <div className="mt-1 flex gap-1">
                  <span className={`rounded px-2 py-0.5 text-xs font-semibold ${postureBadge.classes}`}>{postureBadge.label}</span>
                  <span className={`rounded px-2 py-0.5 text-xs font-semibold ${runtimeBadge.classes}`}>{runtimeBadge.label}</span>
                  <span className={`rounded px-2 py-0.5 text-xs font-semibold ${appSecBadge.classes}`}>{appSecBadge.label}</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-xs">
                  <p className="text-slate-500">LoE</p>
                  <p className="font-semibold text-slate-700">{engagement?.loePercentage ?? 0}%</p>
                </div>
                <div className="mt-1 h-2 rounded-full bg-slate-100">
                  <div
                    className={`h-2 rounded-full ${
                      (engagement?.loePercentage ?? 0) > 80
                        ? 'bg-red-500'
                        : (engagement?.loePercentage ?? 0) >= 60
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(engagement?.loePercentage ?? 0, 100)}%` }}
                  />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-slate-500">Renewal</p>
                  <p className={`font-semibold ${renewalMonths < 6 ? 'text-red-700' : 'text-slate-800'}`}>
                    {formatDate(customer.renewalDate)}
                  </p>
                  <p className={renewalMonths < 6 ? 'text-red-700' : 'text-slate-500'}>
                    {renewalMonths} months
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Active Risks</p>
                  {riskCount > 0 ? (
                    <span className="rounded-full bg-red-100 px-2 py-0.5 font-semibold text-red-700">
                      {riskCount}
                    </span>
                  ) : (
                    <span className="font-semibold text-slate-700">0</span>
                  )}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs">
                <p className="text-slate-500">Last Session: <span className="font-semibold text-slate-700">{formatDate(lastSessionDate)}</span></p>
                <span
                  className={`rounded-full px-2 py-0.5 font-semibold ${
                    cadenceViolationSet.has(customer.id)
                      ? 'bg-red-100 text-red-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {cadenceViolationSet.has(customer.id) ? 'Overdue' : 'On Track'}
                </span>
              </div>
            </Link>
          )
        })}
      </section>
    </div>
  )
}
