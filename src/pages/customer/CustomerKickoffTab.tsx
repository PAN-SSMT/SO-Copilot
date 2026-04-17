import { Check, X } from 'lucide-react'
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

function kickoffStatusBanner(status: 'not_started' | 'scheduled' | 'completed', date: string | null) {
  if (status === 'completed') {
    return {
      className: 'border-emerald-200 bg-emerald-50 text-emerald-800',
      text: `Customer Kickoff Completed — ${formatDate(date)}`,
    }
  }

  if (status === 'scheduled') {
    return {
      className: 'border-blue-200 bg-blue-50 text-blue-800',
      text: `Customer Kickoff Scheduled — ${formatDate(date)}`,
    }
  }

  return {
    className: 'border-amber-200 bg-amber-50 text-amber-800',
    text: 'Customer Kickoff Not Started',
  }
}

function kickoffStatusClasses(status: 'complete' | 'open' | 'blocked' | 'in_progress') {
  if (status === 'complete') return 'bg-emerald-100 text-emerald-700'
  if (status === 'blocked') return 'bg-red-100 text-red-700'
  if (status === 'in_progress') return 'bg-blue-100 text-blue-700'
  return 'bg-amber-100 text-amber-700'
}

function attendanceBadge(attended: boolean) {
  if (attended) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
        <Check size={12} />
        Yes
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
      <X size={12} />
      No
    </span>
  )
}

export function CustomerKickoffTab() {
  const { id } = useParams()
  const customer = data.customers.find((item) => item.id === id)
  const customerKickoff = data.customerKickoffs.find((item) => item.customerId === id)
  const internalKickoff = data.internalKickoffs.find((item) => item.customerId === id)

  if (!customer) {
    return (
      <section className="rounded-lg border border-red-200 bg-white p-5">
        <p className="text-sm font-medium text-red-700">Customer not found.</p>
      </section>
    )
  }

  const status = customerKickoff?.status ?? 'not_started'
  const statusBanner = kickoffStatusBanner(status, customerKickoff?.date ?? null)
  const shouldShowInternalKickoffNote = internalKickoff?.status !== 'completed'

  if (!customerKickoff) {
    return (
      <section className="space-y-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className={`rounded-md border px-3 py-2 text-sm font-semibold ${statusBanner.className}`}>
          {statusBanner.text}
        </div>
        {shouldShowInternalKickoffNote && (
          <p className="text-sm font-medium text-amber-700">
            Note: Internal kickoff should be completed before customer kickoff.
          </p>
        )}
        <p className="text-sm text-slate-600">
          No customer kickoff record has been captured for this account yet.
        </p>
      </section>
    )
  }

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className={`rounded-md border px-3 py-2 text-sm font-semibold ${statusBanner.className}`}>
          {statusBanner.text}
        </div>
        {shouldShowInternalKickoffNote && (
          <p className="mt-2 text-sm font-medium text-amber-700">
            Note: Internal kickoff should be completed before customer kickoff.
          </p>
        )}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">PANW Attendees</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Role</th>
                  <th className="px-3 py-2">Attended</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customerKickoff.attendeesPanw.map((attendee) => (
                  <tr key={`${attendee.name}-${attendee.role}`}>
                    <td className="px-3 py-2 text-slate-800">{attendee.name}</td>
                    <td className="px-3 py-2 text-slate-700">{attendee.role}</td>
                    <td className="px-3 py-2">{attendanceBadge(attendee.attended)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Customer Attendees</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Role</th>
                  <th className="px-3 py-2">Attended</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customerKickoff.attendeesCustomer.map((attendee) => (
                  <tr key={`${attendee.name}-${attendee.role}`}>
                    <td className="px-3 py-2 text-slate-800">{attendee.name}</td>
                    <td className="px-3 py-2 text-slate-700">{attendee.role}</td>
                    <td className="px-3 py-2">{attendanceBadge(attendee.attended)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Scope & Plan</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-md border border-slate-100 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Scope Presented</p>
            <span
              className={`mt-2 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                customerKickoff.scopePresented
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {customerKickoff.scopePresented ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="rounded-md border border-slate-100 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Initial Session Plan Presented
            </p>
            <span
              className={`mt-2 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                customerKickoff.initialSessionPlanPresented
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {customerKickoff.initialSessionPlanPresented ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="rounded-md border border-slate-100 p-3 md:col-span-2">
            <p className="text-xs uppercase tracking-wide text-slate-500">Customer Feedback on Plan</p>
            <p className="mt-1 text-sm text-slate-700">
              {customerKickoff.customerFeedbackOnPlan || 'No feedback captured.'}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Environment Access</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div className="rounded-md border border-slate-100 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Access Method</p>
            <p className="mt-1 text-sm text-slate-700">{customerKickoff.environmentAccess.method || '—'}</p>
          </div>
          <div className="rounded-md border border-slate-100 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Access Contact</p>
            <p className="mt-1 text-sm text-slate-700">
              {customerKickoff.environmentAccess.accessContact || '—'}
            </p>
          </div>
          <div className="rounded-md border border-slate-100 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Access Status</p>
            <span
              className={`mt-2 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                customerKickoff.environmentAccess.accessStatus === 'granted'
                  ? 'bg-emerald-100 text-emerald-700'
                  : customerKickoff.environmentAccess.accessStatus === 'pending'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-blue-100 text-blue-700'
              }`}
            >
              {customerKickoff.environmentAccess.accessStatus.charAt(0).toUpperCase()}
              {customerKickoff.environmentAccess.accessStatus.slice(1)}
            </span>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Change Control Process</h2>
        {customer.changeControl.documented ? (
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="rounded-md border border-slate-100 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Lead Time</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {customer.changeControl.leadTimeDays === null
                  ? 'Not documented'
                  : `${customer.changeControl.leadTimeDays} days`}
              </p>
            </div>
            <div className="rounded-md border border-slate-100 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Deployment Windows</p>
              <p className="mt-1 text-sm text-slate-700">{customer.changeControl.deploymentWindows || '—'}</p>
            </div>
            <div className="rounded-md border border-slate-100 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Approval Workflow</p>
              <p className="mt-1 text-sm text-slate-700">{customer.changeControl.approvalWorkflows || '—'}</p>
            </div>
            <div className="rounded-md border border-slate-100 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Communication Protocols
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {customer.changeControl.communicationProtocols || '—'}
              </p>
            </div>
            <div className="rounded-md border border-slate-100 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">CAB Details</p>
              <p className="mt-1 text-sm text-slate-700">{customer.changeControl.cabDetails || '—'}</p>
            </div>
            <div className="rounded-md border border-slate-100 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Additional Notes</p>
              <p className="mt-1 text-sm text-slate-700">{customer.changeControl.notes || '—'}</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 rounded-md border border-amber-300 bg-amber-50 p-4">
            <p className="text-base font-semibold text-amber-800">⚠ Change Control Process Not Documented</p>
            <p className="mt-2 text-sm text-amber-800">
              {customer.changeControl.notes || 'No details captured yet.'}
            </p>
            <p className="mt-2 text-sm font-medium text-amber-900">
              This should be captured during the customer kickoff.
            </p>
          </div>
        )}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Follow-up Actions</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-2">Description</th>
                <th className="px-3 py-2">Owner</th>
                <th className="px-3 py-2">Due Date</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customerKickoff.followUpActions.map((item, index) => (
                <tr key={`${item.description}-${index}`}>
                  <td className="px-3 py-2 text-slate-800">{item.description}</td>
                  <td className="px-3 py-2 text-slate-700">{item.owner}</td>
                  <td className="px-3 py-2 text-slate-700">{formatDate(item.dueDate)}</td>
                  <td className="px-3 py-2">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${kickoffStatusClasses(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Meeting Notes</h2>
        <div className="mt-3 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm leading-relaxed text-slate-700">
          {customerKickoff.meetingNotes || 'No notes captured.'}
        </div>
      </section>
    </div>
  )
}
