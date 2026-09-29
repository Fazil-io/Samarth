import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Challenge,
  StartupProfile,
  Solution,
  Pilot,
  ProcurementRecord,
  ScaleUpProject,
  TemplateItem,
  AuditLog,
  NotificationItem,
  Evaluation,
} from '../types';
import {
  INITIAL_CHALLENGES,
  INITIAL_STARTUPS,
  INITIAL_SOLUTIONS,
  INITIAL_PILOTS,
  INITIAL_PROCUREMENT_RECORDS,
  INITIAL_SCALEUP_PROJECTS,
  INITIAL_TEMPLATES,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedChallengeId: string | null;
  setSelectedChallengeId: (id: string | null) => void;
  
  challenges: Challenge[];
  startups: StartupProfile[];
  solutions: Solution[];
  pilots: Pilot[];
  procurementRecords: ProcurementRecord[];
  scaleUpProjects: ScaleUpProject[];
  templates: TemplateItem[];
  auditLogs: AuditLog[];
  notifications: NotificationItem[];
  
  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  
  isDemoGuideOpen: boolean;
  setIsDemoGuideOpen: (open: boolean) => void;
  
  // Actions for the 22-step demo workflow
  addChallenge: (challengeData: Partial<Challenge>) => Challenge;
  submitSolution: (solutionData: Partial<Solution>) => Solution;
  approveEligibility: (solutionId: string, passed: boolean, remarks?: string) => void;
  submitEvaluation: (evaluation: Omit<Evaluation, 'id' | 'date'>) => void;
  approvePilot: (solutionId: string) => Pilot | null;
  submitMilestoneDeliverable: (pilotId: string, milestoneId: string, notes: string) => void;
  approveMilestone: (pilotId: string, milestoneId: string) => void;
  releasePayment: (pilotId: string, milestoneId: string) => void;
  completeValidation: (pilotId: string, decision: 'Proceed to Procurement' | 'Request Re-Pilot / Improvement' | 'Close Pilot', notes: string) => void;
  initiateProcurement: (pilotId: string) => ProcurementRecord;
  updateProcurementStatus: (procId: string, stage: ProcurementRecord['stage'], contractStatus: ProcurementRecord['contractStatus']) => void;
  createScaleUpPlan: (pilotId: string, districts: string[], budget: string) => ScaleUpProject;
  markNotificationRead: (id: string) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or use initial mock data
  const [currentRole, setRoleState] = useState<UserRole>(() => {
    return (
      (localStorage.getItem('samarth_role') as UserRole) ||
      (localStorage.getItem('govinnovate_role') as UserRole) ||
      'public'
    );
  });
  
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);
  const [isDemoGuideOpen, setIsDemoGuideOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    const saved = localStorage.getItem('samarth_challenges') || localStorage.getItem('govinnovate_challenges');
    return saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
  });

  const [startups, setStartups] = useState<StartupProfile[]>(() => {
    const saved = localStorage.getItem('samarth_startups') || localStorage.getItem('govinnovate_startups');
    return saved ? JSON.parse(saved) : INITIAL_STARTUPS;
  });

  const [solutions, setSolutions] = useState<Solution[]>(() => {
    const saved = localStorage.getItem('samarth_solutions') || localStorage.getItem('govinnovate_solutions');
    return saved ? JSON.parse(saved) : INITIAL_SOLUTIONS;
  });

  const [pilots, setPilots] = useState<Pilot[]>(() => {
    const saved = localStorage.getItem('samarth_pilots') || localStorage.getItem('govinnovate_pilots');
    return saved ? JSON.parse(saved) : INITIAL_PILOTS;
  });

  const [procurementRecords, setProcurementRecords] = useState<ProcurementRecord[]>(() => {
    const saved = localStorage.getItem('samarth_procurement') || localStorage.getItem('govinnovate_procurement');
    return saved ? JSON.parse(saved) : INITIAL_PROCUREMENT_RECORDS;
  });

  const [scaleUpProjects, setScaleUpProjects] = useState<ScaleUpProject[]>(() => {
    const saved = localStorage.getItem('samarth_scaleup') || localStorage.getItem('govinnovate_scaleup');
    return saved ? JSON.parse(saved) : INITIAL_SCALEUP_PROJECTS;
  });

  const [templates] = useState<TemplateItem[]>(INITIAL_TEMPLATES);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('samarth_audit') || localStorage.getItem('govinnovate_audit');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('samarth_notifs') || localStorage.getItem('govinnovate_notifs');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('samarth_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('samarth_challenges', JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem('samarth_solutions', JSON.stringify(solutions));
  }, [solutions]);

  useEffect(() => {
    localStorage.setItem('samarth_pilots', JSON.stringify(pilots));
  }, [pilots]);

  useEffect(() => {
    localStorage.setItem('samarth_procurement', JSON.stringify(procurementRecords));
  }, [procurementRecords]);

  useEffect(() => {
    localStorage.setItem('samarth_scaleup', JSON.stringify(scaleUpProjects));
  }, [scaleUpProjects]);

  useEffect(() => {
    localStorage.setItem('samarth_audit', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('samarth_notifs', JSON.stringify(notifications));
  }, [notifications]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addAudit = (action: string, entity: string, status: string = 'Success') => {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0] + ' IST';
    const hash = '0x' + Math.random().toString(16).substring(2, 10) + '...' + Math.random().toString(16).substring(2, 6);
    
    let actor = 'System';
    if (currentRole === 'government') actor = 'Urban Dev / Water Dept Official';
    else if (currentRole === 'startup') actor = 'AquaSense Technologies';
    else if (currentRole === 'expert') actor = 'Dr. Suresh Patil (COEP Expert)';
    else if (currentRole === 'admin') actor = 'MSInS Administrator';

    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      date: formattedDate,
      time: formattedTime,
      user: actor,
      role: currentRole.charAt(0).toUpperCase() + currentRole.slice(1),
      action,
      entity,
      status,
      hash,
    };

    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const addNotification = (title: string, message: string, targetRole: UserRole | 'all', type: 'info' | 'success' | 'warning' | 'alert') => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      targetRole,
      read: false,
      type,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const setRole = (role: UserRole) => {
    setRoleState(role);
    if (role === 'public') {
      setActiveTab('landing');
    } else {
      setActiveTab('dashboard');
    }
    showToast(`Switched active view to ${role.toUpperCase()} role`, 'info');
  };

  // Workflow Action 1: Government adds new challenge
  const addChallenge = (challengeData: Partial<Challenge>): Challenge => {
    const id = `CH-MH-2026-${String(challenges.length + 1).padStart(3, '0')}`;
    const newChallenge: Challenge = {
      id,
      title: challengeData.title || 'Untitled Innovation Challenge',
      department: challengeData.department || 'Urban Development Department',
      location: challengeData.location || 'Pune, Maharashtra',
      district: challengeData.district || 'Pune',
      budget: challengeData.budget || '₹30 Lakhs',
      budgetValue: challengeData.budgetValue || 30,
      timeline: challengeData.timeline || '6 Months',
      timelineMonths: challengeData.timelineMonths || 6,
      status: 'Published',
      problemCategory: challengeData.problemCategory || 'Civic Infrastructure',
      problemDescription: challengeData.problemDescription || '',
      currentSituation: challengeData.currentSituation || '',
      expectedOutcome: challengeData.expectedOutcome || '',
      functionalReqs: challengeData.functionalReqs || ['Field hardware prototype', 'Cloud analytics dashboard'],
      technicalReqs: challengeData.technicalReqs || ['IoT telemetry', 'Edge computing'],
      eligibilityCriteria: challengeData.eligibilityCriteria || ['DPIIT recognized startup', 'TRL 6+ prototype'],
      requiredTech: challengeData.requiredTech || ['IoT', 'Cloud', 'Data Analytics'],
      dataReqs: challengeData.dataReqs || 'Government municipal baseline dataset provided under NDA.',
      cybersecurityReqs: challengeData.cybersecurityReqs || 'All data hosted on Indian servers.',
      pilotDuration: challengeData.pilotDuration || '6 Months',
      pilotLocation: challengeData.pilotLocation || challengeData.location || 'Pune',
      kpis: challengeData.kpis || [
        { id: 'k1', name: 'Operational Efficiency', target: '> 25% Improvement', baseline: '0%', unit: '%', status: 'On Track' },
        { id: 'k2', name: 'Response Latency', target: '< 4 Hours', baseline: '48 Hours', unit: 'Hours', status: 'On Track' }
      ],
      successCriteria: challengeData.successCriteria || ['Successful deployment in pilot zone', 'Third-party validated KPI audit'],
      milestones: challengeData.milestones || [
        { id: 'm1', title: 'Milestone 1: Prototype Deployment', amount: 800000, description: 'Field baseline installation', status: 'Pending', paymentStatus: 'Pending', deliverables: ['Installation Signoff'] },
        { id: 'm2', title: 'Milestone 2: Live Pilot Operations', amount: 1200000, description: 'Active testing and alerts', status: 'Pending', paymentStatus: 'Pending', deliverables: ['Interim Report'] },
        { id: 'm3', title: 'Milestone 3: KPI Validation', amount: 1000000, description: 'Final validation and audit', status: 'Pending', paymentStatus: 'Pending', deliverables: ['Final Audit'] },
      ],
      legalIpClauses: challengeData.legalIpClauses || 'Core IP retained by startup; State has civic usage rights.',
      procurementPathway: 'Applicable procurement pathway: Maharashtra State Innovative Procurement Policy / Rule 149 GFR Innovation Exemption.',
      requiredDocuments: ['DPIIT Certificate', 'Technical Architecture Proposal', 'Financial Audit'],
      deadline: challengeData.deadline || '2026-11-30',
      createdAt: new Date().toISOString().split('T')[0],
      solutionsCount: 0,
      featured: true,
    };

    setChallenges((prev) => [newChallenge, ...prev]);
    addAudit('Challenge Published', `${newChallenge.id} - ${newChallenge.title}`, 'Published');
    addNotification('New Challenge Published', `Government published: "${newChallenge.title}"`, 'startup', 'info');
    showToast(`Challenge "${newChallenge.title}" published successfully!`, 'success');
    return newChallenge;
  };

  // Workflow Action 2: Startup submits a solution
  const submitSolution = (solutionData: Partial<Solution>): Solution => {
    const id = `sol-${Date.now()}`;
    const appId = `APP-MH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Auto-calculate smart match score
    const matchBreakdown = {
      domain: 24,
      technology: 23,
      location: 19,
      capability: 14,
      eligibility: 14,
    };
    const totalMatch = 94;

    const newSolution: Solution = {
      id,
      challengeId: solutionData.challengeId || 'CH-MH-2026-001',
      challengeTitle: solutionData.challengeTitle || 'Smart Water Leakage Detection',
      department: solutionData.department || 'Water Resources Department & MJP',
      startupId: solutionData.startupId || 'startup-aquasense',
      startupName: solutionData.startupName || 'AquaSense Technologies Pvt Ltd',
      solutionName: solutionData.solutionName || 'Innovative GovTech Solution',
      tagline: solutionData.tagline || 'Advanced IoT & AI Solution for Civic Infrastructure',
      problemAddressed: solutionData.problemAddressed || '',
      solutionDescription: solutionData.solutionDescription || '',
      innovation: solutionData.innovation || '',
      expectedImpact: solutionData.expectedImpact || '',
      architecture: solutionData.architecture || 'Microservices, Edge IoT, Encrypted Cloud Telemetry',
      technologies: solutionData.technologies || ['IoT Sensors', 'Machine Learning', 'Cloud'],
      deploymentModel: solutionData.deploymentModel || 'Cloud + Edge Hardware',
      security: solutionData.security || 'AES-256 encrypted, MeitY empaneled cloud hosting',
      dataHandling: solutionData.dataHandling || 'Local data storage within India with strict role-based access',
      pilotPlan: solutionData.pilotPlan || 'Phased pilot deployment over 6 months with rigorous baseline benchmarking',
      timelineWeeks: solutionData.timelineWeeks || 24,
      team: solutionData.team || 'Core technical team of 8 engineers and domain specialists',
      resources: solutionData.resources || 'Field hardware nodes, calibration tools, cloud infra',
      estimatedCost: solutionData.estimatedCost || '₹35,00,000',
      fundingRequired: solutionData.fundingRequired || 35,
      milestones: solutionData.milestones || [
        { id: `sm-${Date.now()}-1`, title: 'Milestone 1: Prototype Deployment', amount: 800000, description: 'Hardware deployment & baseline calibration', status: 'Pending', paymentStatus: 'Pending', deliverables: ['Hardware Signoff'] },
        { id: `sm-${Date.now()}-2`, title: 'Milestone 2: Field Pilot Testing', amount: 1200000, description: 'Live operational testing and SLA validation', status: 'Pending', paymentStatus: 'Pending', deliverables: ['Interim Report'] },
        { id: `sm-${Date.now()}-3`, title: 'Milestone 3: Final KPI Validation', amount: 1500000, description: 'Third party audit and scale up model', status: 'Pending', paymentStatus: 'Pending', deliverables: ['Validation Report'] },
      ],
      paymentRequirements: 'Direct Bank Transfer to Startup Escrow Account against Department Milestone Inspection Sign-off.',
      documents: solutionData.documents || [
        { name: 'DPIIT_Recognition_Certificate.pdf', type: 'Certificate', size: '1.2 MB', verified: true },
        { name: 'Technical_Solution_Architecture.pdf', type: 'Proposal', size: '3.8 MB', verified: true },
        { name: 'Financial_Audited_Report.pdf', type: 'Financial', size: '1.5 MB', verified: true },
      ],
      applicationId: appId,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'Screening',
      eligibilityChecklist: [
        { id: 'el-1', label: 'DPIIT Recognized Startup', description: 'Recognized under Startup India & Maharashtra Innovation Policy', passed: true },
        { id: 'el-2', label: 'Required Documents Submitted', description: 'Incorporation, tax filings & technical proposal verified', passed: true },
        { id: 'el-3', label: 'Technology Readiness (TRL 6+)', description: 'Functional working prototype demonstrated', passed: true },
        { id: 'el-4', label: 'Registered Entity in Maharashtra', description: 'Operating office in Maharashtra State', passed: true },
        { id: 'el-5', label: 'Financial & Non-Blacklisting Check', description: 'Clean regulatory compliance record', passed: true },
        { id: 'el-6', label: 'Data Residency Mandate', description: 'Server infrastructure based within India', passed: true },
      ],
      eligibilityStatus: 'Pending',
      evaluations: [],
      matchScore: {
        score: totalMatch,
        breakdown: matchBreakdown,
        reasons: [
          'Domain Match: Exact match with problem statement domain and target department.',
          'Technology Match: Stack matches required technologies (IoT, Edge AI, SCADA).',
          'Location Advantage: Local office within target municipal jurisdiction.',
          'Capability Match: Demonstrated prior pilot execution and experienced engineering team.',
          'Eligibility: 100% compliant with DPIIT and MSME state guidelines.',
        ],
      },
    };

    setSolutions((prev) => [newSolution, ...prev]);

    // Update challenge solution count
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === newSolution.challengeId ? { ...c, solutionsCount: c.solutionsCount + 1 } : c
      )
    );

    addAudit('Solution Submitted', `${newSolution.applicationId} by ${newSolution.startupName}`, 'Submitted');
    addNotification('New Solution Submitted', `${newSolution.startupName} applied for ${newSolution.challengeTitle}`, 'government', 'info');
    showToast(`Solution "${newSolution.solutionName}" submitted successfully! Application ID: ${appId}`, 'success');

    return newSolution;
  };

  // Workflow Action 3: Government reviews eligibility screening
  const approveEligibility = (solutionId: string, passed: boolean, remarks?: string) => {
    setSolutions((prev) =>
      prev.map((sol) => {
        if (sol.id !== solutionId) return sol;
        const newStatus = passed ? 'Under Expert Review' : 'Not Eligible';
        return {
          ...sol,
          status: newStatus,
          eligibilityStatus: passed ? 'Eligible' : 'Not Eligible',
          eligibilityRemarks: remarks || (passed ? 'Verified against all 6 eligibility benchmarks.' : 'Did not meet criteria.'),
        };
      })
    );

    const sol = solutions.find((s) => s.id === solutionId);
    const targetTitle = sol ? sol.solutionName : solutionId;
    
    if (passed) {
      addAudit('Eligibility Screening Approved', `${targetTitle} moved to Expert Evaluation`, 'Eligible');
      addNotification('Assigned to Expert Panel', `Solution "${targetTitle}" is ready for scoring.`, 'expert', 'warning');
      addNotification('Eligibility Approved', `Your solution "${targetTitle}" passed screening!`, 'startup', 'success');
      showToast(`Solution marked as Eligible and routed to Expert Evaluation!`, 'success');
    } else {
      addAudit('Eligibility Screening Rejected', `${targetTitle} marked Not Eligible`, 'Rejected');
      showToast(`Solution marked Not Eligible.`, 'warning');
    }
  };

  // Workflow Action 4: Expert scores and submits evaluation
  const submitEvaluation = (evaluationData: Omit<Evaluation, 'id' | 'date'>) => {
    const id = `eval-${Date.now()}`;
    const date = new Date().toISOString().split('T')[0];
    const newEval: Evaluation = {
      ...evaluationData,
      id,
      date,
    };

    setSolutions((prev) =>
      prev.map((sol) => {
        if (sol.id !== evaluationData.solutionId) return sol;
        const updatedEvals = [...sol.evaluations, newEval];
        const avgScore = Math.round(
          updatedEvals.reduce((acc, curr) => acc + curr.totalScore, 0) / updatedEvals.length
        );
        return {
          ...sol,
          evaluations: updatedEvals,
          evaluationScore: avgScore,
          status: evaluationData.recommendation === 'Recommend Pilot' ? 'Evaluated' : 'Under Review',
        };
      })
    );

    const sol = solutions.find((s) => s.id === evaluationData.solutionId);
    const title = sol ? sol.solutionName : evaluationData.solutionId;

    addAudit(
      `Expert Evaluation Completed (${evaluationData.totalScore}/100)`,
      `${title} - Rec: ${evaluationData.recommendation}`,
      'Evaluated'
    );
    addNotification(
      'Expert Evaluation Completed',
      `Expert scored "${title}" (${evaluationData.totalScore}/100). Rec: ${evaluationData.recommendation}`,
      'government',
      'info'
    );
    showToast(`Evaluation submitted! Total Score: ${evaluationData.totalScore}/100`, 'success');
  };

  // Workflow Action 5: Government approves pilot
  const approvePilot = (solutionId: string): Pilot | null => {
    const sol = solutions.find((s) => s.id === solutionId);
    if (!sol) return null;

    const challenge = challenges.find((c) => c.id === sol.challengeId);
    const pilotId = `pilot-${Date.now()}`;

    const newPilot: Pilot = {
      id: pilotId,
      solutionId: sol.id,
      challengeId: sol.challengeId,
      challengeTitle: sol.challengeTitle,
      solutionName: sol.solutionName,
      startupId: sol.startupId,
      startupName: sol.startupName,
      department: sol.department,
      pilotLocation: challenge?.pilotLocation || 'Pune Municipal Corporation Testbed',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      budget: sol.estimatedCost,
      budgetValue: (sol.fundingRequired || 35) * 100000,
      status: 'In Progress',
      currentMilestoneIndex: 0,
      milestones: sol.milestones.map((m, idx) => ({
        ...m,
        status: idx === 0 ? 'In Progress' : 'Pending',
        paymentStatus: 'Pending',
      })),
      kpis: challenge?.kpis || [
        { id: 'pk-1', name: 'Operational Response Time', target: '< 4 Hours', baseline: '48 Hours', unit: 'Hours', status: 'On Track' },
        { id: 'pk-2', name: 'Resource Loss Reduction', target: '> 18%', baseline: '0%', unit: '%', status: 'On Track' },
      ],
      validationNotes: 'Pilot authorized under Maharashtra State Innovation Society Pilot Sandbox.',
    };

    setPilots((prev) => [newPilot, ...prev]);

    // Update solution status
    setSolutions((prev) =>
      prev.map((s) => (s.id === solutionId ? { ...s, status: 'Pilot Approved', pilotId } : s))
    );

    // Update challenge status
    if (challenge) {
      setChallenges((prev) =>
        prev.map((c) => (c.id === challenge.id ? { ...c, status: 'Active Pilot' } : c))
      );
    }

    addAudit('Pilot Approved & Sanctioned', `${sol.solutionName} in ${newPilot.pilotLocation}`, 'Pilot Active');
    addNotification('Pilot Approved!', `Congratulations! Your pilot for "${sol.solutionName}" has been approved.`, 'startup', 'success');
    showToast(`Pilot approved! Testbed initialized in ${newPilot.pilotLocation}.`, 'success');

    return newPilot;
  };

  // Workflow Action 6: Startup submits milestone deliverables
  const submitMilestoneDeliverable = (pilotId: string, milestoneId: string, notes: string) => {
    setPilots((prev) =>
      prev.map((pilot) => {
        if (pilot.id !== pilotId) return pilot;
        const updatedMilestones = pilot.milestones.map((m) =>
          m.id === milestoneId ? { ...m, status: 'Submitted' as const, submissionNotes: notes } : m
        );
        return { ...pilot, milestones: updatedMilestones };
      })
    );

    addAudit('Milestone Deliverables Submitted', `Pilot ${pilotId} / Milestone ${milestoneId}`, 'Submitted');
    addNotification('Milestone Deliverables Submitted', `Startup submitted deliverables for milestone review.`, 'government', 'info');
    showToast('Milestone deliverables submitted for government review!', 'info');
  };

  // Workflow Action 7: Government approves milestone
  const approveMilestone = (pilotId: string, milestoneId: string) => {
    setPilots((prev) =>
      prev.map((pilot) => {
        if (pilot.id !== pilotId) return pilot;
        const updatedMilestones = pilot.milestones.map((m) => {
          if (m.id === milestoneId) {
            return {
              ...m,
              status: 'Approved' as const,
              paymentStatus: 'Approved' as const,
              approvedDate: new Date().toISOString().split('T')[0],
            };
          }
          return m;
        });

        return { ...pilot, milestones: updatedMilestones };
      })
    );

    addAudit('Milestone Approved', `Pilot ${pilotId} / Milestone ${milestoneId} approved for payment release`, 'Approved');
    addNotification('Milestone Approved', `Milestone approved! Payment release is now pending.`, 'startup', 'success');
    showToast('Milestone approved! Ready for payment tranche release.', 'success');
  };

  // Workflow Action 8: Government/Treasury releases payment
  const releasePayment = (pilotId: string, milestoneId: string) => {
    let releasedAmount = 0;
    setPilots((prev) =>
      prev.map((pilot) => {
        if (pilot.id !== pilotId) return pilot;
        const updatedMilestones = pilot.milestones.map((m) => {
          if (m.id === milestoneId) {
            releasedAmount = m.amount;
            return {
              ...m,
              status: 'Completed' as const,
              paymentStatus: 'Paid' as const,
            };
          }
          return m;
        });

        // Advance to next milestone if available
        const currentIdx = pilot.currentMilestoneIndex;
        const nextIdx = currentIdx + 1 < pilot.milestones.length ? currentIdx + 1 : currentIdx;
        if (nextIdx < updatedMilestones.length && updatedMilestones[nextIdx].status === 'Pending') {
          updatedMilestones[nextIdx].status = 'In Progress';
        }

        return { ...pilot, milestones: updatedMilestones, currentMilestoneIndex: nextIdx };
      })
    );

    addAudit('Payment Disbursed to Startup', `Pilot ${pilotId} - ₹${releasedAmount.toLocaleString('en-IN')}`, 'Paid');
    addNotification(
      'Milestone Payment Disbursed',
      `Tranche of ₹${releasedAmount.toLocaleString('en-IN')} has been credited to startup escrow account.`,
      'startup',
      'success'
    );
    showToast(`Payment of ₹${releasedAmount.toLocaleString('en-IN')} successfully released!`, 'success');
  };

  // Workflow Action 9: Complete pilot validation
  const completeValidation = (
    pilotId: string,
    decision: 'Proceed to Procurement' | 'Request Re-Pilot / Improvement' | 'Close Pilot',
    notes: string
  ) => {
    setPilots((prev) =>
      prev.map((pilot) => {
        if (pilot.id !== pilotId) return pilot;
        return {
          ...pilot,
          status: decision === 'Proceed to Procurement' ? 'Validated' : decision === 'Close Pilot' ? 'Completed' : 'Needs Improvement',
          validationDecision: decision,
          validationNotes: notes,
          validatedDate: new Date().toISOString().split('T')[0],
        };
      })
    );

    const pilot = pilots.find((p) => p.id === pilotId);
    if (pilot) {
      setSolutions((prev) =>
        prev.map((s) =>
          s.id === pilot.solutionId
            ? { ...s, status: decision === 'Proceed to Procurement' ? 'Validated' : 'Needs Improvement' }
            : s
        )
      );
    }

    addAudit(`Pilot Validation Decision: ${decision}`, `Pilot ${pilotId}`, decision);
    addNotification('Validation Decision Issued', `Government decision on pilot: ${decision}`, 'startup', 'info');
    showToast(`Pilot Validation marked: ${decision}`, 'success');
  };

  // Workflow Action 10: Initiate Procurement
  const initiateProcurement = (pilotId: string): ProcurementRecord => {
    const pilot = pilots.find((p) => p.id === pilotId);
    const procId = `proc-${Date.now()}`;
    const newProc: ProcurementRecord = {
      id: procId,
      pilotId,
      challengeTitle: pilot?.challengeTitle || 'Civic Infrastructure Challenge',
      solutionName: pilot?.solutionName || 'Validated Solution',
      startupName: pilot?.startupName || 'Validated Startup',
      department: pilot?.department || 'Urban Development Department',
      pathway: 'Maharashtra State Innovative Procurement Policy (Rule 149 Exemption)',
      stage: 'Procurement Review',
      complianceStatus: 'Passed',
      ipDataClausesStatus: 'Agreed',
      cybersecurityReviewStatus: 'Certified',
      contractStatus: 'Draft',
      contractValue: '₹2.10 Crores',
      deploymentDistricts: ['Pune', 'Nashik', 'Thane'],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setProcurementRecords((prev) => [newProc, ...prev]);

    if (pilot) {
      setSolutions((prev) =>
        prev.map((s) => (s.id === pilot.solutionId ? { ...s, status: 'Procurement Review' } : s))
      );
    }

    addAudit('Procurement Pathway Initiated', `${newProc.solutionName} - ${newProc.pathway}`, 'Under Review');
    addNotification('Procurement Dossier Initiated', `Procurement pathway initiated for ${newProc.solutionName}`, 'government', 'info');
    showToast(`Procurement record created under Maharashtra State Innovative Procurement Policy!`, 'success');

    return newProc;
  };

  const updateProcurementStatus = (
    procId: string,
    stage: ProcurementRecord['stage'],
    contractStatus: ProcurementRecord['contractStatus']
  ) => {
    setProcurementRecords((prev) =>
      prev.map((p) => (p.id === procId ? { ...p, stage, contractStatus, updatedAt: new Date().toISOString().split('T')[0] } : p))
    );
    addAudit(`Procurement Status Updated to ${stage}`, `Record ${procId}`, 'Updated');
    showToast(`Procurement record moved to stage: ${stage}`, 'success');
  };

  // Workflow Action 11: Create Scale-Up Plan
  const createScaleUpPlan = (pilotId: string, districts: string[], budget: string): ScaleUpProject => {
    const pilot = pilots.find((p) => p.id === pilotId);
    const id = `scale-${Date.now()}`;
    const newScale: ScaleUpProject = {
      id,
      solutionName: pilot?.solutionName || 'Civic AI Platform',
      startupName: pilot?.startupName || 'Validated Startup',
      originalDepartment: pilot?.department || 'Urban Development Department',
      originalPilotLocation: pilot?.pilotLocation || 'Pune Municipal Corporation',
      recommendedDistricts: ['Pune', 'Thane', 'Nashik', 'Nagpur', 'Chhatrapati Sambhajinagar'],
      selectedDistricts: districts,
      estimatedBudget: budget || '₹5.50 Crores',
      timeline: '18 Months Phased Rollout',
      pilotKpiSummary: 'Demonstrated superior target KPI attainment in pilot phase.',
      citizenReachTarget: `${districts.length * 1.2} Million Citizens across ${districts.length} Municipal Zones`,
      status: 'Draft Plan',
    };

    setScaleUpProjects((prev) => [newScale, ...prev]);
    addAudit('Scale-Up Plan Formulated', `${newScale.solutionName} across ${districts.join(', ')}`, 'Sanctioned');
    showToast(`Multi-district scale-up plan formulated for ${districts.length} districts!`, 'success');
    return newScale;
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const resetDemoData = () => {
    localStorage.clear();
    setChallenges(INITIAL_CHALLENGES);
    setStartups(INITIAL_STARTUPS);
    setSolutions(INITIAL_SOLUTIONS);
    setPilots(INITIAL_PILOTS);
    setProcurementRecords(INITIAL_PROCUREMENT_RECORDS);
    setScaleUpProjects(INITIAL_SCALEUP_PROJECTS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    showToast('Platform reset to default demonstration data.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setRole,
        activeTab,
        setActiveTab,
        selectedChallengeId,
        setSelectedChallengeId,
        challenges,
        startups,
        solutions,
        pilots,
        procurementRecords,
        scaleUpProjects,
        templates,
        auditLogs,
        notifications,
        toasts,
        showToast,
        removeToast,
        isDemoGuideOpen,
        setIsDemoGuideOpen,
        addChallenge,
        submitSolution,
        approveEligibility,
        submitEvaluation,
        approvePilot,
        submitMilestoneDeliverable,
        approveMilestone,
        releasePayment,
        completeValidation,
        initiateProcurement,
        updateProcurementStatus,
        createScaleUpPlan,
        markNotificationRead,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
