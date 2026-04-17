// S&O Copilot — Mock Check-In Dashboard Data

import type { CheckInDashboard } from '../types';

export const checkInDashboards: CheckInDashboard[] = [
  {
    id: 'cid-001', customerId: 'cust-001', lastUpdated: '2026-04-01',
    upcomingSessions: [
      { date: '2026-04-29', topic: 'Compliance Reporting Dashboard', prerequisitesStatus: 'pending' },
      { date: '2026-05-27', topic: 'IaC Scanning CI/CD Integration', prerequisitesStatus: 'pending' },
    ],
    recentSessionHighlights: 'KSPM vulnerability scanning configured successfully on all 3 Kubernetes clusters. Admission control enabled on production cluster. Compliance scan showed 94% pass rate.',
    productUpdatesDiscussed: 'New KSPM compliance report templates available in latest release. Discussed new ASPM features coming in Q2.',
    relevantCustomerCases: [],
    cadenceStatus: 'on_track',
    nextStepVisibility: 'Next session: Compliance Reporting Dashboard setup for Marcus Webb executive briefings. Sarah to provide list of compliance report recipients before session.',
    notes: 'Customer is progressing well. Sarah mentioned interest in expanding DSPM coverage to a new Azure subscription being onboarded in May.',
  },
  {
    id: 'cid-002', customerId: 'cust-002', lastUpdated: '2026-01-10',
    upcomingSessions: [
      { date: '2026-04-22', topic: 'Asset Group Creation and Organization', prerequisitesStatus: 'blocked' },
    ],
    recentSessionHighlights: 'Last session (Mar 10): Attempted agentless scanning configuration. Could not proceed due to AWS permissions issue. Discussed workarounds but Tom unable to resolve IAM configuration.',
    productUpdatesDiscussed: '',
    relevantCustomerCases: [],
    cadenceStatus: 'overdue',
    nextStepVisibility: 'Engagement stalled. Tom needs to resolve AWS IAM permissions and create asset group before we can proceed. Multiple follow-up emails unanswered.',
    notes: 'Dashboard stale — last updated Jan 10. Engagement effectively paused due to customer prerequisites not being met. Escalation initiated.',
  },
  {
    id: 'cid-004', customerId: 'cust-004', lastUpdated: '2026-04-05',
    upcomingSessions: [
      { date: '2026-04-23', topic: 'ASPM Application Risk Review', prerequisitesStatus: 'ready' },
      { date: '2026-05-07', topic: 'SCA/SBOM CI/CD Integration', prerequisitesStatus: 'pending' },
    ],
    recentSessionHighlights: 'AppSec SCA/SBOM session completed. 5 of 15 applications onboarded. SBOM integration into CI/CD pipeline struggling with authentication issues. Diana Cho testing alternative approach.',
    productUpdatesDiscussed: 'Discussed new ASPM risk scoring features. Diana interested in API advisory session for custom integrations.',
    relevantCustomerCases: [],
    cadenceStatus: 'on_track',
    nextStepVisibility: 'Next: ASPM application risk review with Diana. CI/CD pipeline access confirmation needed from Diana for SBOM session after. Renewal conversation with AM planned for next PSR.',
    notes: 'LoE concern: 80% consumed with 5 months remaining. Need to discuss realignment with manager. Customer demands are high but engagement quality is good.',
  },
  {
    id: 'cid-005', customerId: 'cust-005', lastUpdated: '2026-04-10',
    upcomingSessions: [
      { date: '2026-04-24', topic: 'AI-SPM Configuration', prerequisitesStatus: 'ready' },
    ],
    recentSessionHighlights: 'DSPM configuration and data classification completed. Carlos very satisfied. Identified 3 data stores with sensitive manufacturing IP that were previously unmonitored.',
    productUpdatesDiscussed: 'AI-SPM new features overview. Carlos immediately requested a session. Also asked about custom dashboards (potential scope issue).',
    relevantCustomerCases: [],
    cadenceStatus: 'on_track',
    nextStepVisibility: 'Next: AI-SPM configuration. Carlos also requested custom dashboard work — need to clarify scope before committing. Data classification taxonomy needed from Maria Santos.',
    notes: 'LoE at 80% after 3 months. Carlos keeps requesting additional sessions. Need scope conversation with manager before accepting more ad hoc requests.',
  },
  {
    id: 'cid-006', customerId: 'cust-006', lastUpdated: '2026-04-08',
    upcomingSessions: [
      { date: '2026-04-20', topic: 'Alternative Session: Malware Policy Management', prerequisitesStatus: 'ready' },
    ],
    recentSessionHighlights: 'Attempted DSPM data classification for OT environments. Hit product limitation — DSPM scan not categorizing ICS data correctly. Sev 2 case filed. Detection rule session also blocked by rendering bug.',
    productUpdatesDiscussed: 'Discussed product roadmap for OT/ICS support improvements. Laura appreciates the transparency about limitations.',
    relevantCustomerCases: [
      { caseNumber: 'CS-2026-04891', severity: 2, summary: 'DSPM scan not correctly categorizing ICS data', status: 'open' },
      { caseNumber: 'CS-2026-04923', severity: 2, summary: 'Custom detection rule rendering bug', status: 'open' },
    ],
    cadenceStatus: 'on_track',
    nextStepVisibility: 'Next: Malware policy management (workaround for blocked DSPM/detection sessions). Monitor Sev 2 cases. If no fix in 2 weeks, escalate further.',
    notes: 'Pivoting to unblocked use cases while product issues are resolved. Laura is understanding but Derek (OT lead) is frustrated with ICS data categorization issue.',
  },
  {
    id: 'cid-007', customerId: 'cust-007', lastUpdated: '2026-04-12',
    upcomingSessions: [
      { date: '2026-04-19', topic: 'CSPM Policy Migration (continued)', prerequisitesStatus: 'ready' },
      { date: '2026-04-26', topic: 'CWP Configuration Migration', prerequisitesStatus: 'pending' },
    ],
    recentSessionHighlights: 'CSPM policy migration: 45 of 120 custom policies migrated to Cortex Cloud. 15 policies blocked by API format incompatibility. Working through non-blocked policies first.',
    productUpdatesDiscussed: 'API format conversion utility under development by engineering. Angela Morrison testing customer-side workaround script.',
    relevantCustomerCases: [],
    cadenceStatus: 'on_track',
    nextStepVisibility: 'Continue migrating non-blocked policies. Angela testing workaround script for API format issue. If workaround fails, will need product escalation. CWP migration prep starting next week.',
    notes: 'Migration pace is good for non-blocked items. API issue is the critical blocker for remaining 15 policies and SBOM migration. Weekly status updates to CISO (William Prescott).',
  },
  {
    id: 'cid-008', customerId: 'cust-008', lastUpdated: '2026-04-11',
    upcomingSessions: [
      { date: '2026-04-18', topic: 'Engagement Wrap-up and Forward Planning', prerequisitesStatus: 'ready' },
    ],
    recentSessionHighlights: 'Code to Cloud visibility fully operational. Vulnerability tracing from source to runtime working across all GovCloud applications. Jason Park validated the full chain.',
    productUpdatesDiscussed: 'New DSPM regions announcement. David Chen (CISO) interested in expanding to new GovCloud regions.',
    relevantCustomerCases: [],
    cadenceStatus: 'on_track',
    nextStepVisibility: 'Final session: engagement wrap-up, value summary, and expansion discussion. Coordinate with AM Nolan Hollis on expansion opportunity (DSPM for new GovCloud regions).',
    notes: 'Outstanding engagement. Gold across all pillars. Customer wants to be a PANW reference account. Expansion likely.',
  },
  {
    id: 'cid-010', customerId: 'cust-010', lastUpdated: '2026-02-10',
    upcomingSessions: [
      { date: '2026-04-28', topic: 'SOC 2 Policy Customization (overdue)', prerequisitesStatus: 'pending' },
    ],
    recentSessionHighlights: 'Last session (Feb 1): Basic CSPM dashboard setup. Greg engaged during session but has been unresponsive since.',
    productUpdatesDiscussed: '',
    relevantCustomerCases: [],
    cadenceStatus: 'overdue',
    nextStepVisibility: 'Need to re-engage Greg. Multiple follow-up emails unanswered. AM Piper Sloan to assist with outreach.',
    notes: 'Dashboard stale — 8 weeks without update. Customer essentially dormant. Need manager guidance on how to handle.',
  },
];
