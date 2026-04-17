// S&O Copilot — Mock Prerequisites Data
// Customer prerequisite checklists based on Service Description Section 2.4

import type { CustomerPrerequisites } from '../types';

const prerequisiteTemplate = [
  'Cortex Cloud is activated',
  'Customer project lead resource assigned',
  'All applicable products registered on PANW support site',
  'All product licenses/activation codes available',
  'List of approved cloud providers and integrations provided',
  'Proper administrative accounts for cloud providers provisioned',
  'Resources assigned for third-party integration work',
  'Cloud service provider has been connected',
  'Multiple users have been created',
  'Asset group has been created',
];

function makePrereqs(customerId: string, statuses: Array<{ status: 'not_started' | 'in_progress' | 'complete' | 'blocked'; dateCompleted: string | null; notes: string }>): CustomerPrerequisites {
  return {
    customerId,
    items: prerequisiteTemplate.map((desc, i) => ({
      id: `prereq-${customerId}-${String(i + 1).padStart(2, '0')}`,
      description: desc,
      status: statuses[i].status,
      dateCompleted: statuses[i].dateCompleted,
      notes: statuses[i].notes,
    })),
  };
}

export const customerPrerequisites: CustomerPrerequisites[] = [
  // Meridian Healthcare — all complete
  makePrereqs('cust-001', [
    { status: 'complete', dateCompleted: '2025-03-10', notes: '' },
    { status: 'complete', dateCompleted: '2025-03-10', notes: 'Sarah Chen assigned as project lead' },
    { status: 'complete', dateCompleted: '2025-03-08', notes: '' },
    { status: 'complete', dateCompleted: '2025-03-08', notes: '' },
    { status: 'complete', dateCompleted: '2025-03-12', notes: 'AWS and Azure accounts listed' },
    { status: 'complete', dateCompleted: '2025-03-12', notes: '' },
    { status: 'complete', dateCompleted: '2025-03-15', notes: 'Priya Nair assigned' },
    { status: 'complete', dateCompleted: '2025-03-14', notes: 'AWS and Azure connected via PS deployment' },
    { status: 'complete', dateCompleted: '2025-03-14', notes: '5 users created' },
    { status: 'complete', dateCompleted: '2025-03-14', notes: 'Asset groups for each hospital created' },
  ]),

  // TerraVault Mining — 8 of 10, 2 blocked
  makePrereqs('cust-002', [
    { status: 'complete', dateCompleted: '2025-06-10', notes: '' },
    { status: 'complete', dateCompleted: '2025-06-10', notes: 'Tom Bradley assigned' },
    { status: 'complete', dateCompleted: '2025-06-08', notes: '' },
    { status: 'complete', dateCompleted: '2025-06-08', notes: '' },
    { status: 'complete', dateCompleted: '2025-06-12', notes: 'AWS only' },
    { status: 'complete', dateCompleted: '2025-06-12', notes: '' },
    { status: 'complete', dateCompleted: '2025-06-15', notes: 'Tom is the only resource' },
    { status: 'blocked', dateCompleted: null, notes: 'AWS account permissions issue. Tom cannot resolve IAM role configuration needed for Prisma Cloud connector. Overdue since July 2025.' },
    { status: 'complete', dateCompleted: '2025-06-14', notes: '2 users created (Tom + backup)' },
    { status: 'not_started', dateCompleted: null, notes: 'Tom has not created asset group. Repeatedly deferred.' },
  ]),

  // Brightpath Education — 4 of 10 complete, rest pending
  makePrereqs('cust-003', [
    { status: 'complete', dateCompleted: '2026-03-05', notes: '' },
    { status: 'complete', dateCompleted: '2026-03-05', notes: 'Aisha Johnson assigned' },
    { status: 'complete', dateCompleted: '2026-03-06', notes: '' },
    { status: 'complete', dateCompleted: '2026-03-06', notes: '' },
    { status: 'not_started', dateCompleted: null, notes: 'GCP account details to be provided at customer kickoff' },
    { status: 'not_started', dateCompleted: null, notes: 'Pending — will be confirmed at kickoff' },
    { status: 'not_started', dateCompleted: null, notes: 'TBD — may not need third-party integrations initially' },
    { status: 'not_started', dateCompleted: null, notes: 'GCP connection to be done as first session activity' },
    { status: 'not_started', dateCompleted: null, notes: 'Will be created during onboarding' },
    { status: 'not_started', dateCompleted: null, notes: 'Will be created during onboarding' },
  ]),

  // Apex Financial — all complete
  makePrereqs('cust-004', [
    { status: 'complete', dateCompleted: '2025-11-10', notes: '' },
    { status: 'complete', dateCompleted: '2025-11-10', notes: 'Robert Langston as project lead, Diana Cho as technical lead' },
    { status: 'complete', dateCompleted: '2025-11-08', notes: '' },
    { status: 'complete', dateCompleted: '2025-11-08', notes: '' },
    { status: 'complete', dateCompleted: '2025-11-12', notes: 'AWS, Azure, GCP all listed with account IDs' },
    { status: 'complete', dateCompleted: '2025-11-12', notes: 'Admin accounts for all three CSPs provisioned' },
    { status: 'complete', dateCompleted: '2025-11-15', notes: 'Diana Cho + 2 additional engineers' },
    { status: 'complete', dateCompleted: '2025-11-14', notes: 'All three CSPs connected via PS deployment' },
    { status: 'complete', dateCompleted: '2025-11-14', notes: '8 users across security and cloud ops teams' },
    { status: 'complete', dateCompleted: '2025-11-14', notes: 'Asset groups per CSP and per business unit' },
  ]),

  // NovaTech Industries — all complete
  makePrereqs('cust-005', [
    { status: 'complete', dateCompleted: '2026-01-05', notes: '' },
    { status: 'complete', dateCompleted: '2026-01-05', notes: 'Carlos Vega assigned' },
    { status: 'complete', dateCompleted: '2026-01-04', notes: '' },
    { status: 'complete', dateCompleted: '2026-01-04', notes: '' },
    { status: 'complete', dateCompleted: '2026-01-06', notes: 'AWS and Azure' },
    { status: 'complete', dateCompleted: '2026-01-06', notes: '' },
    { status: 'complete', dateCompleted: '2026-01-08', notes: 'Maria Santos assigned' },
    { status: 'complete', dateCompleted: '2026-01-07', notes: 'Both CSPs connected' },
    { status: 'complete', dateCompleted: '2026-01-07', notes: '4 users created' },
    { status: 'complete', dateCompleted: '2026-01-07', notes: 'Asset groups by environment (prod, staging, dev)' },
  ]),

  // Coastal Energy — all complete
  makePrereqs('cust-006', [
    { status: 'complete', dateCompleted: '2025-09-10', notes: '' },
    { status: 'complete', dateCompleted: '2025-09-10', notes: 'Laura Jennings assigned' },
    { status: 'complete', dateCompleted: '2025-09-08', notes: '' },
    { status: 'complete', dateCompleted: '2025-09-08', notes: '' },
    { status: 'complete', dateCompleted: '2025-09-12', notes: 'AWS only, IT and OT accounts listed separately' },
    { status: 'complete', dateCompleted: '2025-09-12', notes: 'Separate admin accounts for IT and OT environments' },
    { status: 'complete', dateCompleted: '2025-09-15', notes: 'Laura + Derek Osei for OT' },
    { status: 'complete', dateCompleted: '2025-09-14', notes: 'AWS connected via PS deployment' },
    { status: 'complete', dateCompleted: '2025-09-14', notes: '6 users (IT Security + OT Security teams)' },
    { status: 'complete', dateCompleted: '2025-09-14', notes: 'Separate asset groups for IT and OT workloads' },
  ]),

  // Pinnacle Insurance — all complete (plus migration prerequisite)
  makePrereqs('cust-007', [
    { status: 'complete', dateCompleted: '2025-05-10', notes: 'Both Prisma Cloud and Cortex Cloud activated' },
    { status: 'complete', dateCompleted: '2025-05-10', notes: 'Richard Tanaka + Angela Morrison as migration co-leads' },
    { status: 'complete', dateCompleted: '2025-05-08', notes: '' },
    { status: 'complete', dateCompleted: '2025-05-08', notes: 'Licenses for both PC and CC during migration period' },
    { status: 'complete', dateCompleted: '2025-05-12', notes: 'AWS and Azure for both PC and CC environments' },
    { status: 'complete', dateCompleted: '2025-05-12', notes: 'Admin accounts for both platforms' },
    { status: 'complete', dateCompleted: '2025-05-15', notes: 'Angela Morrison + Samira Khan + 3 engineers' },
    { status: 'complete', dateCompleted: '2025-05-14', notes: 'CSPs connected in both PC and CC environments' },
    { status: 'complete', dateCompleted: '2025-05-14', notes: '12 users across both platforms' },
    { status: 'complete', dateCompleted: '2025-05-14', notes: 'Asset groups mirrored between PC and CC' },
  ]),

  // Quantum Dynamics — all complete
  makePrereqs('cust-008', [
    { status: 'complete', dateCompleted: '2025-04-10', notes: '' },
    { status: 'complete', dateCompleted: '2025-04-10', notes: 'Margaret Sullivan assigned' },
    { status: 'complete', dateCompleted: '2025-04-08', notes: '' },
    { status: 'complete', dateCompleted: '2025-04-08', notes: '' },
    { status: 'complete', dateCompleted: '2025-04-12', notes: 'AWS GovCloud and Azure Government' },
    { status: 'complete', dateCompleted: '2025-04-12', notes: 'ITAR-compliant admin accounts provisioned' },
    { status: 'complete', dateCompleted: '2025-04-15', notes: 'Jason Park + 4 cleared engineers' },
    { status: 'complete', dateCompleted: '2025-04-14', notes: 'GovCloud CSPs connected via PS deployment' },
    { status: 'complete', dateCompleted: '2025-04-14', notes: '15 users (all ITAR-cleared)' },
    { status: 'complete', dateCompleted: '2025-04-14', notes: 'Asset groups by classification level and mission area' },
  ]),

  // Helix Biotech — all complete
  makePrereqs('cust-009', [
    { status: 'complete', dateCompleted: '2025-12-10', notes: '' },
    { status: 'complete', dateCompleted: '2025-12-10', notes: 'Dr. Nina Vasquez assigned' },
    { status: 'complete', dateCompleted: '2025-12-08', notes: '' },
    { status: 'complete', dateCompleted: '2025-12-08', notes: '' },
    { status: 'complete', dateCompleted: '2025-12-12', notes: 'AWS only' },
    { status: 'complete', dateCompleted: '2025-12-12', notes: '' },
    { status: 'complete', dateCompleted: '2025-12-15', notes: 'Jake Morrison assigned' },
    { status: 'complete', dateCompleted: '2025-12-14', notes: '' },
    { status: 'complete', dateCompleted: '2025-12-14', notes: '3 users (Nina, Jake, backup)' },
    { status: 'complete', dateCompleted: '2025-12-14', notes: 'Separate asset groups for GxP and non-GxP workloads' },
  ]),

  // RedLeaf Consulting — 9 of 10, 1 not started
  makePrereqs('cust-010', [
    { status: 'complete', dateCompleted: '2025-08-10', notes: '' },
    { status: 'complete', dateCompleted: '2025-08-10', notes: 'Greg Patterson assigned (sole resource)' },
    { status: 'complete', dateCompleted: '2025-08-08', notes: '' },
    { status: 'complete', dateCompleted: '2025-08-08', notes: '' },
    { status: 'complete', dateCompleted: '2025-08-12', notes: 'Azure only' },
    { status: 'complete', dateCompleted: '2025-08-12', notes: '' },
    { status: 'complete', dateCompleted: '2025-08-15', notes: 'Greg is the only resource' },
    { status: 'complete', dateCompleted: '2025-08-14', notes: 'Azure connected' },
    { status: 'complete', dateCompleted: '2025-08-14', notes: '1 user (Greg only)' },
    { status: 'not_started', dateCompleted: null, notes: 'Greg has not created asset group. Assigned at customer kickoff Sept 5, 2025. Repeatedly deferred. Overdue by 5+ months.' },
  ]),

  // Atlas Logistics — 9 of 10 complete (carried from CSM), 1 to verify
  makePrereqs('cust-011', [
    { status: 'complete', dateCompleted: '2025-10-05', notes: 'Activated during CSM period' },
    { status: 'complete', dateCompleted: '2025-10-05', notes: 'Helena Dubois assigned' },
    { status: 'complete', dateCompleted: '2025-10-03', notes: '' },
    { status: 'complete', dateCompleted: '2025-10-03', notes: '' },
    { status: 'complete', dateCompleted: '2025-10-06', notes: 'AWS and GCP' },
    { status: 'complete', dateCompleted: '2025-10-06', notes: '' },
    { status: 'complete', dateCompleted: '2025-10-08', notes: 'Raj Krishnamurthy assigned' },
    { status: 'in_progress', dateCompleted: null, notes: 'CSPs were connected during CSM period. Need to re-verify connectivity after Cortex Cloud migration. Verification pending.' },
    { status: 'complete', dateCompleted: '2025-10-08', notes: '6 users from CSM period' },
    { status: 'complete', dateCompleted: '2025-10-08', notes: 'Asset groups carried from CSM period' },
  ]),
];
