import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import {
  ShoppingBag,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  FileText,
  Lock,
  Building2,
  Award,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { ProcurementRecord } from '../../types';

export const ProcurementView: React.FC = () => {
  const { procurementRecords, updateProcurementStatus, setActiveTab } = useApp();
  const [selectedRecordId, setSelectedRecordId] = useState<string>(
    procurementRecords[0]?.id || ''
  );

  const activeRecord = procurementRecords.find((r) => r.id === selectedRecordId) || procurementRecords[0];

  const stages: ProcurementRecord['stage'][] = [
    'Validated Solution',
    'Procurement Review',
    'Compliance Check',
    'Agreement',
    'Procurement',
    'Deployment',
  ];

  if (!activeRecord) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto mb-2" />
        <p className="text-xs text-slate-500">
          No procurement dossiers yet. Validate a pilot first to initiate the procurement pathway.
        </p>
      </div>
    );
  }

  const currentStageIndex = stages.indexOf(activeRecord.stage);

  const handleAdvanceStage = () => {
    if (currentStageIndex < stages.length - 1) {
      const nextStage = stages[currentStageIndex + 1];
      const nextContractStatus = nextStage === 'Deployment' ? 'Executed' : nextStage === 'Agreement' ? 'Approved' : 'Legal Review';
      updateProcurementStatus(activeRecord.id, nextStage, nextContractStatus);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-gov-700">
            Stage 6: Public Procurement & Commercial Onboarding
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 mt-1">
            State Innovation Procurement Pathway
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Rule 149 GFR Innovation Exemption framework for seamless contracting without repetitive traditional tendering.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('scaleup')}
            className="px-4 py-2 bg-gov-700 hover:bg-gov-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <span>Multi-District Scale-Up Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Procurement Dossier Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <span className="text-xs font-mono text-slate-400">Dossier ID: {activeRecord.id}</span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">{activeRecord.solutionName}</h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-1">
              <span className="font-semibold text-gov-800">{activeRecord.startupName}</span>
              <span>•</span>
              <span>{activeRecord.department}</span>
              <span>•</span>
              <span className="font-bold text-slate-800">Contract Value: {activeRecord.contractValue}</span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Contract Status</div>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200 mt-0.5">
              <FileText className="w-3.5 h-3.5" />
              <span>{activeRecord.contractStatus}</span>
            </span>
          </div>
        </div>

        {/* 6-Stage Visual Procurement Flow */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Procurement Pathway Pipeline
            </h3>
            <span className="text-xs font-semibold text-gov-700">
              Current Stage: {activeRecord.stage}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {stages.map((stageName, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-center space-y-1 transition-all ${
                    isPast
                      ? 'bg-emerald-50 border-emerald-300'
                      : isCurrent
                      ? 'bg-blue-50 border-gov-500 shadow-sm'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {isPast ? (
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                        ✓
                      </span>
                    ) : isCurrent ? (
                      <span className="w-5 h-5 rounded-full bg-gov-700 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                        {idx + 1}
                      </span>
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 text-[10px] font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] font-bold text-slate-900 leading-tight">
                    {stageName}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compliance, IP, and Cybersecurity Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Statutory Compliance</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {activeRecord.complianceStatus}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Exemption under Maharashtra Innovative Procurement Framework Rule 149 verified by Law & Judiciary Department.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">IP & Data Clauses</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {activeRecord.ipDataClausesStatus}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Startup retains core background IP; Government receives perpetual royalty-free civic usage rights across state.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">STQC Cybersecurity</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {activeRecord.cybersecurityReviewStatus}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              MeitY cloud data residency confirmed in Mumbai availability zone with AES-256 payload encryption.
            </p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            Applicable Pathway: <strong className="text-gov-800">{activeRecord.pathway}</strong>
          </div>

          <div className="flex items-center gap-2">
            {currentStageIndex < stages.length - 1 && (
              <button
                onClick={handleAdvanceStage}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gov-700 hover:bg-gov-800 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
              >
                <span>Advance to Next Stage: {stages[currentStageIndex + 1]}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {currentStageIndex === stages.length - 1 && (
              <button
                onClick={() => setActiveTab('scaleup')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
              >
                <span>Create Multi-District Scale-Up Plan</span>
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
