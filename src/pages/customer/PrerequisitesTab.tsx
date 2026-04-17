import { CheckCircle2, Circle, Loader2, XCircle } from 'lucide-react'
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

function statusBadgeClasses(status: 'not_started' | 'in_progress' | 'complete' | 'blocked') {
  if (status === 'complete') return 'bg-emerald-100 text-emerald-700'
  if (status === 'in_progress') return 'bg-blue-100 text-blue-700'
  if (status === 'blocked') return 'bg-red-100 text-red-700'
  return 'bg-slate-100 text-slate-700'
}

function statusIcon(status: 'not_started' | 'in_progress' | 'complete' | 'blocked') {
  if (status === 'complete') return <CheckCircle2 size={18} className="text-emerald-600" />
  if (status === 'in_progress') return <Loader2 size={18} className="animate-spin text-blue-600" />
  if (status === 'blocked') return <XCircle size={18} className="text-red-600" />
  return <Circle size={18} className="text-slate-400" />
}

function statusRowClasses(status: 'not_started' | 'in_progress' | 'complete' | 'blocked') {
  if (status === 'blocked') return 'border-l-red-400 bg-red-50'
  if (status === 'not_started') return 'border-l-slate-300 bg-white'
  if (status === 'in_progress') return 'border-l-blue-300 bg-blue-50'
  return 'border-l-emerald-300 bg-white'
}

export function PrerequisitesTab() {
  const { id } = useParams()
  const customer = data.customers.find((item) => item.id === id)
  const prerequisites = data.customerPrerequisites.find((item) => item.customerId === id)

  if (!customer) {
    return (
      <section className="rounded-lg border border-red-200 bg-white p-5">
        <p className="text-sm font-medium text-red-700">Customer not found.</p>
      </section>
    )
  }

  if (!prerequisites) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Prerequisites</h2>
        <p className="mt-2 text-sm text-slate-600">
          No prerequisite record found for this customer.
        </p>
      </section>
    )
  }

  const total = prerequisites.items.length
  const completeCount = prerequisites.items.filter((item) => item.status === 'complete').length
  const blockedCount = prerequisites.items.filter((item) => item.status === 'blocked').length
  const progressPercent = total > 0 ? Math.round((completeCount / total) * 100) : 0
  const allComplete = completeCount === total

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            {completeCount} of {total} prerequisites complete
          </h2>
          <div className="flex items-center gap-2">
            {blockedCount > 0 && (
              <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                {blockedCount} items blocked
              </span>
            )}
            {allComplete && (
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                All prerequisites met ✓
              </span>
            )}
          </div>
        </div>
        <div className="mt-3 h-2 rounded-full bg-slate-100">
          <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${progressPercent}%` }} />
        </div>
      </section>

      <section className="space-y-3">
        {prerequisites.items.map((item) => (
          <article
            key={item.id}
            className={`rounded-lg border border-slate-200 border-l-4 p-4 shadow-sm ${statusRowClasses(item.status)}`}
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5">{statusIcon(item.status)}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-semibold text-slate-900">{item.description}</p>
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusBadgeClasses(item.status)}`}>
                    {item.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Date completed: {item.dateCompleted ? formatDate(item.dateCompleted) : '—'}
                </p>
                {item.notes && <p className="mt-2 text-xs text-slate-600">{item.notes}</p>}
              </div>
            </div>
          </article>
        ))}
      </section>

      {blockedCount > 0 && (
        <section className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-800">
            Blocked prerequisites may indicate a deployment foundation issue. Consider initiating a
            Deployment Blocker escalation workflow.
          </p>
        </section>
      )}
    </div>
  )
}
