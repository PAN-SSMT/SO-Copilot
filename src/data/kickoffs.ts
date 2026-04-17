// S&O Copilot — Mock Kickoff Records
// Internal and customer kickoff data for all 11 customers

import type { InternalKickoff, CustomerKickoff } from '../types';

// ============================================================
// INTERNAL KICKOFFS
// ============================================================

export const internalKickoffs: InternalKickoff[] = [
  // Meridian Healthcare — completed
  {
    id: 'ik-001',
    customerId: 'cust-001',
    status: 'completed',
    date: '2025-03-18',
    attendees: [
      { name: 'Marcus Bennett', role: 'CSE', attended: true },
      { name: 'Lauren Caldwell', role: 'CSE Manager', attended: true },
      { name: 'Brianna Novak', role: 'Solutions Consultant', attended: true },
      { name: 'Marcus Bennett', role: 'Account Manager', attended: true },
      { name: 'Caleb North', role: 'Domain Consultant', attended: true },
    ],
    accountContext: {
      opportunitySummary: '$180K ARR, Prisma Cloud Premium Success. Customer is a mid-size healthcare system with 12 hospitals. Purchased CSPM, CWP, and DSPM to address HIPAA compliance gaps in their multi-cloud environment.',
      priorPsEeInvolvement: true,
      priorPsEeDetails: 'PS deployment completed in Feb 2025. Deployment covered initial cloud account onboarding for AWS and Azure, basic CSPM policy configuration, and CWP agent deployment on 40% of workloads. PS noted customer team is technically strong but needs guidance on operationalizing compliance reporting.',
      deploymentSkusPurchased: true,
      customer360Highlights: 'Account health: Green. No prior escalations. Strong relationship with AM. Customer renewed Palo Alto NGFW last year — expanding PANW footprint into cloud security.',
      criticalEscalations: 'None',
      specialSupportInstructions: 'None',
    },
    deliveryExpectations: {
      customerRequirements: 'Customer wants to achieve full HIPAA compliance visibility within 6 months. Priority is CSPM policy optimization, then DSPM for PHI data classification, then CWP runtime protection for remaining workloads.',
      engagementModel: 'Monthly sessions preferred, Tuesdays or Thursdays. Sarah Chen is the primary contact and decision maker. Priya Nair will be the hands-on implementer.',
      schedulingConstraints: 'Avoid last week of each month — hospital system has month-end close procedures that consume IT resources.',
    },
    raciAlignmentStatus: 'aligned',
    openQuestions: [],
    actionItems: [
      { description: 'Schedule customer kickoff meeting', owner: 'Marcus Bennett', dueDate: '2025-03-22', status: 'complete' },
      { description: 'Review PS deployment deliverables and As Built document', owner: 'Marcus Bennett', dueDate: '2025-03-20', status: 'complete' },
      { description: 'Prepare initial session plan draft', owner: 'Marcus Bennett', dueDate: '2025-03-25', status: 'complete' },
    ],
    meetingNotes: 'Strong account with clear objectives. PS team left detailed As Built document. Customer team is experienced — expect fast progress. Focus on compliance operationalization as the primary value driver. Brianna Novak noted that the customer CISO (Marcus Webb) is interested in quarterly executive briefings showing HIPAA compliance improvement metrics.',
  },

  // TerraVault Mining — completed
  {
    id: 'ik-002',
    customerId: 'cust-002',
    status: 'completed',
    date: '2025-06-20',
    attendees: [
      { name: 'Marcus Bennett', role: 'CSE', attended: true },
      { name: 'Lauren Caldwell', role: 'CSE Manager', attended: true },
      { name: 'Kyle Whitfield', role: 'Solutions Consultant', attended: true },
      { name: 'Tyler Ashford', role: 'Account Manager', attended: true },
    ],
    accountContext: {
      opportunitySummary: '$95K ARR, Prisma Cloud Premium Success. Small IT team at a mining company. Purchased CSPM and CWP. No prior cloud security tooling. AWS-only environment.',
      priorPsEeInvolvement: false,
      priorPsEeDetails: 'No PS purchased. Customer plans to self-deploy with S&O guidance.',
      deploymentSkusPurchased: false,
      customer360Highlights: 'New customer. No prior PANW relationship. Small IT team (Tom Bradley is the primary and possibly only cloud-focused resource). Limited cloud security maturity.',
      criticalEscalations: 'None',
      specialSupportInstructions: 'None',
    },
    deliveryExpectations: {
      customerRequirements: 'Customer needs basic cloud security posture visibility. Starting from scratch — no compliance frameworks, no existing cloud security policies. Needs hands-on guidance for everything.',
      engagementModel: 'Monthly sessions. Tom Bradley is the sole contact. He wears multiple hats and may have scheduling conflicts.',
      schedulingConstraints: 'Tom is frequently in the field at mining sites. Schedule sessions at least 2 weeks in advance and confirm 48 hours before.',
    },
    raciAlignmentStatus: 'aligned',
    openQuestions: [
      'Does the customer have proper AWS admin access for onboarding?',
      'Will Tom be able to dedicate time for session prerequisites?',
    ],
    actionItems: [
      { description: 'Schedule customer kickoff', owner: 'Marcus Bennett', dueDate: '2025-06-25', status: 'complete' },
      { description: 'Prepare simplified session plan focused on fundamentals', owner: 'Marcus Bennett', dueDate: '2025-06-27', status: 'complete' },
    ],
    meetingNotes: 'Risk factors: no PS deployment, single contact, small team, low cloud maturity. Kyle Whitfield flagged that Tom seemed overwhelmed during the sales process and may not have full clarity on what was purchased. Tyler Ashford will stay close to the account. Plan for a very hands-on, guided approach — customer will need more support than average.',
  },

  // Brightpath Education — completed (1 week ago)
  {
    id: 'ik-003',
    customerId: 'cust-003',
    status: 'completed',
    date: '2026-04-08',
    attendees: [
      { name: 'Marcus Bennett', role: 'CSE', attended: true },
      { name: 'Lauren Caldwell', role: 'CSE Manager', attended: true },
      { name: 'Dylan Harper', role: 'Solutions Consultant', attended: true },
      { name: 'Mallory Quinn', role: 'Account Manager', attended: true },
    ],
    accountContext: {
      opportunitySummary: '$60K ARR, Prisma Cloud Premium Success. EdTech company with GCP-only environment. Purchased CSPM. FERPA compliance is the primary driver.',
      priorPsEeInvolvement: false,
      priorPsEeDetails: 'No PS purchased.',
      deploymentSkusPurchased: false,
      customer360Highlights: 'New customer. First PANW product. Aisha Johnson (VP of Technology) was the executive champion during the sale. Company is growing rapidly and moving more workloads to GCP.',
      criticalEscalations: 'None',
      specialSupportInstructions: 'None',
    },
    deliveryExpectations: {
      customerRequirements: 'FERPA compliance visibility for student data protection. GCP cloud account onboarding and basic posture management. Aisha wants to demonstrate compliance posture to the Board within 6 months.',
      engagementModel: 'Monthly sessions. Dylan Harper noted that Aisha is very organized and responsive. Additional technical contacts TBD at customer kickoff.',
      schedulingConstraints: 'Avoid exam periods (mid-December, mid-May) — IT team is locked down during those windows.',
    },
    raciAlignmentStatus: 'aligned',
    openQuestions: [
      'Who will be the technical implementer on the customer side?',
      'Does the customer have GCP Organization-level admin access?',
    ],
    actionItems: [
      { description: 'Prepare customer kickoff deck', owner: 'Marcus Bennett', dueDate: '2026-04-14', status: 'open' },
      { description: 'Prepare initial session plan draft based on SFDC research', owner: 'Marcus Bennett', dueDate: '2026-04-14', status: 'open' },
      { description: 'Review DOR from SFDC', owner: 'Marcus Bennett', dueDate: '2026-04-12', status: 'open' },
    ],
    meetingNotes: 'Straightforward engagement. Small scope (CSPM only on GCP) but important compliance driver (FERPA). Mallory Quinn sees expansion potential if initial deployment goes well — customer has expressed interest in AppSec for their student-facing applications. Focus on quick wins to build trust.',
  },

  // Apex Financial Group — completed
  {
    id: 'ik-004',
    customerId: 'cust-004',
    status: 'completed',
    date: '2025-11-20',
    attendees: [
      { name: 'Marcus Bennett', role: 'CSE', attended: true },
      { name: 'Lauren Caldwell', role: 'CSE Manager', attended: true },
      { name: 'Connor Driscoll', role: 'Solutions Consultant', attended: true },
      { name: 'Paige Hensley', role: 'Account Manager', attended: true },
      { name: 'Tessa Monroe', role: 'Domain Consultant', attended: true },
    ],
    accountContext: {
      opportunitySummary: '$250K ARR, Cortex XDR Premium Success with intent for Cortex Cloud. Multi-cloud (AWS, Azure, GCP). Purchased CSPM, CWP, ASPM, Cortex XDR. Financial services firm with strict compliance requirements (PCI-DSS, SOX, SOC 2).',
      priorPsEeInvolvement: true,
      priorPsEeDetails: 'PS deployment completed Oct 2025. Covered initial cloud onboarding across all three CSPs, basic CSPM configuration, and Cortex XDR deployment. PS noted multi-cloud complexity and strict change control as key challenges.',
      deploymentSkusPurchased: true,
      customer360Highlights: 'Strategic account for the region. Existing PANW customer (NGFW). Paige Hensley flagged this as a high-visibility renewal. Frank Moretti (CISO) has influence in the financial services CISO network.',
      criticalEscalations: 'None',
      specialSupportInstructions: 'All communications must be encrypted (TLS). No customer data in email bodies — use secure file sharing.',
    },
    deliveryExpectations: {
      customerRequirements: 'Full-spectrum cloud security across all three CSPs. PCI-DSS compliance automation is top priority. AppSec is a newer area for them — will need more guidance. Customer wants to consolidate from Qualys and Rapid7 onto PANW platform.',
      engagementModel: 'Bi-weekly sessions. Robert Langston (VP) is primary. Diana Cho (architect) is the technical executor. Frank Moretti (CISO) expects quarterly QBRs with metrics.',
      schedulingConstraints: 'Strict change control — all configuration changes must go through IT Change Control Board (Tuesdays). Production changes Saturday 2am–6am EST only. Plan sessions with 72-hour lead time minimum.',
    },
    raciAlignmentStatus: 'aligned',
    openQuestions: [],
    actionItems: [
      { description: 'Schedule customer kickoff', owner: 'Marcus Bennett', dueDate: '2025-11-25', status: 'complete' },
      { description: 'Review PS deployment As Built document', owner: 'Marcus Bennett', dueDate: '2025-11-22', status: 'complete' },
      { description: 'Prepare multi-cloud session plan draft with PCI-DSS focus', owner: 'Marcus Bennett', dueDate: '2025-11-27', status: 'complete' },
    ],
    meetingNotes: 'High-value, high-complexity account. Multi-cloud, multi-compliance, strict change control. Paige Hensley emphasized the renewal importance — this is a flagship account. Tessa Monroe will support on AppSec sessions. Plan for a mature, structured engagement with formal documentation at every step.',
  },

  // NovaTech Industries — completed
  {
    id: 'ik-005',
    customerId: 'cust-005',
    status: 'completed',
    date: '2026-01-15',
    attendees: [
      { name: 'Marcus Bennett', role: 'CSE', attended: true },
      { name: 'Lauren Caldwell', role: 'CSE Manager', attended: true },
      { name: 'Harper Mills', role: 'Solutions Consultant', attended: true },
      { name: 'Owen Barrett', role: 'Account Manager', attended: true },
      { name: 'Avery Sutton', role: 'Domain Consultant', attended: true },
    ],
    accountContext: {
      opportunitySummary: '$120K ARR, Prisma Cloud Premium Success. Manufacturing company with Industrial IoT focus. AWS and Azure. Purchased CSPM, CWP, DSPM. Strong interest in data security for manufacturing IP.',
      priorPsEeInvolvement: false,
      priorPsEeDetails: 'No PS purchased. Customer has experienced cloud team and preferred to self-deploy with S&O guidance.',
      deploymentSkusPurchased: false,
      customer360Highlights: 'New customer. Carlos Vega (Director) was the internal champion. Very engaged during the sales process — asked detailed technical questions. Owen Barrett noted this customer will be demanding but in a good way.',
      criticalEscalations: 'None',
      specialSupportInstructions: 'None',
    },
    deliveryExpectations: {
      customerRequirements: 'DSPM for manufacturing IP protection is the top priority. ISO 27001 compliance automation. Carlos wants to build a comprehensive cloud security program from the ground up.',
      engagementModel: 'Monthly sessions but Carlos will likely request more. Flexible scheduling.',
      schedulingConstraints: 'Manufacturing plant shutdowns in July and December — limited IT availability during those periods.',
    },
    raciAlignmentStatus: 'aligned',
    openQuestions: [],
    actionItems: [
      { description: 'Schedule customer kickoff', owner: 'Marcus Bennett', dueDate: '2026-01-20', status: 'complete' },
      { description: 'Prepare session plan with DSPM focus', owner: 'Marcus Bennett', dueDate: '2026-01-22', status: 'complete' },
    ],
    meetingNotes: 'Highly engaged customer with an experienced team. Risk: Carlos is a demanding customer who will push for more sessions than the LoE allocation supports. Owen Barrett should be kept informed if we start trending toward overrun. Good candidate for expansion.',
  },

  // Coastal Energy — completed
  {
    id: 'ik-006',
    customerId: 'cust-006',
    status: 'completed',
    date: '2025-09-22',
    attendees: [
      { name: 'Marcus Bennett', role: 'CSE', attended: true },
      { name: 'Lauren Caldwell', role: 'CSE Manager', attended: true },
      { name: 'Nora Holloway', role: 'Solutions Consultant', attended: true },
      { name: 'Megan Thurston', role: 'Account Manager', attended: true },
      { name: 'Blake Turner', role: 'Domain Consultant', attended: true },
    ],
    accountContext: {
      opportunitySummary: '$200K ARR, Prisma Cloud Premium Success. Energy/utilities company. AWS-only. Purchased CSPM, CWP, DSPM. NERC CIP compliance is the primary driver. Mix of IT and OT environments.',
      priorPsEeInvolvement: true,
      priorPsEeDetails: 'PS deployment completed Aug 2025. Covered AWS onboarding, basic CSPM, and initial CWP deployment. PS flagged OT/IT convergence as a complexity factor.',
      deploymentSkusPurchased: true,
      customer360Highlights: 'Critical infrastructure customer. Very strict compliance and change control requirements. NERC CIP compliance is non-negotiable. Patricia Holt (CISO) has board-level visibility on cloud security.',
      criticalEscalations: 'None',
      specialSupportInstructions: 'All OT-related configurations must be reviewed by Derek Osei before implementation.',
    },
    deliveryExpectations: {
      customerRequirements: 'NERC CIP compliance for cloud environments. DSPM for OT data classification. Strict change control adherence required. Customer expects meticulous documentation.',
      engagementModel: 'Bi-weekly sessions. Laura Jennings primary for all sessions. Derek Osei for DSPM/OT sessions.',
      schedulingConstraints: 'Monthly maintenance Saturdays only for production changes. 1-week lead time minimum. All changes require NERC CIP documentation.',
    },
    raciAlignmentStatus: 'aligned',
    openQuestions: [],
    actionItems: [
      { description: 'Schedule customer kickoff', owner: 'Marcus Bennett', dueDate: '2025-09-26', status: 'complete' },
      { description: 'Review PS deployment documents and NERC CIP requirements', owner: 'Marcus Bennett', dueDate: '2025-09-25', status: 'complete' },
    ],
    meetingNotes: 'Complex environment with strict compliance. OT/IT convergence adds unique challenges for DSPM. Blake Turner will support OT-specific sessions. Key risk: NERC CIP documentation requirements will add overhead to every session that involves configuration changes.',
  },

  // Pinnacle Insurance — completed (migration account)
  {
    id: 'ik-007',
    customerId: 'cust-007',
    status: 'completed',
    date: '2025-05-20',
    attendees: [
      { name: 'Marcus Bennett', role: 'CSE', attended: true },
      { name: 'Lauren Caldwell', role: 'CSE Manager', attended: true },
      { name: 'Cole Ramsey', role: 'Solutions Consultant', attended: true },
      { name: 'Ryan Prescott', role: 'Account Manager', attended: true },
      { name: 'Noah Sinclair', role: 'Domain Consultant', attended: true },
      { name: 'Migration Control Tower Rep', role: 'MCT', attended: true },
    ],
    accountContext: {
      opportunitySummary: '$300K ARR, Prisma Cloud Compute Premium Success migrating to Cortex Cloud. Full suite: CSPM, CWP, DSPM, ASPM. Insurance company with heavy compliance (SOX, PCI-DSS, SOC 2, NYDFS).',
      priorPsEeInvolvement: true,
      priorPsEeDetails: 'Extensive Prisma Cloud deployment over the past 2 years. Full CSPM, CWP, and partial DSPM. 120 custom policies. Multiple API integrations. Migration to Cortex Cloud is the primary engagement objective.',
      deploymentSkusPurchased: true,
      customer360Highlights: 'Long-standing PANW customer. Full Prisma stack plus NGFW and Prisma Access. Migration is high-visibility — Ryan Prescott flagged as critical to retention. Migration Control Tower is involved.',
      criticalEscalations: 'None currently, but migration complexity is high.',
      specialSupportInstructions: 'Dual-platform access required during migration. Prisma Cloud environment must remain operational until Cortex Cloud migration is fully validated.',
    },
    deliveryExpectations: {
      customerRequirements: 'Full migration from Prisma Cloud to Cortex Cloud: onboarding, configurations (IAM, DSPM, CWP, CSPM, APPSEC), custom policies, and API integrations. Zero compliance gaps during transition.',
      engagementModel: 'Weekly sessions due to migration complexity. Richard Tanaka primary. Angela Morrison for migration logistics. Samira Khan for AppSec migration.',
      schedulingConstraints: 'CAB meets Wednesdays. Different approval paths for PC vs CC changes. 5-day lead time for production. Migration changes have expedited CISO pre-approval path.',
    },
    raciAlignmentStatus: 'aligned',
    openQuestions: [],
    actionItems: [
      { description: 'Schedule customer kickoff', owner: 'Marcus Bennett', dueDate: '2025-05-25', status: 'complete' },
      { description: 'Create migration-specific session plan with PC2CC tasks', owner: 'Marcus Bennett', dueDate: '2025-05-28', status: 'complete' },
      { description: 'Access Prisma Cloud environment for migration assessment', owner: 'Marcus Bennett', dueDate: '2025-05-23', status: 'complete' },
    ],
    meetingNotes: 'Most complex engagement in the portfolio. 120 custom policies to migrate, multiple API integrations, strict compliance requirements across 4 frameworks. MCT is involved and will provide migration tooling support. Noah Sinclair will support DSPM and AppSec migration sessions. Key risk: API integration migration — Prisma Cloud API and Cortex Cloud API have format differences that may require custom scripting.',
  },

  // Quantum Dynamics — completed
  {
    id: 'ik-008',
    customerId: 'cust-008',
    status: 'completed',
    date: '2025-04-20',
    attendees: [
      { name: 'Marcus Bennett', role: 'CSE', attended: true },
      { name: 'Lauren Caldwell', role: 'CSE Manager', attended: true },
      { name: 'Riley Dawson', role: 'Solutions Consultant', attended: true },
      { name: 'Nolan Hollis', role: 'Account Manager', attended: true },
      { name: 'Logan Pierce', role: 'Domain Consultant', attended: true },
    ],
    accountContext: {
      opportunitySummary: '$400K ARR, Cortex XSIAM Premium Success. Defense/aerospace. AWS GovCloud and Azure Government. Full suite including XSIAM. FedRAMP, NIST 800-53, CMMC, ITAR compliance.',
      priorPsEeInvolvement: true,
      priorPsEeDetails: 'Extensive PS deployment. All modules deployed and operational. PS team provided detailed As Built with FedRAMP documentation.',
      deploymentSkusPurchased: true,
      customer360Highlights: 'Largest account in portfolio by ARR. Defense contractor with most stringent compliance requirements. Nolan Hollis considers this the top strategic account in the territory. Expansion opportunity for new GovCloud regions.',
      criticalEscalations: 'None',
      specialSupportInstructions: 'ITAR controls apply. No foreign nationals may access customer environment. All documentation subject to export control review.',
    },
    deliveryExpectations: {
      customerRequirements: 'Full operationalization across all modules. FedRAMP continuous monitoring. CMMC compliance automation. Code to Cloud visibility for defense applications. Customer wants to be a reference account for PANW in the defense sector.',
      engagementModel: 'Weekly sessions. Margaret Sullivan primary. Jason Park hands-on every session.',
      schedulingConstraints: '2-week lead time for all changes. Security Review Board bi-weekly. FedRAMP impact assessment required for all configuration changes.',
    },
    raciAlignmentStatus: 'aligned',
    openQuestions: [],
    actionItems: [
      { description: 'Schedule customer kickoff', owner: 'Marcus Bennett', dueDate: '2025-04-25', status: 'complete' },
      { description: 'Obtain ITAR-compliant access credentials', owner: 'Marcus Bennett', dueDate: '2025-04-23', status: 'complete' },
    ],
    meetingNotes: 'Premium engagement. Customer is highly capable and expects excellence. ITAR restrictions limit who can participate in sessions — ensure all PANW attendees are cleared. Logan Pierce will support on advanced XSIAM and XDR sessions. Expansion opportunity: customer opening new GovCloud regions and wants to extend DSPM coverage.',
  },

  // Helix Biotech — completed
  {
    id: 'ik-009',
    customerId: 'cust-009',
    status: 'completed',
    date: '2025-12-20',
    attendees: [
      { name: 'Marcus Bennett', role: 'CSE', attended: true },
      { name: 'Lauren Caldwell', role: 'CSE Manager', attended: true },
      { name: 'Trevor Lane', role: 'Solutions Consultant', attended: true },
      { name: 'Sydney Porter', role: 'Account Manager', attended: true },
    ],
    accountContext: {
      opportunitySummary: '$75K ARR, Prisma Cloud Premium Success. Biotech company. AWS-only. Purchased CSPM and ASPM. FDA-regulated environment.',
      priorPsEeInvolvement: false,
      priorPsEeDetails: 'No PS purchased.',
      deploymentSkusPurchased: false,
      customer360Highlights: 'New customer. Dr. Nina Vasquez drove the purchase for FDA compliance. Jake Morrison (DevSecOps) is the technical champion. Small but growing cloud footprint.',
      criticalEscalations: 'None',
      specialSupportInstructions: 'FDA-regulated — GxP vs non-GxP classification must be confirmed for every change.',
    },
    deliveryExpectations: {
      customerRequirements: 'CSPM for FDA compliance visibility. ASPM for application security in regulated pipelines. Customer needs help understanding how to apply cloud security in a GxP-validated environment.',
      engagementModel: 'Quarterly sessions. Dr. Vasquez primary. Jake Morrison for AppSec sessions.',
      schedulingConstraints: 'GxP changes require 10-day lead time. Non-GxP: 48 hours. Avoid audit periods (March and September).',
    },
    raciAlignmentStatus: 'aligned',
    openQuestions: [
      'Will AppSec sessions require a specialist? Primary CSE expertise is Posture, not AppSec.',
    ],
    actionItems: [
      { description: 'Schedule customer kickoff', owner: 'Marcus Bennett', dueDate: '2025-12-27', status: 'complete' },
      { description: 'Flag AppSec specialist need to CSE Manager', owner: 'Marcus Bennett', dueDate: '2025-12-22', status: 'complete' },
    ],
    meetingNotes: 'Good account with clear compliance driver. Key concern: AppSec sessions (SCA/SBOM, IaC scanning, ASPM) are planned but primary CSE does not have deep AppSec expertise. Lauren Caldwell to review specialist availability. Trevor Lane noted Jake Morrison is very technical and will expect deep-dive content.',
  },

  // RedLeaf Consulting — completed (7 months ago)
  {
    id: 'ik-010',
    customerId: 'cust-010',
    status: 'completed',
    date: '2025-08-25',
    attendees: [
      { name: 'Marcus Bennett', role: 'CSE', attended: true },
      { name: 'Lauren Caldwell', role: 'CSE Manager', attended: false },
      { name: 'Gavin Cross', role: 'Solutions Consultant', attended: true },
      { name: 'Piper Sloan', role: 'Account Manager', attended: true },
    ],
    accountContext: {
      opportunitySummary: '$35K ARR, Prisma Cloud Premium Success. Small consulting firm. Azure-only. CSPM only. Minimal cloud security maturity.',
      priorPsEeInvolvement: false,
      priorPsEeDetails: 'No PS purchased.',
      deploymentSkusPurchased: false,
      customer360Highlights: 'Small account. Greg Patterson is the only IT resource. SOC 2 compliance is the purchase driver — client contracts require it. Low touch expected.',
      criticalEscalations: 'None',
      specialSupportInstructions: 'None',
    },
    deliveryExpectations: {
      customerRequirements: 'Basic CSPM for SOC 2 compliance. Customer needs simple, clear guidance — not a complex deployment.',
      engagementModel: 'Quarterly sessions. Greg Patterson is the sole contact.',
      schedulingConstraints: 'Greg is frequently traveling for consulting engagements. Must schedule well in advance.',
    },
    raciAlignmentStatus: 'aligned',
    openQuestions: [
      'Will Greg be able to dedicate time between sessions for prerequisites?',
    ],
    actionItems: [
      { description: 'Schedule customer kickoff', owner: 'Marcus Bennett', dueDate: '2025-08-29', status: 'complete' },
    ],
    meetingNotes: 'Low-touch, low-complexity account. Single contact who wears many hats. Risk: customer may disengage between quarterly sessions due to competing priorities. Keep sessions focused and prerequisites minimal.',
  },

  // Atlas Logistics — completed (5 days ago, with CSM handover)
  {
    id: 'ik-011',
    customerId: 'cust-011',
    status: 'completed',
    date: '2026-04-10',
    attendees: [
      { name: 'Marcus Bennett', role: 'CSE', attended: true },
      { name: 'Lauren Caldwell', role: 'CSE Manager', attended: true },
      { name: 'Ethan Carter', role: 'Solutions Consultant', attended: true },
      { name: 'Erin Foster', role: 'Account Manager', attended: true },
      { name: 'Camille Rhodes', role: 'Domain Consultant', attended: true },
      { name: 'Monica Hale', role: 'Previous CSM (handover)', attended: true },
    ],
    accountContext: {
      opportunitySummary: '$150K ARR, Prisma Cloud Premium Success. Logistics company, AWS and GCP. Purchased CSPM, CWP, ASPM. Transitioning from CSM model to S&O.',
      priorPsEeInvolvement: true,
      priorPsEeDetails: 'Full deployment completed during CSM engagement. CSPM and CWP fully operational. ASPM partially configured. Monica Hale (previous CSM) provided full engagement history.',
      deploymentSkusPurchased: true,
      customer360Highlights: 'Well-established relationship through CSM period. 3 QBRs completed. Customer is satisfied with PANW but wants to accelerate AppSec adoption. Lacework replacement is a customer priority.',
      criticalEscalations: 'None',
      specialSupportInstructions: 'None',
    },
    deliveryExpectations: {
      customerRequirements: 'Continue maturity progression from CSM period. Focus on AppSec advancement (currently Bronze). Operationalize Lacework replacement with Cortex Cloud runtime capabilities. ISO 27001 and GDPR compliance improvements.',
      engagementModel: 'Monthly sessions. Helena Dubois primary. Raj Krishnamurthy for technical sessions. Helena prefers structured agendas sent 48 hours before sessions.',
      schedulingConstraints: 'Avoid peak shipping seasons (November–December, Chinese New Year period). Helena and Raj are in European time zone (CET).',
    },
    raciAlignmentStatus: 'aligned',
    openQuestions: [
      'Verify CSP connectivity status after Cortex Cloud migration — Daniela flagged this may need re-verification.',
    ],
    actionItems: [
      { description: 'Prepare customer kickoff deck', owner: 'Marcus Bennett', dueDate: '2026-04-16', status: 'open' },
      { description: 'Review historical maturity assessments and identify gaps', owner: 'Marcus Bennett', dueDate: '2026-04-14', status: 'open' },
      { description: 'Prepare initial session plan draft', owner: 'Marcus Bennett', dueDate: '2026-04-16', status: 'open' },
      { description: 'Verify CSP connectivity status', owner: 'Marcus Bennett', dueDate: '2026-04-14', status: 'open' },
    ],
    meetingNotes: 'Smooth transition from CSM. Monica Hale provided excellent handover: 3 QBR decks, 2 maturity assessments, detailed relationship notes. Key insights from Daniela: Helena prefers structured, agenda-driven sessions. Raj is highly technical — prepare deep-dive content. Lacework replacement is top of mind for the customer. AppSec is the biggest gap — consider whether specialist support is needed for ASPM sessions.',
  },
];

// ============================================================
// CUSTOMER KICKOFFS
// ============================================================

export const customerKickoffs: CustomerKickoff[] = [
  // Meridian Healthcare — completed
  {
    id: 'ck-001', customerId: 'cust-001', status: 'completed', date: '2025-03-27',
    attendeesPanw: [
      { name: 'Marcus Bennett', role: 'CSE', attended: true },
      { name: 'Brianna Novak', role: 'SC', attended: true },
      { name: 'Marcus Bennett', role: 'AM', attended: true },
    ],
    attendeesCustomer: [
      { name: 'Sarah Chen', role: 'Director of Cloud Security', attended: true },
      { name: 'Priya Nair', role: 'Cloud Platform Engineer', attended: true },
    ],
    scopePresented: true,
    customerFeedbackOnPlan: 'Agreed with proposed focus on HIPAA compliance. Requested adding DSPM data classification earlier in the plan.',
    environmentAccess: { method: 'Direct remote via PANW laptop', accessContact: 'Priya Nair', accessStatus: 'granted' },
    initialSessionPlanPresented: true,
    followUpActions: [
      { description: 'Adjust session plan to move DSPM earlier', owner: 'Marcus Bennett', dueDate: '2025-03-31', status: 'complete' },
      { description: 'Send finalized session plan for email confirmation', owner: 'Marcus Bennett', dueDate: '2025-04-02', status: 'complete' },
    ],
    meetingNotes: 'Positive kickoff. Sarah and Priya are well-prepared. Change control documented — standard healthcare IT process. DSPM prioritization adjustment accepted. Ready to begin assessment.',
  },

  // TerraVault Mining — completed but incomplete documentation
  {
    id: 'ck-002', customerId: 'cust-002', status: 'completed', date: '2025-07-01',
    attendeesPanw: [
      { name: 'Marcus Bennett', role: 'CSE', attended: true },
      { name: 'Kyle Whitfield', role: 'SC', attended: true },
    ],
    attendeesCustomer: [
      { name: 'Tom Bradley', role: 'IT Manager', attended: true },
    ],
    scopePresented: true,
    customerFeedbackOnPlan: 'Tom agreed with the plan but seemed uncertain about timeline. Asked if sessions could be flexible.',
    environmentAccess: { method: 'Customer laptop/VDI', accessContact: 'Tom Bradley', accessStatus: 'pending' },
    initialSessionPlanPresented: true,
    followUpActions: [
      { description: 'Tom to provide AWS admin access details', owner: 'Tom Bradley', dueDate: '2025-07-08', status: 'blocked' },
      { description: 'Tom to document change control process', owner: 'Tom Bradley', dueDate: '2025-07-15', status: 'blocked' },
      { description: 'Tom to create asset group', owner: 'Tom Bradley', dueDate: '2025-07-15', status: 'blocked' },
    ],
    meetingNotes: 'Kickoff completed but several concerns. Tom is the only IT resource and seemed overwhelmed. Change control process was not documented — Tom said he would follow up but never did. AWS admin access still pending. Environment access method uncertain. Need to follow up proactively.',
  },

  // Brightpath Education — scheduled for next Tuesday
  {
    id: 'ck-003', customerId: 'cust-003', status: 'scheduled', date: '2026-04-21',
    attendeesPanw: [
      { name: 'Marcus Bennett', role: 'CSE', attended: false },
      { name: 'Dylan Harper', role: 'SC', attended: false },
      { name: 'Mallory Quinn', role: 'AM', attended: false },
    ],
    attendeesCustomer: [
      { name: 'Aisha Johnson', role: 'VP of Technology', attended: false },
    ],
    scopePresented: false,
    customerFeedbackOnPlan: '',
    environmentAccess: { method: '', accessContact: '', accessStatus: 'pending' },
    initialSessionPlanPresented: false,
    followUpActions: [],
    meetingNotes: '',
  },

  // Apex Financial — completed
  {
    id: 'ck-004', customerId: 'cust-004', status: 'completed', date: '2025-12-02',
    attendeesPanw: [
      { name: 'Marcus Bennett', role: 'CSE', attended: true },
      { name: 'Connor Driscoll', role: 'SC', attended: true },
      { name: 'Paige Hensley', role: 'AM', attended: true },
      { name: 'Tessa Monroe', role: 'DC', attended: true },
    ],
    attendeesCustomer: [
      { name: 'Robert Langston', role: 'VP of Information Security', attended: true },
      { name: 'Diana Cho', role: 'Cloud Security Architect', attended: true },
      { name: 'Frank Moretti', role: 'CISO', attended: true },
    ],
    scopePresented: true,
    customerFeedbackOnPlan: 'Frank Moretti emphasized PCI-DSS compliance must be the first milestone. Robert agreed. Diana requested detailed prerequisites for each session sent at least 1 week in advance.',
    environmentAccess: { method: 'Direct remote via PANW laptop + VPN', accessContact: 'Diana Cho', accessStatus: 'granted' },
    initialSessionPlanPresented: true,
    followUpActions: [
      { description: 'Reorder plan to put PCI-DSS compliance sessions first', owner: 'Marcus Bennett', dueDate: '2025-12-06', status: 'complete' },
      { description: 'Send finalized plan for email confirmation', owner: 'Marcus Bennett', dueDate: '2025-12-09', status: 'complete' },
    ],
    meetingNotes: 'Professional kickoff. All three customer stakeholders attended — strong executive engagement. Change control process thoroughly documented. Key takeaway: compliance first, optimization second. Diana is highly organized and expects detailed prerequisites.',
  },

  // NovaTech — completed
  {
    id: 'ck-005', customerId: 'cust-005', status: 'completed', date: '2026-01-22',
    attendeesPanw: [
      { name: 'Marcus Bennett', role: 'CSE', attended: true },
      { name: 'Harper Mills', role: 'SC', attended: true },
      { name: 'Owen Barrett', role: 'AM', attended: true },
    ],
    attendeesCustomer: [
      { name: 'Carlos Vega', role: 'Director of Cloud Infrastructure', attended: true },
      { name: 'Maria Santos', role: 'Security Operations Lead', attended: true },
    ],
    scopePresented: true,
    customerFeedbackOnPlan: 'Carlos approved the plan and immediately asked about adding AI-SPM sessions. Very enthusiastic.',
    environmentAccess: { method: 'Direct remote via PANW laptop', accessContact: 'Carlos Vega', accessStatus: 'granted' },
    initialSessionPlanPresented: true,
    followUpActions: [
      { description: 'Research AI-SPM session prerequisites for potential addition', owner: 'Marcus Bennett', dueDate: '2026-01-29', status: 'complete' },
      { description: 'Send finalized plan for confirmation', owner: 'Marcus Bennett', dueDate: '2026-01-27', status: 'complete' },
    ],
    meetingNotes: 'Very engaged customer. Carlos wants to move fast and do more than the plan covers. Early indicator of potential LoE overrun — customer appetite exceeds allocation. Maria is technically strong and will drive implementation. Keep Owen Barrett informed about scope expansion pressure.',
  },

  // Coastal Energy — completed
  {
    id: 'ck-006', customerId: 'cust-006', status: 'completed', date: '2025-10-01',
    attendeesPanw: [
      { name: 'Marcus Bennett', role: 'CSE', attended: true },
      { name: 'Nora Holloway', role: 'SC', attended: true },
      { name: 'Megan Thurston', role: 'AM', attended: true },
      { name: 'Blake Turner', role: 'DC', attended: true },
    ],
    attendeesCustomer: [
      { name: 'Laura Jennings', role: 'Cloud Security Manager', attended: true },
      { name: 'Derek Osei', role: 'OT Security Lead', attended: true },
    ],
    scopePresented: true,
    customerFeedbackOnPlan: 'Laura approved. Derek emphasized that any OT-adjacent changes need his explicit sign-off regardless of standard change control.',
    environmentAccess: { method: 'Customer VDI (security requirement)', accessContact: 'Laura Jennings', accessStatus: 'granted' },
    initialSessionPlanPresented: true,
    followUpActions: [
      { description: 'Add Derek Osei approval step to all DSPM sessions', owner: 'Marcus Bennett', dueDate: '2025-10-05', status: 'complete' },
    ],
    meetingNotes: 'Well-organized kickoff. NERC CIP requirements thoroughly discussed. Change control is the strictest in the portfolio (1-week lead, dual approval, monthly windows only). Derek Osei is protective of OT environment — build trust by including him early and often.',
  },

  // Pinnacle Insurance — completed
  {
    id: 'ck-007', customerId: 'cust-007', status: 'completed', date: '2025-05-28',
    attendeesPanw: [
      { name: 'Marcus Bennett', role: 'CSE', attended: true },
      { name: 'Cole Ramsey', role: 'SC', attended: true },
      { name: 'Ryan Prescott', role: 'AM', attended: true },
      { name: 'Noah Sinclair', role: 'DC', attended: true },
    ],
    attendeesCustomer: [
      { name: 'Richard Tanaka', role: 'Director of Cybersecurity', attended: true },
      { name: 'Angela Morrison', role: 'Cloud Migration Lead', attended: true },
      { name: 'Samira Khan', role: 'Application Security Lead', attended: true },
      { name: 'William Prescott', role: 'CISO', attended: true },
    ],
    scopePresented: true,
    customerFeedbackOnPlan: 'William Prescott emphasized zero compliance gaps during migration. Richard and Angela agreed with migration sequence. Samira asked about AppSec migration timeline.',
    environmentAccess: { method: 'Direct remote + customer VPN for both PC and CC environments', accessContact: 'Angela Morrison', accessStatus: 'granted' },
    initialSessionPlanPresented: true,
    followUpActions: [
      { description: 'Finalize migration sequence with MCT', owner: 'Marcus Bennett', dueDate: '2025-06-02', status: 'complete' },
      { description: 'Provide AppSec migration timeline to Samira', owner: 'Marcus Bennett', dueDate: '2025-06-04', status: 'complete' },
    ],
    meetingNotes: 'Comprehensive kickoff for migration engagement. All key stakeholders present including CISO. Dual change control paths documented (PC vs CC). Expedited path for migration changes approved by CISO. Key risk flagged: API integration format differences between PC and CC. Richard expects weekly status updates.',
  },

  // Quantum Dynamics — completed
  {
    id: 'ck-008', customerId: 'cust-008', status: 'completed', date: '2025-04-28',
    attendeesPanw: [
      { name: 'Marcus Bennett', role: 'CSE', attended: true },
      { name: 'Riley Dawson', role: 'SC', attended: true },
      { name: 'Nolan Hollis', role: 'AM', attended: true },
      { name: 'Logan Pierce', role: 'DC', attended: true },
    ],
    attendeesCustomer: [
      { name: 'Margaret Sullivan', role: 'VP of Cybersecurity', attended: true },
      { name: 'Jason Park', role: 'Senior Cloud Security Engineer', attended: true },
      { name: 'David Chen', role: 'CISO', attended: true },
    ],
    scopePresented: true,
    customerFeedbackOnPlan: 'David Chen approved and expressed interest in becoming a PANW reference account. Margaret requested monthly executive summaries.',
    environmentAccess: { method: 'ITAR-compliant secure remote access', accessContact: 'Jason Park', accessStatus: 'granted' },
    initialSessionPlanPresented: true,
    followUpActions: [
      { description: 'Set up monthly executive summary cadence', owner: 'Marcus Bennett', dueDate: '2025-05-02', status: 'complete' },
    ],
    meetingNotes: 'Premium engagement kickoff. ITAR compliance confirmed for all participants. FedRAMP and CMMC change control requirements documented extensively. Customer expects the highest quality of delivery. David Chen reference account interest noted — inform Nolan Hollis for sales motion.',
  },

  // Helix Biotech — completed
  {
    id: 'ck-009', customerId: 'cust-009', status: 'completed', date: '2026-01-05',
    attendeesPanw: [
      { name: 'Marcus Bennett', role: 'CSE', attended: true },
      { name: 'Trevor Lane', role: 'SC', attended: true },
      { name: 'Sydney Porter', role: 'AM', attended: true },
    ],
    attendeesCustomer: [
      { name: 'Dr. Nina Vasquez', role: 'Head of IT Security', attended: true },
      { name: 'Jake Morrison', role: 'DevSecOps Lead', attended: true },
    ],
    scopePresented: true,
    customerFeedbackOnPlan: 'Dr. Vasquez agreed with Posture-first approach. Jake Morrison eager to start AppSec sessions — asked how soon SCA/SBOM could begin.',
    environmentAccess: { method: 'Customer VPN + SSO', accessContact: 'Jake Morrison', accessStatus: 'granted' },
    initialSessionPlanPresented: true,
    followUpActions: [
      { description: 'Confirm AppSec specialist assignment timeline with CSE Manager', owner: 'Marcus Bennett', dueDate: '2026-01-10', status: 'complete' },
    ],
    meetingNotes: 'Good kickoff. GxP vs non-GxP distinction clearly documented in change control. Jake is very eager for AppSec — need to manage expectations on specialist availability. Dr. Vasquez is thoughtful and strategic — prefers quality over speed.',
  },

  // RedLeaf Consulting — completed (7 months ago)
  {
    id: 'ck-010', customerId: 'cust-010', status: 'completed', date: '2025-09-05',
    attendeesPanw: [
      { name: 'Marcus Bennett', role: 'CSE', attended: true },
      { name: 'Gavin Cross', role: 'SC', attended: true },
    ],
    attendeesCustomer: [
      { name: 'Greg Patterson', role: 'IT Director', attended: true },
    ],
    scopePresented: true,
    customerFeedbackOnPlan: 'Greg agreed but asked to keep it simple. Wants to focus on SOC 2 compliance basics only.',
    environmentAccess: { method: 'Direct remote — Greg shares screen', accessContact: 'Greg Patterson', accessStatus: 'granted' },
    initialSessionPlanPresented: true,
    followUpActions: [
      { description: 'Greg to create asset group', owner: 'Greg Patterson', dueDate: '2025-09-15', status: 'blocked' },
    ],
    meetingNotes: 'Minimal kickoff. Greg is practical and wants low-complexity engagement. Informal change control documented (Greg does everything himself). Risk: single point of failure — if Greg is unavailable, the entire engagement stalls. Asset group creation was assigned to Greg but remains incomplete.',
  },

  // Atlas Logistics — scheduled for next week
  {
    id: 'ck-011', customerId: 'cust-011', status: 'scheduled', date: '2026-04-22',
    attendeesPanw: [
      { name: 'Marcus Bennett', role: 'CSE', attended: false },
      { name: 'Ethan Carter', role: 'SC', attended: false },
      { name: 'Erin Foster', role: 'AM', attended: false },
      { name: 'Camille Rhodes', role: 'DC', attended: false },
    ],
    attendeesCustomer: [
      { name: 'Helena Dubois', role: 'Director of Cloud Operations', attended: false },
      { name: 'Raj Krishnamurthy', role: 'Principal Security Architect', attended: false },
    ],
    scopePresented: false,
    customerFeedbackOnPlan: '',
    environmentAccess: { method: '', accessContact: '', accessStatus: 'pending' },
    initialSessionPlanPresented: false,
    followUpActions: [],
    meetingNotes: '',
  },
];
