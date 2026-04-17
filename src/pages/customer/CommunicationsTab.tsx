import { CheckCircle2, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as data from '../../data'

type FilterType = 'all' | 'session_prep' | 'post_session_status' | 'internal_update' | 'escalation_notice' | 'psr' | 'ad_hoc'

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function typeLabel(type: (typeof data.communications)[number]['type']) {
  if (type === 'session_prep') return 'Session Prep'
  if (type === 'post_session_status') return 'Post-Session Status'
  if (type === 'internal_update') return 'Internal Update'
  if (type === 'escalation_notice') return 'Escalation Notice'
  if (type === 'psr') return 'PSR'
  if (type === 'renewal_alignment') return 'Renewal Alignment'
  return 'Ad Hoc'
}

function typeClasses(type: (typeof data.communications)[number]['type']) {
  if (type === 'session_prep') return 'bg-blue-100 text-blue-700'
  if (type === 'post_session_status') return 'bg-emerald-100 text-emerald-700'
  if (type === 'internal_update') return 'bg-slate-100 text-slate-700'
  if (type === 'escalation_notice') return 'bg-red-100 text-red-700'
  if (type === 'psr') return 'bg-purple-100 text-purple-700'
  if (type === 'renewal_alignment') return 'bg-amber-100 text-amber-700'
  return 'bg-slate-200 text-slate-800'
}

function filterMatches(filter: FilterType, type: (typeof data.communications)[number]['type']) {
  if (filter === 'all') return true
  return filter === type
}

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1)}...`
}

export function CommunicationsTab() {
  const { id } = useParams()
  const customer = data.customers.find((item) => item.id === id)
  const [filter, setFilter] = useState<FilterType>('all')
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const customerCommunications = useMemo(
    () =>
      data.communications
        .filter((communication) => communication.customerId === id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [id],
  )

  const filteredCommunications = useMemo(
    () => customerCommunications.filter((communication) => filterMatches(filter, communication.type)),
    [customerCommunications, filter],
  )

  if (!customer) {
    return (
      <section className="rounded-lg border border-red-200 bg-white p-5">
        <p className="text-sm font-medium text-red-700">Customer not found.</p>
      </section>
    )
  }

  if (customerCommunications.length === 0) {
    return (
      <section className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 shadow-sm">
        No communications recorded yet.
      </section>
    )
  }

  const filters: Array<{ id: FilterType; label: string }> = [
    { id: 'all', label: 'All' },
    { id: 'session_prep', label: 'Session Prep' },
    { id: 'post_session_status', label: 'Post-Session' },
    { id: 'internal_update', label: 'Internal' },
    { id: 'escalation_notice', label: 'Escalation' },
    { id: 'psr', label: 'PSR' },
    { id: 'ad_hoc', label: 'Ad Hoc' },
  ]

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Communications Log</h2>
        <p className="mt-1 text-sm text-slate-600">{customerCommunications.length} total communications</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {filters.map((filterItem) => (
            <button
              key={filterItem.id}
              type="button"
              onClick={() => setFilter(filterItem.id)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                filter === filterItem.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:text-slate-900'
              }`}
            >
              {filterItem.label}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        {filteredCommunications.map((communication) => {
          const isExpanded = Boolean(expanded[communication.id])
          return (
            <article key={communication.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${typeClasses(communication.type)}`}>
                    {typeLabel(communication.type)}
                  </span>
                  <span className="text-xs text-slate-500">{formatDate(communication.date)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setExpanded((prev) => ({ ...prev, [communication.id]: !prev[communication.id] }))}
                  className="rounded-md border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  {isExpanded ? (
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

              <h3 className="mt-2 text-sm font-semibold text-slate-900">{communication.subject}</h3>
              <p className="mt-1 text-xs text-slate-600">To: {communication.recipientsTo.join(', ') || '—'}</p>
              <p className="mt-2 text-sm text-slate-700">{truncateText(communication.contentSummary, 220)}</p>

              <div className="mt-2 flex flex-wrap gap-2">
                {communication.clarizenCcd && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 size={12} />
                    Clarizen CC&apos;d
                  </span>
                )}
                {communication.slackBccd && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700">
                    <MessageSquare size={12} />
                    Slack BCC&apos;d
                  </span>
                )}
              </div>

              {isExpanded && (
                <div className="mt-3 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm">
                  <p className="text-xs text-slate-600">To: {communication.recipientsTo.join(', ') || '—'}</p>
                  <p className="mt-1 text-xs text-slate-600">CC: {communication.recipientsCc.join(', ') || '—'}</p>
                  <p className="mt-1 text-xs text-slate-600">BCC: {communication.recipientsBcc.join(', ') || '—'}</p>
                  <div className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{communication.fullContent}</div>
                </div>
              )}
            </article>
          )
        })}

        {filteredCommunications.length === 0 && (
          <section className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 shadow-sm">
            No communications recorded for this filter.
          </section>
        )}
      </section>
    </div>
  )
}
