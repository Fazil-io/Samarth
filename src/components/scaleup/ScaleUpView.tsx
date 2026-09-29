import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  MapPin,
  Building2,
  CheckCircle2,
  Calendar,
  IndianRupee,
  Users,
  Plus,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ScaleUpProject } from '../../types';

export const ScaleUpView: React.FC = () => {
  const { scaleUpProjects, createScaleUpPlan, pilots } = useApp();
  const [selectedPlanId, setSelectedPlanId] = useState<string>(scaleUpProjects[0]?.id || '');

  // Form State for creating a new scale-up expansion
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([
    'Pune',
    'Thane',
    'Nashik',
    'Nagpur',
  ]);
  const [estimatedBudget, setEstimatedBudget] = useState('₹6.50 Crores');
  const [timeline, setTimeline] = useState('18 Months Phased Rollout');

  const activeProject = scaleUpProjects.find((p) => p.id === selectedPlanId) || scaleUpProjects[0];

  const maharashtraDistricts = [
    { name: 'Pune', region: 'Western Maharashtra', population: '9.4M', active: selectedDistricts.includes('Pune') },
    { name: 'Thane', region: 'Konkan', population: '11.0M', active: selectedDistricts.includes('Thane') },
    { name: 'Nashik', region: 'Khandesh', population: '6.1M', active: selectedDistricts.includes('Nashik') },
    { name: 'Nagpur', region: 'Vidarbha', population: '4.6M', active: selectedDistricts.includes('Nagpur') },
    { name: 'Chhatrapati Sambhajinagar', region: 'Marathwada', population: '3.7M', active: selectedDistricts.includes('Chhatrapati Sambhajinagar') },
    { name: 'Solapur', region: 'Western Maharashtra', population: '4.3M', active: selectedDistricts.includes('Solapur') },
    { name: 'Kolhapur', region: 'Western Maharashtra', population: '3.8M', active: selectedDistricts.includes('Kolhapur') },
    { name: 'Amravati', region: 'Vidarbha', population: '2.9M', active: selectedDistricts.includes('Amravati') },
  ];

  const toggleDistrict = (districtName: string) => {
    if (selectedDistricts.includes(districtName)) {
      setSelectedDistricts(selectedDistricts.filter((d) => d !== districtName));
    } else {
      setSelectedDistricts([...selectedDistricts, districtName]);
    }
  };

  const handleCreatePlan = () => {
    createScaleUpPlan(pilots[0]?.id || 'pilot-001', selectedDistricts, estimatedBudget);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-gov-700">
            Stage 7: State-Wide Replication
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 mt-1">
            Multi-District Scale-Up Command Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Expanding successfully validated municipal solutions across all 36 districts of Maharashtra.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Active Plans:</span>
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            {scaleUpProjects.length} Sanctioned
          </span>
        </div>
      </div>

      {activeProject && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  {activeProject.status}
                </span>
                <span className="text-xs text-slate-400">Scale-Up Dossier</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">{activeProject.solutionName}</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Original Pilot: {activeProject.originalPilotLocation} ({activeProject.originalDepartment})
              </p>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Estimated Scale-Up Grant</div>
              <div className="text-base font-black text-gov-800">{activeProject.estimatedBudget}</div>
              <div className="text-[11px] text-slate-500">{activeProject.timeline}</div>
            </div>
          </div>

          {/* Pilot Verified KPI Summary Bar */}
          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200 space-y-1">
            <span className="text-xs font-bold text-blue-900">Validated Pilot Foundation</span>
            <p className="text-xs text-blue-800">{activeProject.pilotKpiSummary}</p>
            <div className="text-[11px] font-semibold text-gov-800 pt-1">
              Target Citizen Reach: {activeProject.citizenReachTarget}
            </div>
          </div>

          {/* Interactive Map-Style Grid Selector for Maharashtra Districts */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Maharashtra Municipal Corporation Expansion Grid
                </h3>
                <p className="text-[11px] text-slate-500">
                  Click districts to add or remove them from the multi-city phased rollout agreement.
                </p>
              </div>
              <span className="text-xs font-bold text-gov-700">
                {selectedDistricts.length} Districts Selected
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {maharashtraDistricts.map((d) => (
                <div
                  key={d.name}
                  onClick={() => toggleDistrict(d.name)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    d.active
                      ? 'bg-blue-50 border-gov-600 shadow-sm'
                      : 'bg-slate-50 border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900">{d.name}</span>
                      <div className="text-[10px] text-slate-500">{d.region}</div>
                    </div>
                    {d.active ? (
                      <CheckCircle2 className="w-4 h-4 text-gov-700 shrink-0" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-300" />
                    )}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-600 mt-2">
                    Pop: {d.population}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scale Up Plan Formulator */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Estimated Multi-District Budget Allocation
                </label>
                <input
                  type="text"
                  value={estimatedBudget}
                  onChange={(e) => setEstimatedBudget(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Rollout Execution Timeline
                </label>
                <input
                  type="text"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleCreatePlan}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gov-700 hover:bg-gov-800 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Sanction Multi-District Scale-Up Plan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
