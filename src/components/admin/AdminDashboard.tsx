import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import {
  ShieldAlert,
  Building2,
  Rocket,
  Target,
  Activity,
  CheckCircle2,
  Coins,
  TrendingUp,
  Users,
  Settings,
  ShieldCheck,
  History,
  FileSpreadsheet,
  AlertCircle,
  Plus,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    challenges,
    startups,
    solutions,
    pilots,
    procurementRecords,
    scaleUpProjects,
    setActiveTab,
    showToast,
  } = useApp();

  const [activeTabSub, setActiveTabSub] = useState<'overview' | 'startups' | 'departments' | 'settings'>('overview');

  const handleVerifyStartup = (name: string) => {
    showToast(`Startup "${name}" successfully certified under MSInS Sandbox!`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <h1 className="text-xl font-extrabold text-slate-900">
              State Platform Administration & Command Console
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Maharashtra State Innovation Society (MSInS) • Global System Management
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('audit')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <History className="w-4 h-4" />
            <span>Audit Ledger</span>
          </button>
        </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
        {[
          { label: 'Departments', value: '18', icon: <Building2 className="w-4 h-4 text-blue-600" /> },
          { label: 'Startups', value: `${startups.length} Registered`, icon: <Rocket className="w-4 h-4 text-purple-600" /> },
          { label: 'Challenges', value: challenges.length, icon: <Target className="w-4 h-4 text-gov-600" /> },
          { label: 'Active Pilots', value: pilots.length, icon: <Activity className="w-4 h-4 text-teal-600" /> },
          { label: 'Validated', value: '32 Solutions', icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" /> },
          { label: 'Sanctioned Fund', value: '₹14.2 Cr', icon: <Coins className="w-4 h-4 text-amber-600" /> },
          { label: 'Scale-Ups', value: scaleUpProjects.length, icon: <TrendingUp className="w-4 h-4 text-rose-600" /> },
        ].map((stat, i) => (
          <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="p-1 rounded bg-slate-50">{stat.icon}</span>
              <span className="text-base font-black text-slate-900">{stat.value}</span>
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Startup Verification and Governance Management */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Registered Startups Verification & DPIIT Scrutiny
            </h3>
            <p className="text-xs text-slate-500">
              Verify legal incorporation and grant Sandbox pilot eligibility badges
            </p>
          </div>
          <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {startups.length} Verified
          </span>
        </div>

        <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
          {startups.map((s) => (
            <div key={s.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl">
                  {s.logo}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{s.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {s.district}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {s.industry} • DPIIT: {s.dpiitNumber}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Sandbox Certified</span>
                </span>
                <button
                  onClick={() => handleVerifyStartup(s.name)}
                  className="px-3 py-1 bg-gov-700 hover:bg-gov-800 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Re-Verify
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Operations Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => setActiveTab('challenges')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-gov-500 cursor-pointer transition-all space-y-2"
        >
          <div className="p-2 rounded-xl bg-blue-50 text-gov-700 w-fit">
            <Target className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Manage Challenges</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Review, archive, or broadcast public challenge statements across all 18 departments.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('templates')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-gov-500 cursor-pointer transition-all space-y-2"
        >
          <div className="p-2 rounded-xl bg-purple-50 text-purple-700 w-fit">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Template & Framework Center</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Update statutory pilot agreements, scoring rubrics, and data sovereignty policies.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('audit')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-gov-500 cursor-pointer transition-all space-y-2"
        >
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 w-fit">
            <History className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Transparency Audit Trail</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Inspect immutable cryptographic logs for every approval and payment release.
          </p>
        </div>
      </div>
    </div>
  );
};
