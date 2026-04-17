import { ArrowDown, ArrowUp, CheckCircle2, ChevronDown, ChevronUp, Minus } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, CartesianGrid } from 'recharts'
import { useParams } from 'react-router-dom'
import * as data from '../../data'

type ViewMode = 'current' | 'history'
type AssessmentTypeOption = 'initial' | 'periodic' | 'post_migration'
type MaturityLevelOption = 'not_started' | 'bronze' | 'silver' | 'gold'

const LEVEL_TO_SCORE: Record<MaturityLevelOption, number> = {
  not_started: 0,
  bronze: 1,
  silver: 2,
  gold: 3,
}

const SCORE_TO_LABEL: Record<number, string> = {
  0: 'Not Started',
  1: 'Bronze',
  2: 'Silver',
  3: 'Gold',
}

const TODAY = new Date('2026-04-15T00:00:00').toISOString().slice(0, 10)

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function typeLabel(type: AssessmentTypeOption) {
  if (type === 'initial') return 'Initial'
  if (type === 'periodic') return 'Periodic'
  return 'Post-Migration'
}

function typeClasses(type: AssessmentTypeOption) {
  if (type === 'initial') return 'bg-blue-100 text-blue-700'
  if (type === 'periodic') return 'bg-emerald-100 text-emerald-700'
  return 'bg-purple-100 text-purple-700'
}

function levelLabel(level: MaturityLevelOption) {
  if (level === 'not_started') return 'Not Started'
  return `${level.charAt(0).toUpperCase()}${level.slice(1)}`
}

function levelClasses(level: MaturityLevelOption, large?: boolean) {
  const size = large ? 'px-4 py-2 text-sm' : 'px-2 py-1 text-xs'
  if (level === 'gold') return `${size} bg-yellow-100 text-yellow-800`
  if (level === 'silver') return `${size} bg-slate-100 text-slate-700`
  if (level === 'bronze') return `${size} bg-orange-100 text-orange-700`
  return `${size} bg-slate-50 text-slate-500`
}

function ClampText({
  value,
  expanded,
  onToggle,
}: {
  value: string
  expanded: boolean
  onToggle: () => void
}) {
  if (!value) return <span className="text-slate-400">No notes captured.</span>

  return (
    <div>
      <p
        className="text-xs text-slate-500"
        style={
          expanded
            ? undefined
            : {
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }
        }
      >
        {value}
      </p>
      {value.length > 120 && (
        <button
          type="button"
          onClick={onToggle}
          className="mt-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  )
}

export function MaturityTab() {
  const { id } = useParams()
  const [viewMode, setViewMode] = useState<ViewMode>('current')
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})
  const [expandedTimeline, setExpandedTimeline] = useState<Record<string, boolean>>({})
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [compareLeftId, setCompareLeftId] = useState('')
  const [compareRightId, setCompareRightId] = useState('')

  const customer = data.customers.find((item) => item.id === id)
  const customerAssessments = useMemo(
    () =>
      data.maturityAssessments
        .filter((assessment) => assessment.customerId === id)
        .sort((a, b) => new Date(b.assessmentDate).getTime() - new Date(a.assessmentDate).getTime()),
    [id],
  )

  const latestAssessment = customerAssessments[0]
  const hasAssessments = customerAssessments.length > 0

  const [formDate, setFormDate] = useState(TODAY)
  const [formType, setFormType] = useState<AssessmentTypeOption>('periodic')
  const [formSummary, setFormSummary] = useState('')
  const [formPillars, setFormPillars] = useState<
    Array<{
      pillarName: string
      useCases: Array<{ useCaseName: string; level: MaturityLevelOption; evidenceNotes: string; identifiedGaps: string }>
    }>
  >([])

  useEffect(() => {
    if (!latestAssessment) return
    setFormPillars(
      latestAssessment.pillars.map((pillar) => ({
        pillarName: pillar.pillarName,
        useCases: pillar.useCases.map((useCase) => ({
          useCaseName: useCase.useCaseName,
          level: useCase.level,
          evidenceNotes: useCase.evidenceNotes,
          identifiedGaps: useCase.identifiedGaps,
        })),
      })),
    )
    setFormSummary(latestAssessment.overallSummary)
  }, [latestAssessment])

  const progressionData = useMemo(
    () =>
      [...customerAssessments]
        .reverse()
        .map((assessment) => {
          const posture = assessment.pillars.find((pillar) => pillar.pillarName === 'Posture Security')?.overallBadge ?? 'not_started'
          const runtime = assessment.pillars.find((pillar) => pillar.pillarName === 'Runtime Security')?.overallBadge ?? 'not_started'
          const appSec = assessment.pillars.find((pillar) => pillar.pillarName === 'Application Security')?.overallBadge ?? 'not_started'

          return {
            date: formatDate(assessment.assessmentDate),
            posture: LEVEL_TO_SCORE[posture],
            runtime: LEVEL_TO_SCORE[runtime],
            appSec: LEVEL_TO_SCORE[appSec],
          }
        }),
    [customerAssessments],
  )

  const compareLeft = customerAssessments.find((assessment) => assessment.id === compareLeftId)
  const compareRight = customerAssessments.find((assessment) => assessment.id === compareRightId)

  if (!customer) {
    return (
      <section className="rounded-lg border border-red-200 bg-white p-5">
        <p className="text-sm font-medium text-red-700">Customer not found.</p>
      </section>
    )
  }

  const handleSaveAssessment = () => {
    setShowToast(true)
    window.setTimeout(() => setShowToast(false), 2500)
  }

  const renderPillarUseCases = (assessmentId: string, pillars: (typeof latestAssessment)['pillars']) =>
    pillars.map((pillar) => (
      <article key={`${assessmentId}-${pillar.pillarName}`} className="rounded-md border border-slate-100 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-900">{pillar.pillarName}</h3>
          <span className={`rounded-full font-semibold ${levelClasses(pillar.overallBadge, true)}`}>
            {levelLabel(pillar.overallBadge)}
          </span>
        </div>
        <ul className="mt-3 space-y-3">
          {pillar.useCases.map((useCase) => {
            const key = `${assessmentId}-${pillar.pillarName}-${useCase.useCaseName}`
            return (
              <li key={key} className="rounded-md bg-slate-50 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-800">{useCase.useCaseName}</p>
                  <span className={`rounded-full font-semibold ${levelClasses(useCase.level)}`}>
                    {levelLabel(useCase.level)}
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Evidence Notes</p>
                  <ClampText
                    value={useCase.evidenceNotes}
                    expanded={Boolean(expandedRows[key])}
                    onToggle={() => setExpandedRows((prev) => ({ ...prev, [key]: !prev[key] }))}
                  />
                </div>
                {useCase.identifiedGaps && (
                  <p className="mt-2 text-xs text-amber-700">
                    <span className="font-semibold">Gap:</span> {useCase.identifiedGaps}
                  </p>
                )}
              </li>
            )
          })}
        </ul>
      </article>
    ))

  const compareRows = useMemo(() => {
    if (!compareLeft || !compareRight) return []

    const rows: Array<{
      pillarName: string
      useCaseName: string
      leftLevel: MaturityLevelOption
      rightLevel: MaturityLevelOption
    }> = []

    const pillarNames = new Set([
      ...compareLeft.pillars.map((pillar) => pillar.pillarName),
      ...compareRight.pillars.map((pillar) => pillar.pillarName),
    ])

    pillarNames.forEach((pillarName) => {
      const leftPillar = compareLeft.pillars.find((pillar) => pillar.pillarName === pillarName)
      const rightPillar = compareRight.pillars.find((pillar) => pillar.pillarName === pillarName)
      const useCaseNames = new Set([
        ...(leftPillar?.useCases.map((useCase) => useCase.useCaseName) ?? []),
        ...(rightPillar?.useCases.map((useCase) => useCase.useCaseName) ?? []),
      ])

      useCaseNames.forEach((useCaseName) => {
        const leftLevel =
          leftPillar?.useCases.find((useCase) => useCase.useCaseName === useCaseName)?.level ?? 'not_started'
        const rightLevel =
          rightPillar?.useCases.find((useCase) => useCase.useCaseName === useCaseName)?.level ?? 'not_started'

        rows.push({ pillarName, useCaseName, leftLevel, rightLevel })
      })
    })

    return rows
  }, [compareLeft, compareRight])

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1">
          <button
            type="button"
            onClick={() => setViewMode('current')}
            className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
              viewMode === 'current' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Current Assessment
          </button>
          <button
            type="button"
            onClick={() => setViewMode('history')}
            className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
              viewMode === 'history' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            History & Progression
          </button>
        </div>
      </section>

      {viewMode === 'current' && (
        <>
          {!hasAssessments && (
            <section className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 shadow-sm">
              No maturity assessment conducted yet. Schedule an assessment session to begin.
            </section>
          )}

          {latestAssessment && (
            <>
              <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Latest Assessment — {formatDate(latestAssessment.assessmentDate)}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">Assessor: {latestAssessment.assessorName}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${typeClasses(latestAssessment.assessmentType)}`}
                  >
                    {typeLabel(latestAssessment.assessmentType)}
                  </span>
                </div>
                <div className="mt-3 rounded-md border border-blue-100 bg-blue-50 p-3 text-sm text-slate-700">
                  {latestAssessment.overallSummary}
                </div>
              </section>

              <section className="grid gap-4 xl:grid-cols-3">
                {renderPillarUseCases(latestAssessment.id, latestAssessment.pillars)}
              </section>

              <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Recommended Sessions from Assessment
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {latestAssessment.recommendedNextSessions.map((session) => (
                    <span
                      key={session}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {session}
                    </span>
                  ))}
                </div>
              </section>

              <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <button
                  type="button"
                  onClick={() => setIsFormOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <h3 className="text-lg font-semibold text-slate-900">Record New Assessment</h3>
                  {isFormOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {isFormOpen && (
                  <div className="mt-4 space-y-4 border-t border-slate-100 pt-4">
                    <div className="grid gap-3 md:grid-cols-2">
                      <label className="text-sm text-slate-700">
                        Assessment Date
                        <input
                          type="date"
                          value={formDate}
                          onChange={(event) => setFormDate(event.target.value)}
                          className="mt-1 h-9 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />
                      </label>
                      <label className="text-sm text-slate-700">
                        Assessment Type
                        <select
                          value={formType}
                          onChange={(event) => setFormType(event.target.value as AssessmentTypeOption)}
                          className="mt-1 h-9 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        >
                          <option value="initial">Initial</option>
                          <option value="periodic">Periodic</option>
                          <option value="post_migration">Post-Migration</option>
                        </select>
                      </label>
                    </div>

                    {formPillars.map((pillar, pillarIndex) => (
                      <article key={pillar.pillarName} className="rounded-md border border-slate-100 p-3">
                        <h4 className="text-sm font-semibold text-slate-900">{pillar.pillarName}</h4>
                        <div className="mt-3 space-y-3">
                          {pillar.useCases.map((useCase, useCaseIndex) => (
                            <div key={useCase.useCaseName} className="rounded-md bg-slate-50 p-3">
                              <p className="text-sm font-medium text-slate-800">{useCase.useCaseName}</p>
                              <label className="mt-2 block text-xs text-slate-600">
                                Level
                                <select
                                  value={useCase.level}
                                  onChange={(event) =>
                                    setFormPillars((prev) =>
                                      prev.map((existingPillar, existingPillarIndex) =>
                                        existingPillarIndex === pillarIndex
                                          ? {
                                              ...existingPillar,
                                              useCases: existingPillar.useCases.map((existingUseCase, existingUseCaseIndex) =>
                                                existingUseCaseIndex === useCaseIndex
                                                  ? { ...existingUseCase, level: event.target.value as MaturityLevelOption }
                                                  : existingUseCase,
                                              ),
                                            }
                                          : existingPillar,
                                      ),
                                    )
                                  }
                                  className="mt-1 h-8 w-full rounded-md border border-slate-200 px-2 text-sm outline-none focus:border-blue-600"
                                >
                                  <option value="not_started">Not Started</option>
                                  <option value="bronze">Bronze</option>
                                  <option value="silver">Silver</option>
                                  <option value="gold">Gold</option>
                                </select>
                              </label>
                              <label className="mt-2 block text-xs text-slate-600">
                                Evidence Notes
                                <textarea
                                  value={useCase.evidenceNotes}
                                  onChange={(event) =>
                                    setFormPillars((prev) =>
                                      prev.map((existingPillar, existingPillarIndex) =>
                                        existingPillarIndex === pillarIndex
                                          ? {
                                              ...existingPillar,
                                              useCases: existingPillar.useCases.map((existingUseCase, existingUseCaseIndex) =>
                                                existingUseCaseIndex === useCaseIndex
                                                  ? { ...existingUseCase, evidenceNotes: event.target.value }
                                                  : existingUseCase,
                                              ),
                                            }
                                          : existingPillar,
                                      ),
                                    )
                                  }
                                  rows={2}
                                  className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm outline-none focus:border-blue-600"
                                />
                              </label>
                              <label className="mt-2 block text-xs text-slate-600">
                                Identified Gaps
                                <textarea
                                  value={useCase.identifiedGaps}
                                  onChange={(event) =>
                                    setFormPillars((prev) =>
                                      prev.map((existingPillar, existingPillarIndex) =>
                                        existingPillarIndex === pillarIndex
                                          ? {
                                              ...existingPillar,
                                              useCases: existingPillar.useCases.map((existingUseCase, existingUseCaseIndex) =>
                                                existingUseCaseIndex === useCaseIndex
                                                  ? { ...existingUseCase, identifiedGaps: event.target.value }
                                                  : existingUseCase,
                                              ),
                                            }
                                          : existingPillar,
                                      ),
                                    )
                                  }
                                  rows={2}
                                  className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm outline-none focus:border-blue-600"
                                />
                              </label>
                            </div>
                          ))}
                        </div>
                      </article>
                    ))}

                    <label className="block text-sm text-slate-700">
                      Overall Summary
                      <textarea
                        value={formSummary}
                        onChange={(event) => setFormSummary(event.target.value)}
                        rows={4}
                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={handleSaveAssessment}
                      className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Save Assessment
                    </button>
                  </div>
                )}
              </section>
            </>
          )}
        </>
      )}

      {viewMode === 'history' && (
        <>
          {!hasAssessments && (
            <section className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 shadow-sm">
              No maturity assessment conducted yet. Schedule an assessment session to begin.
            </section>
          )}

          {hasAssessments && (
            <>
              <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">Progression Chart</h3>
                {customerAssessments.length === 1 && (
                  <p className="mt-1 text-sm text-amber-700">
                    More assessments needed to show progression trend.
                  </p>
                )}
                <div className="mt-3 h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis
                        domain={[0, 3]}
                        ticks={[0, 1, 2, 3]}
                        tickFormatter={(value) => SCORE_TO_LABEL[value] ?? ''}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip
                        formatter={(value) => SCORE_TO_LABEL[Number(value)] ?? ''}
                        labelStyle={{ color: '#0f172a' }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="posture" stroke="#2563eb" name="Posture Security" strokeWidth={2} />
                      <Line type="monotone" dataKey="runtime" stroke="#16a34a" name="Runtime Security" strokeWidth={2} />
                      <Line type="monotone" dataKey="appSec" stroke="#7c3aed" name="Application Security" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </section>

              <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">Compare Assessments</h3>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <label className="text-sm text-slate-700">
                    Assessment A
                    <select
                      value={compareLeftId}
                      onChange={(event) => setCompareLeftId(event.target.value)}
                      className="mt-1 h-9 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-blue-600"
                    >
                      <option value="">Select assessment</option>
                      {customerAssessments.map((assessment) => (
                        <option key={assessment.id} value={assessment.id}>
                          {formatDate(assessment.assessmentDate)} - {typeLabel(assessment.assessmentType)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-sm text-slate-700">
                    Assessment B
                    <select
                      value={compareRightId}
                      onChange={(event) => setCompareRightId(event.target.value)}
                      className="mt-1 h-9 w-full rounded-md border border-slate-200 px-3 outline-none focus:border-blue-600"
                    >
                      <option value="">Select assessment</option>
                      {customerAssessments.map((assessment) => (
                        <option key={assessment.id} value={assessment.id}>
                          {formatDate(assessment.assessmentDate)} - {typeLabel(assessment.assessmentType)}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                {compareLeft && compareRight && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                      <thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                        <tr>
                          <th className="px-3 py-2">Pillar / Use Case</th>
                          <th className="px-3 py-2">{formatDate(compareLeft.assessmentDate)}</th>
                          <th className="px-3 py-2">{formatDate(compareRight.assessmentDate)}</th>
                          <th className="px-3 py-2">Delta</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {compareRows.map((row) => {
                          const leftScore = LEVEL_TO_SCORE[row.leftLevel]
                          const rightScore = LEVEL_TO_SCORE[row.rightLevel]
                          const diff = rightScore - leftScore
                          return (
                            <tr key={`${row.pillarName}-${row.useCaseName}`}>
                              <td className="px-3 py-2 text-slate-800">
                                <p className="font-semibold">{row.pillarName}</p>
                                <p className="text-xs text-slate-600">{row.useCaseName}</p>
                              </td>
                              <td className="px-3 py-2">
                                <span className={`rounded-full font-semibold ${levelClasses(row.leftLevel)}`}>
                                  {levelLabel(row.leftLevel)}
                                </span>
                              </td>
                              <td className="px-3 py-2">
                                <span className={`rounded-full font-semibold ${levelClasses(row.rightLevel)}`}>
                                  {levelLabel(row.rightLevel)}
                                </span>
                              </td>
                              <td className="px-3 py-2">
                                {diff > 0 ? (
                                  <span className="inline-flex items-center gap-1 text-emerald-700">
                                    <ArrowUp size={14} />
                                    Improved
                                  </span>
                                ) : diff < 0 ? (
                                  <span className="inline-flex items-center gap-1 text-red-700">
                                    <ArrowDown size={14} />
                                    Regressed
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-slate-500">
                                    <Minus size={14} />
                                    No change
                                  </span>
                                )}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

              <section className="space-y-3">
                {customerAssessments.map((assessment) => {
                  const posture = assessment.pillars.find((pillar) => pillar.pillarName === 'Posture Security')?.overallBadge ?? 'not_started'
                  const runtime = assessment.pillars.find((pillar) => pillar.pillarName === 'Runtime Security')?.overallBadge ?? 'not_started'
                  const appSec = assessment.pillars.find((pillar) => pillar.pillarName === 'Application Security')?.overallBadge ?? 'not_started'
                  const isExpanded = Boolean(expandedTimeline[assessment.id])

                  return (
                    <article key={assessment.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{formatDate(assessment.assessmentDate)}</p>
                          <p className="text-xs text-slate-600">Assessor: {assessment.assessorName}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`rounded-full px-2 py-1 text-xs font-semibold ${typeClasses(assessment.assessmentType)}`}>
                            {typeLabel(assessment.assessmentType)}
                          </span>
                          <button
                            type="button"
                            onClick={() => setExpandedTimeline((prev) => ({ ...prev, [assessment.id]: !prev[assessment.id] }))}
                            className="rounded-md border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
                          >
                            {isExpanded ? 'Collapse' : 'Expand'}
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className={`rounded-full font-semibold ${levelClasses(posture)}`}>Posture: {levelLabel(posture)}</span>
                        <span className={`rounded-full font-semibold ${levelClasses(runtime)}`}>Runtime: {levelLabel(runtime)}</span>
                        <span className={`rounded-full font-semibold ${levelClasses(appSec)}`}>AppSec: {levelLabel(appSec)}</span>
                      </div>

                      <p className="mt-3 text-sm text-slate-700">{assessment.overallSummary}</p>

                      {isExpanded && (
                        <div className="mt-4 grid gap-4 xl:grid-cols-3">
                          {renderPillarUseCases(assessment.id, assessment.pillars)}
                        </div>
                      )}
                    </article>
                  )
                })}
              </section>
            </>
          )}
        </>
      )}

      {showToast && (
        <div className="fixed right-6 top-20 z-50 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 size={16} />
            Assessment saved successfully (demo).
          </span>
        </div>
      )}
    </div>
  )
}
