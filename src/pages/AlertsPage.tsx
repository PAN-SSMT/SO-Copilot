import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import * as data from '../data'

type SeverityFilter = 'all' | 'high' | 'medium' | 'low'
type TypeFilter =
  | 'all'
  | 'cadence'
  | 'prerequisite'
  | 'product_blocker'
  | 'loe_overrun'
  | 'stale_assessment'
  | 'missing_artifact'
  | 'renewal'
  | 'scope_drift'
type ViewMode = 'grouped' | 'severity'

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function typeLabel(type: (typeof data.riskAlerts)[number]['type']) {
  return type
    .split('_')
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ')
}

function typeMatches(filter: TypeFilter, type: (typeof data.riskAlerts)[number]['type']) {
  if (filter === 'all') return true
  if (filter === 'cadence') return type === 'cadence_violation'
  if (filter === 'prerequisite') return type === 'prerequisite_not_met'
  if (filter === 'product_blocker') return type === 'product_blocker'
  if (filter === 'loe_overrun') return type === 'loe_overrun_warning'
  if (filter === 'stale_assessment') return type === 'stale_maturity_assessment'
  if (filter === 'missing_artifact') return type === 'missing_artifact'
  if (filter === 'renewal') return type === 'renewal_proximity'
  return type === 'scope_drift'
}

function severityClasses(severity: (typeof data.riskAlerts)[number]['severity']) {
  if (severity === 'high') return 'bg-red-100 text-red-700'
  if (severity === 'medium') return 'bg-amber-100 text-amber-700'
  return 'bg-yellow-100 text-yellow-700'
}

function resolutionClasses(status: (typeof data.riskAlerts)[number]['resolutionStatus']) {
  if (status === 'open') return 'bg-red-100 text-red-700'
  if (status === 'acknowledged') return 'bg-amber-100 text-amber-700'
  if (status === 'in_progress') return 'bg-blue-100 text-blue-700'
  return 'bg-emerald-100 text-emerald-700'
}

function severityWeight(severity: (typeof data.riskAlerts)[number]['severity']) {
  if (severity === 'high') return 0
  if (severity === 'medium') return 1
  return 2
}

export function AlertsPage() {
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('all')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('severity')

  const customerNameById = useMemo(
    () => new Map(data.customers.map((customer) => [customer.id, customer.name])),
    [],
  )

  const severityCounts = useMemo(
    () =>
      data.riskAlerts.reduce(
        (acc, risk) => {
          acc[risk.severity] += 1
          return acc
        },
        { high: 0, medium: 0, low: 0 },
      ),
    [],
  )

  const filteredRisks = useMemo(
    () =>
      data.riskAlerts
        .filter((risk) => (severityFilter === 'all' ? true : risk.severity === severityFilter))
        .filter((risk) => typeMatches(typeFilter, risk.type))
        .sort((a, b) => {
          const severityDiff = severityWeight(a.severity) - severityWeight(b.severity)
          if (severityDiff !== 0) return severityDiff
          return new Date(b.triggerDate).getTime() - new Date(a.triggerDate).getTime()
        }),
    [severityFilter, typeFilter],
  )

  const groupedRisks = useMemo(() => {
    const map = new Map<string, (typeof filteredRisks)>()
    filteredRisks.forEach((risk) => {
      const existing = map.get(risk.customerId) ?? []
      existing.push(risk)
      map.set(risk.customerId, existing)
    })
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  }, [filteredRisks])

  const renderRiskCard = (risk: (typeof data.riskAlerts)[number]) => (
    <article key={risk.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <Link to={`/customers/${risk.customerId}`} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
          {customerNameById.get(risk.customerId) ?? risk.customerId}
        </Link>
        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${severityClasses(risk.severity)}`}>
          {risk.severity.charAt(0).toUpperCase()}
          {risk.severity.slice(1)}
        </span>
        <span className="text-xs text-slate-500">{typeLabel(risk.type)}</span>
      </div>
      <p className="mt-1 text-xs text-slate-500">Triggered {formatDate(risk.triggerDate)}</p>
      <p className="mt-2 text-sm text-slate-700">{risk.description}</p>
      <p className="mt-2 text-sm text-slate-700">
        <span className="font-semibold">Recommended action:</span> {risk.recommendedAction}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${resolutionClasses(risk.resolutionStatus)}`}>
          {risk.resolutionStatus === 'in_progress'
            ? 'In Progress'
            : `${risk.resolutionStatus.charAt(0).toUpperCase()}${risk.resolutionStatus.slice(1)}`}
        </span>
        {risk.resolutionNotes && <span className="text-xs text-slate-600">{risk.resolutionNotes}</span>}
      </div>
    </article>
  )

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Portfolio Risk Overview</h1>
        <p className="mt-1 text-sm text-slate-600">{data.riskAlerts.length} active risks</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
            High {severityCounts.high}
          </span>
          <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
            Medium {severityCounts.medium}
          </span>
          <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700">
            Low {severityCounts.low}
          </span>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Filter by Severity</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'high', label: 'High' },
              { id: 'medium', label: 'Medium' },
              { id: 'low', label: 'Low' },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setSeverityFilter(option.id as SeverityFilter)}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  severityFilter === option.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Filter by Type</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              ['all', 'All'],
              ['cadence', 'Cadence Violation'],
              ['prerequisite', 'Prerequisite'],
              ['product_blocker', 'Product Blocker'],
              ['loe_overrun', 'LoE Overrun'],
              ['stale_assessment', 'Stale Assessment'],
              ['missing_artifact', 'Missing Artifact'],
              ['renewal', 'Renewal'],
              ['scope_drift', 'Scope Drift'],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTypeFilter(id as TypeFilter)}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  typeFilter === id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">View Mode</p>
          <div className="mt-2 inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => setViewMode('grouped')}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
                viewMode === 'grouped' ? 'bg-blue-600 text-white' : 'text-slate-600'
              }`}
            >
              Grouped by Customer
            </button>
            <button
              type="button"
              onClick={() => setViewMode('severity')}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
                viewMode === 'severity' ? 'bg-blue-600 text-white' : 'text-slate-600'
              }`}
            >
              Sorted by Severity
            </button>
          </div>
        </div>
      </section>

      {viewMode === 'severity' && <section className="space-y-3">{filteredRisks.map(renderRiskCard)}</section>}

      {viewMode === 'grouped' && (
        <section className="space-y-4">
          {groupedRisks.map(([customerId, risks]) => (
            <div key={customerId} className="space-y-2">
              <h2 className="text-base font-semibold text-slate-900">
                <Link to={`/customers/${customerId}`} className="text-blue-600 hover:text-blue-700">
                  {customerNameById.get(customerId) ?? customerId}
                </Link>{' '}
                ({risks.length})
              </h2>
              <div className="space-y-3">{risks.map(renderRiskCard)}</div>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
