import { Bell, Calendar, ChevronLeft, ChevronRight, FileText, LayoutDashboard, Search, Shield, Users, AlertTriangle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

type NavItem = {
  to: string
  label: string
  icon: typeof LayoutDashboard
}

const navItems: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/customers', label: 'Customers', icon: Users },
  { to: '/calendar', label: 'Calendar', icon: Calendar },
  { to: '/alerts', label: 'Alerts & Risks', icon: AlertTriangle },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/scope-check', label: 'Scope Check', icon: Shield },
]

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/customers': 'Customers',
  '/calendar': 'Calendar',
  '/alerts': 'Alerts & Risks',
  '/reports': 'Reports',
  '/scope-check': 'Scope Check',
}

export function AppLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const { pathname } = useLocation()

  const pageTitle = useMemo(() => {
    if (pathname.startsWith('/customers/')) {
      return 'Customer Detail'
    }

    return pageTitles[pathname] ?? 'S&O Copilot'
  }, [pathname])

  return (
    <div className="flex min-h-screen bg-gray-50 text-slate-900">
      <aside
        className={`flex flex-col border-r border-slate-800 bg-slate-900 text-slate-100 transition-all duration-200 ${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="flex h-14 items-center justify-between border-b border-slate-800 px-3">
          <div className="text-sm font-semibold tracking-wide text-slate-50">
            {isSidebarCollapsed ? 'S&O' : 'S&O Copilot'}
          </div>
          <button
            type="button"
            onClick={() => setIsSidebarCollapsed((current) => !current)}
            className="rounded-md p-1.5 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center rounded-md px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Icon size={18} className="shrink-0" />
                {!isSidebarCollapsed && <span className="ml-3">{item.label}</span>}
              </NavLink>
            )
          })}
        </nav>

        <div className="border-t border-slate-800 p-3">
          <div className="flex items-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-white">
              MB
            </div>
            {!isSidebarCollapsed && (
              <div className="ml-3 min-w-0">
                <p className="truncate text-sm font-semibold text-slate-100">Marcus Bennett</p>
                <p className="truncate text-xs text-slate-400">CSE — NAM</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-5">
          <div className="text-sm font-semibold text-slate-700">{pageTitle}</div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="relative rounded-md p-1.5 text-slate-600 transition hover:bg-gray-100 hover:text-slate-900"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold text-white">
                7
              </span>
            </button>
            <label className="relative block">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search customers..."
                className="h-9 w-64 rounded-md border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </label>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
