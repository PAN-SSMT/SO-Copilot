import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { AlertsPage } from './pages/AlertsPage'
import { CalendarPage } from './pages/CalendarPage'
import { CustomerDetailLayout } from './pages/CustomerDetailLayout'
import { ArtifactsTab } from './pages/customer/ArtifactsTab'
import { CheckInTab } from './pages/customer/CheckInTab'
import { CommunicationsTab } from './pages/customer/CommunicationsTab'
import { CustomerKickoffTab } from './pages/customer/CustomerKickoffTab'
import { EscalationsTab } from './pages/customer/EscalationsTab'
import { InternalKickoffTab } from './pages/customer/InternalKickoffTab'
import { MaturityTab } from './pages/customer/MaturityTab'
import { OverviewTab } from './pages/customer/OverviewTab'
import { PrerequisitesTab } from './pages/customer/PrerequisitesTab'
import { SessionPlanTab } from './pages/customer/SessionPlanTab'
import { SessionsTab } from './pages/customer/SessionsTab'
import { ServiceReviewsTab } from './pages/customer/ServiceReviewsTab'
import { CustomersPage } from './pages/CustomersPage'
import { DashboardPage } from './pages/Dashboard'
import { ReportsPage } from './pages/ReportsPage'
import { ScopeCheckPage } from './pages/ScopeCheckPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/customers/:id" element={<CustomerDetailLayout />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<OverviewTab />} />
          <Route path="internal-kickoff" element={<InternalKickoffTab />} />
          <Route path="customer-kickoff" element={<CustomerKickoffTab />} />
          <Route path="prerequisites" element={<PrerequisitesTab />} />
          <Route path="artifacts" element={<ArtifactsTab />} />
          <Route path="maturity" element={<MaturityTab />} />
          <Route path="session-plan" element={<SessionPlanTab />} />
          <Route path="sessions" element={<SessionsTab />} />
          <Route path="check-in" element={<CheckInTab />} />
          <Route path="communications" element={<CommunicationsTab />} />
          <Route path="escalations" element={<EscalationsTab />} />
          <Route path="service-reviews" element={<ServiceReviewsTab />} />
        </Route>
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/scope-check" element={<ScopeCheckPage />} />
      </Route>
    </Routes>
  )
}

export default App
