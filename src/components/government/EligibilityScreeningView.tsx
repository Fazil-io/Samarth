import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Shield,
  FileText,
  Building2,
  Calendar,
  ExternalLink,
  ChevronRight,
  Info,
} from 'lucide-react';
import { Solution } from '../../types';

interface EligibilityScreeningViewProps {
  onSelectSolution?: (solution: Solution) => void;
}

export const EligibilityScreeningView: React.FC<EligibilityScreeningViewProps> = () => {
  const { solutions, approveEligibility, setRole, setActiveTab } = useApp();
  const [selectedSolutionId, setSelectedSolutionId] = useState<string>(
    solutions[0]?.id || ''
  );
  const [remarks, setRemarks] = useState('');

  const selectedSolution = solutions.find((s) => s.id === selectedSolutionId) || solutions[0];

  if (!selectedSolution) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <FileCheck2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
        <h3 className="text-sm font-bold text-slate-700">No Solutions Submitted Yet</h3>
        <p className="text-xs text-slate-500 mt-1">Switch to Startup role to submit a solution.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-gov-700">
            Stage 3: Automated & Regulatory Screening
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">
            Eligibility & Statutory Compliance Screening
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Verify DPIIT recognition, TRL level, Maharashtra registration, and security covenants before assigning to expert panels.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Submissions Queue:</span>
          <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
            {solutions.length} Applications
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Solution Selector List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Submitted Solutions
          </div>
          <div className="space-y-2">
            {solutions.map((sol) => {
              const isSelected = sol.id === selectedSolution.id;
              return (
                <div
                  key={sol.id}
                  onClick={() => setSelectedSolutionId(sol.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-blue-50/70 border-gov-500 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-bold text-gov-800 line-clamp-1">
                      {sol.startupName}
                    </span>
                    <Badge status={sol.status} size="sm" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1 line-clamp-1">
                    {sol.solutionName}
                  </h4>
                  <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    {sol.challengeTitle}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
                    <span>{sol.applicationId}</span>
                    <span>{sol.submissionDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Eligibility Checklist & Actions */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          {/* Solution Info Header */}
          <div className="border-b border-slate-100 pb-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Application Dossier
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Current Status:</span>
                <Badge status={selectedSolution.status} />
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {selectedSolution.solutionName}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <span className="font-semibold text-gov-800">{selectedSolution.startupName}</span>
              <span>•</span>
              <span>Challenge: {selectedSolution.challengeTitle}</span>
              <span>•</span>
              <span>Budget: {selectedSolution.estimatedCost}</span>
            </div>
          </div>

          {/* 6 Automated Eligibility Checks */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Automated Statutory & Technical Criteria Checklist
              </h4>
              <span className="text-xs font-semibold text-emerald-600">
                ✓ 6 of 6 Verified Checks
              </span>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {selectedSolution.eligibilityChecklist.map((check) => (
                <div key={check.id} className="p-3.5 flex items-start gap-3 bg-white hover:bg-slate-50/60 transition-colors">
                  {check.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">{check.label}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          check.passed
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {check.passed ? 'PASSED' : 'FLAGGED'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{check.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attached Documents */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Submitted Verification Documents
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedSolution.documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <FileText className="w-4 h-4 text-gov-600 shrink-0" />
                    <span className="font-medium text-slate-700 truncate">{doc.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{doc.size}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Official Remarks / Screening Decision Box */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Department Scrutiny Remarks
            </label>
            <textarea
              rows={2}
              placeholder="Enter compliance evaluation notes or rationale..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full p-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-gov-500"
            />

            {/* Decision Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => approveEligibility(selectedSolution.id, false, remarks)}
                  className="px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors"
                >
                  Mark Not Eligible
                </button>
                <button
                  onClick={() =>
                    approveEligibility(
                      selectedSolution.id,
                      true,
                      remarks || 'Conditionally eligible pending additional STQC certificate.'
                    )
                  }
                  className="px-3.5 py-2 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors"
                >
                  Conditionally Eligible
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => approveEligibility(selectedSolution.id, true, remarks)}
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve & Move to Expert Evaluation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick shortcut to Expert tab for demo journey */}
          {selectedSolution.status === 'Under Expert Review' && (
            <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-teal-900">
                <Shield className="w-4 h-4 text-teal-600 shrink-0" />
                <span>
                  Solution is now in <strong>Expert Review</strong>. Switch to Expert Evaluator to score this proposal.
                </span>
              </div>
              <button
                onClick={() => {
                  setRole('expert');
                  setActiveTab('evaluations');
                }}
                className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-colors shrink-0 ml-2"
              >
                Switch to Expert
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
