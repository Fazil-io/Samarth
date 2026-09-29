import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileText,
  IndianRupee,
  RefreshCw,
  Send,
  Sparkles,
} from 'lucide-react';
import { Milestone, Pilot } from '../../types';

export const MilestoneTrackingView: React.FC = () => {
  const {
    pilots,
    approveMilestone,
    releasePayment,
    submitMilestoneDeliverable,
    currentRole,
    setRole,
    setActiveTab,
  } = useApp();

  const [selectedPilotId, setSelectedPilotId] = useState<string>(pilots[0]?.id || '');
  const [submissionNotes, setSubmissionNotes] = useState<string>('');
  const [activeMilestoneId, setActiveMilestoneId] = useState<string | null>(null);

  const activePilot = pilots.find((p) => p.id === selectedPilotId) || pilots[0];

  if (!activePilot) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <p className="text-xs text-slate-500">No active pilot records found.</p>
      </div>
    );
  }

  // Calculate totals
  const totalBudget = activePilot.budgetValue || 3500000;
  const disbursedAmount = activePilot.milestones
    .filter((m) => m.paymentStatus === 'Paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingAmount = activePilot.milestones
    .filter((m) => m.paymentStatus === 'Processing' || m.paymentStatus === 'Approved')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const handleDeliverableSubmit = (mId: string) => {
    submitMilestoneDeliverable(
      activePilot.id,
      mId,
      submissionNotes || 'Field test log and deployment signoff documents uploaded.'
    );
    setActiveMilestoneId(null);
    setSubmissionNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-gov-700">
            Tranche-Based Innovation Escrow
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 mt-1">
            Milestone & Funding Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent milestone approvals with immediate escrow tranche releases. Protecting public funds while guaranteeing startup cashflow.
          </p>
        </div>

        {/* Pilot Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500">Pilot:</label>
          <select
            value={activePilot.id}
            onChange={(e) => setSelectedPilotId(e.target.value)}
            className="p-2 text-xs rounded-xl border border-slate-300 focus:outline-none font-semibold text-slate-800"
          >
            {pilots.map((p) => (
              <option key={p.id} value={p.id}>
                {p.solutionName} ({p.department})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Escrow Financial Health Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Total Sanctioned Grant
          </div>
          <div className="text-2xl font-black text-slate-900">
            ₹{(totalBudget / 100000).toFixed(1)} Lakhs
          </div>
          <div className="text-[11px] text-slate-500">Allocated in State Innovation Escrow</div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 shadow-xs space-y-1">
          <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
            Disbursed to Startup
          </div>
          <div className="text-2xl font-black text-emerald-800">
            ₹{(disbursedAmount / 100000).toFixed(1)} Lakhs
          </div>
          <div className="text-[11px] text-emerald-700">Released against verified deliverables</div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 shadow-xs space-y-1">
          <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
            Approved / In Processing
          </div>
          <div className="text-2xl font-black text-amber-800">
            ₹{(pendingAmount / 100000).toFixed(1)} Lakhs
          </div>
          <div className="text-[11px] text-amber-700">Pending final treasury authorization</div>
        </div>
      </div>

      {/* Milestones Cards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Milestones Breakdown & Deliverable Inspection
          </h3>
          <span className="text-xs text-slate-500">
            {activePilot.milestones.length} Contracted Milestones
          </span>
        </div>

        <div className="space-y-4">
          {activePilot.milestones.map((milestone, idx) => {
            const isCompleted = milestone.status === 'Completed';
            const isApproved = milestone.paymentStatus === 'Approved';
            const isProcessing = milestone.paymentStatus === 'Processing';
            const isPaid = milestone.paymentStatus === 'Paid';

            return (
              <div
                key={milestone.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 hover:shadow-md transition-all"
              >
                {/* Milestone Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gov-100 text-gov-800 font-extrabold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{milestone.title}</h4>
                      <Badge status={milestone.status} size="sm" />
                    </div>
                    <p className="text-xs text-slate-600 pl-8">{milestone.description}</p>
                  </div>

                  <div className="text-left sm:text-right shrink-0 pl-8 sm:pl-0">
                    <div className="text-base font-black text-slate-900">
                      ₹{(milestone.amount / 100000).toFixed(1)} Lakhs
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 sm:justify-end">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">
                        Payment:
                      </span>
                      <Badge status={milestone.paymentStatus} size="sm" />
                    </div>
                  </div>
                </div>

                {/* Deliverables List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Mandatory Deliverables
                    </span>
                    <ul className="space-y-1 text-slate-700">
                      {milestone.deliverables.map((d, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Inspection & Submission Notes
                    </span>
                    <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      {milestone.submissionNotes || (isPaid ? 'Hardware signoff and telemetry confirmed.' : 'Pending submission.')}
                    </p>
                  </div>
                </div>

                {/* Milestone Interactive Action Controls */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400">
                    {milestone.approvedDate
                      ? `Approved on ${milestone.approvedDate}`
                      : 'Requires departmental verification'}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Startup action: Submit deliverable */}
                    {milestone.status !== 'Completed' && milestone.status !== 'Submitted' && (
                      <button
                        onClick={() => setActiveMilestoneId(milestone.id)}
                        className="px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Submit Deliverables
                      </button>
                    )}

                    {/* Government action: Request Revision */}
                    {milestone.status === 'Submitted' && (
                      <button
                        onClick={() => alert('Revision requested with feedback notes.')}
                        className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Request Revision
                      </button>
                    )}

                    {/* Government action: Approve Milestone */}
                    {milestone.status !== 'Completed' && (
                      <button
                        onClick={() => approveMilestone(activePilot.id, milestone.id)}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                      >
                        Approve Milestone
                      </button>
                    )}

                    {/* Government action: Release Payment */}
                    {milestone.paymentStatus !== 'Paid' && (
                      <button
                        onClick={() => releasePayment(activePilot.id, milestone.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Release Payment Tranche</span>
                      </button>
                    )}

                    {isPaid && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Payment Settled</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Deliverable Submission Box */}
                {activeMilestoneId === milestone.id && (
                  <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl space-y-2 mt-2">
                    <label className="block text-xs font-bold text-purple-900 uppercase">
                      Submit Deliverable Sign-Off Documentation
                    </label>
                    <textarea
                      rows={2}
                      value={submissionNotes}
                      onChange={(e) => setSubmissionNotes(e.target.value)}
                      placeholder="Enter deployment report URL, telemetry log details, or engineer signoff certificate ID..."
                      className="w-full p-2.5 text-xs rounded-lg border border-purple-300 focus:outline-none"
                    />
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        onClick={() => setActiveMilestoneId(null)}
                        className="px-3 py-1 text-xs text-slate-600 hover:bg-slate-200 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDeliverableSubmit(milestone.id)}
                        className="px-4 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded text-xs font-bold"
                      >
                        Submit to Department
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Step Banner for Demo Journey */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-slate-700">
          Once milestones are delivered, proceed to <strong>KPI Analytics & Validation</strong> to measure outcomes against baseline targets.
        </div>
        <button
          onClick={() => setActiveTab('validation')}
          className="px-4 py-2 bg-gov-700 hover:bg-gov-800 text-white rounded-xl text-xs font-bold shrink-0 shadow-sm transition-colors flex items-center gap-1.5"
        >
          <span>Open Validation Module</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
