import { CheckCircle2, ChevronDown, ChevronUp, Circle, Plus, XCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as data from '../../data'

type SessionHistoryItem = {
  id: string
  date: string
  topic: string
  onlineHours: number
  offlineHours: number
  summary: string
  details: string
  postTasks: {
    customerEmail: boolean
    internalUpdate: boolean
    clarizenTime: boolean
    clarizenSummary: boolean
    checkInDashboard: boolean
  }
}

type ActionItemForm = {
  id: string
  description: string
  owner: string
  dueDate: string
}

const TODAY = '2026-04-15'

const historyByCustomerId: Record<string, SessionHistoryItem[]> = {
  'cust-001': [
    {
      id: 'hist-001-1',
      date: '2026-04-01',
      topic: 'KSPM Vulnerability and Compliance',
      onlineHours: 2,
      offlineHours: 2,
      summary: 'Configured KSPM scanning across all clusters and enabled admission control on production.',
      details:
        'Completed KSPM setup for all three clusters, validated compliance framework mappings, and documented remaining non-blocking exceptions.',
      postTasks: {
        customerEmail: true,
        internalUpdate: true,
        clarizenTime: true,
        clarizenSummary: true,
        checkInDashboard: true,
      },
    },
    {
      id: 'hist-001-2',
      date: '2025-11-18',
      topic: 'SCA/SBOM for Patient-Facing Apps',
      onlineHours: 2,
      offlineHours: 3,
      summary: 'Expanded SCA coverage and reviewed SBOM process for regulated workloads.',
      details: 'Onboarded two additional applications and aligned output for HIPAA governance reporting.',
      postTasks: {
        customerEmail: true,
        internalUpdate: true,
        clarizenTime: true,
        clarizenSummary: true,
        checkInDashboard: false,
      },
    },
  ],
  'cust-002': [
    {
      id: 'hist-002-1',
      date: '2026-03-10',
      topic: 'Agentless Scanning Configuration (Attempt)',
      onlineHours: 1.5,
      offlineHours: 1.5,
      summary: 'Session blocked due to unresolved AWS IAM permissions for connector onboarding.',
      details: 'Reviewed blocker with customer and documented dependency on admin remediation before next session.',
      postTasks: {
        customerEmail: true,
        internalUpdate: true,
        clarizenTime: true,
        clarizenSummary: false,
        checkInDashboard: false,
      },
    },
    {
      id: 'hist-002-2',
      date: '2025-09-16',
      topic: 'CWP Agent Test Deployment',
      onlineHours: 2,
      offlineHours: 2,
      summary: 'Completed test deployment on limited workloads, validated baseline runtime telemetry.',
      details: 'Documented production rollout blockers and assigned prerequisite actions before scaling.',
      postTasks: {
        customerEmail: true,
        internalUpdate: false,
        clarizenTime: true,
        clarizenSummary: false,
        checkInDashboard: false,
      },
    },
  ],
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function totalTaskCount(tasks: SessionHistoryItem['postTasks']) {
  return Object.values(tasks).filter(Boolean).length
}

function taskPill(label: string, done: boolean) {
  return (
    <span
      key={label}
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
        done ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
      }`}
    >
      {done ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
      {label}
    </span>
  )
}

export function SessionsTab() {
  const { id } = useParams()
  const customer = data.customers.find((item) => item.id === id)
  const plan = data.sessionPlans.find((item) => item.customerId === id)
  const engagement = data.engagements.find((item) => item.customerId === id)
  const customerContacts = customer?.customerContacts ?? []
  const accountTeam = customer?.accountTeam ?? []

  const [expandedHistory, setExpandedHistory] = useState<Record<string, boolean>>({})
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const [sessionDate, setSessionDate] = useState(TODAY)
  const [sessionPlanEntryId, setSessionPlanEntryId] = useState('ad-hoc')
  const [onlineHours, setOnlineHours] = useState(2)
  const [offlineHours, setOfflineHours] = useState(2)
  const [whatCovered, setWhatCovered] = useState('')
  const [whatCompleted, setWhatCompleted] = useState('')
  const [blockers, setBlockers] = useState('')
  const [offlineWork, setOfflineWork] = useState('')
  const [nextFocus, setNextFocus] = useState('')
  const [actionItems, setActionItems] = useState<ActionItemForm[]>([
    { id: crypto.randomUUID(), description: '', owner: 'customer', dueDate: TODAY },
  ])

  const [checklist, setChecklist] = useState({
    customerEmail: false,
    internalUpdate: false,
    clarizenTime: false,
    clarizenSummary: false,
    checkInDashboard: false,
  })

  const availablePlanEntries = useMemo(
    () =>
      plan?.entries.filter((entry) => entry.status === 'scheduled' || entry.status === 'planned') ?? [],
    [plan],
  )

  const selectedPlanEntry = availablePlanEntries.find((entry) => entry.id === sessionPlanEntryId)
  const nextScheduledSession = plan?.entries.find((entry) => entry.status === 'scheduled')
  const derivedTopic = selectedPlanEntry?.useCase ?? 'Ad Hoc Session'

  const historyItems = useMemo(() => {
    if (id && historyByCustomerId[id]) return historyByCustomerId[id]

    if (!plan) return []

    return plan.entries
      .filter((entry) => entry.status === 'delivered')
      .slice(0, 3)
      .map((entry, index) => ({
        id: `auto-${entry.id}`,
        date: entry.targetDate,
        topic: entry.useCase,
        onlineHours: 2,
        offlineHours: 2,
        summary: 'Delivered planned session and aligned next actions with the customer team.',
        details: entry.notes || 'Detailed notes were captured in the session summary.',
        postTasks: {
          customerEmail: true,
          internalUpdate: index % 2 === 0,
          clarizenTime: true,
          clarizenSummary: true,
          checkInDashboard: index % 2 === 1,
        },
      }))
  }, [id, plan])

  if (!customer) {
    return (
      <section className="rounded-lg border border-red-200 bg-white p-5">
        <p className="text-sm font-medium text-red-700">Customer not found.</p>
      </section>
    )
  }

  const completedChecklistCount = Object.values(checklist).filter(Boolean).length
  const checklistPercent = Math.round((completedChecklistCount / 5) * 100)

  const ownerOptions = [
    { value: 'customer', label: 'Customer Contact' },
    { value: 'cse', label: 'CSE' },
    { value: 'am', label: 'Account Manager' },
    { value: 'sc', label: 'Solutions Consultant' },
    { value: 'dc', label: 'Domain Consultant' },
  ]

  const handleSave = () => {
    setShowToast(true)
    window.setTimeout(() => setShowToast(false), 2500)
  }

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Session History</h2>
        <div className="mt-3 space-y-3">
          {historyItems.length === 0 && (
            <p className="text-sm text-slate-600">No delivered sessions recorded yet.</p>
          )}

          {historyItems.map((item) => (
            <article key={item.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.topic}</p>
                  <p className="text-xs text-slate-600">
                    {formatDate(item.date)} • {item.onlineHours} hrs online + {item.offlineHours} hrs offline
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setExpandedHistory((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                  }
                  className="rounded-md border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  {expandedHistory[item.id] ? (
                    <span className="inline-flex items-center gap-1">
                      <ChevronUp size={14} /> Collapse
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1">
                      <ChevronDown size={14} /> Expand
                    </span>
                  )}
                </button>
              </div>
              <p className="mt-2 text-sm text-slate-700">{item.summary}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {taskPill('Customer Email', item.postTasks.customerEmail)}
                {taskPill('Internal Update', item.postTasks.internalUpdate)}
                {taskPill('Clarizen Time', item.postTasks.clarizenTime)}
                {taskPill('Clarizen Summary', item.postTasks.clarizenSummary)}
                {taskPill('Check-In', item.postTasks.checkInDashboard)}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {totalTaskCount(item.postTasks)} of 5 post-session tasks complete
              </p>

              {expandedHistory[item.id] && (
                <div className="mt-3 rounded-md border border-slate-200 bg-white p-3 text-sm text-slate-700">
                  {item.details}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <button
          type="button"
          onClick={() => setIsFormOpen((prev) => !prev)}
          className="flex w-full items-center justify-between"
        >
          <h2 className="text-lg font-semibold text-slate-900">Record New Session</h2>
          {isFormOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {isFormOpen && (
          <div className="mt-4 space-y-4 border-t border-slate-100 pt-4">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-sm text-slate-700">
                Session Date
                <input
                  type="date"
                  value={sessionDate}
                  onChange={(event) => setSessionDate(event.target.value)}
                  className="mt-1 h-9 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </label>
              <label className="text-sm text-slate-700">
                Session Plan Entry
                <select
                  value={sessionPlanEntryId}
                  onChange={(event) => setSessionPlanEntryId(event.target.value)}
                  className="mt-1 h-9 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="ad-hoc">Ad Hoc Session</option>
                  {availablePlanEntries.map((entry) => (
                    <option key={entry.id} value={entry.id}>
                      #{entry.sequenceNumber} — {entry.useCase}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-sm text-slate-700">
                Online Hours
                <input
                  type="number"
                  min={0}
                  step={0.5}
                  value={onlineHours}
                  onChange={(event) => setOnlineHours(Number(event.target.value))}
                  className="mt-1 h-9 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </label>
              <label className="text-sm text-slate-700">
                Offline Hours
                <input
                  type="number"
                  min={0}
                  step={0.5}
                  value={offlineHours}
                  onChange={(event) => setOfflineHours(Number(event.target.value))}
                  className="mt-1 h-9 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </div>

            <label className="block text-sm text-slate-700">
              What was covered
              <textarea
                value={whatCovered}
                onChange={(event) => setWhatCovered(event.target.value)}
                rows={3}
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <label className="block text-sm text-slate-700">
              What was completed
              <textarea
                value={whatCompleted}
                onChange={(event) => setWhatCompleted(event.target.value)}
                rows={3}
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">Action Items</h3>
                <button
                  type="button"
                  onClick={() =>
                    setActionItems((prev) => [
                      ...prev,
                      { id: crypto.randomUUID(), description: '', owner: 'customer', dueDate: TODAY },
                    ])
                  }
                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  <Plus size={12} /> Add
                </button>
              </div>
              {actionItems.map((item) => (
                <div key={item.id} className="grid gap-2 rounded-md bg-slate-50 p-3 md:grid-cols-3">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(event) =>
                      setActionItems((prev) =>
                        prev.map((entry) =>
                          entry.id === item.id ? { ...entry, description: event.target.value } : entry,
                        ),
                      )
                    }
                    placeholder="Action item description"
                    className="h-9 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-blue-600"
                  />
                  <select
                    value={item.owner}
                    onChange={(event) =>
                      setActionItems((prev) =>
                        prev.map((entry) =>
                          entry.id === item.id ? { ...entry, owner: event.target.value } : entry,
                        ),
                      )
                    }
                    className="h-9 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-blue-600"
                  >
                    {ownerOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={item.dueDate}
                    onChange={(event) =>
                      setActionItems((prev) =>
                        prev.map((entry) =>
                          entry.id === item.id ? { ...entry, dueDate: event.target.value } : entry,
                        ),
                      )
                    }
                    className="h-9 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-blue-600"
                  />
                </div>
              ))}
            </div>

            <label className="block text-sm text-slate-700">
              Blockers identified
              <textarea
                value={blockers}
                onChange={(event) => setBlockers(event.target.value)}
                rows={2}
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <label className="block text-sm text-slate-700">
              Offline work planned/completed
              <textarea
                value={offlineWork}
                onChange={(event) => setOfflineWork(event.target.value)}
                rows={2}
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <label className="block text-sm text-slate-700">
              Next session focus
              <textarea
                value={nextFocus}
                onChange={(event) => setNextFocus(event.target.value)}
                rows={2}
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <div className="grid gap-3 xl:grid-cols-2">
              <article className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <h4 className="text-sm font-semibold text-slate-900">Customer Email Preview</h4>
                <p className="mt-2 text-xs text-slate-600">
                  To: {customerContacts.map((contact) => contact.email).join(', ') || '—'}
                </p>
                <p className="text-xs text-slate-600">
                  Subject: [{customer.name}] Session Status Update — {derivedTopic}
                </p>
                <div className="mt-2 text-xs text-slate-700">
                  <p><span className="font-semibold">Done:</span> {whatCompleted || 'Session completion details will appear here.'}</p>
                  <p className="mt-1"><span className="font-semibold">Working on:</span> {offlineWork || 'Offline work details will appear here.'}</p>
                  <p className="mt-1"><span className="font-semibold">Next:</span> {nextFocus || 'Next session focus will appear here.'}</p>
                  <p className="mt-1"><span className="font-semibold">Issues/Risk:</span> {blockers || 'No blockers noted.'}</p>
                </div>
              </article>

              <article className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <h4 className="text-sm font-semibold text-slate-900">Internal Update Preview</h4>
                <p className="mt-2 text-xs text-slate-600">
                  To: {accountTeam.map((member) => member.email).join(', ') || '—'}
                </p>
                <p className="text-xs text-slate-600">Subject: [Internal] {customer.name} — Session Update</p>
                <div className="mt-2 text-xs text-slate-700">
                  <p><span className="font-semibold">Coverage:</span> {whatCovered || 'Session scope details will appear here.'}</p>
                  <p className="mt-1"><span className="font-semibold">Completed:</span> {whatCompleted || 'Completion summary will appear here.'}</p>
                  <p className="mt-1"><span className="font-semibold">Risk:</span> {blockers || 'No risk flagged.'}</p>
                </div>
              </article>

              <article className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <h4 className="text-sm font-semibold text-slate-900">Clarizen Summary Preview</h4>
                <div className="mt-2 text-xs text-slate-700">
                  <p>
                    <span className="font-semibold">Overall Project Status:</span> {customer.healthLabel}
                  </p>
                  <p className="mt-1"><span className="font-semibold">Issue:</span> {blockers || 'None'}</p>
                  <p className="mt-1"><span className="font-semibold">Milestones:</span> {derivedTopic}</p>
                  <p className="mt-1">
                    <span className="font-semibold">Next session:</span>{' '}
                    {nextScheduledSession ? formatDate(nextScheduledSession.targetDate) : 'TBD'}
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold">License consumption:</span>{' '}
                    {engagement ? `${engagement.loePercentage}%` : '—'}
                  </p>
                </div>
              </article>

              <article className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <h4 className="text-sm font-semibold text-slate-900">Check-In Dashboard Update Preview</h4>
                <div className="mt-2 text-xs text-slate-700">
                  <p><span className="font-semibold">Upcoming sessions:</span> {nextFocus || 'Will update after session save.'}</p>
                  <p className="mt-1"><span className="font-semibold">Product updates discussed:</span> {whatCovered || 'Not captured yet.'}</p>
                  <p className="mt-1"><span className="font-semibold">Relevant cases:</span> {blockers || 'None'}</p>
                </div>
              </article>
            </div>

            <section className="rounded-lg border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-slate-900">Post-Session Compliance Checklist</h3>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {[
                  ['customerEmail', 'Customer email sent'],
                  ['internalUpdate', 'Internal update sent'],
                  ['clarizenTime', 'Clarizen time reported'],
                  ['clarizenSummary', 'Clarizen overall summary updated'],
                  ['checkInDashboard', 'CS Check-In Dashboard updated'],
                ].map(([key, label]) => {
                  const taskKey = key as keyof typeof checklist
                  const checked = checklist[taskKey]
                  return (
                    <button
                      type="button"
                      key={key}
                      onClick={() => setChecklist((prev) => ({ ...prev, [taskKey]: !prev[taskKey] }))}
                      className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                    >
                      {checked ? <CheckCircle2 size={16} className="text-emerald-600" /> : <Circle size={16} className="text-slate-400" />}
                      {label}
                    </button>
                  )
                })}
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-800">
                {completedChecklistCount} of 5 tasks complete
              </p>
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-blue-600" style={{ width: `${checklistPercent}%` }} />
              </div>
              {completedChecklistCount === 5 && (
                <p className="mt-2 text-sm font-semibold text-emerald-700">✓ Session fully documented</p>
              )}
            </section>

            <button
              type="button"
              onClick={handleSave}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Save Session
            </button>
          </div>
        )}
      </section>

      {showToast && (
        <div className="fixed right-6 top-20 z-50 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
          Session saved successfully (demo).
        </div>
      )}
    </div>
  )
}
