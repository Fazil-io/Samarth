export type UserRole = 'public' | 'government' | 'startup' | 'expert' | 'admin';

export type ChallengeStatus = 
  | 'Draft' 
  | 'Published' 
  | 'Under Review' 
  | 'Active Pilot' 
  | 'Completed' 
  | 'Closed';

export type SolutionStatus = 
  | 'Applied' 
  | 'Under Review' 
  | 'Screening' 
  | 'Eligible' 
  | 'Conditionally Eligible' 
  | 'Not Eligible' 
  | 'Under Expert Review' 
  | 'Evaluated' 
  | 'Shortlisted' 
  | 'Pilot Approved' 
  | 'Pilot In Progress' 
  | 'Milestone Pending' 
  | 'Validated' 
  | 'Needs Improvement' 
  | 'Procurement Review' 
  | 'Procured' 
  | 'Scaled' 
  | 'Rejected';

export interface KPI {
  id: string;
  name: string;
  target: string;
  actual?: string;
  unit: string;
  baseline: string;
  status?: 'Achieved' | 'On Track' | 'At Risk' | 'Needs Attention';
  history?: { month: string; value: number }[];
}

export interface Milestone {
  id: string;
  title: string;
  amount: number;
  description: string;
  durationWeeks?: number;
  status: 'Pending' | 'In Progress' | 'Submitted' | 'Approved' | 'Completed';
  paymentStatus: 'Pending' | 'Approved' | 'Processing' | 'Paid';
  deliverables: string[];
  submissionNotes?: string;
  approvedDate?: string;
}

export interface Challenge {
  id: string;
  title: string;
  department: string;
  location: string;
  district: string;
  budget: string;
  budgetValue: number; // in INR (lakhs)
  timeline: string;
  timelineMonths: number;
  status: ChallengeStatus;
  problemCategory: string;
  problemDescription: string;
  currentSituation: string;
  expectedOutcome: string;
  functionalReqs: string[];
  technicalReqs: string[];
  eligibilityCriteria: string[];
  requiredTech: string[];
  dataReqs: string;
  cybersecurityReqs: string;
  pilotDuration: string;
  pilotLocation: string;
  kpis: KPI[];
  successCriteria: string[];
  milestones: Milestone[];
  legalIpClauses: string;
  procurementPathway: string;
  requiredDocuments: string[];
  deadline: string;
  createdAt: string;
  solutionsCount: number;
  featured?: boolean;
}

export interface StartupProfile {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  foundedYear: number;
  location: string;
  district: string;
  industry: string;
  technologies: string[];
  teamSize: number;
  capabilities: string[];
  previousProjects: string[];
  certifications: string[];
  govExperience: boolean;
  fundingStage: string;
  contactEmail: string;
  phone: string;
  dpiitNumber: string;
  msmeRegistered: boolean;
  verified: boolean;
  eligible: boolean;
  pilotReady: boolean;
  solutionsCount: number;
  activePilotsCount: number;
}

export interface EvaluationCriteriaScore {
  innovation: number; // max 20
  technicalFeasibility: number; // max 20
  impact: number; // max 20
  costEffectiveness: number; // max 15
  scalability: number; // max 15
  securityCompliance: number; // max 10
}

export interface Evaluation {
  id: string;
  expertId: string;
  expertName: string;
  expertDesignation: string;
  solutionId: string;
  scores: EvaluationCriteriaScore;
  totalScore: number; // max 100
  comments: string;
  recommendation: 'Recommend Pilot' | 'Request Clarification' | 'Reject';
  date: string;
}

export interface MatchScoreDetails {
  score: number;
  breakdown: {
    domain: number; // max 25
    technology: number; // max 25
    location: number; // max 20
    capability: number; // max 15
    eligibility: number; // max 15
  };
  reasons: string[];
}

export interface Solution {
  id: string;
  challengeId: string;
  challengeTitle: string;
  department: string;
  startupId: string;
  startupName: string;
  solutionName: string;
  tagline: string;
  problemAddressed: string;
  solutionDescription: string;
  innovation: string;
  expectedImpact: string;
  architecture: string;
  technologies: string[];
  deploymentModel: string;
  security: string;
  dataHandling: string;
  pilotPlan: string;
  timelineWeeks: number;
  team: string;
  resources: string;
  estimatedCost: string;
  fundingRequired: number; // in Lakhs
  milestones: Milestone[];
  paymentRequirements: string;
  documents: { name: string; type: string; size: string; verified: boolean }[];
  applicationId: string;
  submissionDate: string;
  status: SolutionStatus;
  eligibilityChecklist: {
    id: string;
    label: string;
    description: string;
    passed: boolean;
    note?: string;
  }[];
  eligibilityStatus: 'Pending' | 'Eligible' | 'Conditionally Eligible' | 'Not Eligible';
  eligibilityRemarks?: string;
  evaluations: Evaluation[];
  matchScore: MatchScoreDetails;
  pilotId?: string;
}

export interface Pilot {
  id: string;
  solutionId: string;
  challengeId: string;
  challengeTitle: string;
  solutionName: string;
  startupId: string;
  startupName: string;
  department: string;
  pilotLocation: string;
  startDate: string;
  endDate: string;
  budget: string;
  budgetValue: number; // in INR
  status: 'Planning' | 'Approved' | 'In Progress' | 'Completed' | 'Validated' | 'Needs Improvement';
  currentMilestoneIndex: number;
  milestones: Milestone[];
  kpis: KPI[];
  validationDecision?: 'Proceed to Procurement' | 'Request Re-Pilot / Improvement' | 'Close Pilot';
  validationEvidence?: string;
  validationNotes?: string;
  governmentReviewNotes?: string;
  expertValidationNotes?: string;
  validatedDate?: string;
}

export interface ProcurementRecord {
  id: string;
  pilotId: string;
  challengeTitle: string;
  solutionName: string;
  startupName: string;
  department: string;
  pathway: string;
  stage: 'Validated Solution' | 'Procurement Review' | 'Compliance Check' | 'Agreement' | 'Procurement' | 'Deployment';
  complianceStatus: 'Passed' | 'Under Review' | 'Pending';
  ipDataClausesStatus: 'Agreed' | 'Under Negotiation' | 'Pending';
  cybersecurityReviewStatus: 'Certified' | 'Conditional' | 'Pending';
  contractStatus: 'Draft' | 'Legal Review' | 'Approved' | 'Executed';
  contractValue: string;
  deploymentDistricts: string[];
  updatedAt: string;
}

export interface ScaleUpProject {
  id: string;
  solutionName: string;
  startupName: string;
  originalDepartment: string;
  originalPilotLocation: string;
  recommendedDistricts: string[];
  selectedDistricts: string[];
  estimatedBudget: string;
  timeline: string;
  pilotKpiSummary: string;
  citizenReachTarget: string;
  status: 'Draft Plan' | 'Sanctioned' | 'Tendering Phase' | 'Multi-District Rollout';
}

export interface TemplateItem {
  id: string;
  title: string;
  category: string;
  description: string;
  fileFormat: string;
  downloads: number;
  contentSnippet: string;
}

export interface AuditLog {
  id: string;
  date: string;
  time: string;
  user: string;
  role: string;
  action: string;
  entity: string;
  status: string;
  hash: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  targetRole: UserRole | 'all';
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'alert';
  linkTo?: string;
}
