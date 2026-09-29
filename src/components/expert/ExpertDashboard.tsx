import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import {
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sliders,
  Sparkles,
  ArrowRight,
  Shield,
  HelpCircle,
  UserCheck,
  Send,
  ThumbsUp,
  ThumbsDown,
  Building2,
  Calendar,
} from 'lucide-react';
import { Solution } from '../../types';

export const ExpertDashboard: React.FC = () => {
  const { solutions, submitEvaluation, setRole, setActiveTab } = useApp();

  const [selectedSolutionId, setSelectedSolutionId] = useState<string>(
    solutions[0]?.id || ''
  );

  const selectedSolution = solutions.find((s) => s.id === selectedSolutionId) || solutions[0];

  // 6 Weighted Criteria Scores
  const [innovation, setInnovation] = useState<number>(19); // max 20
  const [feasibility, setFeasibility] = useState<number>(19); // max 20
  const [impact, setImpact] = useState<number>(18); // max 20
  const [costEffectiveness, setCostEffectiveness] = useState<number>(14); // max 15
  const [scalability, setScalability] = useState<number>(14); // max 15
  const [securityCompliance, setSecurityCompliance] = useState<number>(9); // max 10

  const [expertComments, setExpertComments] = useState<string>(
    'Highly rigorous hydraulic engineering approach. The integration of cross-correlation acoustic analysis with low-cost edge sensors is technically superior to imported equipment that costs 4x more. Recommend proceeding immediately to pilot in Swargate zone.'
  );

  const totalScore = innovation + feasibility + impact + costEffectiveness + scalability + securityCompliance;

  const handleSubmitEvaluation = (recommendation: 'Recommend Pilot' | 'Request Clarification' | 'Reject') => {
    if (!selectedSolution) return;

    submitEvaluation({
      expertId: 'exp-patil',
      expertName: 'Dr. Suresh Patil',
      expertDesignation: 'Emeritus Professor of Hydraulic Engineering, COEP Tech University',
      solutionId: selectedSolution.id,
      scores: {
        innovation,
        technicalFeasibility: feasibility,
        impact,
        costEffectiveness,
        scalability,
        securityCompliance,
      },
      totalScore,
      comments: expertComments,
      recommendation,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl shadow-inner">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900">
                Independent Expert Evaluation Console
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
                Empaneled Evaluator
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Dr. Suresh Patil • Emeritus Professor, COEP Tech University (Pune)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Assigned Solutions:</span>
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
            {solutions.length} Proposals
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Solution Selector */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Solutions Queue for Technical Review
          </div>

          <div className="space-y-2">
            {solutions.map((sol) => {
              const isSelected = sol.id === selectedSolution?.id;
              const hasEvaluation = sol.evaluations.length > 0;
              return (
                <div
                  key={sol.id}
                  onClick={() => setSelectedSolutionId(sol.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-amber-50/70 border-amber-500 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-bold text-slate-900 line-clamp-1">
                      {sol.solutionName}
                    </span>
                    <Badge status={sol.status} size="sm" />
                  </div>
                  <div className="text-[11px] text-gov-800 font-semibold mt-1">
                    {sol.startupName}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                    {sol.challengeTitle}
                  </div>

                  <div className="flex items-center justify-between text-[11px] mt-3 pt-2 border-t border-slate-100">
                    <span className="text-slate-400">Application: {sol.applicationId}</span>
                    {hasEvaluation ? (
                      <span className="font-bold text-emerald-700">
                        Scored: {sol.evaluations[0].totalScore}/100
                      </span>
                    ) : (
                      <span className="font-semibold text-amber-700">Pending Score</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: 6 Weighted Criteria Scoring Form */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          {selectedSolution ? (
            <>
              {/* Proposal Summary Dossier */}
              <div className="border-b border-slate-100 pb-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Technical Proposal Under Review
                  </span>
                  <Badge status={selectedSolution.status} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedSolution.solutionName}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedSolution.solutionDescription}
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                  <div>
                    <strong>Core Innovation:</strong> {selectedSolution.innovation}
                  </div>
                  <div>
                    <strong>Architecture:</strong> {selectedSolution.architecture}
                  </div>
                  <div>
                    <strong>Proposed Grant Budget:</strong> {selectedSolution.estimatedCost}
                  </div>
                </div>
              </div>

              {/* 6 Criteria Scoring Sliders */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    State Innovation 6-Criterion Scoring Rubric
                  </h4>
                  <div className="text-sm font-black text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    Total Score: {totalScore} / 100
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Criterion 1 */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">1. Innovation (20%)</span>
                      <span className="font-mono font-bold text-gov-800">{innovation} / 20</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={innovation}
                      onChange={(e) => setInnovation(Number(e.target.value))}
                      className="w-full accent-gov-700"
                    />
                    <p className="text-[10px] text-slate-500">Novelty of technology vs existing commercial alternatives</p>
                  </div>

                  {/* Criterion 2 */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">2. Technical Feasibility (20%)</span>
                      <span className="font-mono font-bold text-gov-800">{feasibility} / 20</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={feasibility}
                      onChange={(e) => setFeasibility(Number(e.target.value))}
                      className="w-full accent-gov-700"
                    />
                    <p className="text-[10px] text-slate-500">TRL readiness, engineering soundess, and sensor durability</p>
                  </div>

                  {/* Criterion 3 */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">3. Impact & Citizen Benefit (20%)</span>
                      <span className="font-mono font-bold text-gov-800">{impact} / 20</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={impact}
                      onChange={(e) => setImpact(Number(e.target.value))}
                      className="w-full accent-gov-700"
                    />
                    <p className="text-[10px] text-slate-500">Public service improvement, water conservation, and SLA reduction</p>
                  </div>

                  {/* Criterion 4 */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">4. Cost Effectiveness (15%)</span>
                      <span className="font-mono font-bold text-gov-800">{costEffectiveness} / 15</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="15"
                      value={costEffectiveness}
                      onChange={(e) => setCostEffectiveness(Number(e.target.value))}
                      className="w-full accent-gov-700"
                    />
                    <p className="text-[10px] text-slate-500">Lifecycle cost advantage against traditional exploratory tenders</p>
                  </div>

                  {/* Criterion 5 */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">5. Scalability across State (15%)</span>
                      <span className="font-mono font-bold text-gov-800">{scalability} / 15</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="15"
                      value={scalability}
                      onChange={(e) => setScalability(Number(e.target.value))}
                      className="w-full accent-gov-700"
                    />
                    <p className="text-[10px] text-slate-500">Replicability across Pune, Nashik, Thane, Nagpur municipal setups</p>
                  </div>

                  {/* Criterion 6 */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">6. Security & Compliance (10%)</span>
                      <span className="font-mono font-bold text-gov-800">{securityCompliance} / 10</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={securityCompliance}
                      onChange={(e) => setSecurityCompliance(Number(e.target.value))}
                      className="w-full accent-gov-700"
                    />
                    <p className="text-[10px] text-slate-500">Data residency in India, TLS encryption, and STQC readiness</p>
                  </div>
                </div>
              </div>

              {/* Expert Qualitative Comments */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Expert Evaluator Technical Comments & Justification
                </label>
                <textarea
                  rows={3}
                  value={expertComments}
                  onChange={(e) => setExpertComments(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Actions & Formal Recommendation */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-600">
                  Total Assessment: <strong className="text-slate-900">{totalScore} / 100</strong>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleSubmitEvaluation('Reject')}
                    className="px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors"
                  >
                    Reject Proposal
                  </button>
                  <button
                    onClick={() => handleSubmitEvaluation('Request Clarification')}
                    className="px-3.5 py-2 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors"
                  >
                    Request Clarification
                  </button>
                  <button
                    onClick={() => handleSubmitEvaluation('Recommend Pilot')}
                    className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Recommend for Pilot Approval</span>
                  </button>
                </div>
              </div>

              {/* Quick switch to Government to proceed demo workflow */}
              {selectedSolution.evaluations.length > 0 && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-blue-900">
                    Evaluation recorded ({selectedSolution.evaluations[0].totalScore}/100). Switch to <strong>Government</strong> to authorize pilot & create milestones.
                  </span>
                  <button
                    onClick={() => {
                      setRole('government');
                      setActiveTab('pilots');
                    }}
                    className="px-3 py-1 bg-gov-700 hover:bg-gov-800 text-white font-bold rounded-lg transition-colors shrink-0 ml-2"
                  >
                    Switch to Government
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="p-8 text-center text-slate-400">Select a solution from the queue.</div>
          )}
        </div>
      </div>
    </div>
  );
};
