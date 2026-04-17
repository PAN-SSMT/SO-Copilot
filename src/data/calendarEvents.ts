export interface CalendarEvent {
  id: string;
  customerId: string;
  customerName: string;
  date: string; // YYYY-MM-DD
  time?: string; // e.g. "10:00 AM"
  type: 'session' | 'psr' | 'kickoff' | 'renewal' | 'internal' | 'prep';
  title: string;
  description?: string;
  status?: 'confirmed' | 'tentative' | 'completed' | 'overdue';
  healthBadge?: 'On Track' | 'At Risk' | 'Off Track';
}

export const calendarEvents: CalendarEvent[] = [
  // === APRIL 2026 (current month — mix of past completed and upcoming) ===

  // Past events (completed)
  { id: 'evt-001', customerId: 'cust-001', customerName: 'Meridian Healthcare', date: '2026-04-01', time: '10:00 AM', type: 'session', title: 'Session 18: CSPM Alert Triage Optimization', description: 'Review and tune CSPM alert policies, reduce false positives', status: 'completed', healthBadge: 'On Track' },
  { id: 'evt-002', customerId: 'cust-005', customerName: 'NovaTech Industries', date: '2026-04-02', time: '2:00 PM', type: 'session', title: 'Session 12: Container Runtime Policies', description: 'Configure runtime protection policies for EKS clusters', status: 'completed', healthBadge: 'On Track' },
  { id: 'evt-003', customerId: 'cust-004', customerName: 'Apex Financial Group', date: '2026-04-03', time: '11:00 AM', type: 'internal', title: 'LoE Realignment Discussion', description: 'Review LoE overrun with CSE Manager Lauren Caldwell. Discuss session consolidation options.', status: 'completed', healthBadge: 'At Risk' },
  { id: 'evt-004', customerId: 'cust-007', customerName: 'Pinnacle Insurance Group', date: '2026-04-07', time: '9:00 AM', type: 'session', title: 'Session 8: PC2CC Policy Migration Batch 2', description: 'Migrate next batch of 5 custom policies from Prisma Cloud to Cortex Cloud', status: 'completed', healthBadge: 'At Risk' },
  { id: 'evt-005', customerId: 'cust-008', customerName: 'Quantum Dynamics', date: '2026-04-08', time: '1:00 PM', type: 'psr', title: 'Q2 Periodic Service Review', description: 'Quarterly review covering maturity progression, session delivery, and engagement wrap-up planning', status: 'completed', healthBadge: 'On Track' },
  { id: 'evt-006', customerId: 'cust-011', customerName: 'Atlas Logistics', date: '2026-04-09', time: '10:00 AM', type: 'session', title: 'Session 5: ASPM Onboarding', description: 'Initial Application Security Posture Management setup and repo integration', status: 'completed', healthBadge: 'On Track' },
  { id: 'evt-007', customerId: 'cust-006', customerName: 'Coastal Energy Partners', date: '2026-04-10', time: '3:00 PM', type: 'internal', title: 'Product Blocker Review', description: 'Check status of Sev 2 cases CS-2026-04891 and CS-2026-04923 with TAC', status: 'completed', healthBadge: 'At Risk' },
  { id: 'evt-008', customerId: 'cust-001', customerName: 'Meridian Healthcare', date: '2026-04-14', time: '10:00 AM', type: 'prep', title: 'Session 19 Prep: Send Prerequisites', description: 'Email customer prerequisites for IaC scanning session. Confirm repo access.', status: 'completed', healthBadge: 'On Track' },

  // Today and upcoming
  { id: 'evt-009', customerId: 'cust-001', customerName: 'Meridian Healthcare', date: '2026-04-15', time: '10:00 AM', type: 'session', title: 'Session 19: IaC Scanning Setup', description: 'Configure IaC scanning for Terraform repos, integrate with CI/CD pipeline', status: 'confirmed', healthBadge: 'On Track' },
  { id: 'evt-010', customerId: 'cust-004', customerName: 'Apex Financial Group', date: '2026-04-16', time: '2:00 PM', type: 'session', title: 'Session 15: Multi-Cloud Compliance Mapping', description: 'Map compliance frameworks (SOC2, PCI-DSS) across AWS and Azure environments', status: 'confirmed', healthBadge: 'At Risk' },
  { id: 'evt-011', customerId: 'cust-003', customerName: 'Brightpath Education', date: '2026-04-17', time: '11:00 AM', type: 'kickoff', title: 'Customer Kickoff Meeting', description: 'Present engagement scope, session plan, and cadence. Confirm environment access and change control process.', status: 'confirmed', healthBadge: 'On Track' },
  { id: 'evt-012', customerId: 'cust-009', customerName: 'Helix Biotech', date: '2026-04-18', time: '10:00 AM', type: 'session', title: 'Session 6: Vulnerability Management Triage', description: 'Configure vulnerability prioritization and suppression policies', status: 'confirmed', healthBadge: 'At Risk' },
  { id: 'evt-013', customerId: 'cust-005', customerName: 'NovaTech Industries', date: '2026-04-21', time: '2:00 PM', type: 'session', title: 'Session 13: Threat Detection Tuning', description: 'Review runtime threat detection alerts, tune detection rules for EKS workloads', status: 'confirmed', healthBadge: 'On Track' },
  { id: 'evt-014', customerId: 'cust-007', customerName: 'Pinnacle Insurance Group', date: '2026-04-22', time: '9:00 AM', type: 'session', title: 'Session 9: PC2CC Migration Batch 3', description: 'Migrate remaining custom policies and validate in Cortex Cloud', status: 'confirmed', healthBadge: 'At Risk' },
  { id: 'evt-015', customerId: 'cust-006', customerName: 'Coastal Energy Partners', date: '2026-04-23', time: '11:00 AM', type: 'session', title: 'Session 7: OT Network Segmentation Review', description: 'Review OT/IT network segmentation policies pending product blocker resolution', status: 'tentative', healthBadge: 'At Risk' },
  { id: 'evt-016', customerId: 'cust-011', customerName: 'Atlas Logistics', date: '2026-04-24', time: '10:00 AM', type: 'session', title: 'Session 6: SCA/SBOM Configuration', description: 'Configure Software Composition Analysis and generate initial SBOM', status: 'confirmed', healthBadge: 'On Track' },
  { id: 'evt-017', customerId: 'cust-008', customerName: 'Quantum Dynamics', date: '2026-04-25', time: '1:00 PM', type: 'session', title: 'Session 22: Engagement Wrap-Up Prep', description: 'Final session planning — document handover items and transition plan', status: 'confirmed', healthBadge: 'On Track' },
  { id: 'evt-018', customerId: 'cust-001', customerName: 'Meridian Healthcare', date: '2026-04-28', time: '10:00 AM', type: 'prep', title: 'Session 20 Prep: HIPAA Compliance Review', description: 'Prepare HIPAA compliance mapping document for next session', status: 'confirmed', healthBadge: 'On Track' },
  { id: 'evt-019', customerId: 'cust-004', customerName: 'Apex Financial Group', date: '2026-04-29', time: '3:00 PM', type: 'psr', title: 'Q2 Periodic Service Review', description: 'Include LoE realignment discussion, renewal preparation, and maturity update', status: 'confirmed', healthBadge: 'At Risk' },
  { id: 'evt-020', customerId: 'cust-001', customerName: 'Meridian Healthcare', date: '2026-04-30', time: '10:00 AM', type: 'session', title: 'Session 20: HIPAA Compliance Mapping', description: 'Map Cortex Cloud controls to HIPAA requirements, generate compliance report', status: 'confirmed', healthBadge: 'On Track' },

  // === MAY 2026 ===
  { id: 'evt-021', customerId: 'cust-005', customerName: 'NovaTech Industries', date: '2026-05-04', time: '2:00 PM', type: 'session', title: 'Session 14: Kubernetes Admission Control', description: 'Configure admission controllers for security policy enforcement', status: 'tentative', healthBadge: 'On Track' },
  { id: 'evt-022', customerId: 'cust-007', customerName: 'Pinnacle Insurance Group', date: '2026-05-06', time: '9:00 AM', type: 'session', title: 'Session 10: CC Validation & Cutover Planning', description: 'Validate migrated policies in Cortex Cloud, plan PC decommission timeline', status: 'tentative', healthBadge: 'At Risk' },
  { id: 'evt-023', customerId: 'cust-009', customerName: 'Helix Biotech', date: '2026-05-08', time: '10:00 AM', type: 'session', title: 'Session 7: AppSec — Awaiting Specialist', description: 'AppSec specialist assignment pending. Session may be rescheduled.', status: 'tentative', healthBadge: 'At Risk' },
  { id: 'evt-024', customerId: 'cust-001', customerName: 'Meridian Healthcare', date: '2026-05-12', time: '10:00 AM', type: 'session', title: 'Session 21: Identity & Access Review', description: 'Review IAM configurations and excessive permissions findings', status: 'tentative', healthBadge: 'On Track' },
  { id: 'evt-025', customerId: 'cust-011', customerName: 'Atlas Logistics', date: '2026-05-14', time: '10:00 AM', type: 'session', title: 'Session 7: CI/CD Pipeline Security', description: 'Integrate security scanning into Jenkins and GitHub Actions pipelines', status: 'tentative', healthBadge: 'On Track' },
  { id: 'evt-026', customerId: 'cust-006', customerName: 'Coastal Energy Partners', date: '2026-05-15', time: '11:00 AM', type: 'psr', title: 'Q2 Periodic Service Review', description: 'Review product blocker status, adjusted session plan, and DSPM progress', status: 'tentative', healthBadge: 'At Risk' },
  { id: 'evt-027', customerId: 'cust-004', customerName: 'Apex Financial Group', date: '2026-05-19', time: '2:00 PM', type: 'session', title: 'Session 16: Data Security Posture (DSPM)', description: 'Configure DSPM scanning across multi-cloud data stores', status: 'tentative', healthBadge: 'At Risk' },
  { id: 'evt-028', customerId: 'cust-007', customerName: 'Pinnacle Insurance Group', date: '2026-05-20', time: '9:00 AM', type: 'psr', title: 'Monthly Service Review', description: 'Monthly review for $300K account — migration progress and timeline', status: 'tentative', healthBadge: 'At Risk' },
  { id: 'evt-029', customerId: 'cust-008', customerName: 'Quantum Dynamics', date: '2026-05-22', time: '1:00 PM', type: 'session', title: 'Session 23: Final Handover & Documentation', description: 'Complete engagement documentation, transition to maintenance mode', status: 'tentative', healthBadge: 'On Track' },
  { id: 'evt-030', customerId: 'cust-007', customerName: 'Pinnacle Insurance Group', date: '2026-05-31', time: '12:00 PM', type: 'renewal', title: 'Renewal Due — Pinnacle Insurance Group', description: '$300K ARR renewal. Ensure maturity report and engagement summary are ready.', status: 'confirmed', healthBadge: 'At Risk' },

  // === JUNE 2026 ===
  { id: 'evt-031', customerId: 'cust-002', customerName: 'TerraVault Mining', date: '2026-06-01', time: '10:00 AM', type: 'internal', title: 'Re-engagement Planning', description: 'Plan approach to re-engage TerraVault after extended period of no contact', status: 'tentative', healthBadge: 'Off Track' },
  { id: 'evt-032', customerId: 'cust-005', customerName: 'NovaTech Industries', date: '2026-06-03', time: '2:00 PM', type: 'session', title: 'Session 15: Serverless Security', description: 'Configure serverless function scanning for Lambda workloads', status: 'tentative', healthBadge: 'On Track' },
  { id: 'evt-033', customerId: 'cust-001', customerName: 'Meridian Healthcare', date: '2026-06-09', time: '10:00 AM', type: 'psr', title: 'Q2 Periodic Service Review', description: 'Quarterly review — maturity progression, Gold pillar maintenance, renewal prep', status: 'tentative', healthBadge: 'On Track' },
  { id: 'evt-034', customerId: 'cust-002', customerName: 'TerraVault Mining', date: '2026-06-30', time: '12:00 PM', type: 'renewal', title: 'Renewal Due — TerraVault Mining', description: '$95K ARR renewal at risk due to Off Track status. Escalation may be needed.', status: 'confirmed', healthBadge: 'Off Track' },
  { id: 'evt-035', customerId: 'cust-008', customerName: 'Quantum Dynamics', date: '2026-06-15', time: '1:00 PM', type: 'internal', title: 'Expansion Opportunity Discussion', description: 'Meet with AM to discuss upsell — customer interested in additional modules', status: 'tentative', healthBadge: 'On Track' },

  // === MARCH 2026 (previous month — all completed for back-navigation) ===
  { id: 'evt-036', customerId: 'cust-001', customerName: 'Meridian Healthcare', date: '2026-03-18', time: '10:00 AM', type: 'session', title: 'Session 17: CWP Agent Deployment Review', description: 'Reviewed Defender agent deployment across production hosts', status: 'completed', healthBadge: 'On Track' },
  { id: 'evt-037', customerId: 'cust-004', customerName: 'Apex Financial Group', date: '2026-03-20', time: '2:00 PM', type: 'session', title: 'Session 14: Azure Policy Alignment', description: 'Aligned Azure compliance policies with SOC2 controls', status: 'completed', healthBadge: 'At Risk' },
  { id: 'evt-038', customerId: 'cust-005', customerName: 'NovaTech Industries', date: '2026-03-24', time: '2:00 PM', type: 'session', title: 'Session 11: CWP Container Scanning', description: 'Configured container image scanning in CI pipeline', status: 'completed', healthBadge: 'On Track' },
  { id: 'evt-039', customerId: 'cust-011', customerName: 'Atlas Logistics', date: '2026-03-26', time: '10:00 AM', type: 'session', title: 'Session 4: SSO & RBAC Configuration', description: 'Configured SSO integration and role-based access policies', status: 'completed', healthBadge: 'On Track' },
  { id: 'evt-040', customerId: 'cust-001', customerName: 'Meridian Healthcare', date: '2026-03-30', time: '10:00 AM', type: 'psr', title: 'Q1 Periodic Service Review', description: 'Q1 review — strong progression, Gold posture achieved', status: 'completed', healthBadge: 'On Track' },
];
