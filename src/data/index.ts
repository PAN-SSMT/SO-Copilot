// S&O Copilot — Data Barrel Export
// Import this file to access all mock data

// Core data
export { currentEngineer, currentManager } from './engineers';
export { customers } from './customers';
export { engagements } from './engagements';
export { scopeReferenceData } from './scopeData';

// Phase 1 data
export { internalKickoffs, customerKickoffs } from './kickoffs';
export { customerPrerequisites } from './prerequisites';
export { customerArtifacts } from './artifacts';
export { riskAlerts } from './risks';

// Phase 2 data
export { maturityAssessments } from './maturity';
export { sessionPlans } from './sessionPlans';
export { checkInDashboards } from './checkInDashboards';
export { communications } from './communications';
export * from './calendarEvents';

// Phase 3 data — will be added when Phase 3 starts:
// export { escalations } from './escalations';
// export { periodicServiceReviews } from './serviceReviews';
// export { specialistRequests } from './specialists';
// export { reports } from './reports';
