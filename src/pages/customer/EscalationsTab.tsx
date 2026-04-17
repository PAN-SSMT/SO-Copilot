import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as data from '../../data'

type EscalationWorkflowType =
  | 'deployment_blocker'
  | 'loe_overrun'
  | 'product_issue'
  | 'account_health'

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function riskTypeLabel(type: (typeof data.riskAlerts)[number]['type']) {
  return type
    .split('_')
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ')
}

function severityClasses(severity: (typeof data.riskAlerts)[number]['severity']) {
  if (severity === 'high') return 'bg-red-100 text-red-700'
  if (severity === 'medium') return 'bg-amber-100 text-amber-700'
  return 'bg-yellow-100 text-yellow-700'
}

function severityBorder(severity: (typeof data.riskAlerts)[number]['severity']) {
  if (severity === 'high') return 'border-l-red-500'
  if (severity === 'medium') return 'border-l-amber-500'
  return 'border-l-yellow-500'
}

function resolutionClasses(status: (typeof data.riskAlerts)[number]['resolutionStatus']) {
  if (status === 'open') return 'bg-red-100 text-red-700'
  if (status === 'acknowledged') return 'bg-amber-100 text-amber-700'
  if (status === 'in_progress') return 'bg-blue-100 text-blue-700'
  return 'bg-emerald-100 text-emerald-700'
}

const workflowDefinitions: Array<{
  key: EscalationWorkflowType
  title: string
  trigger: string
  steps: string[]
  owner: string
}> = [
  {
    key: 'deployment_blocker',
    title: 'Workflow 1: Deployment Blocker',
    trigger: 'Customer unable to deploy due to technical, access, or resource issues',
    steps: [
      'Document blocker',
      'Attempt resolution in session',
      'If unresolved after 2 sessions, escalate to CSE Manager',
      'Engage PS/TAC as needed',
      'Involve AM if customer-side resource issue',
    ],
    owner: 'CSE → CSE Manager → AM',
  },
  {
    key: 'loe_overrun',
    title: 'Workflow 2: LoE Overrun (30% threshold)',
    trigger: 'Engagement trending to exceed allocated LoE by more than 30%',
    steps: [
      'Document LoE consumption trend',
      'Review session plan for consolidation opportunities',
      'Discuss with CSE Manager',
      'Prepare customer conversation for scope realignment',
      'Involve AM if Add-on SKU needed',
    ],
    owner: 'CSE → CSE Manager → AM',
  },
  {
    key: 'product_issue',
    title: 'Workflow 3: Product Issue',
    trigger: 'Support cases blocking session plan progress for more than 2 weeks',
    steps: [
      'Document blocking cases',
      'Identify alternative session topics',
      'If unresolved after 2 weeks, escalate via SFDC',
      'Engage TAC management',
      'Update customer on resolution timeline',
    ],
    owner: 'CSE → TAC → Product Team',
  },
  {
    key: 'account_health',
    title: 'Workflow 4: Account Health Management',
    trigger: 'Customer health drops to Red (Off Track) or multiple compounding risks',
    steps: [
      'Document all contributing factors',
      'Prepare remediation plan',
      'Escalate to CSE Manager',
      'Joint session with AM to align on customer communication',
      'Execute remediation plan with increased cadence',
    ],
    owner: 'CSE → CSE Manager → AM → Leadership (if needed)',
  },
]

export function EscalationsTab() {
  const { id } = useParams()
  const customer = data.customers.find((item) => item.id === id)
  const risks = data.riskAlerts.filter((risk) => risk.customerId === id)

  const [isReferenceOpen, setIsReferenceOpen] = useState(false)
  const [openWorkflowCards, setOpenWorkflowCards] = useState<Record<string, boolean>>({})
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [formType, setFormType] = useState<EscalationWorkflowType>('deployment_blocker')
  const [formSeverity, setFormSeverity] = useState<'high' | 'medium' | 'low'>('medium')
  const [formDescription, setFormDescription] = useState('')
  const [formAction, setFormAction] = useState('')

  const severityCounts = useMemo(
    () =>
      risks.reduce(
        (acc, risk) => {
          acc[risk.severity] += 1
          return acc
        },
        { high: 0, medium: 0, low: 0 },
      ),
    [risks],
  )

  if (!customer) {
    return (
      <section className="rounded-lg border border-red-200 bg-white p-5">
        <p className="text-sm font-medium text-red-700">Customer not found.</p>
      </section>
    )
  }

  const handleSubmitEscalation = () => {
    setShowToast(true)
    window.setTimeout(() => setShowToast(false), 2500)
  }

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Active Escalations Summary</h2>
        {risks.length === 0 ? (
          <div className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
            No active escalations.
          </div>
        ) : (
          <div className="mt-3 rounded-md border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm font-semibold text-slate-900">{risks.length} active escalations</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                High: {severityCounts.high}
              </span>
              <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
                Medium: {severityCounts.medium}
              </span>
              <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700">
                Low: {severityCounts.low}
              </span>
            </div>
          </div>
        )}
      </section>

      <section className="space-y-3">
        {risks.map((risk) => (
          <article
            key={risk.id}
            className={`rounded-lg border border-slate-200 border-l-4 bg-white p-4 shadow-sm ${severityBorder(risk.severity)}`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2 py-1 text-xs font-semibold ${severityClasses(risk.severity)}`}>
                {risk.severity.charAt(0).toUpperCase()}
                {risk.severity.slice(1)}
              </span>
              <p className="text-sm font-semibold text-slate-900">{riskTypeLabel(risk.type)}</p>
              <p className="text-xs text-slate-500">Triggered {formatDate(risk.triggerDate)}</p>
            </div>
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
              {risk.resolutionNotes && <p className="text-xs text-slate-600">{risk.resolutionNotes}</p>}
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <button
          type="button"
          onClick={() => setIsReferenceOpen((prev) => !prev)}
          className="flex w-full items-center justify-between"
        >
          <h3 className="text-base font-semibold text-slate-900">Escalation Workflows Reference</h3>
          {isReferenceOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {isReferenceOpen && (
          <div className="mt-3 space-y-3">
            {workflowDefinitions.map((workflow) => (
              <article key={workflow.key} className="rounded-md border border-slate-200 bg-slate-50 p-3">
                <button
                  type="button"
                  onClick={() =>
                    setOpenWorkflowCards((prev) => ({ ...prev, [workflow.key]: !prev[workflow.key] }))
                  }
                  className="flex w-full items-center justify-between text-left"
                >
                  <p className="text-sm font-semibold text-slate-900">{workflow.title}</p>
                  {openWorkflowCards[workflow.key] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openWorkflowCards[workflow.key] && (
                  <div className="mt-2 space-y-2 text-sm text-slate-700">
                    <p>
                      <span className="font-semibold">Trigger:</span> {workflow.trigger}
                    </p>
                    <div>
                      <p className="font-semibold">Steps:</p>
                      <ol className="mt-1 list-decimal space-y-1 pl-5">
                        {workflow.steps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    <p>
                      <span className="font-semibold">Owner:</span> {workflow.owner}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <button
          type="button"
          onClick={() => setIsFormOpen((prev) => !prev)}
          className="flex w-full items-center justify-between"
        >
          <h3 className="text-base font-semibold text-slate-900">Initiate New Escalation</h3>
          {isFormOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {isFormOpen && (
          <div className="mt-3 space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-sm text-slate-700">
                Escalation Type
                <select
                  value={formType}
                  onChange={(event) => setFormType(event.target.value as EscalationWorkflowType)}
                  className="mt-1 h-9 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="deployment_blocker">Deployment Blocker</option>
                  <option value="loe_overrun">LoE Overrun</option>
                  <option value="product_issue">Product Issue</option>
                  <option value="account_health">Account Health Management</option>
                </select>
              </label>
              <label className="text-sm text-slate-700">
                Severity
                <select
                  value={formSeverity}
                  onChange={(event) => setFormSeverity(event.target.value as 'high' | 'medium' | 'low')}
                  className="mt-1 h-9 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </label>
            </div>
            <label className="block text-sm text-slate-700">
              Description
              <textarea
                value={formDescription}
                onChange={(event) => setFormDescription(event.target.value)}
                rows={3}
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <label className="block text-sm text-slate-700">
              Recommended Action
              <textarea
                value={formAction}
                onChange={(event) => setFormAction(event.target.value)}
                rows={3}
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <button
              type="button"
              onClick={handleSubmitEscalation}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Submit Escalation
            </button>
          </div>
        )}
      </section>

      {showToast && (
        <div className="fixed right-6 top-20 z-50 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 size={16} />
            Escalation submitted (demo).
          </span>
        </div>
      )}
    </div>
  )
}
