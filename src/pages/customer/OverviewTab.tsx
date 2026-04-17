import { AlertTriangle, CalendarClock, CheckCircle2, Clock3, Mail, ShieldAlert } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import * as data from '../../data'

type PillarLevel = 'Gold' | 'Silver' | 'Bronze' | 'Not Started'

type TimelineEntry = {
  type: 'session' | 'email' | 'assessment' | 'psr' | 'kickoff'
  description: string
  date: string
}

type ActiveItem = {
  status: 'open' | 'in_progress' | 'blocked'
  description: string
}

const TODAY = new Date('2026-04-15T00:00:00')

const lifecyclePhases = [
  { key: 'internal_kickoff', label: 'Internal Kickoff' },
  { key: 'customer_kickoff', label: 'Customer Kickoff' },
  { key: 'assessment', label: 'Assessment' },
  { key: 'planning', label: 'Planning' },
  { key: 'execution', label: 'Execution' },
  { key: 'completed', label: 'Completed' },
] as const

const sessionSummaryMap: Record<string, { completed: number; total: number }> = {
  'cust-001': { completed: 9, total: 14 },
  'cust-002': { completed: 3, total: 10 },
  'cust-003': { completed: 0, total: 8 },
  'cust-004': { completed: 11, total: 16 },
  'cust-005': { completed: 8, total: 12 },
  'cust-006': { completed: 7, total: 14 },
  'cust-007': { completed: 12, total: 20 },
  'cust-008': { completed: 17, total: 20 },
  'cust-009': { completed: 2, total: 8 },
  'cust-010': { completed: 1, total: 6 },
  'cust-011': { completed: 0, total: 10 },
}

const maturityMap: Record<string, [PillarLevel, PillarLevel, PillarLevel]> = {
  'cust-001': ['Gold', 'Silver', 'Silver'],
  'cust-002': ['Bronze', 'Bronze', 'Not Started'],
  'cust-003': ['Not Started', 'Not Started', 'Not Started'],
  'cust-004': ['Silver', 'Silver', 'Bronze'],
  'cust-005': ['Silver', 'Silver', 'Bronze'],
  'cust-006': ['Silver', 'Bronze', 'Bronze'],
  'cust-007': ['Silver', 'Bronze', 'Silver'],
  'cust-008': ['Gold', 'Gold', 'Gold'],
  'cust-009': ['Silver', 'Bronze', 'Bronze'],
  'cust-010': ['Bronze', 'Not Started', 'Not Started'],
  'cust-011': ['Silver', 'Silver', 'Bronze'],
}

const sessionDatesMap: Record<string, { last: string | null; next: string | null }> = {
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

const daysSinceCommunicationMap: Record<string, number> = {
  'cust-001': 2,
  'cust-002': 11,
  'cust-003': 4,
  'cust-004': 3,
  'cust-005': 1,
  'cust-006': 5,
  'cust-007': 3,
  'cust-008': 2,
  'cust-009': 8,
  'cust-010': 15,
  'cust-011': 6,
}

const openActionItemsMap: Record<string, ActiveItem[]> = {
  'cust-001': [
    { status: 'open', description: 'Prepare April executive update for Marcus Webb.' },
    { status: 'in_progress', description: 'Finalize DSPM session prerequisites with Priya.' },
  ],
  'cust-002': [
    { status: 'blocked', description: 'Customer to resolve AWS IAM permissions for connector.' },
    { status: 'open', description: 'Re-schedule stalled monthly session with Tom Bradley.' },
  ],
  'cust-003': [
    { status: 'open', description: 'Prepare customer kickoff deck and agenda for Tuesday.' },
    { status: 'open', description: 'Review SFDC DOR and draft initial session plan.' },
  ],
  'cust-004': [
    { status: 'in_progress', description: 'Align renewal narrative with AM and CISO goals.' },
    { status: 'open', description: 'Update plan to improve AppSec pillar progression.' },
  ],
  'cust-005': [
    { status: 'open', description: 'Review LoE burn and propose session consolidation.' },
    { status: 'in_progress', description: 'Validate in-scope response for custom reporting ask.' },
  ],
  'cust-006': [
    { status: 'in_progress', description: 'Track two Sev 2 TAC cases tied to planned sessions.' },
    { status: 'open', description: 'Prepare fallback session topics while blockers remain open.' },
  ],
  'cust-007': [
    { status: 'in_progress', description: 'Continue migration activities not blocked by API mismatch.' },
    { status: 'open', description: 'Coordinate workaround validation with Migration Control Tower.' },
  ],
  'cust-008': [
    { status: 'open', description: 'Prepare renewal success summary and expansion storyline.' },
    { status: 'in_progress', description: 'Confirm additional GovCloud DSPM scope with AM.' },
  ],
  'cust-009': [
    { status: 'open', description: 'Follow up manager for AppSec specialist assignment.' },
    { status: 'in_progress', description: 'Keep non-AppSec sessions progressing this month.' },
  ],
  'cust-010': [
    { status: 'open', description: 'Re-engage Greg Patterson to lock next quarterly session.' },
    { status: 'blocked', description: 'Asset group prerequisite remains incomplete since kickoff.' },
  ],
  'cust-011': [
    { status: 'open', description: 'Prepare kickoff deck with CSM transition context.' },
    { status: 'in_progress', description: 'Verify CSP connectivity post migration before kickoff.' },
  ],
}

const timelineMap: Record<string, TimelineEntry[]> = {
  'cust-001': [
    { type: 'session', description: 'Session delivered: KSPM vulnerability scanning', date: '2026-04-01' },
    { type: 'email', description: 'Status email sent to Sarah Chen', date: '2026-04-01' },
    { type: 'assessment', description: 'Maturity assessment completed', date: '2026-02-15' },
    { type: 'psr', description: 'Quarterly PSR delivered', date: '2026-01-15' },
    { type: 'kickoff', description: 'Customer kickoff completed', date: '2025-03-27' },
  ],
  'cust-002': [
    { type: 'email', description: 'Reminder sent for AWS IAM blocker resolution', date: '2026-04-08' },
    { type: 'session', description: 'Session postponed due to missing prerequisites', date: '2026-03-10' },
    { type: 'assessment', description: 'Maturity assessment marked stale', date: '2025-12-01' },
    { type: 'kickoff', description: 'Customer kickoff completed with open blockers', date: '2025-07-01' },
  ],
  'cust-003': [
    { type: 'email', description: 'Kickoff invite sent to customer stakeholders', date: '2026-04-14' },
    { type: 'kickoff', description: 'Internal kickoff completed', date: '2026-04-08' },
  ],
}

function formatDate(date: string | null) {
  if (!date) return '—'
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function daysUntil(date: string) {
  const target = new Date(`${date}T00:00:00`)
  return Math.ceil((target.getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24))
}

function levelClasses(level: PillarLevel) {
  if (level === 'Gold') return 'bg-yellow-100 text-yellow-800'
  if (level === 'Silver') return 'bg-slate-100 text-slate-700'
  if (level === 'Bronze') return 'bg-orange-100 text-orange-700'
  return 'bg-slate-50 text-slate-400'
}

function lifecycleIndex(phase: (typeof data.customers)[number]['lifecyclePhase']) {
  const map: Record<(typeof data.customers)[number]['lifecyclePhase'], number> = {
    resourcing: 0,
    internal_kickoff: 0,
    customer_kickoff: 1,
    assessment: 2,
    planning: 3,
    execution: 4,
    completed: 5,
  }
  return map[phase]
}

function statusClasses(status: ActiveItem['status']) {
  if (status === 'blocked') return 'bg-red-500'
  if (status === 'in_progress') return 'bg-amber-500'
  return 'bg-blue-500'
}

export function OverviewTab() {
  const { id } = useParams()
  const customer = data.customers.find((item) => item.id === id)

  if (!customer) {
    return (
      <section className="rounded-lg border border-red-200 bg-white p-5">
        <p className="text-sm font-medium text-red-700">Customer not found.</p>
      </section>
    )
  }

  const engagement = data.engagements.find((item) => item.customerId === customer.id)
  const prerequisiteRecord = data.customerPrerequisites.find((item) => item.customerId === customer.id)
  const internalKickoff = data.internalKickoffs.find((item) => item.customerId === customer.id)
  const customerKickoff = data.customerKickoffs.find((item) => item.customerId === customer.id)
  const customerRisks = data.riskAlerts.filter((risk) => risk.customerId === customer.id)

  const currentPhaseIndex = lifecycleIndex(customer.lifecyclePhase)
  const internalKickoffDate = internalKickoff?.date
    ? new Date(`${internalKickoff.date}T00:00:00`)
    : null
  const kickoffAgingDays = internalKickoffDate
    ? Math.floor((TODAY.getTime() - internalKickoffDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0
  const hasKickoffWarning =
    customerKickoff?.status === 'scheduled' && internalKickoffDate !== null && kickoffAgingDays > 14

  const sessionSummary = sessionSummaryMap[customer.id] ?? { completed: 0, total: 10 }
  const sessionProgress = Math.round((sessionSummary.completed / sessionSummary.total) * 100)
  const maturity = maturityMap[customer.id] ?? ['Not Started', 'Not Started', 'Not Started']
  const sessionDates = sessionDatesMap[customer.id] ?? { last: null, next: null }
  const daysSinceCommunication = daysSinceCommunicationMap[customer.id] ?? 0
  const daysUntilRenewal = daysUntil(customer.renewalDate)

  const completePrereqs = prerequisiteRecord
    ? prerequisiteRecord.items.filter((item) => item.status === 'complete').length
    : 0
  const blockedPrereqs = prerequisiteRecord
    ? prerequisiteRecord.items.filter((item) => item.status === 'blocked').length
    : 0
  const prerequisiteTotal = prerequisiteRecord?.items.length ?? 0
  const prerequisiteProgress =
    prerequisiteTotal > 0 ? Math.round((completePrereqs / prerequisiteTotal) * 100) : 0

  const leadTimeText = customer.changeControl.documented
    ? customer.changeControl.leadTimeDays === null
      ? 'Not documented'
      : customer.changeControl.leadTimeDays === 0
        ? 'Same day'
        : `${customer.changeControl.leadTimeDays} day${customer.changeControl.leadTimeDays === 1 ? '' : 's'}`
    : 'Not documented'

  const escalationCount = customerRisks.filter(
    (risk) =>
      risk.type.includes('blocker') ||
      risk.recommendedAction.toLowerCase().includes('escalat') ||
      risk.resolutionNotes.toLowerCase().includes('escalat'),
  ).length
  const blockerRisks = customerRisks.filter(
    (risk) => risk.type.includes('blocker') || risk.resolutionStatus === 'in_progress',
  )
  const actionItems = openActionItemsMap[customer.id] ?? []
  const timelineEntries = timelineMap[customer.id] ?? [
    { type: 'session', description: 'Latest session completed', date: sessionDates.last ?? customer.serviceTermStart },
    { type: 'email', description: 'Status communication shared with customer', date: sessionDates.last ?? customer.serviceTermStart },
    { type: 'kickoff', description: 'Internal kickoff record updated', date: internalKickoff?.date ?? customer.serviceTermStart },
  ]

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Lifecycle Tracker</h2>
        <div className="mt-4 overflow-x-auto">
          <div className="flex min-w-max items-center gap-2">
            {lifecyclePhases.map((phase, index) => {
              const isCompleted = index < currentPhaseIndex
              const isCurrent = index === currentPhaseIndex
              const isFuture = index > currentPhaseIndex
              const showWarning = phase.key === 'customer_kickoff' && hasKickoffWarning

              return (
                <div key={phase.key} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold ${
                        isCurrent
                          ? 'animate-pulse border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-200'
                          : isCompleted
                            ? 'border-emerald-500 bg-emerald-500 text-white'
                            : isFuture
                              ? 'border-slate-300 bg-slate-100 text-slate-500'
                              : 'border-slate-300 bg-white text-slate-600'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <p className={`mt-2 text-xs font-medium ${isFuture ? 'text-slate-400' : 'text-slate-700'}`}>
                      {phase.label}
                    </p>
                    {showWarning && (
                      <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-amber-700">
                        <AlertTriangle size={12} />
                        Delayed
                      </p>
                    )}
                  </div>
                  {index < lifecyclePhases.length - 1 && (
                    <div
                      className={`mx-2 h-1 w-12 rounded ${
                        index < currentPhaseIndex ? 'bg-emerald-500' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Engagement Snapshot</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <article className="rounded-md border border-slate-100 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Session Plan Progress</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {sessionSummary.completed} of {sessionSummary.total} sessions
            </p>
            <div className="mt-2 h-2 rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-blue-600" style={{ width: `${sessionProgress}%` }} />
            </div>
          </article>

          <article className="rounded-md border border-slate-100 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Maturity</p>
            <div className="mt-2 flex gap-1">
              {maturity.map((level, index) => (
                <span
                  key={`${customer.id}-${index}`}
                  className={`rounded px-2 py-1 text-xs font-semibold ${levelClasses(level)}`}
                >
                  {level === 'Not Started' ? '—' : level.charAt(0)}
                </span>
              ))}
            </div>
          </article>

          <article className="rounded-md border border-slate-100 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">LoE</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {engagement ? `${engagement.consumedDays}/${engagement.allocatedDays} days (${engagement.loePercentage}%)` : 'No active engagement'}
            </p>
            {engagement && (
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div
                  className={`h-2 rounded-full ${
                    engagement.loePercentage > 80
                      ? 'bg-red-500'
                      : engagement.loePercentage >= 60
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(engagement.loePercentage, 100)}%` }}
                />
              </div>
            )}
          </article>

          <article className="rounded-md border border-slate-100 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Last Session</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{formatDate(sessionDates.last)}</p>
          </article>

          <article className="rounded-md border border-slate-100 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Next Session</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{formatDate(sessionDates.next)}</p>
          </article>

          <article className="rounded-md border border-slate-100 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Days Since Last Communication</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{daysSinceCommunication} days</p>
          </article>

          <article className="rounded-md border border-slate-100 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Days Until Renewal</p>
            <p className={`mt-1 text-sm font-semibold ${daysUntilRenewal < 180 ? 'text-red-700' : 'text-slate-900'}`}>
              {daysUntilRenewal} days
            </p>
          </article>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Customer Prerequisite Status</h2>
            <p className="mt-1 text-sm text-slate-600">
              {completePrereqs} of {prerequisiteTotal} prerequisites complete
            </p>
          </div>
          <Link to="../prerequisites" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            View full checklist
          </Link>
        </div>
        <div className="mt-3 h-2 rounded-full bg-slate-100">
          <div className="h-2 rounded-full bg-blue-600" style={{ width: `${prerequisiteProgress}%` }} />
        </div>
        {blockedPrereqs > 0 && (
          <p className="mt-2 text-sm font-semibold text-red-700">{blockedPrereqs} items blocked</p>
        )}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Change Control Summary</h2>
        {!customer.changeControl.documented && (
          <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm font-medium text-amber-800">
            Change control process not yet documented. Capture during customer kickoff.
          </div>
        )}
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <article className="rounded-md border border-slate-100 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Lead Time</p>
            <p className={`mt-1 text-sm font-semibold ${customer.changeControl.documented ? 'text-slate-900' : 'text-red-700'}`}>
              {leadTimeText}
            </p>
          </article>
          <article className="rounded-md border border-slate-100 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Deployment Windows</p>
            <p className="mt-1 text-sm text-slate-700">
              {customer.changeControl.deploymentWindows || 'Not documented'}
            </p>
          </article>
          <article className="rounded-md border border-slate-100 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Approval Required</p>
            <p className="mt-1 text-sm text-slate-700">
              {customer.changeControl.approvalWorkflows || 'Not documented'}
            </p>
          </article>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Customer Contacts</h2>
          <ul className="mt-3 space-y-2">
            {customer.customerContacts.map((contact) => (
              <li key={contact.id} className="rounded-md border border-slate-100 p-3">
                <p className="text-sm font-semibold text-slate-900">{contact.name}</p>
                <p className="text-xs text-slate-600">{contact.role}</p>
                <p className="mt-1 text-xs text-slate-500">Cadence: {contact.communicationCadence}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Account Team</h2>
          <ul className="mt-3 space-y-2">
            {customer.accountTeam.map((member) => (
              <li key={member.id} className="rounded-md border border-slate-100 p-3">
                <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                <p className="text-xs uppercase text-slate-600">{member.role}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Active Items</h2>
        <div className="mt-3 space-y-2">
          {actionItems.map((item, index) => (
            <div key={`${item.description}-${index}`} className="flex items-center gap-3 rounded-md border border-slate-100 p-3">
              <span className={`h-2.5 w-2.5 rounded-full ${statusClasses(item.status)}`} />
              <p className="text-sm text-slate-700">{item.description}</p>
            </div>
          ))}
          {blockerRisks.map((risk) => (
            <div key={risk.id} className="flex items-center gap-3 rounded-md border border-red-100 bg-red-50 p-3">
              <ShieldAlert size={16} className="text-red-700" />
              <p className="text-sm text-red-700">{risk.description}</p>
            </div>
          ))}
          <div className="flex items-center gap-3 rounded-md border border-slate-100 p-3">
            <AlertTriangle size={16} className="text-amber-600" />
            <p className="text-sm text-slate-700">Active escalations: {escalationCount}</p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Recent Activity Timeline</h2>
        <ul className="mt-4 space-y-3">
          {timelineEntries.slice(0, 8).map((entry, index) => (
            <li key={`${entry.date}-${index}`} className="flex items-start gap-3">
              <span className="mt-0.5 rounded-full bg-slate-100 p-1.5 text-slate-600">
                {entry.type === 'session' && <CheckCircle2 size={14} />}
                {entry.type === 'email' && <Mail size={14} />}
                {entry.type === 'assessment' && <Clock3 size={14} />}
                {entry.type === 'psr' && <CalendarClock size={14} />}
                {entry.type === 'kickoff' && <AlertTriangle size={14} />}
              </span>
              <div className="min-w-0">
                <p className="text-sm text-slate-800">{entry.description}</p>
                <p className="text-xs text-slate-500">{formatDate(entry.date)}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
