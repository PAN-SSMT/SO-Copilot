// S&O Copilot — Mock Engagement Records

import type { Engagement } from '../types';

export const engagements: Engagement[] = [
  { id: 'eng-cust-001', customerId: 'cust-001', assignedCseId: 'eng-001', startDate: '2025-03-15', allocatedDays: 30, consumedDays: 18, daysRemaining: 12, loePercentage: 60, status: 'active', activeSessionPlanId: 'sp-001' },
  { id: 'eng-cust-002', customerId: 'cust-002', assignedCseId: 'eng-001', startDate: '2025-06-15', allocatedDays: 15, consumedDays: 6, daysRemaining: 9, loePercentage: 40, status: 'active', activeSessionPlanId: 'sp-002' },
  { id: 'eng-cust-003', customerId: 'cust-003', assignedCseId: 'eng-001', startDate: '2026-03-10', allocatedDays: 10, consumedDays: 0, daysRemaining: 10, loePercentage: 0, status: 'active', activeSessionPlanId: null },
  { id: 'eng-cust-004', customerId: 'cust-004', assignedCseId: 'eng-001', startDate: '2025-11-15', allocatedDays: 35, consumedDays: 28, daysRemaining: 7, loePercentage: 80, status: 'active', activeSessionPlanId: 'sp-004' },
  { id: 'eng-cust-005', customerId: 'cust-005', assignedCseId: 'eng-001', startDate: '2026-01-10', allocatedDays: 20, consumedDays: 16, daysRemaining: 4, loePercentage: 80, status: 'active', activeSessionPlanId: 'sp-005' },
  { id: 'eng-cust-006', customerId: 'cust-006', assignedCseId: 'eng-001', startDate: '2025-09-15', allocatedDays: 30, consumedDays: 12, daysRemaining: 18, loePercentage: 40, status: 'active', activeSessionPlanId: 'sp-006' },
  { id: 'eng-cust-007', customerId: 'cust-007', assignedCseId: 'eng-001', startDate: '2025-05-15', allocatedDays: 45, consumedDays: 22, daysRemaining: 23, loePercentage: 49, status: 'active', activeSessionPlanId: 'sp-007' },
  { id: 'eng-cust-008', customerId: 'cust-008', assignedCseId: 'eng-001', startDate: '2025-04-15', allocatedDays: 45, consumedDays: 38, daysRemaining: 7, loePercentage: 84, status: 'active', activeSessionPlanId: 'sp-008' },
  { id: 'eng-cust-009', customerId: 'cust-009', assignedCseId: 'eng-001', startDate: '2025-12-15', allocatedDays: 10, consumedDays: 4, daysRemaining: 6, loePercentage: 40, status: 'active', activeSessionPlanId: 'sp-009' },
  { id: 'eng-cust-010', customerId: 'cust-010', assignedCseId: 'eng-001', startDate: '2025-08-20', allocatedDays: 5, consumedDays: 2, daysRemaining: 3, loePercentage: 40, status: 'active', activeSessionPlanId: 'sp-010' },
  { id: 'eng-cust-011', customerId: 'cust-011', assignedCseId: 'eng-001', startDate: '2026-04-01', allocatedDays: 25, consumedDays: 0, daysRemaining: 25, loePercentage: 0, status: 'active', activeSessionPlanId: null },
];
