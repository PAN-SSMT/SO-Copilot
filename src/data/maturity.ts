// S&O Copilot — Mock Maturity Assessments
// Assessment data for customers who have completed at least one assessment

import type { MaturityAssessment } from '../types';

export const maturityAssessments: MaturityAssessment[] = [
  // ============================================================
  // Meridian Healthcare — 3 assessments showing progression
  // ============================================================
  {
    id: 'ma-001-1',
    customerId: 'cust-001',
    assessmentDate: '2025-04-10',
    assessorName: 'Marcus Bennett',
    assessmentType: 'initial',
    pillars: [
      {
        pillarName: 'Posture Security',
        overallBadge: 'silver',
        useCases: [
          { useCaseName: 'Cloud Account Visibility', level: 'gold', evidenceNotes: 'All AWS and Azure accounts onboarded and visible.', identifiedGaps: '' },
          { useCaseName: 'Configuration Compliance', level: 'silver', evidenceNotes: 'HIPAA policies enabled. Some custom policies needed.', identifiedGaps: 'Need custom HIPAA detection rules for PHI handling.' },
          { useCaseName: 'Vulnerability Management', level: 'silver', evidenceNotes: 'Agentless scanning active on 60% of workloads.', identifiedGaps: 'Expand scanning to remaining 40% of workloads.' },
          { useCaseName: 'Identity & Access', level: 'bronze', evidenceNotes: 'Basic IAM monitoring configured.', identifiedGaps: 'Need CIEM analysis for overprivileged identities.' },
        ],
      },
      {
        pillarName: 'Runtime Security',
        overallBadge: 'bronze',
        useCases: [
          { useCaseName: 'Workload Protection', level: 'bronze', evidenceNotes: 'CWP agents deployed on 40% of workloads (from PS).', identifiedGaps: 'Extend CWP to remaining 60% of workloads.' },
          { useCaseName: 'Container Security', level: 'not_started', evidenceNotes: '', identifiedGaps: 'Customer has Kubernetes clusters but no container security configured.' },
          { useCaseName: 'Threat Detection', level: 'bronze', evidenceNotes: 'Default detection rules active.', identifiedGaps: 'Need custom detection rules for healthcare-specific threats.' },
        ],
      },
      {
        pillarName: 'Application Security',
        overallBadge: 'not_started',
        useCases: [
          { useCaseName: 'SCA / SBOM', level: 'not_started', evidenceNotes: '', identifiedGaps: 'Customer has patient-facing applications. SCA needed.' },
          { useCaseName: 'IaC Scanning', level: 'not_started', evidenceNotes: '', identifiedGaps: 'Terraform used for infrastructure. IaC scanning recommended.' },
          { useCaseName: 'ASPM', level: 'not_started', evidenceNotes: '', identifiedGaps: 'Not yet in scope. Phase 2 consideration.' },
        ],
      },
    ],
    overallSummary: 'Initial assessment post-PS deployment. Posture security has a solid foundation with room for CIEM improvement. Runtime needs significant expansion of CWP coverage. AppSec not yet started.',
    recommendedNextSessions: ['Expand agentless scanning coverage', 'CIEM analysis', 'CWP agent deployment expansion', 'Custom HIPAA detection rules'],
    storageLink: '#',
  },
  {
    id: 'ma-001-2',
    customerId: 'cust-001',
    assessmentDate: '2025-10-15',
    assessorName: 'Marcus Bennett',
    assessmentType: 'periodic',
    pillars: [
      {
        pillarName: 'Posture Security',
        overallBadge: 'gold',
        useCases: [
          { useCaseName: 'Cloud Account Visibility', level: 'gold', evidenceNotes: 'All accounts onboarded. Full visibility achieved.', identifiedGaps: '' },
          { useCaseName: 'Configuration Compliance', level: 'gold', evidenceNotes: 'HIPAA policies fully configured with custom detection rules.', identifiedGaps: '' },
          { useCaseName: 'Vulnerability Management', level: 'gold', evidenceNotes: 'Agentless scanning on 100% of workloads. Registry scanning enabled.', identifiedGaps: '' },
          { useCaseName: 'Identity & Access', level: 'silver', evidenceNotes: 'CIEM analysis completed. Overprivileged accounts identified.', identifiedGaps: 'Remediation of 12 overprivileged service accounts in progress.' },
        ],
      },
      {
        pillarName: 'Runtime Security',
        overallBadge: 'silver',
        useCases: [
          { useCaseName: 'Workload Protection', level: 'silver', evidenceNotes: 'CWP agents on 85% of workloads.', identifiedGaps: 'Remaining 15% are legacy workloads with compatibility issues.' },
          { useCaseName: 'Container Security', level: 'silver', evidenceNotes: 'Kubernetes connector deployed on 2 of 3 clusters.', identifiedGaps: 'Third cluster (development) pending.' },
          { useCaseName: 'Threat Detection', level: 'silver', evidenceNotes: 'Custom healthcare detection rules deployed.', identifiedGaps: 'Fine-tuning needed to reduce false positives.' },
        ],
      },
      {
        pillarName: 'Application Security',
        overallBadge: 'bronze',
        useCases: [
          { useCaseName: 'SCA / SBOM', level: 'bronze', evidenceNotes: 'SCA enabled for 3 patient-facing applications.', identifiedGaps: 'Extend to all 8 applications.' },
          { useCaseName: 'IaC Scanning', level: 'bronze', evidenceNotes: 'IaC scanning enabled for Terraform repos.', identifiedGaps: 'Need to integrate into CI/CD pipeline.' },
          { useCaseName: 'ASPM', level: 'not_started', evidenceNotes: '', identifiedGaps: 'Planned for next quarter.' },
        ],
      },
    ],
    overallSummary: 'Strong progression. Posture now at Gold. Runtime progressed from Bronze to Silver. AppSec started at Bronze. On track for full operationalization.',
    recommendedNextSessions: ['CIEM remediation follow-up', 'Third Kubernetes cluster onboarding', 'Detection rule fine-tuning', 'SCA expansion to all applications', 'CI/CD IaC integration'],
    storageLink: '#',
  },
  {
    id: 'ma-001-3',
    customerId: 'cust-001',
    assessmentDate: '2026-02-15',
    assessorName: 'Marcus Bennett',
    assessmentType: 'periodic',
    pillars: [
      {
        pillarName: 'Posture Security',
        overallBadge: 'gold',
        useCases: [
          { useCaseName: 'Cloud Account Visibility', level: 'gold', evidenceNotes: 'Full visibility maintained.', identifiedGaps: '' },
          { useCaseName: 'Configuration Compliance', level: 'gold', evidenceNotes: 'HIPAA compliance at 98%.', identifiedGaps: '' },
          { useCaseName: 'Vulnerability Management', level: 'gold', evidenceNotes: 'Full coverage maintained. Critical vuln count reduced by 40%.', identifiedGaps: '' },
          { useCaseName: 'Identity & Access', level: 'gold', evidenceNotes: 'CIEM remediation complete. JIT provisioning active.', identifiedGaps: '' },
        ],
      },
      {
        pillarName: 'Runtime Security',
        overallBadge: 'silver',
        useCases: [
          { useCaseName: 'Workload Protection', level: 'gold', evidenceNotes: 'CWP on 95% of eligible workloads.', identifiedGaps: 'Legacy 5% documented as exceptions.' },
          { useCaseName: 'Container Security', level: 'silver', evidenceNotes: 'All 3 clusters connected. Admission control on prod.', identifiedGaps: 'Admission control for staging cluster pending.' },
          { useCaseName: 'Threat Detection', level: 'silver', evidenceNotes: 'False positives reduced by 60%. Custom rules stable.', identifiedGaps: 'Ongoing tuning for new workload types.' },
        ],
      },
      {
        pillarName: 'Application Security',
        overallBadge: 'silver',
        useCases: [
          { useCaseName: 'SCA / SBOM', level: 'silver', evidenceNotes: 'SCA on 6 of 8 applications. SBOM generation automated.', identifiedGaps: 'Remaining 2 apps are legacy — need assessment.' },
          { useCaseName: 'IaC Scanning', level: 'silver', evidenceNotes: 'Integrated into CI/CD pipeline. Blocking on critical findings.', identifiedGaps: '' },
          { useCaseName: 'ASPM', level: 'bronze', evidenceNotes: 'ASPM onboarded. Initial visibility configured.', identifiedGaps: 'Workflow automation not yet configured.' },
        ],
      },
    ],
    overallSummary: 'Excellent progression. Gold on Posture, Silver on Runtime and AppSec. HIPAA compliance at 98%. Customer is operationalizing well. Next focus: push Runtime and AppSec toward Gold.',
    recommendedNextSessions: ['KSPM compliance reporting', 'ASPM workflow configuration', 'Remaining SCA onboarding', 'Compliance dashboard for Marcus Webb executive briefing'],
    storageLink: '#',
  },

  // ============================================================
  // TerraVault Mining — 1 outdated assessment
  // ============================================================
  {
    id: 'ma-002-1',
    customerId: 'cust-002',
    assessmentDate: '2025-12-01',
    assessorName: 'Marcus Bennett',
    assessmentType: 'initial',
    pillars: [
      {
        pillarName: 'Posture Security',
        overallBadge: 'bronze',
        useCases: [
          { useCaseName: 'Cloud Account Visibility', level: 'bronze', evidenceNotes: 'AWS account partially onboarded. Permissions issue blocking full connection.', identifiedGaps: 'AWS IAM role configuration needed for full onboarding.' },
          { useCaseName: 'Configuration Compliance', level: 'not_started', evidenceNotes: '', identifiedGaps: 'No compliance frameworks defined. Customer unsure of requirements.' },
          { useCaseName: 'Vulnerability Management', level: 'bronze', evidenceNotes: 'Basic scanning enabled but limited by incomplete onboarding.', identifiedGaps: 'Full scanning blocked by CSP connection issue.' },
        ],
      },
      {
        pillarName: 'Runtime Security',
        overallBadge: 'bronze',
        useCases: [
          { useCaseName: 'Workload Protection', level: 'bronze', evidenceNotes: 'CWP agent on 3 test workloads only.', identifiedGaps: 'Production deployment not started — no asset group created.' },
          { useCaseName: 'Threat Detection', level: 'not_started', evidenceNotes: '', identifiedGaps: 'Detection rules not configured.' },
        ],
      },
      {
        pillarName: 'Application Security',
        overallBadge: 'not_started',
        useCases: [
          { useCaseName: 'SCA / SBOM', level: 'not_started', evidenceNotes: '', identifiedGaps: 'Not in current scope.' },
          { useCaseName: 'IaC Scanning', level: 'not_started', evidenceNotes: '', identifiedGaps: 'Not in current scope.' },
        ],
      },
    ],
    overallSummary: 'Very early stage. Deployment foundation issues are blocking progress. AWS permissions and asset group creation are critical blockers. Customer engagement is inconsistent.',
    recommendedNextSessions: ['Resolve AWS IAM permissions', 'Create asset group', 'Complete CSP onboarding', 'Basic CSPM policy configuration'],
    storageLink: '#',
  },

  // ============================================================
  // Apex Financial Group — 2 assessments
  // ============================================================
  {
    id: 'ma-004-1',
    customerId: 'cust-004',
    assessmentDate: '2025-12-15',
    assessorName: 'Marcus Bennett',
    assessmentType: 'initial',
    pillars: [
      {
        pillarName: 'Posture Security',
        overallBadge: 'silver',
        useCases: [
          { useCaseName: 'Cloud Account Visibility', level: 'gold', evidenceNotes: 'All three CSPs fully onboarded.', identifiedGaps: '' },
          { useCaseName: 'Configuration Compliance', level: 'silver', evidenceNotes: 'PCI-DSS policies enabled. SOX policies in progress.', identifiedGaps: 'SOX compliance policies need customization for wealth management workflows.' },
          { useCaseName: 'Vulnerability Management', level: 'silver', evidenceNotes: 'Scanning active across all CSPs.', identifiedGaps: 'Multi-cloud vulnerability correlation not configured.' },
          { useCaseName: 'Identity & Access', level: 'silver', evidenceNotes: 'RBAC configured. CIEM analysis pending.', identifiedGaps: 'CIEM needed for multi-cloud IAM analysis.' },
        ],
      },
      {
        pillarName: 'Runtime Security',
        overallBadge: 'bronze',
        useCases: [
          { useCaseName: 'Workload Protection', level: 'silver', evidenceNotes: 'XDR agents deployed across cloud workloads.', identifiedGaps: 'Some Azure workloads missing agent coverage.' },
          { useCaseName: 'Container Security', level: 'bronze', evidenceNotes: 'Basic Kubernetes visibility.', identifiedGaps: 'Admission control and KSPM not configured.' },
          { useCaseName: 'Threat Detection', level: 'bronze', evidenceNotes: 'Default XDR detection policies active.', identifiedGaps: 'Custom detection rules for financial services patterns needed.' },
        ],
      },
      {
        pillarName: 'Application Security',
        overallBadge: 'bronze',
        useCases: [
          { useCaseName: 'SCA / SBOM', level: 'bronze', evidenceNotes: 'SCA enabled for 2 critical applications.', identifiedGaps: 'Customer has 15+ applications. Coverage is minimal.' },
          { useCaseName: 'IaC Scanning', level: 'not_started', evidenceNotes: '', identifiedGaps: 'Multi-cloud IaC scanning needed (Terraform + CloudFormation + ARM).' },
          { useCaseName: 'ASPM', level: 'not_started', evidenceNotes: '', identifiedGaps: 'ASPM onboarding planned.' },
        ],
      },
    ],
    overallSummary: 'Solid posture foundation from PS deployment. Multi-cloud complexity is the main challenge. PCI-DSS compliance is priority. Runtime and AppSec need significant work.',
    recommendedNextSessions: ['SOX compliance policy configuration', 'Multi-cloud vulnerability correlation', 'CIEM analysis', 'KSPM configuration', 'Custom financial services detection rules', 'SCA expansion'],
    storageLink: '#',
  },
  {
    id: 'ma-004-2',
    customerId: 'cust-004',
    assessmentDate: '2026-03-01',
    assessorName: 'Marcus Bennett',
    assessmentType: 'periodic',
    pillars: [
      {
        pillarName: 'Posture Security',
        overallBadge: 'silver',
        useCases: [
          { useCaseName: 'Cloud Account Visibility', level: 'gold', evidenceNotes: 'Full multi-cloud visibility maintained.', identifiedGaps: '' },
          { useCaseName: 'Configuration Compliance', level: 'gold', evidenceNotes: 'PCI-DSS and SOX policies fully configured.', identifiedGaps: '' },
          { useCaseName: 'Vulnerability Management', level: 'silver', evidenceNotes: 'Multi-cloud correlation now active.', identifiedGaps: 'Prioritization tuning needed.' },
          { useCaseName: 'Identity & Access', level: 'silver', evidenceNotes: 'CIEM analysis completed. 8 overprivileged accounts found.', identifiedGaps: 'Remediation in progress.' },
        ],
      },
      {
        pillarName: 'Runtime Security',
        overallBadge: 'bronze',
        useCases: [
          { useCaseName: 'Workload Protection', level: 'silver', evidenceNotes: 'XDR coverage at 90%.', identifiedGaps: 'GCP workloads pending.' },
          { useCaseName: 'Container Security', level: 'bronze', evidenceNotes: 'KSPM configured but admission control pending.', identifiedGaps: 'Strict change control slowing rollout. Saturday window needed.' },
          { useCaseName: 'Threat Detection', level: 'bronze', evidenceNotes: 'Custom rules created but not yet tuned.', identifiedGaps: 'High false positive rate on financial transaction alerts.' },
        ],
      },
      {
        pillarName: 'Application Security',
        overallBadge: 'bronze',
        useCases: [
          { useCaseName: 'SCA / SBOM', level: 'bronze', evidenceNotes: 'SCA on 5 of 15 applications. SBOM integration in CI/CD struggling.', identifiedGaps: 'CI/CD pipeline access issue blocking SBOM integration.' },
          { useCaseName: 'IaC Scanning', level: 'bronze', evidenceNotes: 'Terraform scanning enabled.', identifiedGaps: 'CloudFormation and ARM template scanning not yet configured.' },
          { useCaseName: 'ASPM', level: 'not_started', evidenceNotes: '', identifiedGaps: 'ASPM onboarding next priority after SCA expansion.' },
        ],
      },
    ],
    overallSummary: 'Progress on Posture (compliance now Gold). Runtime stuck at Bronze due to change control constraints slowing deployment. AppSec progressing slowly — SBOM CI/CD integration is a blocker. LoE consumption is high relative to progress.',
    recommendedNextSessions: ['ASPM application risk review', 'SBOM CI/CD integration troubleshooting', 'Admission control deployment (Saturday window)', 'Detection rule fine-tuning', 'API advisory session'],
    storageLink: '#',
  },

  // ============================================================
  // NovaTech Industries — 2 assessments
  // ============================================================
  {
    id: 'ma-005-1',
    customerId: 'cust-005',
    assessmentDate: '2026-01-28',
    assessorName: 'Marcus Bennett',
    assessmentType: 'initial',
    pillars: [
      {
        pillarName: 'Posture Security',
        overallBadge: 'silver',
        useCases: [
          { useCaseName: 'Cloud Account Visibility', level: 'gold', evidenceNotes: 'AWS and Azure fully onboarded.', identifiedGaps: '' },
          { useCaseName: 'Configuration Compliance', level: 'silver', evidenceNotes: 'ISO 27001 policies configured.', identifiedGaps: 'NIST CSF mapping incomplete.' },
          { useCaseName: 'Vulnerability Management', level: 'silver', evidenceNotes: 'Scanning active. Good coverage.', identifiedGaps: '' },
        ],
      },
      {
        pillarName: 'Runtime Security',
        overallBadge: 'bronze',
        useCases: [
          { useCaseName: 'Workload Protection', level: 'silver', evidenceNotes: 'CWP deployed on production workloads.', identifiedGaps: 'IoT edge workloads not yet covered.' },
          { useCaseName: 'Threat Detection', level: 'bronze', evidenceNotes: 'Default rules active.', identifiedGaps: 'Need IoT/OT-specific detection rules.' },
        ],
      },
      {
        pillarName: 'Application Security',
        overallBadge: 'not_started',
        useCases: [
          { useCaseName: 'SCA / SBOM', level: 'not_started', evidenceNotes: '', identifiedGaps: 'Manufacturing applications need assessment.' },
          { useCaseName: 'IaC Scanning', level: 'not_started', evidenceNotes: '', identifiedGaps: 'Terraform repos identified.' },
        ],
      },
    ],
    overallSummary: 'Good start. Posture foundation is solid. Runtime needs IoT/OT extension. AppSec not started. Carlos Vega is pushing for fast progress.',
    recommendedNextSessions: ['NIST CSF compliance mapping', 'DSPM for manufacturing IP', 'IoT workload CWP deployment', 'Custom detection rules for industrial environments'],
    storageLink: '#',
  },
  {
    id: 'ma-005-2',
    customerId: 'cust-005',
    assessmentDate: '2026-03-20',
    assessorName: 'Marcus Bennett',
    assessmentType: 'periodic',
    pillars: [
      {
        pillarName: 'Posture Security',
        overallBadge: 'silver',
        useCases: [
          { useCaseName: 'Cloud Account Visibility', level: 'gold', evidenceNotes: 'Full visibility.', identifiedGaps: '' },
          { useCaseName: 'Configuration Compliance', level: 'gold', evidenceNotes: 'ISO 27001 and NIST CSF both fully mapped.', identifiedGaps: '' },
          { useCaseName: 'Vulnerability Management', level: 'silver', evidenceNotes: 'Good coverage. Prioritization in place.', identifiedGaps: '' },
        ],
      },
      {
        pillarName: 'Runtime Security',
        overallBadge: 'silver',
        useCases: [
          { useCaseName: 'Workload Protection', level: 'silver', evidenceNotes: 'CWP on 90% of workloads including some IoT.', identifiedGaps: 'Edge workloads remaining.' },
          { useCaseName: 'Threat Detection', level: 'silver', evidenceNotes: 'Custom industrial detection rules deployed.', identifiedGaps: 'Ongoing tuning needed.' },
        ],
      },
      {
        pillarName: 'Application Security',
        overallBadge: 'bronze',
        useCases: [
          { useCaseName: 'SCA / SBOM', level: 'bronze', evidenceNotes: 'SCA enabled for 3 manufacturing apps.', identifiedGaps: 'More applications to onboard.' },
          { useCaseName: 'IaC Scanning', level: 'bronze', evidenceNotes: 'Terraform scanning enabled.', identifiedGaps: 'CI/CD integration pending.' },
        ],
      },
    ],
    overallSummary: 'Fast progression. Runtime up from Bronze to Silver. AppSec started at Bronze. Customer is demanding — requesting additional sessions beyond plan. LoE overrun risk.',
    recommendedNextSessions: ['DSPM data classification', 'AI-SPM configuration', 'SCA expansion', 'IaC CI/CD integration'],
    storageLink: '#',
  },

  // ============================================================
  // Coastal Energy — 2 assessments
  // ============================================================
  {
    id: 'ma-006-1',
    customerId: 'cust-006',
    assessmentDate: '2025-10-15',
    assessorName: 'Marcus Bennett',
    assessmentType: 'initial',
    pillars: [
      {
        pillarName: 'Posture Security',
        overallBadge: 'silver',
        useCases: [
          { useCaseName: 'Cloud Account Visibility', level: 'gold', evidenceNotes: 'AWS accounts onboarded (IT and OT separated).', identifiedGaps: '' },
          { useCaseName: 'Configuration Compliance', level: 'silver', evidenceNotes: 'NERC CIP policies configured. SOC 2 in progress.', identifiedGaps: 'NERC CIP custom rules needed for ICS-specific configurations.' },
          { useCaseName: 'Vulnerability Management', level: 'silver', evidenceNotes: 'Scanning active across IT workloads.', identifiedGaps: 'OT workload scanning needs special handling.' },
        ],
      },
      {
        pillarName: 'Runtime Security',
        overallBadge: 'bronze',
        useCases: [
          { useCaseName: 'Workload Protection', level: 'silver', evidenceNotes: 'CWP on IT workloads from PS.', identifiedGaps: 'OT workloads require careful rollout with Derek Osei approval.' },
          { useCaseName: 'Threat Detection', level: 'bronze', evidenceNotes: 'Default rules. OT-specific rules needed.', identifiedGaps: 'ICS threat detection patterns required.' },
        ],
      },
      {
        pillarName: 'Application Security',
        overallBadge: 'not_started',
        useCases: [
          { useCaseName: 'SCA / SBOM', level: 'not_started', evidenceNotes: '', identifiedGaps: 'Not current priority.' },
        ],
      },
    ],
    overallSummary: 'Solid posture. IT/OT separation is well defined. Runtime needs OT extension with careful change control. NERC CIP compliance is the top driver.',
    recommendedNextSessions: ['NERC CIP custom detection rules', 'DSPM for OT data classification', 'OT workload CWP deployment planning', 'SOC 2 compliance completion'],
    storageLink: '#',
  },
  {
    id: 'ma-006-2',
    customerId: 'cust-006',
    assessmentDate: '2026-03-15',
    assessorName: 'Marcus Bennett',
    assessmentType: 'periodic',
    pillars: [
      {
        pillarName: 'Posture Security',
        overallBadge: 'silver',
        useCases: [
          { useCaseName: 'Cloud Account Visibility', level: 'gold', evidenceNotes: 'Full visibility maintained.', identifiedGaps: '' },
          { useCaseName: 'Configuration Compliance', level: 'gold', evidenceNotes: 'NERC CIP and SOC 2 fully configured.', identifiedGaps: '' },
          { useCaseName: 'Vulnerability Management', level: 'silver', evidenceNotes: 'IT scanning comprehensive. OT scanning partial.', identifiedGaps: 'DSPM scan categorization issue for ICS data (Sev 2 case open).' },
        ],
      },
      {
        pillarName: 'Runtime Security',
        overallBadge: 'silver',
        useCases: [
          { useCaseName: 'Workload Protection', level: 'silver', evidenceNotes: 'IT and partial OT coverage.', identifiedGaps: 'Full OT deployment blocked by product issue.' },
          { useCaseName: 'Threat Detection', level: 'silver', evidenceNotes: 'Custom NERC CIP rules deployed for IT.', identifiedGaps: 'Custom detection rule rendering bug (Sev 2 case open) blocking OT rules.' },
        ],
      },
      {
        pillarName: 'Application Security',
        overallBadge: 'not_started',
        useCases: [
          { useCaseName: 'SCA / SBOM', level: 'not_started', evidenceNotes: '', identifiedGaps: 'Not current priority — focus on DSPM and detection rules.' },
        ],
      },
    ],
    overallSummary: 'Good progress on Posture (compliance now Gold). Runtime improved to Silver. Two Sev 2 product issues currently blocking further progress on DSPM and detection rules.',
    recommendedNextSessions: ['DSPM fix validation and completion', 'Detection rule fix validation', 'OT workload protection expansion', 'Malware policy for OT environment'],
    storageLink: '#',
  },

  // ============================================================
  // Pinnacle Insurance — 4 assessments (2 PC era, 2 migration era)
  // ============================================================
  {
    id: 'ma-007-3',
    customerId: 'cust-007',
    assessmentDate: '2025-11-01',
    assessorName: 'Marcus Bennett',
    assessmentType: 'periodic',
    pillars: [
      {
        pillarName: 'Posture Security',
        overallBadge: 'silver',
        useCases: [
          { useCaseName: 'Cloud Account Visibility', level: 'gold', evidenceNotes: 'All accounts visible in both PC and CC.', identifiedGaps: '' },
          { useCaseName: 'Configuration Compliance', level: 'silver', evidenceNotes: 'SOX and PCI-DSS policies migrated. NYDFS pending.', identifiedGaps: 'NYDFS policy migration in progress.' },
          { useCaseName: 'Vulnerability Management', level: 'silver', evidenceNotes: 'Scanning migrated to CC.', identifiedGaps: '' },
        ],
      },
      {
        pillarName: 'Runtime Security',
        overallBadge: 'silver',
        useCases: [
          { useCaseName: 'Workload Protection', level: 'silver', evidenceNotes: 'CWP migrated for 70% of workloads.', identifiedGaps: 'Remaining 30% pending migration.' },
          { useCaseName: 'Threat Detection', level: 'silver', evidenceNotes: 'Detection rules migrated.', identifiedGaps: 'Some rules need CC-specific tuning.' },
        ],
      },
      {
        pillarName: 'Application Security',
        overallBadge: 'bronze',
        useCases: [
          { useCaseName: 'SCA / SBOM', level: 'bronze', evidenceNotes: 'SCA partially migrated.', identifiedGaps: 'SBOM migration blocked by API format issue.' },
          { useCaseName: 'ASPM', level: 'not_started', evidenceNotes: '', identifiedGaps: 'ASPM configuration pending on CC.' },
        ],
      },
    ],
    overallSummary: 'Mid-migration assessment. Posture and Runtime maintaining Silver during transition. AppSec at Bronze — API integration blocker affecting SBOM migration.',
    recommendedNextSessions: ['NYDFS policy migration', 'Remaining CWP migration', 'API format workaround for SBOM', 'CSPM custom policy migration continuation'],
    storageLink: '#',
  },
  {
    id: 'ma-007-4',
    customerId: 'cust-007',
    assessmentDate: '2026-03-01',
    assessorName: 'Marcus Bennett',
    assessmentType: 'periodic',
    pillars: [
      {
        pillarName: 'Posture Security',
        overallBadge: 'silver',
        useCases: [
          { useCaseName: 'Cloud Account Visibility', level: 'gold', evidenceNotes: 'Full visibility in CC. PC being decommissioned.', identifiedGaps: '' },
          { useCaseName: 'Configuration Compliance', level: 'silver', evidenceNotes: 'SOX, PCI-DSS migrated. NYDFS partially migrated.', identifiedGaps: '15 custom NYDFS policies still on PC due to API format issue.' },
          { useCaseName: 'Vulnerability Management', level: 'silver', evidenceNotes: 'Fully operational in CC.', identifiedGaps: '' },
        ],
      },
      {
        pillarName: 'Runtime Security',
        overallBadge: 'bronze',
        useCases: [
          { useCaseName: 'Workload Protection', level: 'silver', evidenceNotes: 'CWP migration at 85%.', identifiedGaps: 'Remaining workloads in cutover.' },
          { useCaseName: 'Threat Detection', level: 'bronze', evidenceNotes: 'Some detection rules lost fidelity during migration.', identifiedGaps: 'Detection rule tuning needed post-migration. Regression from Silver.' },
        ],
      },
      {
        pillarName: 'Application Security',
        overallBadge: 'bronze',
        useCases: [
          { useCaseName: 'SCA / SBOM', level: 'bronze', evidenceNotes: 'SCA migrated. SBOM still blocked by API issue.', identifiedGaps: 'API format conversion workaround being tested by customer.' },
          { useCaseName: 'ASPM', level: 'not_started', evidenceNotes: '', identifiedGaps: 'Deferred until API migration issue resolved.' },
        ],
      },
    ],
    overallSummary: 'Runtime regressed from Silver to Bronze due to detection rule fidelity loss during migration cutover. Posture maintaining Silver. API format issue continues to block 15 custom policies and SBOM migration. Overall migration ~75% complete.',
    recommendedNextSessions: ['Continue CSPM policy migration (non-blocked)', 'CWP migration completion', 'Detection rule post-migration tuning', 'API format workaround validation', 'ASPM planning for post-migration'],
    storageLink: '#',
  },

  // ============================================================
  // Quantum Dynamics — 4 assessments showing Bronze to Gold
  // ============================================================
  {
    id: 'ma-008-1',
    customerId: 'cust-008',
    assessmentDate: '2025-05-15',
    assessorName: 'Marcus Bennett',
    assessmentType: 'initial',
    pillars: [
      { pillarName: 'Posture Security', overallBadge: 'silver', useCases: [
        { useCaseName: 'Cloud Account Visibility', level: 'gold', evidenceNotes: 'GovCloud accounts onboarded.', identifiedGaps: '' },
        { useCaseName: 'Configuration Compliance', level: 'silver', evidenceNotes: 'FedRAMP policies configured from PS.', identifiedGaps: 'CMMC and NIST 800-53 mapping needed.' },
        { useCaseName: 'Vulnerability Management', level: 'silver', evidenceNotes: 'Scanning active.', identifiedGaps: 'GovCloud-specific vulnerability context needed.' },
      ]},
      { pillarName: 'Runtime Security', overallBadge: 'silver', useCases: [
        { useCaseName: 'Workload Protection', level: 'silver', evidenceNotes: 'XSIAM and XDR deployed.', identifiedGaps: 'Integration optimization needed.' },
        { useCaseName: 'Threat Detection', level: 'silver', evidenceNotes: 'XSIAM analytics active.', identifiedGaps: 'Defense-specific threat models needed.' },
      ]},
      { pillarName: 'Application Security', overallBadge: 'bronze', useCases: [
        { useCaseName: 'SCA / SBOM', level: 'bronze', evidenceNotes: 'Initial SCA on critical defense apps.', identifiedGaps: 'ITAR-compliant SBOM process needed.' },
        { useCaseName: 'IaC Scanning', level: 'bronze', evidenceNotes: 'Basic Terraform scanning.', identifiedGaps: 'FedRAMP baseline IaC templates needed.' },
        { useCaseName: 'ASPM', level: 'not_started', evidenceNotes: '', identifiedGaps: 'Planned for later phases.' },
      ]},
    ],
    overallSummary: 'Strong starting position from PS. FedRAMP foundation in place. Need CMMC and defense-specific configurations across all pillars.',
    recommendedNextSessions: ['CMMC compliance mapping', 'NIST 800-53 configuration', 'Defense threat models for XSIAM', 'ITAR-compliant SBOM'],
    storageLink: '#',
  },
  {
    id: 'ma-008-4',
    customerId: 'cust-008',
    assessmentDate: '2026-03-20',
    assessorName: 'Marcus Bennett',
    assessmentType: 'periodic',
    pillars: [
      { pillarName: 'Posture Security', overallBadge: 'gold', useCases: [
        { useCaseName: 'Cloud Account Visibility', level: 'gold', evidenceNotes: 'Full GovCloud visibility.', identifiedGaps: '' },
        { useCaseName: 'Configuration Compliance', level: 'gold', evidenceNotes: 'FedRAMP, CMMC, NIST 800-53, ITAR all fully configured.', identifiedGaps: '' },
        { useCaseName: 'Vulnerability Management', level: 'gold', evidenceNotes: 'Comprehensive scanning with defense context. Critical vulns reduced 85%.', identifiedGaps: '' },
      ]},
      { pillarName: 'Runtime Security', overallBadge: 'gold', useCases: [
        { useCaseName: 'Workload Protection', level: 'gold', evidenceNotes: 'XSIAM + XDR full coverage on all GovCloud workloads.', identifiedGaps: '' },
        { useCaseName: 'Threat Detection', level: 'gold', evidenceNotes: 'Custom defense threat models active. APT detection configured.', identifiedGaps: '' },
      ]},
      { pillarName: 'Application Security', overallBadge: 'gold', useCases: [
        { useCaseName: 'SCA / SBOM', level: 'gold', evidenceNotes: 'ITAR-compliant SBOM on all defense applications. Automated generation.', identifiedGaps: '' },
        { useCaseName: 'IaC Scanning', level: 'gold', evidenceNotes: 'FedRAMP baseline templates enforced. CI/CD blocking on violations.', identifiedGaps: '' },
        { useCaseName: 'ASPM', level: 'gold', evidenceNotes: 'Full application risk visibility. Code to Cloud tracing operational.', identifiedGaps: '' },
      ]},
    ],
    overallSummary: 'Gold across all pillars. Fully operationalized. FedRAMP, CMMC, NIST 800-53, and ITAR compliance all automated. Engagement nearing completion. Customer ready for expansion discussion.',
    recommendedNextSessions: ['Engagement wrap-up and forward planning', 'Value delivered report for renewal/expansion', 'New GovCloud region expansion planning'],
    storageLink: '#',
  },

  // ============================================================
  // Helix Biotech — 1 assessment
  // ============================================================
  {
    id: 'ma-009-1',
    customerId: 'cust-009',
    assessmentDate: '2026-02-15',
    assessorName: 'Marcus Bennett',
    assessmentType: 'initial',
    pillars: [
      {
        pillarName: 'Posture Security',
        overallBadge: 'silver',
        useCases: [
          { useCaseName: 'Cloud Account Visibility', level: 'gold', evidenceNotes: 'AWS account fully onboarded.', identifiedGaps: '' },
          { useCaseName: 'Configuration Compliance', level: 'silver', evidenceNotes: 'FDA 21 CFR Part 11 policies configured. SOC 2 in progress.', identifiedGaps: 'GxP-specific compliance rules need customization.' },
          { useCaseName: 'Vulnerability Management', level: 'silver', evidenceNotes: 'Scanning active with GxP/non-GxP asset separation.', identifiedGaps: '' },
        ],
      },
      {
        pillarName: 'Runtime Security',
        overallBadge: 'not_started',
        useCases: [
          { useCaseName: 'Workload Protection', level: 'not_started', evidenceNotes: '', identifiedGaps: 'Not in current module set. Runtime not purchased.' },
        ],
      },
      {
        pillarName: 'Application Security',
        overallBadge: 'bronze',
        useCases: [
          { useCaseName: 'SCA / SBOM', level: 'bronze', evidenceNotes: 'SCA enabled for 1 application.', identifiedGaps: 'Need to expand to GxP-validated pipelines. Specialist needed.' },
          { useCaseName: 'IaC Scanning', level: 'not_started', evidenceNotes: '', identifiedGaps: 'Terraform repos identified but scanning not configured.' },
          { useCaseName: 'ASPM', level: 'not_started', evidenceNotes: '', identifiedGaps: 'ASPM onboarding needed. Specialist required.' },
        ],
      },
    ],
    overallSummary: 'Posture at Silver with good FDA compliance foundation. Runtime N/A (not purchased). AppSec at Bronze — specialist support needed for SCA expansion and ASPM in FDA-regulated environment.',
    recommendedNextSessions: ['SCA expansion to GxP pipelines (specialist needed)', 'IaC scanning configuration', 'ASPM onboarding (specialist needed)', 'GxP compliance rule customization'],
    storageLink: '#',
  },

  // ============================================================
  // RedLeaf Consulting — 1 outdated assessment
  // ============================================================
  {
    id: 'ma-010-1',
    customerId: 'cust-010',
    assessmentDate: '2025-09-15',
    assessorName: 'Marcus Bennett',
    assessmentType: 'initial',
    pillars: [
      {
        pillarName: 'Posture Security',
        overallBadge: 'bronze',
        useCases: [
          { useCaseName: 'Cloud Account Visibility', level: 'bronze', evidenceNotes: 'Azure account onboarded. Basic visibility.', identifiedGaps: 'Asset group not created — limiting visibility.' },
          { useCaseName: 'Configuration Compliance', level: 'bronze', evidenceNotes: 'SOC 2 policies enabled but not customized.', identifiedGaps: 'Customization needed for consulting-specific SOC 2 controls.' },
          { useCaseName: 'Vulnerability Management', level: 'not_started', evidenceNotes: '', identifiedGaps: 'Scanning not configured beyond default.' },
        ],
      },
      {
        pillarName: 'Runtime Security',
        overallBadge: 'not_started',
        useCases: [
          { useCaseName: 'Workload Protection', level: 'not_started', evidenceNotes: '', identifiedGaps: 'Not in scope (CSPM only purchased).' },
        ],
      },
      {
        pillarName: 'Application Security',
        overallBadge: 'not_started',
        useCases: [
          { useCaseName: 'SCA / SBOM', level: 'not_started', evidenceNotes: '', identifiedGaps: 'Not in scope.' },
        ],
      },
    ],
    overallSummary: 'Minimal progress. Bronze on Posture only. SOC 2 compliance is the sole objective. Customer engagement is inconsistent. Asset group still not created.',
    recommendedNextSessions: ['Create asset group', 'SOC 2 policy customization', 'Basic CSPM dashboard setup', 'Vulnerability scanning configuration'],
    storageLink: '#',
  },

  // ============================================================
  // Atlas Logistics — 2 assessments from CSM period
  // ============================================================
  {
    id: 'ma-011-1',
    customerId: 'cust-011',
    assessmentDate: '2025-10-20',
    assessorName: 'Monica Hale',
    assessmentType: 'initial',
    pillars: [
      {
        pillarName: 'Posture Security',
        overallBadge: 'silver',
        useCases: [
          { useCaseName: 'Cloud Account Visibility', level: 'gold', evidenceNotes: 'AWS and GCP onboarded.', identifiedGaps: '' },
          { useCaseName: 'Configuration Compliance', level: 'silver', evidenceNotes: 'ISO 27001 configured. GDPR policies in progress.', identifiedGaps: 'GDPR data residency rules need configuration.' },
          { useCaseName: 'Vulnerability Management', level: 'silver', evidenceNotes: 'Scanning active.', identifiedGaps: '' },
        ],
      },
      {
        pillarName: 'Runtime Security',
        overallBadge: 'bronze',
        useCases: [
          { useCaseName: 'Workload Protection', level: 'silver', evidenceNotes: 'CWP deployed on production.', identifiedGaps: 'Staging environment pending.' },
          { useCaseName: 'Threat Detection', level: 'bronze', evidenceNotes: 'Default rules.', identifiedGaps: 'Supply chain threat detection patterns needed.' },
        ],
      },
      {
        pillarName: 'Application Security',
        overallBadge: 'not_started',
        useCases: [
          { useCaseName: 'SCA / SBOM', level: 'not_started', evidenceNotes: '', identifiedGaps: 'Logistics applications need assessment.' },
          { useCaseName: 'ASPM', level: 'not_started', evidenceNotes: '', identifiedGaps: 'ASPM purchased but not configured.' },
        ],
      },
    ],
    overallSummary: 'CSM initial assessment. Silver on Posture, Bronze on Runtime. AppSec not started despite being purchased. GDPR and supply chain security are priorities.',
    recommendedNextSessions: ['GDPR data residency configuration', 'Staging CWP deployment', 'Supply chain detection rules', 'ASPM onboarding'],
    storageLink: '#',
  },
  {
    id: 'ma-011-2',
    customerId: 'cust-011',
    assessmentDate: '2026-01-15',
    assessorName: 'Monica Hale',
    assessmentType: 'periodic',
    pillars: [
      {
        pillarName: 'Posture Security',
        overallBadge: 'silver',
        useCases: [
          { useCaseName: 'Cloud Account Visibility', level: 'gold', evidenceNotes: 'Full visibility.', identifiedGaps: '' },
          { useCaseName: 'Configuration Compliance', level: 'silver', evidenceNotes: 'ISO 27001 complete. GDPR partially configured.', identifiedGaps: 'GDPR data residency for EU customers pending.' },
          { useCaseName: 'Vulnerability Management', level: 'silver', evidenceNotes: 'Good coverage.', identifiedGaps: '' },
        ],
      },
      {
        pillarName: 'Runtime Security',
        overallBadge: 'silver',
        useCases: [
          { useCaseName: 'Workload Protection', level: 'silver', evidenceNotes: 'CWP on production and staging.', identifiedGaps: '' },
          { useCaseName: 'Threat Detection', level: 'silver', evidenceNotes: 'Supply chain detection rules deployed.', identifiedGaps: 'Tuning needed. Lacework replacement in progress.' },
        ],
      },
      {
        pillarName: 'Application Security',
        overallBadge: 'bronze',
        useCases: [
          { useCaseName: 'SCA / SBOM', level: 'bronze', evidenceNotes: 'SCA started on 2 logistics apps.', identifiedGaps: 'Expand to all customer-facing apps.' },
          { useCaseName: 'ASPM', level: 'not_started', evidenceNotes: '', identifiedGaps: 'ASPM configuration deferred to S&O phase.' },
        ],
      },
    ],
    overallSummary: 'CSM final assessment before transition. Silver on Posture and Runtime. AppSec Bronze. ASPM deferred to S&O. Lacework replacement underway. Good foundation for S&O to build on.',
    recommendedNextSessions: ['ASPM onboarding (S&O priority)', 'GDPR data residency completion', 'SCA expansion', 'Lacework replacement completion with Cortex Cloud runtime'],
    storageLink: '#',
  },
];
