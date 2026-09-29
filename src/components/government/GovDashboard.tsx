import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { CreateChallengeModal } from './CreateChallengeModal';
import {
  Target,
  FileCheck2,
  Activity,
  GraduationCap,
  CreditCard,
  ShieldCheck,
  Plus,
  ArrowRight,
  TrendingUp,
  Building2,
  Calendar,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const GovDashboard: React.FC = () => {
  const {
    challenges,
    solutions,
    pilots,
    setActiveTab,
    approveMilestone,
    releasePayment,
    setSelectedChallengeId,
  } = useApp();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Computed metrics
  const activeChallengesCount = challenges.filter((c) => c.status === 'Published' || c.status === 'Active Pilot').length;
  const solutionsReceivedCount = solutions.length;
  const ongoingPilotsCount = pilots.filter((p) => p.status === 'In Progress' || p.status === 'Approved').length;
  const pendingEvaluationsCount = solutions.filter((s) => s.status === 'Under Expert Review' || s.status === 'Screening').length;
  const milestonesDueCount = pilots.flatMap((p) => p.milestones).filter((m) => m.paymentStatus === 'Approved' || m.status === 'In Progress').length;
  const validatedSolutionsCount = pilots.filter((p) => p.status === 'Validated' || p.validationDecision === 'Proceed to Procurement').length;

  return (
    <div className="space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gov-600 animate-pulse" />
            <span className="text-xs font-bold text-gov-800 uppercase tracking-wider">
              Maharashtra State Innovation Society
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Government Department Dashboard
          </h1>
          <p className="text-xs text-slate-500">
            Water Resources & Urban Development Directorate • Monitoring State Sandboxes
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gov-700 hover:bg-gov-800 text-white text-xs font-bold shadow-md shadow-gov-700/20 transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Challenge</span>
          </button>
        </div>
      </div>

      {/* 6 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {[
          {
            title: 'Active Challenges',
            count: activeChallengesCount,
            subtitle: `${challenges.length} Total Registered`,
            icon: <Target className="w-4 h-4 text-blue-600" />,
            border: 'border-blue-200 bg-blue-50/30',
            textColor: 'text-blue-900',
            tab: 'challenges',
          },
          {
            title: 'Solutions Received',
            count: solutionsReceivedCount,
            subtitle: 'Startups Applied',
            icon: <FileCheck2 className="w-4 h-4 text-purple-600" />,
            border: 'border-purple-200 bg-purple-50/30',
            textColor: 'text-purple-900',
            tab: 'solutions',
          },
          {
            title: 'Ongoing Pilots',
            count: ongoingPilotsCount,
            subtitle: 'Field Sandboxes Active',
            icon: <Activity className="w-4 h-4 text-teal-600" />,
            border: 'border-teal-200 bg-teal-50/30',
            textColor: 'text-teal-900',
            tab: 'pilots',
          },
          {
            title: 'Pending Evaluations',
            count: pendingEvaluationsCount,
            subtitle: 'Expert Panels Assigned',
            icon: <GraduationCap className="w-4 h-4 text-amber-600" />,
            border: 'border-amber-200 bg-amber-50/30',
            textColor: 'text-amber-900',
            tab: 'evaluations',
          },
          {
            title: 'Milestones Due',
            count: milestonesDueCount,
            subtitle: 'Escrow Tranches',
            icon: <CreditCard className="w-4 h-4 text-sky-600" />,
            border: 'border-sky-200 bg-sky-50/30',
            textColor: 'text-sky-900',
            tab: 'milestones',
          },
          {
            title: 'Validated Solutions',
            count: validatedSolutionsCount,
            subtitle: 'Ready for Procurement',
            icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
            border: 'border-emerald-200 bg-emerald-50/30',
            textColor: 'text-emerald-900',
            tab: 'validation',
          },
        ].map((card, idx) => (
          <div
            key={idx}
            onClick={() => setActiveTab(card.tab)}
            className={`p-4 rounded-xl border ${card.border} cursor-pointer hover:shadow-md transition-all gov-card flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between">
              <span className="p-1.5 rounded-lg bg-white shadow-xs border border-slate-200">
                {card.icon}
              </span>
              <span className={`text-2xl font-black ${card.textColor}`}>{card.count}</span>
            </div>
            <div className="mt-3">
              <div className="text-xs font-bold text-slate-800 leading-tight">{card.title}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{card.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytical Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Challenges by Status */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Challenges by Status</h3>
            <span className="text-xs text-slate-400">Total: {challenges.length}</span>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Published / Open', count: 3, percentage: 60, color: 'bg-emerald-500' },
              { label: 'Active Field Pilot', count: 2, percentage: 40, color: 'bg-blue-600' },
              { label: 'Under Review / Evaluation', count: 1, percentage: 20, color: 'bg-amber-500' },
              { label: 'Completed / Validated', count: 1, percentage: 20, color: 'bg-teal-500' },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-medium text-slate-700">
                  <span>{item.label}</span>
                  <span className="font-bold">{item.count} challenges</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 flex items-center justify-between">
            <span>Average time to pilot authorization:</span>
            <span className="font-bold text-gov-800">28 Days (Industry avg: 180 Days)</span>
          </div>
        </div>

        {/* Chart 2: Solutions by Stage Funnel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Innovation Funnel (Solution Stages)</h3>
            <span className="text-xs text-slate-400">Total: {solutions.length} Applications</span>
          </div>

          <div className="space-y-2.5">
            {[
              { stage: '1. Applications Received', count: solutions.length, color: 'bg-slate-800' },
              { stage: '2. Statutory & Eligibility Passed', count: 3, color: 'bg-blue-700' },
              { stage: '3. Expert Rubric Recommended', count: 2, color: 'bg-purple-700' },
              { stage: '4. Active Pilot & Milestone Escrow', count: 2, color: 'bg-teal-600' },
              { stage: '5. Validated for Scale-Up / Procurement', count: 1, color: 'bg-emerald-600' },
            ].map((f, i) => (
              <div key={i} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${f.color}`} />
                  <span className="font-semibold text-slate-800">{f.stage}</span>
                </div>
                <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {f.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pilot Performance & KPI Highlights */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Active Pilot Performance & KPI Benchmarking
            </h3>
            <p className="text-xs text-slate-500">
              Live telemetry and third-party audit metrics from active sandbox testbeds
            </p>
          </div>
          <button
            onClick={() => setActiveTab('pilots')}
            className="text-xs font-bold text-gov-700 hover:text-gov-800 flex items-center gap-1"
          >
            <span>Open Pilot Console</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pilots[0]?.kpis.map((kpi) => (
            <div key={kpi.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 truncate pr-2">{kpi.name}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {kpi.status}
                </span>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Pre-Pilot Baseline</div>
                  <div className="text-xs font-medium text-slate-600">{kpi.baseline}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-gov-700 uppercase font-bold">Actual Achieved</div>
                  <div className="text-sm font-black text-slate-900">{kpi.actual || kpi.target}</div>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500 w-[92%]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Tables: Applications & Pilots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications requiring scrutiny */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Solutions Pending Eligibility Screening</h3>
            <button
              onClick={() => setActiveTab('solutions')}
              className="text-xs text-gov-700 hover:underline font-semibold"
            >
              View All ({solutions.length})
            </button>
          </div>

          <div className="space-y-3">
            {solutions.slice(0, 3).map((sol) => (
              <div
                key={sol.id}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-gov-400 bg-white hover:bg-slate-50 transition-all flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900">{sol.solutionName}</div>
                  <div className="text-[11px] text-gov-800 font-medium">{sol.startupName}</div>
                  <div className="text-[10px] text-slate-500">{sol.challengeTitle}</div>
                </div>
                <div className="text-right space-y-1">
                  <Badge status={sol.status} size="sm" />
                  <div>
                    <button
                      onClick={() => setActiveTab('solutions')}
                      className="text-xs font-semibold text-gov-700 hover:text-gov-800 flex items-center gap-0.5 justify-end"
                    >
                      <span>Review</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Pilots & Pending Milestones */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Active Field Pilots & Milestones</h3>
            <button
              onClick={() => setActiveTab('milestones')}
              className="text-xs text-gov-700 hover:underline font-semibold"
            >
              Milestone Tracker
            </button>
          </div>

          <div className="space-y-3">
            {pilots.map((pilot) => (
              <div
                key={pilot.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-xs font-bold text-slate-900">{pilot.solutionName}</div>
                    <div className="text-[11px] text-slate-500">{pilot.pilotLocation}</div>
                  </div>
                  <Badge status={pilot.status} size="sm" />
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                  <span className="text-slate-600 font-medium">Budget: {pilot.budget}</span>
                  <button
                    onClick={() => setActiveTab('milestones')}
                    className="text-xs font-bold text-gov-700 hover:underline flex items-center gap-1"
                  >
                    <span>Inspect Milestones</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Creating Challenge */}
      <CreateChallengeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};
