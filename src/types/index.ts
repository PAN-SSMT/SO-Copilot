// S&O Copilot — Type Definitions
// All interfaces matching the UX data model from the development plan

// ============================================================
// ENUMS AND LITERAL TYPES
// ============================================================

export type HealthStatus = 'green' | 'amber' | 'red';
export type HealthLabel = 'On Track' | 'At Risk' | 'Off Track';

export type MaturityLevel = 'not_started' | 'bronze' | 'silver' | 'gold';

export type LifecyclePhase =
  | 'resourcing'
  | 'internal_kickoff'
  | 'customer_kickoff'
  | 'assessment'
  | 'planning'
  | 'execution'
  | 'completed';

export type EngagementOrigin = 'new_deal' | 'csm_transition';

export type EngagementStatus = 'draft' | 'active' | 'paused' | 'completed';

export type KickoffStatus = 'not_started' | 'scheduled' | 'completed';

export type PrerequisiteStatus = 'not_started' | 'in_progress' | 'complete' | 'blocked';

export type ArtifactStatus = 'present' | 'missing' | 'outdated';

export type SessionEntryStatus = 'planned' | 'scheduled' | 'delivered' | 'skipped' | 'rescheduled';

export type SessionPlanStatus = 'draft' | 'shared' | 'agreed' | 'in_progress' | 'completed';

export type ActionItemStatus = 'open' | 'in_progress' | 'complete' | 'blocked';

export type ActionItemOwnerType = 'cse' | 'customer' | 'specialist' | 'manager' | 'account_team';

export type CommunicationType =
  | 'session_prep'
  | 'post_session_status'
  | 'psr'
  | 'internal_update'
  | 'escalation_notice'
  | 'renewal_alignment'
  | 'ad_hoc';

export type RiskAlertType =
  | 'cadence_violation'
  | 'stale_maturity_assessment'
  | 'loe_overrun_warning'
  | 'product_blocker'
  | 'renewal_proximity'
  | 'missing_artifact'
  | 'prerequisite_not_met'
  | 'post_session_tasks_overdue'
  | 'session_plan_not_refreshed'
  | 'scope_drift'
  | 'internal_kickoff_overdue'
  | 'customer_kickoff_not_completed';

export type RiskSeverity = 'high' | 'medium' | 'low';

export type RiskResolutionStatus = 'open' | 'acknowledged' | 'in_progress' | 'resolved';

export type EscalationType = 'deployment_blocker' | 'loe_overrun' | 'product_issue' | 'account_health';

export type DeploymentResponsibility = 'panw_ps' | 'partner_ps' | 'no_ps';

export type AccountHealthBlockerType = 'adoption' | 'loe' | 'product' | 'relationship';

export type EscalationStepStatus = 'pending' | 'completed' | 'skipped';

export type SpecialistRequestStatus = 'requested' | 'assigned' | 'scheduled' | 'delivered';

export type RenewalAlignmentStatus = 'not_started' | 'in_progress' | 'aligned';

export type ReportType = 'psr_deck' | 'customer_status' | 'portfolio_deep_dive' | 'weekly_manager_summary' | 'internal_qbr';

export type ReportDeliveryStatus = 'draft' | 'reviewed' | 'delivered';

export type PSRType = 'quarterly' | 'monthly' | 'biweekly';

export type ScopeCategory = 'configuration_assistance' | 'operational_assistance' | 'security_optimization';

export type ScopeCheckResult = 'in_scope' | 'borderline' | 'excluded' | 'tac_redirect' | 'ps_redirect';

export type SkillCategory = 'posture_security' | 'runtime_security' | 'application_security' | 'assessment' | 'automation';

export type Region = 'emea' | 'nam' | 'latam' | 'japac';

// ============================================================
// CORE ENTITIES
// ============================================================

export interface Engineer {
  id: string;
  name: string;
  email: string;
  role: string;
  region: Region;
  managerId: string;
  managerName: string;
  skillCategories: SkillCategory[];
}

export interface CustomerContact {
  id: string;
  name: string;
  role: string;
  email: string;
  communicationCadence: string;
  responsibilities: string;
}

export interface AccountTeamMember {
  id: string;
  name: string;
  role: 'am' | 'sc' | 'dc';
  email: string;
}

export interface ChangeControlProcess {
  documented: boolean;
  requiredForms: string;
  approvalWorkflows: string;
  leadTimeDays: number | null;
  deploymentWindows: string;
  communicationProtocols: string;
  cabDetails: string;
  notes: string;
}

export interface Customer {
  id: string;
  name: string;
  industry: string;
  arr: number;
  sku: string;
  serviceTermStart: string;
  serviceTermEnd: string;
  renewalDate: string;
  cadence: 'weekly' | 'biweekly' | 'monthly' | 'quarterly';
  healthStatus: HealthStatus;
  healthLabel: HealthLabel;
  backToGreenPlan: string | null;
  lifecyclePhase: LifecyclePhase;
  engagementOrigin: EngagementOrigin;
  cloudProviders: string[];
  modulesUsed: string[];
  complianceFrameworks: string[];
  ticketingSystem: string;
  otherSecurityTools: string[];
  customerContacts: CustomerContact[];
  accountTeam: AccountTeamMember[];
  changeControl: ChangeControlProcess;
  csmTransitionDetails: CsmTransitionDetails | null;
  assignedCseId: string;
}

export interface CsmTransitionDetails {
  previousCsmName: string;
  transitionCohort: string;
  preTransitionEnablementCompleted: boolean;
  internalHandoffCompleted: boolean;
  customerTransitionCommunicationSent: boolean;
  customerAcknowledgement: string;
  handoverNotes: string;
}

// ============================================================
// KICKOFFS
// ============================================================

export interface InternalKickoff {
  id: string;
  customerId: string;
  status: KickoffStatus;
  date: string | null;
  attendees: KickoffAttendee[];
  accountContext: {
    opportunitySummary: string;
    priorPsEeInvolvement: boolean;
    priorPsEeDetails: string;
    deploymentSkusPurchased: boolean;
    customer360Highlights: string;
    criticalEscalations: string;
    specialSupportInstructions: string;
  };
  deliveryExpectations: {
    customerRequirements: string;
    engagementModel: string;
    schedulingConstraints: string;
  };
  raciAlignmentStatus: 'pending' | 'aligned';
  openQuestions: string[];
  actionItems: KickoffActionItem[];
  meetingNotes: string;
}

export interface KickoffAttendee {
  name: string;
  role: string;
  attended: boolean;
}

export interface KickoffActionItem {
  description: string;
  owner: string;
  dueDate: string;
  status: ActionItemStatus;
}

export interface CustomerKickoff {
  id: string;
  customerId: string;
  status: KickoffStatus;
  date: string | null;
  attendeesPanw: KickoffAttendee[];
  attendeesCustomer: KickoffAttendee[];
  scopePresented: boolean;
  customerFeedbackOnPlan: string;
  environmentAccess: {
    method: string;
    accessContact: string;
    accessStatus: 'requested' | 'granted' | 'pending';
  };
  initialSessionPlanPresented: boolean;
  followUpActions: KickoffActionItem[];
  meetingNotes: string;
}

// ============================================================
// PREREQUISITES AND ARTIFACTS
// ============================================================

export interface PrerequisiteItem {
  id: string;
  description: string;
  status: PrerequisiteStatus;
  dateCompleted: string | null;
  notes: string;
}

export interface CustomerPrerequisites {
  customerId: string;
  items: PrerequisiteItem[];
}

export interface ArtifactItem {
  id: string;
  name: string;
  status: ArtifactStatus;
  lastUpdated: string | null;
  link: string | null;
  notes: string;
}

export interface CustomerArtifacts {
  customerId: string;
  accountFolderLink: string | null;
  items: ArtifactItem[];
}

// ============================================================
// ENGAGEMENT
// ============================================================

export interface Engagement {
  id: string;
  customerId: string;
  assignedCseId: string;
  startDate: string;
  allocatedDays: number;
  consumedDays: number;
  daysRemaining: number;
  loePercentage: number;
  status: EngagementStatus;
  activeSessionPlanId: string | null;
}

// ============================================================
// MATURITY
// ============================================================

export interface MaturityUseCaseScore {
  useCaseName: string;
  level: MaturityLevel;
  evidenceNotes: string;
  identifiedGaps: string;
}

export interface MaturityPillar {
  pillarName: 'Posture Security' | 'Runtime Security' | 'Application Security';
  useCases: MaturityUseCaseScore[];
  overallBadge: MaturityLevel;
}

export interface MaturityAssessment {
  id: string;
  customerId: string;
  assessmentDate: string;
  assessorName: string;
  assessmentType: 'initial' | 'periodic' | 'post_migration';
  pillars: MaturityPillar[];
  overallSummary: string;
  recommendedNextSessions: string[];
  storageLink: string | null;
}

// ============================================================
// SESSION PLAN AND SESSIONS
// ============================================================

export interface SessionPlanEntry {
  id: string;
  sequenceNumber: number;
  useCase: string;
  maturityOutcomeMapping: string;
  skillCategoryRequired: SkillCategory;
  targetDate: string;
  prerequisitesCustomer: string;
  prerequisitesCse: string;
  expectedLoeHours: number;
  assignedEngineer: string;
  isSpecialist: boolean;
  status: SessionEntryStatus;
  inScopeValidated: boolean;
  notes: string;
}

export interface SessionPlan {
  id: string;
  customerId: string;
  engagementId: string;
  planVersion: string;
  planStatus: SessionPlanStatus;
  customerAgreementDate: string | null;
  customerAgreementConfirmation: string | null;
  entries: SessionPlanEntry[];
}

export interface Session {
  id: string;
  customerId: string;
  sessionPlanEntryId: string | null;
  date: string;
  onlineHours: number;
  offlineHours: number;
  totalHours: number;
  attendeesPanw: string[];
  attendeesCustomer: string[];
  agenda: string;
  workCompleted: string;
  actionItems: ActionItem[];
  blockersIdentified: string;
  offlineWorkDescription: string;
  nextSessionFocus: string;
  recordingLink: string | null;
  postSessionTasks: PostSessionTasks;
}

export interface PostSessionTasks {
  customerEmailSent: boolean;
  customerEmailTimestamp: string | null;
  internalUpdateSent: boolean;
  internalUpdateTimestamp: string | null;
  clarizenTimeReported: boolean;
  clarizenTimeTimestamp: string | null;
  clarizenSummaryUpdated: boolean;
  clarizenSummaryTimestamp: string | null;
  checkInDashboardUpdated: boolean;
  checkInDashboardTimestamp: string | null;
}

// ============================================================
// CHECK-IN DASHBOARD
// ============================================================

export interface CheckInDashboard {
  id: string;
  customerId: string;
  lastUpdated: string;
  upcomingSessions: CheckInUpcomingSession[];
  recentSessionHighlights: string;
  productUpdatesDiscussed: string;
  relevantCustomerCases: CheckInCase[];
  cadenceStatus: 'on_track' | 'overdue';
  nextStepVisibility: string;
  notes: string;
}

export interface CheckInUpcomingSession {
  date: string;
  topic: string;
  prerequisitesStatus: 'ready' | 'pending' | 'blocked';
}

export interface CheckInCase {
  caseNumber: string;
  severity: number;
  summary: string;
  status: 'open' | 'in_progress' | 'resolved';
}

// ============================================================
// ACTION ITEMS
// ============================================================

export interface ActionItem {
  id: string;
  description: string;
  ownerType: ActionItemOwnerType;
  ownerName: string;
  dueDate: string;
  status: ActionItemStatus;
  sourceType: 'session' | 'assessment' | 'kickoff' | 'escalation';
  sourceId: string;
  customerId: string;
}

// ============================================================
// COMMUNICATIONS
// ============================================================

export interface Communication {
  id: string;
  type: CommunicationType;
  date: string;
  recipientsTo: string[];
  recipientsCc: string[];
  recipientsBcc: string[];
  subject: string;
  contentSummary: string;
  fullContent: string;
  customerId: string;
  sessionId: string | null;
  frameworkUsed: string | null;
  clarizenCcd: boolean;
  slackBccd: boolean;
}

// ============================================================
// RISKS AND ALERTS
// ============================================================

export interface RiskAlert {
  id: string;
  type: RiskAlertType;
  severity: RiskSeverity;
  triggerDate: string;
  customerId: string;
  description: string;
  recommendedAction: string;
  resolutionStatus: RiskResolutionStatus;
  resolutionNotes: string;
}

// ============================================================
// ESCALATIONS
// ============================================================

export interface EscalationStep {
  stepNumber: number;
  description: string;
  status: EscalationStepStatus;
  completedDate: string | null;
  notes: string;
}

export interface Escalation {
  id: string;
  type: EscalationType;
  customerId: string;
  triggerDate: string;
  currentStep: number;
  steps: EscalationStep[];
  deploymentResponsibility: DeploymentResponsibility | null;
  estimatedLoeToUnblock: string | null;
  evidenceCollected: string;
  partiesNotified: string[];
  cseManagerResponse: string;
  resolutionDetails: string;
  closureDate: string | null;
}

// ============================================================
// PERIODIC SERVICE REVIEW
// ============================================================

export interface PeriodicServiceReview {
  id: string;
  customerId: string;
  reviewDate: string;
  reviewType: PSRType;
  sessionsCompletedSinceLastReview: number;
  maturitySnapshotId: string | null;
  maturityProgressionSummary: string;
  strategicFocusAreas: string;
  gapsAndActions: string;
  upcomingPlan: string;
  renewalProximityFlag: boolean;
  renewalReadiness: RenewalReadiness | null;
  generatedDeliverableId: string | null;
}

export interface RenewalReadiness {
  licensingProgress: string;
  maturityProgress: string;
  engagementOutcomes: string;
  identifiedBlockers: string;
  accountTeamAlignmentStatus: RenewalAlignmentStatus;
  lastAlignmentDate: string | null;
}

// ============================================================
// SPECIALIST SUPPORT
// ============================================================

export interface SpecialistSupportRequest {
  id: string;
  customerId: string;
  sessionPlanEntryId: string | null;
  requiredSkillCategory: SkillCategory;
  requestedSpecialist: string | null;
  requestDate: string;
  status: SpecialistRequestStatus;
  outcomeNotes: string;
}

// ============================================================
// RENEWAL MILESTONE
// ============================================================

export interface RenewalMilestone {
  id: string;
  customerId: string;
  renewalDate: string;
  monthsRemaining: number;
  maturityStatusAtCheck: string;
  licenseConsumptionData: string;
  engagementProgressSummary: string;
  identifiedBlockers: string;
  accountTeamAlignmentStatus: RenewalAlignmentStatus;
  lastAlignmentDate: string | null;
}

// ============================================================
// REPORTS
// ============================================================

export interface Report {
  id: string;
  type: ReportType;
  generationDate: string;
  scope: 'single_customer' | 'full_portfolio';
  customerId: string | null;
  contentSnapshot: string;
  deliveryStatus: ReportDeliveryStatus;
}

// ============================================================
// SCOPE REFERENCE
// ============================================================

export interface ScopeItem {
  id: string;
  category: ScopeCategory | 'excluded';
  taskName: string;
  description: string;
}

// ============================================================
// PORTFOLIO-LEVEL AGGREGATIONS (computed, not stored)
// ============================================================

export interface PortfolioSummary {
  totalCustomers: number;
  healthDistribution: { green: number; amber: number; red: number };
  sessionsThisWeek: number;
  overduePostSessionTasks: number;
  upcomingPsrs: number;
  renewalsWithin6Months: number;
  activeEscalations: number;
  cadenceViolations: number;
  incompleteKickoffs: number;
}

export interface PrioritizedAction {
  id: string;
  customerId: string;
  customerName: string;
  action: string;
  dueDate: string | null;
  urgency: 'high' | 'medium' | 'low';
  screenLink: string;
}
