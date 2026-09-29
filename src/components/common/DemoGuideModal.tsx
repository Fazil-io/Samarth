import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  CheckCircle2,
  ArrowRight,
  Shield,
  Lightbulb,
  FileText,
  UserCheck,
  TrendingUp,
  Award,
  Layers,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { UserRole } from '../../types';

export const DemoGuideModal: React.FC = () => {
  const {
    isDemoGuideOpen,
    setIsDemoGuideOpen,
    setRole,
    setActiveTab,
    resetDemoData,
  } = useApp();

  if (!isDemoGuideOpen) return null;

  const demoSteps = [
    {
      step: 1,
      role: 'government' as UserRole,
      title: '1. Government Publishes Problem Challenge',
      desc: 'Government department crafts a structured challenge with baseline KPIs, budget, and pilot specs.',
      tab: 'challenges',
      actionText: 'Switch to Government & View Challenges',
    },
    {
      step: 2,
      role: 'startup' as UserRole,
      title: '2. Startup Discovers with Smart Match & Submits Proposal',
      desc: 'Startup browses marketplace, reviews 94% explainable Match Score, and submits 5-step proposal.',
      tab: 'discover',
      actionText: 'Switch to Startup & Browse Match',
    },
    {
      step: 3,
      role: 'government' as UserRole,
      title: '3. Government Conducts Automated Eligibility Screening',
      desc: 'Reviews DPIIT registration, documents, TRL 6+ readiness, and moves to Expert Review.',
      tab: 'solutions',
      actionText: 'Switch to Government & Review Solutions',
    },
    {
      step: 4,
      role: 'expert' as UserRole,
      title: '4. Independent Expert Technical Evaluation',
      desc: 'Expert scores proposal across 6 weighted criteria (Innovation 20%, Feasibility 20%, Impact 20%, Cost 15%, Scale 15%, Security 10%) and recommends pilot.',
      tab: 'evaluations',
      actionText: 'Switch to Expert & Score Proposal',
    },
    {
      step: 5,
      role: 'government' as UserRole,
      title: '5. Government Approves Pilot Sandbox & Sets Milestones',
      desc: 'Authorizes controlled field pilot in Pune Municipal Corporation testbed with escrow tranches.',
      tab: 'pilots',
      actionText: 'Switch to Government & Open Pilots',
    },
    {
      step: 6,
      role: 'government' as UserRole,
      title: '6. Milestone Progress & Escrow Payment Release',
      desc: 'Review deliverables for Milestone 1 & 2; release tranche payment to startup account.',
      tab: 'milestones',
      actionText: 'View Milestone & Funding Tracker',
    },
    {
      step: 7,
      role: 'government' as UserRole,
      title: '7. Pilot KPI Analytics & Target Validation',
      desc: 'Compare pre-pilot baseline vs post-pilot actuals (NRW loss reduced from 38% to 18.5%, response 3.2 hrs). Complete formal validation decision.',
      tab: 'validation',
      actionText: 'Open Validation & KPI Analytics',
    },
    {
      step: 8,
      role: 'government' as UserRole,
      title: '8. Procurement Pathway & Multi-District Scale-Up',
      desc: 'Initiate Rule 149 GFR Innovation Exemption pathway and generate multi-district scale-up plan for Pune, Thane, Nashik, and Nagpur.',
      tab: 'procurement',
      actionText: 'View Procurement & Scale-Up',
    },
    {
      step: 9,
      role: 'admin' as UserRole,
      title: '9. Transparent Audit Trail & Administrator Governance',
      desc: 'Review tamper-evident audit logs tracking every actor, timestamp, and status change.',
      tab: 'audit',
      actionText: 'Switch to Admin & View Audit Log',
    },
  ];

  const handleJump = (role: UserRole, tab: string) => {
    setRole(role);
    setActiveTab(tab);
    setIsDemoGuideOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-gov-800 to-gov-950 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-teal-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Samarth Interactive Demonstration Guide</h2>
              <p className="text-xs text-blue-200">
                End-to-End Workflow: Challenge → Startup Discovery → Evaluation → Pilot → Validation → Procurement → Scale-Up
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDemoGuideOpen(false)}
            className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 leading-relaxed flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-blue-950">Hackathon Presentation Quick Start:</span>
              <p className="mt-1">
                This platform is state-synchronized. Any challenge you create, solution you submit, evaluation you score, or pilot payment you approve persists in real-time across role switches. Use the quick buttons below to jump to any stage of the journey.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {demoSteps.map((s) => (
              <div
                key={s.step}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-400 bg-white hover:bg-slate-50/80 transition-all gap-4 shadow-sm"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-7 h-7 rounded-full bg-gov-100 text-gov-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {s.step}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-slate-900">{s.title}</h4>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 capitalize border border-slate-200">
                        {s.role} Role
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleJump(s.role, s.tab)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-gov-700 hover:bg-gov-800 rounded-lg shadow-sm transition-colors shrink-0"
                >
                  <span>{s.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <button
              onClick={resetDemoData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo to Clean State</span>
            </button>
            <span className="text-slate-400">|</span>
            <span>Demo credentials: government@demo.com, startup@demo.com, expert@demo.com, admin@demo.com</span>
          </div>
          <button
            onClick={() => setIsDemoGuideOpen(false)}
            className="px-4 py-2 font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
