import { NavLink, Outlet, useParams } from 'react-router-dom'
import * as data from '../data'

const tabs = [
  { slug: 'overview', label: 'Overview' },
  { slug: 'internal-kickoff', label: 'Internal Kickoff' },
  { slug: 'customer-kickoff', label: 'Customer Kickoff' },
  { slug: 'prerequisites', label: 'Prerequisites' },
  { slug: 'artifacts', label: 'Artifacts' },
  { slug: 'maturity', label: 'Maturity' },
  { slug: 'session-plan', label: 'Session Plan' },
  { slug: 'sessions', label: 'Sessions' },
  { slug: 'check-in', label: 'Check-In' },
  { slug: 'communications', label: 'Communications' },
  { slug: 'escalations', label: 'Escalations' },
  { slug: 'service-reviews', label: 'Service Reviews' },
]

const TODAY = new Date('2026-04-15T00:00:00')

function formatMonthYear(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

function formatFullDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function monthsUntil(date: string) {
  const targetDate = new Date(`${date}T00:00:00`)
  const diffMs = targetDate.getTime() - TODAY.getTime()
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24 * 30))
}

export function CustomerDetailLayout() {
  const { id } = useParams()
  const customer = data.customers.find((item) => item.id === id)

  if (!customer) {
    return (
      <section className="rounded-lg border border-red-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">Customer not found</h1>
        <p className="mt-2 text-sm text-slate-600">
          The requested customer workspace could not be loaded.
        </p>
      </section>
    )
  }

  const renewalMonths = monthsUntil(customer.renewalDate)
  const assignedCseName =
    data.currentEngineer.id === customer.assignedCseId ? data.currentEngineer.name : customer.assignedCseId

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{customer.name}</h1>
            <p className="mt-1 text-sm text-slate-500">{customer.industry}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  customer.healthStatus === 'green'
                    ? 'bg-emerald-100 text-emerald-700'
                    : customer.healthStatus === 'amber'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-red-100 text-red-700'
                }`}
              >
                {customer.healthLabel}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  customer.engagementOrigin === 'new_deal'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-purple-100 text-purple-700'
                }`}
              >
                {customer.engagementOrigin === 'new_deal' ? 'New Deal' : 'CSM Transition'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 text-sm text-slate-700 sm:grid-cols-2 lg:min-w-[32rem]">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">ARR</p>
              <p className="mt-1 font-semibold text-slate-900">{formatCurrency(customer.arr)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Service Term</p>
              <p className="mt-1 font-semibold text-slate-900">
                {formatMonthYear(customer.serviceTermStart)} — {formatMonthYear(customer.serviceTermEnd)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Renewal</p>
              <p
                className={`mt-1 font-semibold ${
                  renewalMonths < 6 ? 'text-red-700' : 'text-slate-900'
                }`}
              >
                {formatFullDate(customer.renewalDate)} ({renewalMonths <= 0 ? 'due' : `${renewalMonths} months`})
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Assigned Team</p>
              <p className="mt-1 font-semibold text-slate-900">{assignedCseName}</p>
              <p className="text-xs text-slate-600">Manager: {data.currentManager.name}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto border-b border-slate-200">
          <nav className="flex min-w-max px-2">
            {tabs.map((tab) => (
              <NavLink
                key={tab.slug}
                to={tab.slug}
                className={({ isActive }) =>
                  `border-b-2 px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="p-4">
          <Outlet />
        </div>
      </section>
    </div>
  )
}
