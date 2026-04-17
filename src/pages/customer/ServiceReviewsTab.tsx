import { ChevronDown, ChevronUp } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as data from '../../data'

type PsrEntry = {
  date: string
  attendees: string[]
  keyTopics: string[]
  outcomes: string[]
  nextFocus: string
  deckLink: string
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function addMonths(date: string, months: number) {
  const source = new Date(`${date}T00:00:00`)
  source.setMonth(source.getMonth() + months)
  return source
}

const psrDataByCustomerId: Record<
  string,
  { cadence: 'Quarterly' | 'Monthly'; entries: PsrEntry[] }
> = {
  'cust-001': {
    cadence: 'Quarterly',
    entries: [
      {
        date: '2026-01-15',
        attendees: ['Sarah Chen', 'Marcus Webb', 'Marcus Bennett', 'Marcus Bennett'],
        keyTopics: [
          'HIPAA compliance progress (92% → 94%)',
          'Maturity progression review (Posture Gold, Runtime Silver)',
          'Session plan velocity and delivery pacing',
          'Upcoming ASPM focus and onboarding readiness',
        ],
        outcomes: [
          'Sarah agreed to accelerate AppSec workstream',
          'Marcus requested quarterly executive compliance briefings',
          'Action: include compliance dashboard in next executive update',
        ],
        nextFocus: 'ASPM onboarding and IaC integration with executive compliance reporting.',
        deckLink: '#',
      },
    ],
  },
  'cust-004': {
    cadence: 'Quarterly',
    entries: [
      {
        date: '2026-01-20',
        attendees: ['Frank Moretti', 'Diana Cho', 'Paige Hensley', 'Marcus Bennett'],
        keyTopics: [
          'PCI-DSS compliance automation milestones',
          'Multi-cloud operational maturity progression',
          'LoE consumption review with high burn-rate flag',
          'Renewal alignment and value realization',
        ],
        outcomes: [
          'Frank approved ASPM onboarding',
          'Jennifer aligned on renewal conversation timeline',
          'Action: prioritize high-value sessions to control LoE burn',
        ],
        nextFocus: 'ASPM activation, SBOM pipeline stabilization, and renewal readiness evidence.',
        deckLink: '#',
      },
    ],
  },
  'cust-008': {
    cadence: 'Monthly',
    entries: [
      {
        date: '2026-03-10',
        attendees: ['David Chen', 'Jason Park', 'Nolan Hollis', 'Marcus Bennett'],
        keyTopics: [
          'FedRAMP continuous monitoring outcomes',
          'CMMC compliance status (Gold achieved)',
          'Expansion discussion for new GovCloud regions',
          'Engagement wrap-up planning',
        ],
        outcomes: [
          'David Chen confirmed reference account interest',
          'Nolan Hollis to prepare expansion proposal',
          'Action: draft expansion roadmap tied to DSPM coverage',
        ],
        nextFocus: 'Expansion proposal review and final wrap-up value narrative.',
        deckLink: '#',
      },
    ],
  },
}

export function ServiceReviewsTab() {
  const { id } = useParams()
  const customer = data.customers.find((item) => item.id === id)
  const [isChecklistOpen, setIsChecklistOpen] = useState(false)
  const [checklist, setChecklist] = useState({
    maturity: false,
    deliverySummary: false,
    loeProjection: false,
    adoptionMetrics: false,
    complianceMetrics: false,
    risks: false,
    focusAreas: false,
    deck: false,
    amAlignment: false,
  })

  const psrData = id ? psrDataByCustomerId[id] : undefined

  const hasNoPsr = !psrData || psrData.entries.length === 0

  const schedule = useMemo(() => {
    if (!psrData || psrData.entries.length === 0) return null
    const lastPsr = psrData.entries[0]
    const nextDate = addMonths(lastPsr.date, psrData.cadence === 'Monthly' ? 1 : 3)
    const today = new Date('2026-04-15T00:00:00')
    const daysUntil = Math.floor((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return { lastDate: lastPsr.date, nextDate, daysUntil }
  }, [psrData])

  if (!customer) {
    return (
      <section className="rounded-lg border border-red-200 bg-white p-5">
        <p className="text-sm font-medium text-red-700">Customer not found.</p>
      </section>
    )
  }

  if (hasNoPsr) {
    return (
      <section className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 shadow-sm">
        No Periodic Service Reviews conducted yet. First PSR will be scheduled based on engagement cadence.
      </section>
    )
  }

  const completedChecklistCount = Object.values(checklist).filter(Boolean).length

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">PSR Schedule</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-4">
          <article className="rounded-md border border-slate-200 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Cadence</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{psrData.cadence}</p>
          </article>
          <article className="rounded-md border border-slate-200 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Last PSR</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {schedule ? formatDate(schedule.lastDate) : '—'}
            </p>
          </article>
          <article className="rounded-md border border-slate-200 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Next PSR Due</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {schedule ? formatDate(schedule.nextDate.toISOString().slice(0, 10)) : '—'}
            </p>
          </article>
          <article className="rounded-md border border-slate-200 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Days Until Next PSR</p>
            <p
              className={`mt-1 text-sm font-semibold ${
                schedule && schedule.daysUntil < 0
                  ? 'text-red-700'
                  : schedule && schedule.daysUntil <= 14
                    ? 'text-amber-700'
                    : 'text-slate-900'
              }`}
            >
              {schedule ? schedule.daysUntil : '—'}
            </p>
          </article>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">PSR History</h3>
        {psrData.entries.map((entry, index) => (
          <article key={`${entry.date}-${index}`} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-900">{formatDate(entry.date)}</p>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                Completed
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-600">Attendees: {entry.attendees.join(', ')}</p>

            <div className="mt-3">
              <p className="text-sm font-semibold text-slate-900">Key Topics Covered</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {entry.keyTopics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>

            <div className="mt-3">
              <p className="text-sm font-semibold text-slate-900">Outcomes and Action Items</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {entry.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </div>

            <p className="mt-3 text-sm text-slate-700">
              <span className="font-semibold">Next PSR focus:</span> {entry.nextFocus}
            </p>
            <a
              href={entry.deckLink}
              className="mt-3 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Open PSR Deck
            </a>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <button
          type="button"
          onClick={() => setIsChecklistOpen((prev) => !prev)}
          className="flex w-full items-center justify-between"
        >
          <h3 className="text-base font-semibold text-slate-900">PSR Preparation Checklist</h3>
          {isChecklistOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {isChecklistOpen && (
          <div className="mt-3 space-y-2">
            {[
              ['maturity', 'Update maturity assessment (if stale)'],
              ['deliverySummary', 'Compile session delivery summary'],
              ['loeProjection', 'Calculate LoE consumption and projection'],
              ['adoptionMetrics', 'Review license/SKU adoption metrics'],
              ['complianceMetrics', 'Prepare compliance improvement metrics'],
              ['risks', 'Identify risks and blockers for discussion'],
              ['focusAreas', 'Draft recommended next-quarter focus areas'],
              ['deck', 'Prepare PSR deck from template'],
              ['amAlignment', 'Align with AM on renewal/expansion topics (if applicable)'],
            ].map(([key, label]) => {
              const checklistKey = key as keyof typeof checklist
              const checked = checklist[checklistKey]
              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => setChecklist((prev) => ({ ...prev, [checklistKey]: !prev[checklistKey] }))}
                  className="flex w-full items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                >
                  <input type="checkbox" checked={checked} readOnly />
                  {label}
                </button>
              )
            })}
            <p className="text-xs font-semibold text-slate-600">
              {completedChecklistCount} of 9 checklist items complete
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
