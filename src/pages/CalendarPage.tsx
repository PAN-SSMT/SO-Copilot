import { AlertCircle, ArrowRight, Check, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { calendarEvents } from '../data'

type EventFilter = 'all' | 'session' | 'psr' | 'kickoff' | 'renewal' | 'internal' | 'prep'

const TODAY_KEY = '2026-04-15'
const TODAY_DATE = new Date('2026-04-15T00:00:00')

function toDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseDateKey(key: string) {
  return new Date(`${key}T00:00:00`)
}

function isSameMonth(date: Date, monthDate: Date) {
  return date.getMonth() === monthDate.getMonth() && date.getFullYear() === monthDate.getFullYear()
}

function generateCalendarGrid(monthDate: Date) {
  const firstOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1)
  const mondayBasedDay = (firstOfMonth.getDay() + 6) % 7
  const gridStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1 - mondayBasedDay)

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + index)
    return date
  })
}

function eventTypeClasses(type: EventFilter, status?: 'confirmed' | 'tentative' | 'completed' | 'overdue') {
  const typeStyles: Record<EventFilter, string> = {
    all: 'bg-blue-100 text-blue-800 border-l-2 border-blue-500',
    session: 'bg-teal-100 text-teal-800 border-l-2 border-teal-500',
    psr: 'bg-purple-100 text-purple-800 border-l-2 border-purple-500',
    kickoff: 'bg-indigo-100 text-indigo-800 border-l-2 border-indigo-500',
    renewal: 'bg-red-100 text-red-800 border-l-2 border-red-500',
    internal: 'bg-slate-100 text-slate-700 border-l-2 border-slate-500',
    prep: 'bg-amber-100 text-amber-800 border-l-2 border-amber-500',
  }

  const dashed = status === 'tentative' ? ' border-dashed' : ''
  const opacity = status === 'completed' ? ' opacity-60' : ''
  return `${typeStyles[type]}${dashed}${opacity}`
}

function healthBadgeClasses(health?: 'On Track' | 'At Risk' | 'Off Track') {
  if (health === 'On Track') return 'text-emerald-700'
  if (health === 'At Risk') return 'text-amber-700'
  if (health === 'Off Track') return 'text-red-700'
  return 'text-slate-600'
}

function statusBadgeClasses(status?: 'confirmed' | 'tentative' | 'completed' | 'overdue') {
  if (status === 'confirmed') return 'bg-emerald-100 text-emerald-700'
  if (status === 'tentative') return 'border border-dashed border-amber-400 bg-amber-50 text-amber-700'
  if (status === 'completed') return 'bg-slate-200 text-slate-700'
  if (status === 'overdue') return 'bg-red-100 text-red-700'
  return 'bg-slate-100 text-slate-600'
}

function eventTypeLabel(type: Exclude<EventFilter, 'all'>) {
  if (type === 'psr') return 'PSR'
  return `${type.charAt(0).toUpperCase()}${type.slice(1)}`
}

export function CalendarPage() {
  const navigate = useNavigate()
  const [currentMonth, setCurrentMonth] = useState(new Date('2026-04-01T00:00:00'))
  const [selectedDate, setSelectedDate] = useState<string | null>(TODAY_KEY)
  const [activeFilter, setActiveFilter] = useState<EventFilter>('all')

  const filteredEvents = useMemo(
    () =>
      (activeFilter === 'all'
        ? calendarEvents
        : calendarEvents.filter((event) => event.type === activeFilter)
      ).slice(),
    [activeFilter],
  )

  const calendarGrid = useMemo(() => generateCalendarGrid(currentMonth), [currentMonth])

  const eventsByDate = useMemo(() => {
    const map = new Map<string, typeof filteredEvents>()
    filteredEvents.forEach((event) => {
      const existing = map.get(event.date) ?? []
      existing.push(event)
      map.set(event.date, existing)
    })
    return map
  }, [filteredEvents])

  const monthEventsCount = filteredEvents.filter((event) => {
    const eventDate = parseDateKey(event.date)
    return isSameMonth(eventDate, currentMonth)
  }).length

  const monthTypeCounts = useMemo(() => {
    const counts: Record<EventFilter, number> = {
      all: 0,
      session: 0,
      psr: 0,
      kickoff: 0,
      renewal: 0,
      internal: 0,
      prep: 0,
    }
    calendarEvents.forEach((event) => {
      const eventDate = parseDateKey(event.date)
      if (isSameMonth(eventDate, currentMonth)) {
        counts.all += 1
        counts[event.type] += 1
      }
    })
    return counts
  }, [currentMonth])

  const selectedDateHeader = selectedDate
    ? parseDateKey(selectedDate).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  const selectedDayEvents = selectedDate ? eventsByDate.get(selectedDate) ?? [] : []

  const upcomingEvents = filteredEvents
    .filter((event) => {
      const eventDate = parseDateKey(event.date)
      const diffDays = Math.floor((eventDate.getTime() - TODAY_DATE.getTime()) / (1000 * 60 * 60 * 24))
      return diffDays >= 0 && diffDays <= 7
    })
    .sort((a, b) => {
      const dateDiff = parseDateKey(a.date).getTime() - parseDateKey(b.date).getTime()
      if (dateDiff !== 0) return dateDiff
      return (a.time ?? '').localeCompare(b.time ?? '')
    })

  const filters: Array<{ id: EventFilter; label: string; activeClasses: string }> = [
    { id: 'all', label: 'All', activeClasses: 'bg-blue-600 text-white border-blue-600' },
    { id: 'session', label: 'Sessions', activeClasses: 'bg-teal-600 text-white border-teal-600' },
    { id: 'psr', label: 'PSRs', activeClasses: 'bg-purple-600 text-white border-purple-600' },
    { id: 'kickoff', label: 'Kickoffs', activeClasses: 'bg-indigo-600 text-white border-indigo-600' },
    { id: 'renewal', label: 'Renewals', activeClasses: 'bg-red-600 text-white border-red-600' },
    { id: 'internal', label: 'Internal', activeClasses: 'bg-slate-700 text-white border-slate-700' },
    { id: 'prep', label: 'Prep', activeClasses: 'bg-amber-600 text-white border-amber-600' },
  ]

  return (
    <div className="min-h-screen space-y-4 bg-gray-50">
      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Calendar</h1>
            <p className="mt-1 text-sm text-slate-500">Session schedule across all customers</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
              }
              className="rounded-lg p-2 hover:bg-gray-100"
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>
            <p className="min-w-40 text-center text-sm font-semibold text-slate-800">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
            <button
              type="button"
              onClick={() =>
                setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
              }
              className="rounded-lg p-2 hover:bg-gray-100"
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentMonth(new Date('2026-04-01T00:00:00'))
                setSelectedDate(TODAY_KEY)
              }}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-gray-50"
            >
              Today
            </button>
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-600">{monthEventsCount} events this month</p>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                activeFilter === filter.id
                  ? filter.activeClasses
                  : 'border-gray-300 bg-white text-slate-600 hover:bg-gray-50'
              }`}
            >
              {filter.label}
              {activeFilter === filter.id ? ` (${monthTypeCounts[filter.id]})` : ''}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div
              key={day}
              className={`bg-gray-100 px-2 py-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-600 ${
                index >= 5 ? 'bg-gray-50/50' : ''
              }`}
            >
              {day}
            </div>
          ))}

          {calendarGrid.map((date, index) => {
            const dateKey = toDateKey(date)
            const dayEvents = eventsByDate.get(dateKey) ?? []
            const isCurrentMonth = isSameMonth(date, currentMonth)
            const isToday = dateKey === TODAY_KEY
            const isSelected = dateKey === selectedDate
            const isWeekend = index % 7 === 5 || index % 7 === 6

            return (
              <button
                key={dateKey}
                type="button"
                onClick={() => setSelectedDate(dateKey)}
                className={`min-h-[120px] bg-white px-2 py-2 text-left align-top transition hover:bg-blue-50 ${
                  isWeekend ? 'bg-gray-50/50' : ''
                } ${isSelected ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                      isToday
                        ? 'bg-blue-600 text-white'
                        : isCurrentMonth
                          ? 'text-slate-900'
                          : 'text-slate-400'
                    }`}
                  >
                    {date.getDate()}
                  </span>
                </div>

                <div className="mt-2 space-y-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div key={event.id}>
                      <div
                        className={`hidden rounded px-1.5 py-1 text-[10px] font-medium sm:flex items-center gap-1 ${eventTypeClasses(
                          event.type,
                          event.status,
                        )}`}
                      >
                        {event.status === 'completed' && <Check size={10} />}
                        <span className="truncate">
                          {event.title} — {event.customerName}
                        </span>
                      </div>
                      <div
                        className={`sm:hidden h-2 w-2 rounded-full ${
                          event.type === 'session'
                            ? 'bg-teal-500'
                            : event.type === 'psr'
                              ? 'bg-purple-500'
                              : event.type === 'kickoff'
                                ? 'bg-indigo-500'
                                : event.type === 'renewal'
                                  ? 'bg-red-500'
                                  : event.type === 'internal'
                                    ? 'bg-slate-500'
                                    : 'bg-amber-500'
                        } ${event.status === 'completed' ? 'opacity-60' : ''}`}
                        title={`${event.title} — ${event.customerName}`}
                      />
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <button
                      type="button"
                      onClick={(clickEvent) => {
                        clickEvent.stopPropagation()
                        setSelectedDate(dateKey)
                      }}
                      className="text-[10px] font-semibold text-blue-600 hover:text-blue-700"
                    >
                      +{dayEvents.length - 3} more
                    </button>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {selectedDate && (
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">{selectedDateHeader}</h2>
          <div className="mt-3 space-y-3">
            {selectedDayEvents.length === 0 && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <div className="inline-flex items-center gap-2">
                  <AlertCircle size={16} />
                  No events scheduled
                </div>
              </div>
            )}

            {selectedDayEvents.map((event) => (
              <article key={event.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-28 text-sm font-semibold text-slate-700">
                    <div className="inline-flex items-center gap-1">
                      <Clock size={14} />
                      {event.time ?? 'TBD'}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">{event.title}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                      <span className={`font-semibold ${healthBadgeClasses(event.healthBadge)}`}>
                        ● {event.customerName}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 font-semibold ${eventTypeClasses(
                          event.type,
                          event.status,
                        )}`}
                      >
                        {eventTypeLabel(event.type)}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 font-semibold ${statusBadgeClasses(
                          event.status,
                        )}`}
                      >
                        {event.status === 'completed' ? (
                          <span className="inline-flex items-center gap-1">
                            <Check size={12} />
                            Completed
                          </span>
                        ) : event.status
                          ? `${event.status.charAt(0).toUpperCase()}${event.status.slice(1)}`
                          : 'Planned'}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      {event.description ?? 'No description provided.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate(`/customers/${event.customerId}/overview`)}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Open Customer <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Coming Up</h2>
        <p className="mt-1 text-sm text-slate-500">Next 7 days</p>
        <div className="mt-3 space-y-2">
          {upcomingEvents.length === 0 && (
            <p className="text-sm text-slate-600">No upcoming events in the next 7 days.</p>
          )}
          {upcomingEvents.map((event) => (
            <div key={event.id} className="flex flex-wrap items-center gap-2 rounded-md border border-slate-200 p-3 text-sm">
              <span className="font-semibold text-slate-700">
                {parseDateKey(event.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              <span className="text-slate-500">{event.time ?? 'TBD'}</span>
              <button
                type="button"
                onClick={() => navigate(`/customers/${event.customerId}/overview`)}
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                {event.customerName}
              </button>
              <span className="text-slate-700">{event.title}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${eventTypeClasses(event.type, event.status)}`}>
                {eventTypeLabel(event.type)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
