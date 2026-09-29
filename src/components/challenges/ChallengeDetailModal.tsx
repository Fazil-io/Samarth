import React from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import {
  X,
  Building2,
  MapPin,
  Calendar,
  IndianRupee,
  Shield,
  Activity,
  CheckCircle2,
  FileText,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Challenge } from '../../types';

interface ChallengeDetailModalProps {
  challengeId: string | null;
  onClose: () => void;
  onApply: (challengeId: string) => void;
}

export const ChallengeDetailModal: React.FC<ChallengeDetailModalProps> = ({
  challengeId,
  onClose,
  onApply,
}) => {
  const { challenges } = useApp();
  const challenge = challenges.find((c) => c.id === challengeId);

  if (!challenge) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-gov-900 to-gov-950 text-white px-6 py-6 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-teal-300 border border-white/10 uppercase">
                {challenge.problemCategory}
              </span>
              <Badge status={challenge.status} />
              <span className="text-xs text-slate-300 font-mono">ID: {challenge.id}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {challenge.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-sky-300" />
                {challenge.department}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-300" />
                {challenge.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-300" />
                Deadline: {challenge.deadline}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Quick Metric Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Pilot Grant Budget</div>
              <div className="text-sm font-black text-gov-800 mt-0.5">{challenge.budget}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Pilot Duration</div>
              <div className="text-sm font-black text-slate-800 mt-0.5">{challenge.pilotDuration}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Target District</div>
              <div className="text-sm font-black text-slate-800 mt-0.5">{challenge.district}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Submissions</div>
              <div className="text-sm font-black text-purple-700 mt-0.5">
                {challenge.solutionsCount} Proposals
              </div>
            </div>
          </div>

          {/* Problem Statement Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Operational Problem Statement
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-200">
                {challenge.problemDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Current Situation & Inefficiency
                </h4>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                  {challenge.currentSituation}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Expected Outcome & SLA
                </h4>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                  {challenge.expectedOutcome}
                </p>
              </div>
            </div>
          </div>

          {/* Verifiable Target KPIs */}
          <div>
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Measurable Key Performance Indicators (KPIs)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {challenge.kpis.map((kpi) => (
                <div key={kpi.id} className="p-3.5 bg-blue-50/40 rounded-xl border border-blue-200 space-y-1">
                  <div className="text-xs font-bold text-slate-900">{kpi.name}</div>
                  <div className="text-[11px] text-slate-500">Baseline: {kpi.baseline}</div>
                  <div className="text-xs font-bold text-gov-800">Target: {kpi.target}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical & Hardware Requirements */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Technical & Architecture Requirements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-800">Functional Specifications</span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {challenge.functionalReqs.map((req, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-gov-600 font-bold">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-800">Technical Specifications</span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {challenge.technicalReqs.map((req, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-gov-600 font-bold">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Milestones Structure */}
          <div>
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Milestone Escrow Tranche Schedule
            </h3>
            <div className="space-y-2">
              {challenge.milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900">{m.title}</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">{m.description}</div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <span className="font-bold text-slate-900">
                      ₹{(m.amount / 100000).toFixed(1)} Lakhs
                    </span>
                    <div className="text-[10px] text-slate-400">Escrow Tranche {idx + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal IP & Procurement Pathway */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <Shield className="w-4 h-4 text-gov-700" />
              <span>Legal IP & Procurement Pathway Terms</span>
            </div>
            <p className="text-slate-600 leading-relaxed">{challenge.legalIpClauses}</p>
            <div className="pt-1 text-[11px] text-gov-800 font-semibold">
              {challenge.procurementPathway}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onApply(challenge.id);
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-gov-700 hover:bg-gov-800 rounded-xl shadow-md transition-colors"
          >
            <span>Submit Solution for this Challenge</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
