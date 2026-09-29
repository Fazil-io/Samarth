import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import {
  Activity,
  CheckCircle2,
  Clock,
  ArrowRight,
  Building2,
  MapPin,
  Calendar,
  IndianRupee,
  Shield,
  CreditCard,
  FileCheck2,
  TrendingUp,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Pilot, Solution } from '../../types';

export const PilotManagementView: React.FC = () => {
  const { pilots, solutions, approvePilot, setActiveTab } = useApp();
  const [selectedPilotId, setSelectedPilotId] = useState<string>(pilots[0]?.id || '');

  // Eligible solutions that can be approved for pilot
  const unapprovedSolutions = solutions.filter(
    (s) => s.status === 'Evaluated' || s.status === 'Shortlisted' || (s.evaluations.length > 0 && !s.pilotId)
  );

  const activePilot = pilots.find((p) => p.id === selectedPilotId) || pilots[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-gov-700">
            Stage 4: Controlled Municipal Sandbox
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 mt-1">
            Pilot Management & Milestone Execution
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-world testing, escrow milestone tranches, and continuous KPI telemetry before state procurement.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('milestones')}
            className="px-4 py-2 bg-gov-700 hover:bg-gov-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <CreditCard className="w-4 h-4" />
            <span>Milestones & Escrow Tranches</span>
          </button>
          <button
            onClick={() => setActiveTab('validation')}
            className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            KPI Validation
          </button>
        </div>
      </div>

      {/* Solutions Ready for Pilot Approval (if any) */}
      {unapprovedSolutions.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-700" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-900">
                Action Required: Evaluated Solution Ready for Pilot Sanction
              </h3>
            </div>
            <span className="text-xs text-purple-700 font-semibold">
              {unapprovedSolutions.length} Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {unapprovedSolutions.map((sol) => (
              <div
                key={sol.id}
                className="bg-white p-4 rounded-xl border border-purple-200 flex items-center justify-between gap-4 shadow-xs"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{sol.solutionName}</h4>
                  <div className="text-[11px] text-gov-800 font-medium">{sol.startupName}</div>
                  <div className="text-[10px] text-slate-500">
                    Expert Score: {sol.evaluations[0]?.totalScore || 93}/100 • Grant: {sol.estimatedCost}
                  </div>
                </div>
                <button
                  onClick={() => approvePilot(sol.id)}
                  className="px-3.5 py-2 bg-gov-700 hover:bg-gov-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors shrink-0"
                >
                  Approve Pilot Sandbox
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Pilots Selection and Timeline */}
      {activePilot ? (
        <div className="space-y-6">
          {/* Pilot Detail Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge status={activePilot.status} />
                  <span className="text-xs font-mono text-slate-400">ID: {activePilot.id}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900">{activePilot.solutionName}</h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                  <span className="font-semibold text-gov-800">{activePilot.startupName}</span>
                  <span>•</span>
                  <span>{activePilot.department}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {activePilot.pilotLocation}
                  </span>
                </div>
              </div>

              {/* Budget and Period */}
              <div className="flex items-center gap-4 text-left sm:text-right">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Pilot Budget</div>
                  <div className="text-base font-black text-gov-800">{activePilot.budget}</div>
                </div>
                <div className="hidden sm:block border-l border-slate-200 pl-4">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Duration</div>
                  <div className="text-xs font-bold text-slate-800">
                    {activePilot.startDate} to {activePilot.endDate}
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Pilot Execution Timeline */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Pilot Execution & Milestone Lifecycle Timeline
                </h3>
                <span className="text-xs font-semibold text-gov-700">
                  Current Stage: Milestone {activePilot.currentMilestoneIndex + 1}
                </span>
              </div>

              <div className="relative pt-4 pb-2">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 relative z-10">
                  {[
                    {
                      label: 'Pilot Start & MoU',
                      status: 'Completed',
                      desc: 'MoU signed & site handed over',
                    },
                    {
                      label: 'Milestone 1',
                      status: activePilot.milestones[0]?.status || 'Completed',
                      desc: 'Deploy 80 sensors (₹8L Paid)',
                    },
                    {
                      label: 'Milestone 2',
                      status: activePilot.milestones[1]?.status || 'In Progress',
                      desc: 'Field pilot & SLA (₹12L)',
                    },
                    {
                      label: 'Milestone 3',
                      status: activePilot.milestones[2]?.status || 'Pending',
                      desc: 'Third-party water audit (₹15L)',
                    },
                    {
                      label: 'Final Validation',
                      status: activePilot.status === 'Validated' ? 'Completed' : 'Pending',
                      desc: 'Proceed to Procurement',
                    },
                  ].map((step, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border text-center space-y-1.5 transition-all ${
                        step.status === 'Completed'
                          ? 'bg-emerald-50/70 border-emerald-300'
                          : step.status === 'In Progress'
                          ? 'bg-blue-50 border-gov-500 shadow-sm'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        {step.status === 'Completed' ? (
                          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                            ✓
                          </div>
                        ) : step.status === 'In Progress' ? (
                          <div className="w-6 h-6 rounded-full bg-gov-700 text-white flex items-center justify-center text-xs font-bold animate-pulse">
                            {idx + 1}
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </div>
                        )}
                      </div>
                      <div className="text-xs font-bold text-slate-900">{step.label}</div>
                      <div className="text-[10px] text-slate-500 leading-tight">{step.desc}</div>
                      <div className="pt-1">
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            step.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : step.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {step.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions to Milestone Tracker & Analytics */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                Pilot authorized under Government of Maharashtra MSInS Innovation Sandbox.
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('milestones')}
                  className="px-4 py-2 bg-gov-700 hover:bg-gov-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <span>Manage Milestone Deliverables</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
          <Activity className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-500">No active pilots yet.</p>
        </div>
      )}
    </div>
  );
};
