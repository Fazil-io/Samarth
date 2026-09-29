import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building2,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  X,
} from 'lucide-react';
import { Pilot } from '../../types';

export const ValidationView: React.FC = () => {
  const { pilots, completeValidation, initiateProcurement, setActiveTab } = useApp();
  const [selectedPilotId, setSelectedPilotId] = useState<string>(pilots[0]?.id || '');
  const [decisionNotes, setDecisionNotes] = useState<string>(
    'All three pilot performance metrics have exceeded the contractual target benchmarks. The municipal water division reports 0 false dry excavations. Solution is officially validated for procurement.'
  );

  // Confirmation Modal State
  const [pendingDecision, setPendingDecision] = useState<
    'Proceed to Procurement' | 'Request Re-Pilot / Improvement' | 'Close Pilot' | null
  >(null);

  const activePilot = pilots.find((p) => p.id === selectedPilotId) || pilots[0];

  if (!activePilot) {
    return <div className="p-8 text-center text-slate-500">No pilot records available.</div>;
  }

  const handleConfirmDecision = () => {
    if (!pendingDecision) return;
    completeValidation(activePilot.id, pendingDecision, decisionNotes);

    if (pendingDecision === 'Proceed to Procurement') {
      initiateProcurement(activePilot.id);
    }

    setPendingDecision(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-gov-700">
            Stage 5: Official Outcome Certification
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 mt-1">
            Pilot Validation & Decision Panel
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Formal departmental validation based on verified evidence, third-party audits, and expert committee sign-off.
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

      {/* Current Validation Status Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Badge status={activePilot.status} />
              {activePilot.validationDecision && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  Decision: {activePilot.validationDecision}
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">{activePilot.solutionName}</h2>
            <div className="text-xs text-slate-500 mt-0.5">
              Deployed by {activePilot.startupName} in {activePilot.pilotLocation}
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Testbed District</div>
            <div className="text-xs font-bold text-slate-800">Pune Municipal Corporation</div>
          </div>
        </div>

        {/* Section 1: Pilot Evidence */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>1. Field Pilot Physical Evidence</span>
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            {activePilot.validationEvidence ||
              '14 verified underground pipeline bursts identified with zero dry exploratory digs. Municipal junior engineers logged 100% notification receipt on mobile terminals within 15 minutes of anomaly onset.'}
          </p>
        </div>

        {/* Section 2: KPI Results Comparison */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-gov-600" />
            <span>2. Validated KPI Attainment</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {activePilot.kpis.map((kpi) => (
              <div key={kpi.id} className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-1">
                <div className="text-xs font-bold text-slate-900 truncate">{kpi.name}</div>
                <div className="text-[11px] text-slate-500">Baseline: {kpi.baseline}</div>
                <div className="text-xs font-extrabold text-emerald-800">
                  Target: {kpi.target} • Actual: {kpi.actual || kpi.target}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3 & 4: Expert Validation & Government Review */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
            <span className="font-bold text-slate-800 block">3. Expert Committee Endorsement</span>
            <p className="text-slate-600 leading-relaxed">
              {activePilot.expertValidationNotes ||
                'COEP Technical Review Panel has endorsed the acoustic cross-correlation method as scientifically sound and non-disruptive to public traffic.'}
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
            <span className="font-bold text-slate-800 block">4. Municipal Department Review</span>
            <p className="text-slate-600 leading-relaxed">
              {activePilot.governmentReviewNotes ||
                'Chief Engineer (Water Supply), Pune Municipal Corporation has reviewed field test records and expressed high satisfaction with fuel and labor savings.'}
            </p>
          </div>
        </div>

        {/* Section 5: Documents */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            5. Attached Validation Dossiers
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              'ThirdParty_Water_Audit_Report.pdf',
              'Municipal_Engineer_Signoff_Certificate.pdf',
              'COEP_Technical_Validation.pdf',
              'Utilization_Certificate_Audited.pdf',
            ].map((doc, idx) => (
              <div
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 flex items-center gap-1.5 font-medium"
              >
                <FileText className="w-3.5 h-3.5 text-gov-600" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Official Recommendation / Decision Buttons */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            6. Official Department Validation Decision
          </label>
          <textarea
            rows={2}
            value={decisionNotes}
            onChange={(e) => setDecisionNotes(e.target.value)}
            className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-gov-500"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPendingDecision('Close Pilot')}
                className="px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition-colors"
              >
                Close Pilot
              </button>
              <button
                onClick={() => setPendingDecision('Request Re-Pilot / Improvement')}
                className="px-4 py-2 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-200 transition-colors"
              >
                Request Re-Pilot / Improvement
              </button>
            </div>

            <button
              onClick={() => setPendingDecision('Proceed to Procurement')}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Proceed to Procurement</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {pendingDecision && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-gov-700" />
                <h3 className="text-sm font-bold text-slate-900">
                  Confirm Validation Decision
                </h3>
              </div>
              <button
                onClick={() => setPendingDecision(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to mark this pilot as{' '}
              <strong className="text-slate-900">{pendingDecision}</strong>? This decision will be permanently logged in the public audit ledger and will unlock the state procurement pathway.
            </p>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
              <div className="text-slate-500">Pilot Solution:</div>
              <div className="font-bold text-slate-800">{activePilot.solutionName}</div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setPendingDecision(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDecision}
                className="px-5 py-2 text-xs font-bold text-white bg-gov-700 hover:bg-gov-800 rounded-lg shadow-sm"
              >
                Confirm & Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Link to Procurement View */}
      {activePilot.status === 'Validated' && (
        <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl flex items-center justify-between text-xs">
          <div className="text-teal-900 font-medium">
            Solution is validated! Proceed to <strong>Procurement Pathway</strong> to execute GFR Innovation Exemption compliance review.
          </div>
          <button
            onClick={() => setActiveTab('procurement')}
            className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl transition-colors shrink-0 ml-3"
          >
            Open Procurement Pathway
          </button>
        </div>
      )}
    </div>
  );
};
