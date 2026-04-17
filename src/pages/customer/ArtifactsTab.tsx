import { CheckCircle2, Clock3, ExternalLink, FolderOpen, XCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'
import * as data from '../../data'

type ArtifactStatus = 'present' | 'missing' | 'outdated'

function formatDate(date: string | null) {
  if (!date) return '—'
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function statusBadgeClasses(status: ArtifactStatus) {
  if (status === 'present') return 'bg-emerald-100 text-emerald-700'
  if (status === 'outdated') return 'bg-amber-100 text-amber-700'
  return 'bg-red-100 text-red-700'
}

function statusIcon(status: ArtifactStatus) {
  if (status === 'present') return <CheckCircle2 size={18} className="text-emerald-600" />
  if (status === 'outdated') return <Clock3 size={18} className="text-amber-600" />
  return <XCircle size={18} className="text-red-600" />
}

function rowClasses(status: ArtifactStatus) {
  if (status === 'outdated') return 'border-l-amber-400 bg-amber-50'
  if (status === 'missing') return 'border-l-red-400 bg-red-50'
  return 'border-l-emerald-300 bg-white'
}

export function ArtifactsTab() {
  const { id } = useParams()
  const customer = data.customers.find((item) => item.id === id)
  const customerArtifacts = data.customerArtifacts.find((item) => item.customerId === id)

  if (!customer) {
    return (
      <section className="rounded-lg border border-red-200 bg-white p-5">
        <p className="text-sm font-medium text-red-700">Customer not found.</p>
      </section>
    )
  }

  if (!customerArtifacts) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Artifacts</h2>
        <p className="mt-2 text-sm text-slate-600">No artifact record found for this customer.</p>
      </section>
    )
  }

  const present = customerArtifacts.items.filter((item) => item.status === 'present')
  const outdated = customerArtifacts.items.filter((item) => item.status === 'outdated')
  const missing = customerArtifacts.items.filter((item) => item.status === 'missing')
  const allCurrent = present.length === customerArtifacts.items.length

  const orderedArtifacts = [...present, ...outdated, ...missing]

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            <span className="text-emerald-700">{present.length} present</span>,{' '}
            <span className="text-red-700">{missing.length} missing</span>,{' '}
            <span className="text-amber-700">{outdated.length} outdated</span>
          </h2>
          <div className="flex items-center gap-2">
            {missing.length > 0 && (
              <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
                {missing.length} artifacts missing
              </span>
            )}
            {allCurrent && (
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                All artifacts current ✓
              </span>
            )}
          </div>
        </div>
        {customerArtifacts.accountFolderLink && (
          <a
            href={customerArtifacts.accountFolderLink}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
          >
            <FolderOpen size={16} />
            📁 Open Account Folder
            <ExternalLink size={14} />
          </a>
        )}
      </section>

      <section className="space-y-3">
        {orderedArtifacts.map((artifact) => (
          <article
            key={artifact.id}
            className={`rounded-lg border border-slate-200 border-l-4 p-4 shadow-sm ${rowClasses(artifact.status)}`}
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5">{statusIcon(artifact.status)}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-semibold text-slate-900">{artifact.name}</p>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusBadgeClasses(artifact.status)}`}
                  >
                    {artifact.status.charAt(0).toUpperCase()}
                    {artifact.status.slice(1)}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span>Last updated: {formatDate(artifact.lastUpdated)}</span>
                  {artifact.link && (
                    <a
                      href={artifact.link}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Open
                    </a>
                  )}
                </div>
                {artifact.notes && <p className="mt-2 text-xs text-slate-600">{artifact.notes}</p>}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
