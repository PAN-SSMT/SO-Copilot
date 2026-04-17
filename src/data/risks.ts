// S&O Copilot — Mock Risk Alerts
// Active risk alerts across the portfolio

import type { RiskAlert } from '../types';

export const riskAlerts: RiskAlert[] = [
  // ============================================================
  // TerraVault Mining (cust-002) — multiple risks
  // ============================================================
  {
    id: 'risk-001',
    type: 'cadence_violation',
    severity: 'high',
    triggerDate: '2026-03-20',
    customerId: 'cust-002',
    description: 'No customer session in 5 weeks. Monthly cadence requires sessions every ~4 weeks.',
    recommendedAction: 'Contact Tom Bradley to schedule next session. If unresponsive, escalate through AM (Tyler Ashford).',
    resolutionStatus: 'open',
    resolutionNotes: '',
  },
  {
    id: 'risk-002',
    type: 'prerequisite_not_met',
    severity: 'high',
    triggerDate: '2025-08-01',
    customerId: 'cust-002',
    description: 'AWS cloud service provider connection blocked due to permissions issue. Overdue since July 2025. Blocking agentless scanning and several session plan topics.',
    recommendedAction: 'Escalate as deployment blocker. Customer needs AWS admin support to resolve IAM role configuration.',
    resolutionStatus: 'open',
    resolutionNotes: 'Deployment blocker escalation initiated 2 weeks ago.',
  },
  {
    id: 'risk-003',
    type: 'prerequisite_not_met',
    severity: 'medium',
    triggerDate: '2025-07-15',
    customerId: 'cust-002',
    description: 'Asset group has not been created. Assigned to Tom Bradley at customer kickoff. Never completed.',
    recommendedAction: 'Include in next session agenda as a prerequisite task. If Tom cannot complete, offer to assist during session.',
    resolutionStatus: 'open',
    resolutionNotes: '',
  },
  {
    id: 'risk-004',
    type: 'stale_maturity_assessment',
    severity: 'medium',
    triggerDate: '2026-04-01',
    customerId: 'cust-002',
    description: 'Maturity assessment is 4+ months old. Should be refreshed to validate current state and adjust session plan.',
    recommendedAction: 'Schedule maturity reassessment as the next session activity once prerequisites are resolved.',
    resolutionStatus: 'open',
    resolutionNotes: '',
  },
  {
    id: 'risk-005',
    type: 'missing_artifact',
    severity: 'medium',
    triggerDate: '2026-03-01',
    customerId: 'cust-002',
    description: 'PSR deck missing. Quarterly PSR was due last quarter but not prepared due to engagement stall.',
    recommendedAction: 'Prepare PSR deck once engagement resumes. Include gap analysis in the review.',
    resolutionStatus: 'open',
    resolutionNotes: '',
  },
  {
    id: 'risk-006',
    type: 'missing_artifact',
    severity: 'low',
    triggerDate: '2025-07-01',
    customerId: 'cust-002',
    description: 'Design of Record (DOR) missing from SFDC.',
    recommendedAction: 'Check with SC (Kyle Whitfield) if DOR was created during sales process.',
    resolutionStatus: 'open',
    resolutionNotes: '',
  },

  // ============================================================
  // Apex Financial Group (cust-004) — renewal and LoE risks
  // ============================================================
  {
    id: 'risk-007',
    type: 'loe_overrun_warning',
    severity: 'high',
    triggerDate: '2026-03-15',
    customerId: 'cust-004',
    description: 'LoE at 80% consumed with approximately 5 months remaining in engagement. Trending to exceed allocation. 28 of 35 days consumed.',
    recommendedAction: 'Review remaining session plan. Consider consolidating sessions or realigning scope. Discuss with CSE Manager and AM before customer conversation.',
    resolutionStatus: 'open',
    resolutionNotes: '',
  },
  {
    id: 'risk-008',
    type: 'renewal_proximity',
    severity: 'high',
    triggerDate: '2026-03-01',
    customerId: 'cust-004',
    description: 'Renewal date is September 1, 2026 — within 6-month window. Next PSR must include renewal alignment preparation.',
    recommendedAction: 'Align with AM (Paige Hensley) on renewal conversation. Highlight licensing progress, maturity status, and engagement outcomes in next PSR. Identify and document any blockers to renewal.',
    resolutionStatus: 'acknowledged',
    resolutionNotes: 'Discussed with AM. Renewal conversation planned for next QBR.',
  },
  {
    id: 'risk-009',
    type: 'loe_overrun_warning',
    severity: 'medium',
    triggerDate: '2026-04-01',
    customerId: 'cust-004',
    description: 'License consumption at 35% after 7 months of engagement. Below the 50% target at 6 months per the measurement framework.',
    recommendedAction: 'Address in next PSR. Identify adoption blockers. Consider whether session plan should shift focus to adoption acceleration.',
    resolutionStatus: 'open',
    resolutionNotes: '',
  },

  // ============================================================
  // NovaTech Industries (cust-005) — LoE and scope risks
  // ============================================================
  {
    id: 'risk-010',
    type: 'loe_overrun_warning',
    severity: 'high',
    triggerDate: '2026-04-01',
    customerId: 'cust-005',
    description: 'LoE at 80% consumed after only 3 months of a 12-month engagement. 16 of 20 allocated days used. At current pace, will exceed allocation by ~40% by year end.',
    recommendedAction: 'Urgent: discuss with CSE Manager. Prepare LoE realignment conversation with customer. Review which ad hoc session requests can be deferred or consolidated.',
    resolutionStatus: 'open',
    resolutionNotes: '',
  },
  {
    id: 'risk-011',
    type: 'scope_drift',
    severity: 'medium',
    triggerDate: '2026-04-10',
    customerId: 'cust-005',
    description: 'Customer requested work on "Custom Reporting and Dashboards" which may fall under the Add-on S&O exclusions. Scope validation needed.',
    recommendedAction: 'Verify with scope check. If excluded, inform customer and discuss with AM about Add-on SKU opportunity.',
    resolutionStatus: 'open',
    resolutionNotes: '',
  },

  // ============================================================
  // Coastal Energy Partners (cust-006) — product blocker
  // ============================================================
  {
    id: 'risk-012',
    type: 'product_blocker',
    severity: 'high',
    triggerDate: '2026-03-25',
    customerId: 'cust-006',
    description: 'Two open Sev 2 support cases blocking session plan progress. Case #CS-2026-04891: DSPM scan not correctly categorizing ICS data. Case #CS-2026-04923: custom detection rule rendering bug. Both overlap with planned session topics.',
    recommendedAction: 'Monitor cases for resolution. Prepare alternative session topics for unblocked use cases. If no resolution within 2 weeks, follow product issue escalation workflow.',
    resolutionStatus: 'in_progress',
    resolutionNotes: 'Product issue escalation initiated 3 weeks ago. TAC engaged. Cases escalated via SFDC. CSE Manager and AM informed.',
  },

  // ============================================================
  // Pinnacle Insurance Group (cust-007) — migration risk
  // ============================================================
  {
    id: 'risk-013',
    type: 'product_blocker',
    severity: 'medium',
    triggerDate: '2026-04-05',
    customerId: 'cust-007',
    description: '3 sessions blocked by API integration issue during PC2CC migration. Prisma Cloud API response format incompatible with Cortex Cloud API ingestion for 15 of 120 custom policies.',
    recommendedAction: 'Continue migration on non-blocked policies. Test customer workaround script for API format conversion. If not resolved within 2 weeks, initiate product issue escalation.',
    resolutionStatus: 'open',
    resolutionNotes: 'Customer team testing workaround script. CSE coordinating with Migration Control Tower.',
  },
  {
    id: 'risk-014',
    type: 'stale_maturity_assessment',
    severity: 'low',
    triggerDate: '2026-04-10',
    customerId: 'cust-007',
    description: 'Runtime maturity regressed from Silver to Bronze during migration cutover period. Assessment should be refreshed post-migration to capture final state.',
    recommendedAction: 'Schedule post-migration maturity reassessment once the migration is complete. Track Runtime regression as expected migration-period impact.',
    resolutionStatus: 'acknowledged',
    resolutionNotes: 'Expected regression during migration. Will reassess once Cortex Cloud is fully operational.',
  },

  // ============================================================
  // Quantum Dynamics (cust-008) — renewal (positive scenario)
  // ============================================================
  {
    id: 'risk-015',
    type: 'renewal_proximity',
    severity: 'medium',
    triggerDate: '2026-04-01',
    customerId: 'cust-008',
    description: 'Renewal date is July 1, 2026 — within 3 months. Positive scenario: customer is Gold across all pillars and interested in expansion.',
    recommendedAction: 'Prepare engagement summary and value delivered report. Coordinate with AM (Nolan Hollis) on expansion opportunity — customer interested in additional DSPM for new GovCloud regions.',
    resolutionStatus: 'in_progress',
    resolutionNotes: 'Engagement wrap-up session and expansion discussion scheduled for next week.',
  },

  // ============================================================
  // Helix Biotech (cust-009) — specialist needed
  // ============================================================
  {
    id: 'risk-016',
    type: 'session_plan_not_refreshed',
    severity: 'medium',
    triggerDate: '2026-04-01',
    customerId: 'cust-009',
    description: 'Next 3 planned sessions require Application Security skill category, but primary CSE expertise is Posture Security. Specialist support request submitted but no specialist assigned yet.',
    recommendedAction: 'Follow up with CSE Manager (Lauren Caldwell) on specialist assignment. Do not schedule AppSec sessions until specialist is confirmed.',
    resolutionStatus: 'open',
    resolutionNotes: 'Specialist request submitted. Awaiting assignment.',
  },

  // ============================================================
  // RedLeaf Consulting (cust-010) — multiple dormancy risks
  // ============================================================
  {
    id: 'risk-017',
    type: 'cadence_violation',
    severity: 'high',
    triggerDate: '2026-03-01',
    customerId: 'cust-010',
    description: 'No customer session in 10 weeks. Quarterly cadence allows maximum ~12 weeks between sessions. Approaching violation threshold.',
    recommendedAction: 'Attempt re-engagement: email Greg Patterson directly, then escalate through AM (Piper Sloan) if no response within 1 week.',
    resolutionStatus: 'open',
    resolutionNotes: '',
  },
  {
    id: 'risk-018',
    type: 'stale_maturity_assessment',
    severity: 'high',
    triggerDate: '2026-04-01',
    customerId: 'cust-010',
    description: 'Maturity assessment is 7 months old. Needs full refresh — current maturity state is unknown.',
    recommendedAction: 'Schedule maturity reassessment as the primary activity in the next session.',
    resolutionStatus: 'open',
    resolutionNotes: '',
  },
  {
    id: 'risk-019',
    type: 'post_session_tasks_overdue',
    severity: 'medium',
    triggerDate: '2026-02-15',
    customerId: 'cust-010',
    description: 'CS Check-In Dashboard was not updated after the last session 10 weeks ago. Dashboard is 8 weeks stale.',
    recommendedAction: 'Update the Check-In Dashboard before next session. Review and update all post-session artifacts.',
    resolutionStatus: 'open',
    resolutionNotes: '',
  },
  {
    id: 'risk-020',
    type: 'missing_artifact',
    severity: 'medium',
    triggerDate: '2026-01-15',
    customerId: 'cust-010',
    description: 'PSR deck was due last quarter but was not prepared. Quarterly PSR obligation not met.',
    recommendedAction: 'Prepare PSR deck as part of re-engagement. Cover the missed quarter and current status.',
    resolutionStatus: 'open',
    resolutionNotes: '',
  },
  {
    id: 'risk-021',
    type: 'prerequisite_not_met',
    severity: 'low',
    triggerDate: '2025-09-15',
    customerId: 'cust-010',
    description: 'Asset group not created. Assigned to Greg Patterson at customer kickoff September 2025. Overdue by 5+ months.',
    recommendedAction: 'Include as first item in next session. Offer to complete it together during the session if Greg cannot do it independently.',
    resolutionStatus: 'open',
    resolutionNotes: '',
  },
];
