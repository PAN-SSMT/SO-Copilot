import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as data from '../../data'

function formatDate(date: string | null) {
  if (!date) return '—'
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function planStatusLabel(status: (typeof data.sessionPlans)[number]['planStatus']) {
  if (status === 'in_progress') return 'In Progress'
  return `${status.charAt(0).toUpperCase()}${status.slice(1)}`
}

function planStatusClasses(status: (typeof data.sessionPlans)[number]['planStatus']) {
  if (status === 'draft') return 'bg-slate-100 text-slate-700'
  if (status === 'shared') return 'bg-blue-100 text-blue-700'
  if (status === 'agreed') return 'bg-emerald-100 text-emerald-700'
  if (status === 'in_progress') return 'bg-indigo-100 text-indigo-700'
  return 'bg-emerald-100 text-emerald-700'
}

function skillLabel(skill: (typeof data.sessionPlans)[number]['entries'][number]['skillCategoryRequired']) {
  if (skill === 'posture_security') return 'Posture Security'
  if (skill === 'runtime_security') return 'Runtime Security'
  if (skill === 'application_security') return 'Application Security'
  if (skill === 'assessment') return 'Assessment'
  return 'Automation'
}

function skillClasses(skill: (typeof data.sessionPlans)[number]['entries'][number]['skillCategoryRequired']) {
  if (skill === 'posture_security') return 'bg-blue-100 text-blue-700'
  if (skill === 'runtime_security') return 'bg-emerald-100 text-emerald-700'
  if (skill === 'application_security') return 'bg-purple-100 text-purple-700'
  if (skill === 'assessment') return 'bg-amber-100 text-amber-700'
  return 'bg-slate-100 text-slate-700'
}

function entryStatusLabel(status: (typeof data.sessionPlans)[number]['entries'][number]['status']) {
  return `${status.charAt(0).toUpperCase()}${status.slice(1)}`
}

function entryStatusClasses(status: (typeof data.sessionPlans)[number]['entries'][number]['status']) {
  if (status === 'delivered') return 'bg-emerald-100 text-emerald-700'
  if (status === 'scheduled') return 'bg-blue-100 text-blue-700'
  if (status === 'planned') return 'bg-slate-100 text-slate-700'
  if (status === 'skipped') return 'bg-red-100 text-red-700'
  if (status === 'rescheduled') return 'bg-amber-100 text-amber-700'
  return 'bg-slate-100 text-slate-700'
}

function entryRowClasses(status: (typeof data.sessionPlans)[number]['entries'][number]['status']) {
  if (status === 'delivered') return 'border-l-emerald-400'
  if (status === 'scheduled') return 'border-l-blue-400'
  if (status === 'planned') return 'border-l-slate-300'
  if (status === 'rescheduled') return 'border-l-amber-400'
  return 'border-l-red-400'
}

function progressSegmentColor(status: (typeof data.sessionPlans)[number]['entries'][number]['status']) {
  if (status === 'delivered') return 'bg-emerald-500'
  if (status === 'scheduled') return 'bg-blue-500'
  if (status === 'planned') return 'bg-slate-300'
  if (status === 'rescheduled') return 'bg-amber-500'
  return 'bg-red-500'
}

function loeBarColor(percentage: number) {
  if (percentage > 80) return 'bg-red-500'
  if (percentage >= 60) return 'bg-amber-500'
  return 'bg-emerald-500'
}

export function SessionPlanTab() {
  const { id } = useParams()
  const customer = data.customers.find((item) => item.id === id)
  const plan = data.sessionPlans.find((item) => item.customerId === id)
  const engagement = data.engagements.find((item) => item.customerId === id)
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({})

  const sortedEntries = useMemo(() => {
    if (!plan) return []

    const statusOrder: Record<(typeof plan.entries)[number]['status'], number> = {
      delivered: 0,
      scheduled: 1,
      planned: 2,
      rescheduled: 3,
      skipped: 4,
    }

    return [...plan.entries].sort((a, b) => {
      const statusDiff = statusOrder[a.status] - statusOrder[b.status]
      if (statusDiff !== 0) return statusDiff
      return a.sequenceNumber - b.sequenceNumber
    })
  }, [plan])

  if (!customer) {
    return (
      <section className="rounded-lg border border-red-200 bg-white p-5">
        <p className="text-sm font-medium text-red-700">Customer not found.</p>
      </section>
    )
  }

  if (!plan) {
    return (
      <section className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 shadow-sm">
        No session plan created yet. Complete the maturity assessment to begin planning.
      </section>
    )
  }

  const deliveredCount = plan.entries.filter((entry) => entry.status === 'delivered').length
  const progressPercent = Math.round((deliveredCount / plan.entries.length) * 100)
  const nextSessionIndex = plan.entries.findIndex((entry) => entry.status === 'scheduled')

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Session Plan v{plan.planVersion}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2 py-1 text-xs font-semibold ${planStatusClasses(plan.planStatus)}`}>
                {planStatusLabel(plan.planStatus)}
              </span>
              {plan.customerAgreementDate && (
                <p className="text-xs text-slate-600">
                  Customer agreement: {formatDate(plan.customerAgreementDate)}
                </p>
              )}
            </div>
          </div>
          <div className="min-w-[16rem]">
            <p className="text-sm font-semibold text-slate-900">
              {deliveredCount} of {plan.entries.length} sessions delivered
            </p>
            <div className="mt-2 h-2 rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex h-6 gap-1 overflow-hidden rounded-md border border-slate-200 p-1">
            {plan.entries.map((entry, index) => (
              <div
                key={entry.id}
                className={`relative h-full flex-1 rounded-sm ${progressSegmentColor(entry.status)} ${
                  index === nextSessionIndex ? 'ring-2 ring-slate-900 ring-offset-1' : ''
                }`}
                title={`#${entry.sequenceNumber} ${entry.useCase} (${entryStatusLabel(entry.status)})`}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-600">
            Green: Delivered, Blue: Next Scheduled, Gray: Planned, Amber: Rescheduled, Red: Skipped
          </p>
        </div>
      </section>

      {engagement && (
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">
            LoE: {engagement.consumedDays} of {engagement.allocatedDays} allocated days consumed ({engagement.loePercentage}%)
          </h3>
          <div className="mt-2 h-2 rounded-full bg-slate-100">
            <div
              className={`h-2 rounded-full ${loeBarColor(engagement.loePercentage)}`}
              style={{ width: `${Math.min(engagement.loePercentage, 100)}%` }}
            />
          </div>
        </section>
      )}

      <section className="space-y-3">
        {sortedEntries.map((entry) => (
          <article
            key={entry.id}
            className={`rounded-lg border border-slate-200 border-l-4 bg-white p-4 shadow-sm ${entryRowClasses(entry.status)}`}
          >
            <div className="grid gap-2 lg:grid-cols-[auto,2fr,1.5fr,1fr,1fr,1.3fr,1fr,auto] lg:items-center">
              <p className="text-sm font-semibold text-slate-700">#{entry.sequenceNumber}</p>
              <div>
                <p
                  className={`text-sm font-semibold ${
                    entry.status === 'skipped' ? 'text-slate-500 line-through' : 'text-slate-900'
                  }`}
                >
                  {entry.useCase}
                </p>
                <p className="text-xs text-slate-500">{entry.maturityOutcomeMapping}</p>
              </div>
              <div>
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${skillClasses(entry.skillCategoryRequired)}`}>
                  {skillLabel(entry.skillCategoryRequired)}
                </span>
              </div>
              <p className="text-sm text-slate-700">{formatDate(entry.targetDate)}</p>
              <div>
                <p className="text-sm text-slate-800">{entry.assignedEngineer}</p>
                {entry.isSpecialist && (
                  <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700">
                    Specialist
                  </span>
                )}
              </div>
              <div>
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${entryStatusClasses(entry.status)}`}>
                  {entryStatusLabel(entry.status)}
                </span>
              </div>
              <div>
                {entry.inScopeValidated && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 size={14} />
                    Scope Validated
                  </span>
                )}
              </div>
              {entry.notes ? (
                <button
                  type="button"
                  onClick={() =>
                    setExpandedNotes((prev) => ({ ...prev, [entry.id]: !prev[entry.id] }))
                  }
                  className="justify-self-start rounded-md border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  {expandedNotes[entry.id] ? (
                    <span className="inline-flex items-center gap-1">
                      <ChevronUp size={14} /> Hide Notes
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1">
                      <ChevronDown size={14} /> Show Notes
                    </span>
                  )}
                </button>
              ) : (
                <span />
              )}
            </div>

            {entry.notes && expandedNotes[entry.id] && (
              <div className="mt-3 rounded-md bg-slate-50 p-3 text-sm text-slate-700">
                {entry.notes}
              </div>
            )}
          </article>
        ))}
      </section>
    </div>
  )
}
