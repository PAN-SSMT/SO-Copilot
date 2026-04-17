// S&O Copilot — Scope Reference Data
// Structured from Cortex Cloud / Prisma Cloud Premium Success Service Description

import type { ScopeItem } from '../types';

export const scopeReferenceData: ScopeItem[] = [
  // ============================================================
  // CONFIGURATION ASSISTANCE (Section 2.3)
  // ============================================================
  { id: 'ca-01', category: 'configuration_assistance', taskName: 'Cloud Account Onboarding', description: 'Onboard cloud service provider accounts to Cortex Cloud / Prisma Cloud.' },
  { id: 'ca-02', category: 'configuration_assistance', taskName: 'SSO Configuration', description: 'Configure Single Sign-On for the platform.' },
  { id: 'ca-03', category: 'configuration_assistance', taskName: 'Role-Based Access Control', description: 'Set up RBAC policies and user permissions.' },
  { id: 'ca-04', category: 'configuration_assistance', taskName: 'Just-in-time Provisioning', description: 'Configure JIT provisioning for user access.' },
  { id: 'ca-05', category: 'configuration_assistance', taskName: 'Agentless Scanning', description: 'Configure and enable agentless scanning across cloud workloads.' },
  { id: 'ca-06', category: 'configuration_assistance', taskName: 'Registry Scanning', description: 'Configure container registry scanning.' },
  { id: 'ca-07', category: 'configuration_assistance', taskName: 'Serverless Function Scanning', description: 'Configure scanning for serverless functions (Lambda, Cloud Functions, etc.).' },
  { id: 'ca-08', category: 'configuration_assistance', taskName: 'ASPM Onboarding', description: 'Onboard Application Security Posture Management.' },
  { id: 'ca-09', category: 'configuration_assistance', taskName: 'IDE Integration', description: 'Integrate security scanning into developer IDEs.' },
  { id: 'ca-10', category: 'configuration_assistance', taskName: 'Cortex XDR Configuration', description: 'Configure Cortex XDR for cloud environments.' },
  { id: 'ca-11', category: 'configuration_assistance', taskName: 'Cortex XDR Agent for Cloud Installation/Deployment', description: 'Install and deploy Cortex XDR agents in cloud workloads.' },
  { id: 'ca-12', category: 'configuration_assistance', taskName: 'Kubernetes Connector on Kubernetes Clusters', description: 'Deploy Kubernetes connector for cluster visibility and protection.' },
  { id: 'ca-13', category: 'configuration_assistance', taskName: 'CD Pipeline Integration with CLI Tool', description: 'Integrate security scanning into CD pipelines using CLI tools.' },

  // ============================================================
  // OPERATIONAL ASSISTANCE (Section 2.3)
  // ============================================================
  { id: 'oa-01', category: 'operational_assistance', taskName: 'Third-party Integrations', description: 'Configure integrations with third-party tools and platforms.' },
  { id: 'oa-02', category: 'operational_assistance', taskName: 'Platform Concept Overview', description: 'Provide overview of platform concepts and architecture.' },
  { id: 'oa-03', category: 'operational_assistance', taskName: 'Dashboard Management', description: 'Configure and optimize platform dashboards.' },
  { id: 'oa-04', category: 'operational_assistance', taskName: 'Detection Rules Management', description: 'Configure and manage detection rules.' },
  { id: 'oa-05', category: 'operational_assistance', taskName: 'Issue/Compliance Reports', description: 'Set up and configure compliance and issue reporting.' },
  { id: 'oa-06', category: 'operational_assistance', taskName: 'Custom Detection Rules', description: 'Create custom detection rules for specific use cases.' },
  { id: 'oa-07', category: 'operational_assistance', taskName: 'DSPM', description: 'Configure Data Security Posture Management.' },
  { id: 'oa-08', category: 'operational_assistance', taskName: 'AI-SPM', description: 'Configure AI Security Posture Management.' },
  { id: 'oa-09', category: 'operational_assistance', taskName: 'Workload Asset Management', description: 'Manage and organize cloud workload assets.' },
  { id: 'oa-10', category: 'operational_assistance', taskName: 'KSPM — Vulnerability and Compliance', description: 'Configure Kubernetes Security Posture Management for vulnerability and compliance.' },
  { id: 'oa-11', category: 'operational_assistance', taskName: 'Kubernetes Admission Control', description: 'Configure admission control policies for Kubernetes clusters.' },
  { id: 'oa-12', category: 'operational_assistance', taskName: 'WAAS Rule and Application', description: 'Configure Web Application and API Security rules.' },
  { id: 'oa-13', category: 'operational_assistance', taskName: 'Malware Policy Management', description: 'Configure and manage malware detection policies.' },
  { id: 'oa-14', category: 'operational_assistance', taskName: 'Secret Policy Management', description: 'Configure and manage secrets detection policies.' },
  { id: 'oa-15', category: 'operational_assistance', taskName: 'ASPM Visibility', description: 'Configure Application Security Posture Management visibility.' },
  { id: 'oa-16', category: 'operational_assistance', taskName: 'SCA + SBOM', description: 'Configure Software Composition Analysis and Software Bill of Materials.' },
  { id: 'oa-17', category: 'operational_assistance', taskName: 'IaC and Secrets Scanning', description: 'Configure Infrastructure as Code and secrets scanning.' },

  // ============================================================
  // SECURITY OPTIMIZATION (Section 2.3)
  // ============================================================
  { id: 'so-01', category: 'security_optimization', taskName: 'Detection Rules Management Fine-tuning', description: 'Fine-tune existing detection rules for accuracy and relevance.' },
  { id: 'so-02', category: 'security_optimization', taskName: 'Custom Detection Rules', description: 'Create and optimize custom detection rules.' },
  { id: 'so-03', category: 'security_optimization', taskName: 'ASM', description: 'Configure and optimize Attack Surface Management.' },
  { id: 'so-04', category: 'security_optimization', taskName: 'DSPM Review and DDR', description: 'Review DSPM configuration and Data Detection and Response.' },
  { id: 'so-05', category: 'security_optimization', taskName: 'API Advisory Sessions', description: 'Provide advisory sessions on API security configuration.' },
  { id: 'so-06', category: 'security_optimization', taskName: 'Compliance Management', description: 'Optimize compliance monitoring and reporting.' },
  { id: 'so-07', category: 'security_optimization', taskName: 'Vulnerability Management', description: 'Optimize vulnerability detection, prioritization, and management.' },
  { id: 'so-08', category: 'security_optimization', taskName: 'Issue/Case Prioritization and Remediation', description: 'Prioritize and remediate security issues and cases.' },
  { id: 'so-09', category: 'security_optimization', taskName: 'Malware, Secrets, Compliance and Vulnerability Tuning', description: 'Tune policies across malware, secrets, compliance, and vulnerability detection.' },
  { id: 'so-10', category: 'security_optimization', taskName: 'Threat Detection and Protection', description: 'Optimize threat detection and protection capabilities.' },
  { id: 'so-11', category: 'security_optimization', taskName: 'AppSec Scan Management', description: 'Manage and optimize application security scanning.' },
  { id: 'so-12', category: 'security_optimization', taskName: 'Code to Cloud Visibility and Vulnerability Tracing', description: 'Configure end-to-end code to cloud visibility and vulnerability tracing.' },
  { id: 'so-13', category: 'security_optimization', taskName: 'ASPM Application Risk', description: 'Assess and manage application risk through ASPM.' },
  { id: 'so-14', category: 'security_optimization', taskName: 'ASPM Workflow Review', description: 'Review and optimize ASPM workflows.' },
  { id: 'so-15', category: 'security_optimization', taskName: 'CI/CD Risk Management', description: 'Assess and manage risks in CI/CD pipelines.' },

  // ============================================================
  // EXCLUDED — Requires Add-on S&O SKU (Section 2.4)
  // ============================================================
  { id: 'ex-01', category: 'excluded', taskName: 'Custom Reporting and Dashboards', description: 'Creating custom reports and dashboards beyond standard platform capabilities. Requires Add-on Scale and Optimize SKU.' },
  { id: 'ex-02', category: 'excluded', taskName: 'Agent Lifecycle Management', description: 'Managing the full lifecycle of deployed agents. Requires Add-on Scale and Optimize SKU.' },
  { id: 'ex-03', category: 'excluded', taskName: 'Build a Secure SDLC Model', description: 'Designing and implementing a secure software development lifecycle. Requires Add-on Scale and Optimize SKU.' },
  { id: 'ex-04', category: 'excluded', taskName: 'Create Custom Automation for RBAC, Onboarding, APIs', description: 'Building custom automation scripts or tools for RBAC, onboarding, or API workflows. Requires Add-on Scale and Optimize SKU.' },
  { id: 'ex-05', category: 'excluded', taskName: 'Create Custom Third-party Integrations', description: 'Building custom integrations with third-party tools beyond standard connectors. Requires Add-on Scale and Optimize SKU.' },
  { id: 'ex-06', category: 'excluded', taskName: 'Remediation Response Strategy Review', description: 'Reviewing and designing remediation response strategies. Requires Add-on Scale and Optimize SKU.' },
  { id: 'ex-07', category: 'excluded', taskName: 'Enhanced Compliance Reporting and Policy Creation', description: 'Creating enhanced compliance reports and custom compliance policies. Requires Add-on Scale and Optimize SKU.' },
  { id: 'ex-08', category: 'excluded', taskName: 'CIEM Least Privilege Model Implementation', description: 'Implementing Cloud Infrastructure Entitlement Management least privilege models. Requires Add-on Scale and Optimize SKU.' },
  { id: 'ex-09', category: 'excluded', taskName: 'Threat Hunting — Search and Investigate Review', description: 'Conducting threat hunting, search, and investigation reviews. Requires Add-on Scale and Optimize SKU.' },
];
