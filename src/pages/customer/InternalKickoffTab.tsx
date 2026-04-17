import { Check, X } from 'lucide-react'
import { useParams } from 'react-router-dom'
import * as data from '../../data'

const TODAY = new Date('2026-04-15T00:00:00')

function formatDate(date: string | null) {
  if (!date) return '—'
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function kickoffStatusBanner(
  status: 'not_started' | 'scheduled' | 'completed',
  date: string | null,
  isOverdue: boolean,
) {
  if (status === 'completed') {
    return {
      className: 'border-emerald-200 bg-emerald-50 text-emerald-800',
      text: `Internal Kickoff Completed — ${formatDate(date)}`,
    }
  }

  if (status === 'scheduled') {
    return {
      className: 'border-blue-200 bg-blue-50 text-blue-800',
      text: `Internal Kickoff Scheduled — ${formatDate(date)}`,
    }
  }

  if (isOverdue) {
    return {
      className: 'border-red-200 bg-red-50 text-red-800',
      text: 'Overdue — internal kickoff must be completed within 2 weeks of project activation',
    }
  }

  return {
    className: 'border-amber-200 bg-amber-50 text-amber-800',
    text: 'Internal Kickoff Not Started',
  }
}

function boolText(value: boolean) {
  return value ? 'Yes' : 'No'
}

export function InternalKickoffTab() {
  const { id } = useParams()
  const customer = data.customers.find((item) => item.id === id)
  const kickoff = data.internalKickoffs.find((item) => item.customerId === id)
  const engagement = data.engagements.find((item) => item.customerId === id)

  if (!customer) {
    return (
      <section className="rounded-lg border border-red-200 bg-white p-5">
        <p className="text-sm font-medium text-red-700">Customer not found.</p>
      </section>
    )
  }

  const fallbackKickoffStatus: 'not_started' | 'scheduled' | 'completed' = kickoff?.status ?? 'not_started'
  const engagementStart = engagement ? new Date(`${engagement.startDate}T00:00:00`) : TODAY
  const daysSinceStart = Math.floor((TODAY.getTime() - engagementStart.getTime()) / (1000 * 60 * 60 * 24))
  const kickoffOverdue = fallbackKickoffStatus === 'not_started' && daysSinceStart > 14
  const statusBanner = kickoffStatusBanner(fallbackKickoffStatus, kickoff?.date ?? null, kickoffOverdue)

  if (!kickoff) {
    return (
      <section className="space-y-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className={`rounded-md border px-3 py-2 text-sm font-semibold ${statusBanner.className}`}>
          {statusBanner.text}
        </div>
        <p className="text-sm text-slate-600">
          No internal kickoff record has been captured for this customer yet.
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
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Attendees</h2>
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
              {kickoff.attendees.map((attendee) => (
                <tr key={`${attendee.name}-${attendee.role}`}>
                  <td className="px-3 py-2 text-slate-800">{attendee.name}</td>
                  <td className="px-3 py-2 text-slate-700">{attendee.role}</td>
                  <td className="px-3 py-2">
                    {attendee.attended ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                        <Check size={12} />
                        Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                        <X size={12} />
                        No
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Account Context</h2>
        <dl className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-md border border-slate-100 p-3 md:col-span-2">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Opportunity Summary</dt>
            <dd className="mt-1 text-sm text-slate-700">{kickoff.accountContext.opportunitySummary}</dd>
          </div>
          <div className="rounded-md border border-slate-100 p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Prior PS/EE Involvement</dt>
            <dd className="mt-1 text-sm text-slate-700">
              {boolText(kickoff.accountContext.priorPsEeInvolvement)}
            </dd>
            <dd className="mt-1 text-xs text-slate-500">{kickoff.accountContext.priorPsEeDetails}</dd>
          </div>
          <div className="rounded-md border border-slate-100 p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Deployment SKUs Purchased</dt>
            <dd className="mt-1 text-sm text-slate-700">
              {boolText(kickoff.accountContext.deploymentSkusPurchased)}
            </dd>
          </div>
          <div className="rounded-md border border-slate-100 p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Customer 360 Highlights</dt>
            <dd className="mt-1 text-sm text-slate-700">{kickoff.accountContext.customer360Highlights}</dd>
          </div>
          <div className="rounded-md border border-slate-100 p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Critical Escalations</dt>
            <dd className="mt-1 text-sm text-slate-700">{kickoff.accountContext.criticalEscalations}</dd>
          </div>
          <div className="rounded-md border border-slate-100 p-3 md:col-span-2">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Special Support Instructions</dt>
            <dd className="mt-1 text-sm text-slate-700">{kickoff.accountContext.specialSupportInstructions}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Delivery Expectations</h2>
        <dl className="mt-3 grid gap-3">
          <div className="rounded-md border border-slate-100 p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Customer Requirements</dt>
            <dd className="mt-1 text-sm text-slate-700">{kickoff.deliveryExpectations.customerRequirements}</dd>
          </div>
          <div className="rounded-md border border-slate-100 p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Engagement Model</dt>
            <dd className="mt-1 text-sm text-slate-700">{kickoff.deliveryExpectations.engagementModel}</dd>
          </div>
          <div className="rounded-md border border-slate-100 p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Scheduling Constraints</dt>
            <dd className="mt-1 text-sm text-slate-700">{kickoff.deliveryExpectations.schedulingConstraints}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">RACI & Alignment</h2>
        <span
          className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
            kickoff.raciAlignmentStatus === 'aligned'
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-amber-100 text-amber-700'
          }`}
        >
          {kickoff.raciAlignmentStatus === 'aligned' ? 'Aligned' : 'Pending'}
        </span>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Open Questions</h2>
        {kickoff.openQuestions.length > 0 ? (
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {kickoff.openQuestions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-slate-600">No open questions.</p>
        )}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Action Items</h2>
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
              {kickoff.actionItems.map((item, index) => (
                <tr key={`${item.description}-${index}`}>
                  <td className="px-3 py-2 text-slate-800">{item.description}</td>
                  <td className="px-3 py-2 text-slate-700">{item.owner}</td>
                  <td className="px-3 py-2 text-slate-700">{formatDate(item.dueDate)}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        item.status === 'complete'
                          ? 'bg-emerald-100 text-emerald-700'
                          : item.status === 'blocked'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-amber-100 text-amber-700'
                      }`}
                    >
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
          {kickoff.meetingNotes}
        </div>
      </section>
    </div>
  )
}
