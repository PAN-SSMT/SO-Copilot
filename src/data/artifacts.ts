// S&O Copilot — Mock Artifacts Data
// Document and artifact tracking for all 11 customers

import type { CustomerArtifacts } from '../types';

const artifactNames = [
  'Internal Kickoff MOM',
  'Customer Kickoff Deck',
  'Maturity Assessment Report',
  'Technical Requirements Document',
  'Session Plan',
  'CS Check-In Dashboard',
  'PSR Deck',
  'Customer Files Folder',
  'Design of Record (DOR)',
  'Historical Maturity Assessments',
];

function makeArtifacts(customerId: string, folderLink: string | null, data: Array<{ status: 'present' | 'missing' | 'outdated'; lastUpdated: string | null; link: string | null; notes: string }>): CustomerArtifacts {
  return {
    customerId,
    accountFolderLink: folderLink,
    items: artifactNames.map((name, i) => ({
      id: `art-${customerId}-${String(i + 1).padStart(2, '0')}`,
      name,
      status: data[i].status,
      lastUpdated: data[i].lastUpdated,
      link: data[i].link,
      notes: data[i].notes,
    })),
  };
}

export const customerArtifacts: CustomerArtifacts[] = [
  // Meridian Healthcare — all present and current
  makeArtifacts('cust-001', 'https://drive.google.com/drive/folders/meridian-hc-sno', [
    { status: 'present', lastUpdated: '2025-03-18', link: '#', notes: '' },
    { status: 'present', lastUpdated: '2025-03-27', link: '#', notes: '' },
    { status: 'present', lastUpdated: '2026-02-15', link: '#', notes: 'Latest assessment — 2 months old' },
    { status: 'present', lastUpdated: '2025-04-10', link: '#', notes: 'From PS deployment' },
    { status: 'present', lastUpdated: '2026-03-01', link: '#', notes: 'Current version, last revised at PSR' },
    { status: 'present', lastUpdated: '2026-04-01', link: '#', notes: 'Updated after last session' },
    { status: 'present', lastUpdated: '2026-01-15', link: '#', notes: 'Last quarterly PSR' },
    { status: 'present', lastUpdated: '2026-03-15', link: '#', notes: '' },
    { status: 'present', lastUpdated: '2025-03-10', link: '#', notes: 'From SFDC opportunity' },
    { status: 'present', lastUpdated: '2026-02-15', link: '#', notes: '3 assessments on file' },
  ]),

  // TerraVault Mining — several gaps
  makeArtifacts('cust-002', 'https://drive.google.com/drive/folders/terravault-sno', [
    { status: 'present', lastUpdated: '2025-06-20', link: '#', notes: '' },
    { status: 'present', lastUpdated: '2025-07-01', link: '#', notes: '' },
    { status: 'outdated', lastUpdated: '2025-12-01', link: '#', notes: 'Last assessment 4+ months ago — needs refresh' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'No TRD created — no PS deployment' },
    { status: 'present', lastUpdated: '2025-10-15', link: '#', notes: 'Partially stalled due to blockers' },
    { status: 'outdated', lastUpdated: '2026-01-10', link: '#', notes: 'Not updated since January — 3 months stale' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'No PSR deck created — was due last quarter' },
    { status: 'present', lastUpdated: '2025-08-01', link: '#', notes: 'Sparse — few customer files shared' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'No DOR in SFDC' },
    { status: 'present', lastUpdated: '2025-12-01', link: '#', notes: '1 assessment on file (outdated)' },
  ]),

  // Brightpath Education — mostly missing (expected for new engagement)
  makeArtifacts('cust-003', null, [
    { status: 'present', lastUpdated: '2026-04-08', link: '#', notes: 'From internal kickoff last week' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'In preparation for customer kickoff next Tuesday' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'Not yet conducted — expected after customer kickoff' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'No PS deployment — will be created during S&O' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'Not yet created — expected after assessment' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'Will be created once sessions begin' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'Not yet due — engagement just started' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'Account folder not yet created' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'To review from SFDC' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'No prior assessments' },
  ]),

  // Apex Financial — all present and current
  makeArtifacts('cust-004', 'https://drive.google.com/drive/folders/apex-fg-sno', [
    { status: 'present', lastUpdated: '2025-11-20', link: '#', notes: '' },
    { status: 'present', lastUpdated: '2025-12-02', link: '#', notes: '' },
    { status: 'present', lastUpdated: '2026-03-01', link: '#', notes: 'Latest assessment — 6 weeks old' },
    { status: 'present', lastUpdated: '2025-11-15', link: '#', notes: 'From PS deployment' },
    { status: 'present', lastUpdated: '2026-03-15', link: '#', notes: 'Current version' },
    { status: 'present', lastUpdated: '2026-04-05', link: '#', notes: 'Updated after last session' },
    { status: 'present', lastUpdated: '2026-01-20', link: '#', notes: 'Last quarterly PSR' },
    { status: 'present', lastUpdated: '2026-04-01', link: '#', notes: '' },
    { status: 'present', lastUpdated: '2025-11-10', link: '#', notes: 'Detailed DOR from SFDC' },
    { status: 'present', lastUpdated: '2026-03-01', link: '#', notes: '2 assessments on file' },
  ]),

  // NovaTech Industries — all present
  makeArtifacts('cust-005', 'https://drive.google.com/drive/folders/novatech-sno', [
    { status: 'present', lastUpdated: '2026-01-15', link: '#', notes: '' },
    { status: 'present', lastUpdated: '2026-01-22', link: '#', notes: '' },
    { status: 'present', lastUpdated: '2026-03-20', link: '#', notes: 'Latest assessment — 4 weeks old' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'No PS — TRD created by CSE during assessment' },
    { status: 'present', lastUpdated: '2026-03-25', link: '#', notes: 'Recently expanded with ad hoc sessions' },
    { status: 'present', lastUpdated: '2026-04-10', link: '#', notes: 'Updated after last session' },
    { status: 'present', lastUpdated: '2026-03-15', link: '#', notes: 'First quarterly PSR' },
    { status: 'present', lastUpdated: '2026-04-05', link: '#', notes: '' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'No DOR — customer was self-deploy' },
    { status: 'present', lastUpdated: '2026-03-20', link: '#', notes: '2 assessments on file' },
  ]),

  // Coastal Energy — all present
  makeArtifacts('cust-006', 'https://drive.google.com/drive/folders/coastal-energy-sno', [
    { status: 'present', lastUpdated: '2025-09-22', link: '#', notes: '' },
    { status: 'present', lastUpdated: '2025-10-01', link: '#', notes: '' },
    { status: 'present', lastUpdated: '2026-03-15', link: '#', notes: 'Latest assessment — current' },
    { status: 'present', lastUpdated: '2025-09-10', link: '#', notes: 'From PS deployment, includes OT notes' },
    { status: 'present', lastUpdated: '2026-03-20', link: '#', notes: '2 sessions currently blocked' },
    { status: 'present', lastUpdated: '2026-04-08', link: '#', notes: 'Updated with product blocker info' },
    { status: 'present', lastUpdated: '2026-01-10', link: '#', notes: 'Last quarterly PSR' },
    { status: 'present', lastUpdated: '2026-03-20', link: '#', notes: 'Includes NERC CIP documentation' },
    { status: 'present', lastUpdated: '2025-09-05', link: '#', notes: 'From SFDC' },
    { status: 'present', lastUpdated: '2026-03-15', link: '#', notes: '2 assessments on file' },
  ]),

  // Pinnacle Insurance — all present (migration-specific artifacts included)
  makeArtifacts('cust-007', 'https://drive.google.com/drive/folders/pinnacle-ins-sno', [
    { status: 'present', lastUpdated: '2025-05-20', link: '#', notes: 'Includes MCT workstream notes' },
    { status: 'present', lastUpdated: '2025-05-28', link: '#', notes: '' },
    { status: 'present', lastUpdated: '2026-03-01', link: '#', notes: 'Latest assessment reflects migration-period regression on Runtime' },
    { status: 'present', lastUpdated: '2025-05-15', link: '#', notes: 'From Prisma Cloud PS deployment. Includes migration mapping doc.' },
    { status: 'present', lastUpdated: '2026-04-01', link: '#', notes: 'Migration-specific plan with PC2CC tasks' },
    { status: 'present', lastUpdated: '2026-04-12', link: '#', notes: 'Updated after most recent session' },
    { status: 'present', lastUpdated: '2026-02-15', link: '#', notes: 'Migration-focused PSR' },
    { status: 'present', lastUpdated: '2026-04-10', link: '#', notes: 'Includes PC2CC migration plan, config mapping, policy tracker, API checklist' },
    { status: 'present', lastUpdated: '2025-05-10', link: '#', notes: 'Detailed DOR from SFDC' },
    { status: 'present', lastUpdated: '2026-03-01', link: '#', notes: '4 assessments — 2 from Prisma Cloud period, 2 during migration' },
  ]),

  // Quantum Dynamics — all present and meticulously maintained
  makeArtifacts('cust-008', 'https://drive.google.com/drive/folders/quantum-dyn-sno', [
    { status: 'present', lastUpdated: '2025-04-20', link: '#', notes: 'ITAR-controlled document' },
    { status: 'present', lastUpdated: '2025-04-28', link: '#', notes: '' },
    { status: 'present', lastUpdated: '2026-03-20', link: '#', notes: 'Latest — Gold across all pillars' },
    { status: 'present', lastUpdated: '2025-04-15', link: '#', notes: 'Detailed PS TRD with FedRAMP documentation' },
    { status: 'present', lastUpdated: '2026-04-01', link: '#', notes: '2 sessions remaining — wrap-up phase' },
    { status: 'present', lastUpdated: '2026-04-11', link: '#', notes: 'Current' },
    { status: 'present', lastUpdated: '2026-03-10', link: '#', notes: 'Latest quarterly PSR' },
    { status: 'present', lastUpdated: '2026-04-10', link: '#', notes: 'Extensive — FedRAMP, CMMC documentation included' },
    { status: 'present', lastUpdated: '2025-04-10', link: '#', notes: 'Comprehensive DOR' },
    { status: 'present', lastUpdated: '2026-03-20', link: '#', notes: '4 assessments on file — showing Bronze to Gold progression' },
  ]),

  // Helix Biotech — all present
  makeArtifacts('cust-009', 'https://drive.google.com/drive/folders/helix-bio-sno', [
    { status: 'present', lastUpdated: '2025-12-20', link: '#', notes: '' },
    { status: 'present', lastUpdated: '2026-01-05', link: '#', notes: '' },
    { status: 'present', lastUpdated: '2026-02-15', link: '#', notes: 'Current — 2 months old' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'No PS — CSE created simplified TRD during assessment' },
    { status: 'present', lastUpdated: '2026-02-20', link: '#', notes: 'Includes AppSec sessions pending specialist' },
    { status: 'present', lastUpdated: '2026-02-28', link: '#', notes: 'Last updated at most recent session' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'Not yet due — quarterly account, first PSR scheduled Q2' },
    { status: 'present', lastUpdated: '2026-02-15', link: '#', notes: '' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'No DOR in SFDC' },
    { status: 'present', lastUpdated: '2026-02-15', link: '#', notes: '1 assessment on file' },
  ]),

  // RedLeaf Consulting — multiple gaps
  makeArtifacts('cust-010', 'https://drive.google.com/drive/folders/redleaf-sno', [
    { status: 'present', lastUpdated: '2025-08-25', link: '#', notes: '' },
    { status: 'present', lastUpdated: '2025-09-05', link: '#', notes: '' },
    { status: 'outdated', lastUpdated: '2025-09-15', link: '#', notes: 'Assessment is 7 months old — needs full refresh' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'No PS, no TRD created' },
    { status: 'present', lastUpdated: '2025-10-01', link: '#', notes: 'Stale — not revised since initial creation' },
    { status: 'outdated', lastUpdated: '2026-02-10', link: '#', notes: 'Last updated 8 weeks ago — stale' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'Was due last quarter — not prepared' },
    { status: 'present', lastUpdated: '2025-09-15', link: '#', notes: 'Empty — no files shared' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'No DOR in SFDC' },
    { status: 'outdated', lastUpdated: '2025-09-15', link: '#', notes: '1 assessment on file — 7 months old' },
  ]),

  // Atlas Logistics — historical artifacts from CSM, new engagement artifacts pending
  makeArtifacts('cust-011', 'https://drive.google.com/drive/folders/atlas-logistics-sno', [
    { status: 'present', lastUpdated: '2026-04-10', link: '#', notes: 'Includes CSM handover notes from Monica Hale' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'In preparation for customer kickoff next week' },
    { status: 'present', lastUpdated: '2026-01-15', link: '#', notes: 'Most recent assessment from CSM period — 3 months old. New S&O assessment needed.' },
    { status: 'present', lastUpdated: '2025-10-20', link: '#', notes: 'From original PS deployment during CSM period' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'Will be created after maturity assessment' },
    { status: 'missing', lastUpdated: null, link: null, notes: 'Will be created once sessions begin' },
    { status: 'present', lastUpdated: '2026-01-10', link: '#', notes: 'Last CSM-period QBR — 3 months ago. New S&O PSR not yet due.' },
    { status: 'present', lastUpdated: '2026-03-15', link: '#', notes: 'Contains historical CSM materials — 3 QBR decks, engagement notes' },
    { status: 'present', lastUpdated: '2025-10-05', link: '#', notes: 'From SFDC' },
    { status: 'present', lastUpdated: '2026-01-15', link: '#', notes: '2 assessments from CSM period' },
  ]),
];
