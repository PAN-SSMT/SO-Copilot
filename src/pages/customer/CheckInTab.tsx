import { CheckCircle2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as data from '../../data'

const TODAY = new Date('2026-04-15T00:00:00')

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function weeksAgoLabel(weeksAgo: number) {
  if (weeksAgo <= 0) return 'this week'
  if (weeksAgo === 1) return '1 week ago'
  return `${weeksAgo} weeks ago`
}

function prereqBadgeClasses(status: 'ready' | 'pending' | 'blocked') {
  if (status === 'ready') return 'bg-emerald-100 text-emerald-700'
  if (status === 'pending') return 'bg-amber-100 text-amber-700'
  return 'bg-red-100 text-red-700'
}

function caseSeverityClasses(severity: number) {
  if (severity <= 1) return 'bg-red-100 text-red-700'
  if (severity === 2) return 'bg-amber-100 text-amber-700'
  return 'bg-slate-100 text-slate-700'
}

function caseStatusClasses(status: 'open' | 'in_progress' | 'resolved') {
  if (status === 'open') return 'bg-red-100 text-red-700'
  if (status === 'in_progress') return 'bg-amber-100 text-amber-700'
  return 'bg-emerald-100 text-emerald-700'
}

export function CheckInTab() {
  const { id } = useParams()
  const customer = data.customers.find((item) => item.id === id)
  const dashboard = data.checkInDashboards.find((item) => item.customerId === id)
  const [isEditing, setIsEditing] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const [draftHighlights, setDraftHighlights] = useState(dashboard?.recentSessionHighlights ?? '')
  const [draftProductUpdates, setDraftProductUpdates] = useState(dashboard?.productUpdatesDiscussed ?? '')
  const [draftNextSteps, setDraftNextSteps] = useState(dashboard?.nextStepVisibility ?? '')
  const [draftNotes, setDraftNotes] = useState(dashboard?.notes ?? '')

  const stalenessWeeks = useMemo(() => {
    if (!dashboard) return 0
    const lastUpdated = new Date(`${dashboard.lastUpdated}T00:00:00`)
    const diffDays = Math.floor((TODAY.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24))
    return Math.max(0, Math.floor(diffDays / 7))
  }, [dashboard])

  if (!customer) {
    return (
      <section className="rounded-lg border border-red-200 bg-white p-5">
        <p className="text-sm font-medium text-red-700">Customer not found.</p>
      </section>
    )
  }

  if (!dashboard) {
    return (
      <section className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 shadow-sm">
        No Check-In Dashboard created yet. This will be created once sessions begin.
      </section>
    )
  }

  const handleCancel = () => {
    setDraftHighlights(dashboard.recentSessionHighlights)
    setDraftProductUpdates(dashboard.productUpdatesDiscussed)
    setDraftNextSteps(dashboard.nextStepVisibility)
    setDraftNotes(dashboard.notes)
    setIsEditing(false)
  }

  const handleSave = () => {
    setIsEditing(false)
    setShowToast(true)
    window.setTimeout(() => setShowToast(false), 2500)
  }

  return (
    <div className="space-y-4">
      {stalenessWeeks > 8 && (
        <section className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-800 shadow-sm">
          ⚠ Dashboard is {stalenessWeeks} weeks stale. Immediate update required.
        </section>
      )}
      {stalenessWeeks > 4 && stalenessWeeks <= 8 && (
        <section className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-800 shadow-sm">
          ⚠ Dashboard last updated {stalenessWeeks} weeks ago — may be stale. Update after next session.
        </section>
      )}

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">CS Check-In Dashboard</h2>
            <p className="mt-1 text-sm text-slate-600">
              Last updated: {formatDate(dashboard.lastUpdated)} ({weeksAgoLabel(stalenessWeeks)})
            </p>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                Edit Dashboard
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-base font-semibold text-slate-900">Upcoming Sessions</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {dashboard.upcomingSessions.map((session, index) => (
            <article key={`${session.topic}-${index}`} className="rounded-md border border-slate-200 p-3">
              <p className="text-sm font-semibold text-slate-900">{session.topic}</p>
              <p className="mt-1 text-xs text-slate-600">{formatDate(session.date)}</p>
              <span className={`mt-2 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${prereqBadgeClasses(session.prerequisitesStatus)}`}>
                {session.prerequisitesStatus.charAt(0).toUpperCase()}
                {session.prerequisitesStatus.slice(1)}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Recent Session Highlights</h3>
          {isEditing ? (
            <textarea
              value={draftHighlights}
              onChange={(event) => setDraftHighlights(event.target.value)}
              rows={6}
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          ) : (
            <div className="mt-2 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              {draftHighlights}
            </div>
          )}
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Product Updates Discussed</h3>
          {isEditing ? (
            <textarea
              value={draftProductUpdates}
              onChange={(event) => setDraftProductUpdates(event.target.value)}
              rows={6}
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          ) : (
            <div className="mt-2 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              {draftProductUpdates || (
                <span className="text-slate-500">No product updates discussed recently.</span>
              )}
            </div>
          )}
        </article>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-base font-semibold text-slate-900">Relevant Customer Cases</h3>
        {dashboard.relevantCustomerCases.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">No open customer cases.</p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-3 py-2">Case</th>
                  <th className="px-3 py-2">Severity</th>
                  <th className="px-3 py-2">Summary</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dashboard.relevantCustomerCases.map((caseItem) => (
                  <tr key={caseItem.caseNumber}>
                    <td className="px-3 py-2 font-semibold text-slate-800">{caseItem.caseNumber}</td>
                    <td className="px-3 py-2">
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${caseSeverityClasses(caseItem.severity)}`}>
                        Sev {caseItem.severity}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-slate-700">{caseItem.summary}</td>
                    <td className="px-3 py-2">
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${caseStatusClasses(caseItem.status)}`}>
                        {caseItem.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Cadence Status</h3>
          <span
            className={`mt-2 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
              dashboard.cadenceStatus === 'on_track'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {dashboard.cadenceStatus === 'on_track' ? 'On Track' : 'Overdue'}
          </span>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Next Step Visibility</h3>
          {isEditing ? (
            <textarea
              value={draftNextSteps}
              onChange={(event) => setDraftNextSteps(event.target.value)}
              rows={4}
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          ) : (
            <p className="mt-2 text-sm text-slate-700">{draftNextSteps}</p>
          )}
        </article>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-base font-semibold text-slate-900">Notes</h3>
        {isEditing ? (
          <textarea
            value={draftNotes}
            onChange={(event) => setDraftNotes(event.target.value)}
            rows={5}
            className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        ) : (
          <div className="mt-2 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            {draftNotes || <span className="text-slate-500">No notes captured.</span>}
          </div>
        )}
      </section>

      {showToast && (
        <div className="fixed right-6 top-20 z-50 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 size={16} />
            Dashboard updates saved (demo).
          </span>
        </div>
      )}
    </div>
  )
}
