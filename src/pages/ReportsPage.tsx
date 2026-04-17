import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import * as data from '../data'

const TODAY = new Date('2026-04-15T00:00:00')
const SIX_MONTHS_MS = 1000 * 60 * 60 * 24 * 30 * 6

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function monthsUntil(date: string) {
  const target = new Date(`${date}T00:00:00`)
  const diffMs = target.getTime() - TODAY.getTime()
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24 * 30))
}

function maturityBadge(level: 'not_started' | 'bronze' | 'silver' | 'gold') {
  if (level === 'gold') return { label: 'G', classes: 'bg-yellow-100 text-yellow-800' }
  if (level === 'silver') return { label: 'S', classes: 'bg-slate-100 text-slate-700' }
  if (level === 'bronze') return { label: 'B', classes: 'bg-orange-100 text-orange-700' }
  return { label: '—', classes: 'bg-slate-50 text-slate-500' }
}

export function ReportsPage() {
  const [weeklyHighlights, setWeeklyHighlights] = useState(
    [
      '3 sessions delivered this week',
      'TerraVault Mining escalation initiated — deployment blocker',
      'Quantum Dynamics approaching engagement wrap-up — expansion opportunity',
      'NovaTech Industries LoE overrun risk — needs realignment discussion',
      '2 PSRs due this week',
    ].join('\n'),
  )

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

  const pieData = [
    { name: 'Green', value: healthCounts.green, color: '#16a34a' },
    { name: 'Amber', value: healthCounts.amber, color: '#f59e0b' },
    { name: 'Red', value: healthCounts.red, color: '#ef4444' },
  ]

  const averageLoe = Math.round(
    data.engagements.reduce((sum, engagement) => sum + engagement.loePercentage, 0) /
      Math.max(1, data.engagements.length),
  )

  const renewalsNextSixMonths = data.customers.filter(
    (customer) => new Date(`${customer.renewalDate}T00:00:00`).getTime() - TODAY.getTime() <= SIX_MONTHS_MS,
  )

  const escalationSeverityCounts = data.riskAlerts.reduce(
    (acc, risk) => {
      acc[risk.severity] += 1
      return acc
    },
    { high: 0, medium: 0, low: 0 },
  )

  const overdueCustomers = new Set(
    data.riskAlerts.filter((risk) => risk.type === 'cadence_violation').map((risk) => risk.customerId),
  )
  const cadenceCompliancePercent = Math.round(
    ((data.customers.length - overdueCustomers.size) / Math.max(1, data.customers.length)) * 100,
  )

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

  const escalationCountByCustomer = useMemo(() => {
    const map = new Map<string, number>()
    data.riskAlerts.forEach((risk) => {
      map.set(risk.customerId, (map.get(risk.customerId) ?? 0) + 1)
    })
    return map
  }, [])

  const managerTableRows = useMemo(() => {
    const healthOrder: Record<(typeof data.customers)[number]['healthStatus'], number> = {
      red: 0,
      amber: 1,
      green: 2,
    }

    return [...data.customers].sort((a, b) => healthOrder[a.healthStatus] - healthOrder[b.healthStatus])
  }, [])

  const riskTypeCounts = useMemo(() => {
    const counts = new Map<string, number>()
    data.riskAlerts.forEach((risk) => {
      const key = risk.type
        .split('_')
        .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
        .join(' ')
      counts.set(key, (counts.get(key) ?? 0) + 1)
    })
    return [...counts.entries()].map(([type, count]) => ({ type, count }))
  }, [])

  const postSessionComplianceRate = 92

  const averageDaysBetweenSessions = useMemo(() => {
    const perCustomerAverages: number[] = []
    data.sessionPlans.forEach((plan) => {
      const dates = plan.entries
        .filter((entry) => entry.status === 'delivered')
        .map((entry) => new Date(`${entry.targetDate}T00:00:00`).getTime())
        .sort((a, b) => a - b)
      if (dates.length < 2) return
      const diffs = dates.slice(1).map((date, idx) => (date - dates[idx]) / (1000 * 60 * 60 * 24))
      perCustomerAverages.push(diffs.reduce((sum, value) => sum + value, 0) / diffs.length)
    })
    if (perCustomerAverages.length === 0) return 0
    return Math.round(perCustomerAverages.reduce((sum, value) => sum + value, 0) / perCustomerAverages.length)
  }, [])

  const freshAssessmentsCount = data.customers.filter((customer) => {
    const latest = latestAssessmentByCustomer.get(customer.id)
    if (!latest) return false
    const ageMs = TODAY.getTime() - new Date(`${latest.assessmentDate}T00:00:00`).getTime()
    return ageMs <= SIX_MONTHS_MS
  }).length

  const artifactCompletenessAverage = Math.round(
    (data.customerArtifacts.reduce((sum, artifactSet) => {
      const presentCount = artifactSet.items.filter((item) => item.status === 'present').length
      return sum + (presentCount / artifactSet.items.length) * 100
    }, 0) / Math.max(1, data.customerArtifacts.length)),
  )

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Portfolio Report — Marcus Bennett</h1>
        <p className="mt-1 text-sm text-slate-600">
          CSE — NAM | Manager: Lauren Caldwell
        </p>
        <p className="mt-1 text-xs text-slate-500">Report date: April 15, 2026</p>
      </section>

      <section className="grid gap-4 xl:grid-cols-6 md:grid-cols-2">
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Total Customers</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{data.customers.length}</p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:col-span-2">
          <p className="text-xs uppercase tracking-wide text-slate-500">Health Distribution</p>
          <div className="mt-2 h-36">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={58}>
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Average LoE Consumption</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{averageLoe}%</p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Renewals in Next 6 Months</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{renewalsNextSixMonths.length}</p>
          <p className="mt-1 text-xs text-slate-600">
            {renewalsNextSixMonths.map((customer) => customer.name).join(', ') || 'None'}
          </p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Active Escalations</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{data.riskAlerts.length}</p>
          <p className="mt-1 text-xs text-slate-600">
            H:{escalationSeverityCounts.high} / M:{escalationSeverityCounts.medium} / L:{escalationSeverityCounts.low}
          </p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Cadence Compliance</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{cadenceCompliancePercent}%</p>
        </article>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Customer Status Table</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Health</th>
                <th className="px-3 py-2">Phase</th>
                <th className="px-3 py-2">Maturity</th>
                <th className="px-3 py-2">LoE %</th>
                <th className="px-3 py-2">Cadence</th>
                <th className="px-3 py-2">Renewal</th>
                <th className="px-3 py-2">Escalations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {managerTableRows.map((customer) => {
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
                const postureBadge = maturityBadge(posture)
                const runtimeBadge = maturityBadge(runtime)
                const appSecBadge = maturityBadge(appSec)
                const engagement = engagementByCustomer.get(customer.id)
                const overdue = overdueCustomers.has(customer.id)

                return (
                  <tr key={customer.id}>
                    <td className="px-3 py-2 font-semibold text-slate-800">{customer.name}</td>
                    <td className="px-3 py-2">
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
                    </td>
                    <td className="px-3 py-2 text-slate-700">
                      {customer.lifecyclePhase
                        .split('_')
                        .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
                        .join(' ')}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-1">
                        <span className={`rounded px-2 py-0.5 text-xs font-semibold ${postureBadge.classes}`}>{postureBadge.label}</span>
                        <span className={`rounded px-2 py-0.5 text-xs font-semibold ${runtimeBadge.classes}`}>{runtimeBadge.label}</span>
                        <span className={`rounded px-2 py-0.5 text-xs font-semibold ${appSecBadge.classes}`}>{appSecBadge.label}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-slate-700">{engagement?.loePercentage ?? 0}%</td>
                    <td className="px-3 py-2">
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${overdue ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {overdue ? 'Overdue' : 'On Track'}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-slate-700">
                      {formatDate(customer.renewalDate)} ({monthsUntil(customer.renewalDate)}m)
                    </td>
                    <td className="px-3 py-2 text-slate-700">{escalationCountByCustomer.get(customer.id) ?? 0}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Risk Summary</h2>
        <div className="mt-3 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={riskTypeCounts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Weekly Highlights</h2>
        <textarea
          value={weeklyHighlights}
          onChange={(event) => setWeeklyHighlights(event.target.value)}
          rows={6}
          className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Post-session Compliance Rate</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{postSessionComplianceRate}%</p>
          <p className="mt-1 text-xs text-slate-600">
            of sessions have all 5 tasks complete
          </p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Avg Days Between Sessions</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{averageDaysBetweenSessions}</p>
          <p className="mt-1 text-xs text-slate-600">vs cadence target</p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Assessment Freshness</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {freshAssessmentsCount} / {data.customers.length}
          </p>
          <p className="mt-1 text-xs text-slate-600">assessed within 6 months</p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Artifact Completeness</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{artifactCompletenessAverage}%</p>
          <p className="mt-1 text-xs text-slate-600">average required artifacts present</p>
        </article>
      </section>
    </div>
  )
}
