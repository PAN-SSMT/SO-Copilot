import { useMemo, useState } from 'react'
import * as data from '../data'

function categoryLabel(category: (typeof data.scopeReferenceData)[number]['category']) {
  if (category === 'configuration_assistance') return 'Configuration Assistance'
  if (category === 'operational_assistance') return 'Operational Assistance'
  if (category === 'security_optimization') return 'Security Optimization'
  return 'Excluded'
}

export function ScopeCheckPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredScopeItems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return data.scopeReferenceData
    return data.scopeReferenceData.filter(
      (item) =>
        item.taskName.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        categoryLabel(item.category).toLowerCase().includes(query),
    )
  }, [searchTerm])

  const configurationItems = filteredScopeItems.filter(
    (item) => item.category === 'configuration_assistance',
  )
  const operationalItems = filteredScopeItems.filter(
    (item) => item.category === 'operational_assistance',
  )
  const securityItems = filteredScopeItems.filter(
    (item) => item.category === 'security_optimization',
  )
  const excludedItems = filteredScopeItems.filter((item) => item.category === 'excluded')

  const renderScopeTable = (
    title: string,
    items: typeof data.scopeReferenceData,
    headerClasses: string,
    badgeLabel: string,
    badgeClasses: string,
    note?: string,
  ) => (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className={`rounded-t-lg px-4 py-3 ${headerClasses}`}>
        <h2 className="text-sm font-semibold text-white">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2">Task</th>
              <th className="px-3 py-2">Description</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Decision</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-3 py-2 font-semibold text-slate-800">{item.taskName}</td>
                <td className="px-3 py-2 text-slate-700">{item.description}</td>
                <td className="px-3 py-2 text-xs text-slate-600">{categoryLabel(item.category)}</td>
                <td className="px-3 py-2">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${badgeClasses}`}>
                    {badgeLabel}
                  </span>
                  {note && <p className="mt-1 text-xs text-slate-600">{note}</p>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Scope Check</h1>
        <p className="mt-1 text-sm text-slate-600">
          Validate requested work against Premium Success scope in seconds.
        </p>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Describe the requested work or search for a scope item..."
          className="mt-3 h-11 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Quick Decision Helper</h2>
        <ul className="mt-2 space-y-2 text-sm text-slate-700">
          <li>
            If the customer asks for help with configuration, optimization, or operational tasks
            listed below → <span className="font-semibold text-emerald-700">In Scope</span>
          </li>
          <li>
            If the customer asks for hands-on deployment, custom scripting, or items in the
            exclusions list →{' '}
            <span className="font-semibold text-red-700">Out of Scope (refer to PS or Add-on SKU)</span>
          </li>
          <li>
            If the customer reports a bug or product issue →{' '}
            <span className="font-semibold text-amber-700">Refer to TAC</span>
          </li>
          <li>
            If unsure → <span className="font-semibold text-blue-700">Check with CSE Manager</span>
          </li>
        </ul>
      </section>

      {renderScopeTable(
        `Configuration Assistance (${configurationItems.length})`,
        configurationItems,
        'bg-blue-600',
        'In Scope ✓',
        'bg-emerald-100 text-emerald-700',
      )}

      {renderScopeTable(
        `Operational Assistance (${operationalItems.length})`,
        operationalItems,
        'bg-emerald-600',
        'In Scope ✓',
        'bg-emerald-100 text-emerald-700',
      )}

      {renderScopeTable(
        `Security Optimization (${securityItems.length})`,
        securityItems,
        'bg-purple-600',
        'In Scope ✓',
        'bg-emerald-100 text-emerald-700',
      )}

      {renderScopeTable(
        `Excluded from Premium Success (Requires Add-on SKU) (${excludedItems.length})`,
        excludedItems,
        'bg-red-600',
        'Excluded ✗',
        'bg-red-100 text-red-700',
        'Requires Add-on S&O SKU',
      )}
    </div>
  )
}
