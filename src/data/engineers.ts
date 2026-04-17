// S&O Copilot — Mock Engineers
// The primary CSE (the user of this app) and their manager

import type { Engineer } from '../types';

export const currentEngineer: Engineer = {
  id: 'eng-001',
  name: 'Marcus Bennett',
  email: 'marcus.bennett@panw.example.com',
  role: 'Customer Success Engineer',
  region: 'nam',
  managerId: 'mgr-001',
  managerName: 'Lauren Caldwell',
  skillCategories: ['posture_security', 'runtime_security', 'assessment'],
};

export const currentManager: Engineer = {
  id: 'mgr-001',
  name: 'Lauren Caldwell',
  email: 'lauren.caldwell@panw.example.com',
  role: 'CSE Manager',
  region: 'nam',
  managerId: 'dir-001',
  managerName: 'Eric Donovan',
  skillCategories: ['posture_security', 'runtime_security', 'application_security', 'assessment', 'automation'],
};
