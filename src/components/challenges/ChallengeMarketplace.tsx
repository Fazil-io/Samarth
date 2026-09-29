import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { ChallengeDetailModal } from './ChallengeDetailModal';
import { SubmitSolutionModal } from '../startup/SubmitSolutionModal';
import {
  Search,
  Filter,
  Building2,
  MapPin,
  Calendar,
  Sparkles,
  IndianRupee,
  Clock,
  ArrowRight,
  Target,
  SlidersHorizontal,
} from 'lucide-react';

export const ChallengeMarketplace: React.FC = () => {
  const { challenges, setRole } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All');

  // Detail & Submit Modals
  const [detailChallengeId, setDetailChallengeId] = useState<string | null>(null);
  const [submitChallengeId, setSubmitChallengeId] = useState<string | null>(null);

  const departments = ['All', 'Water Resources', 'Transport', 'Public Health', 'Urban Development', 'Agriculture'];
  const districts = ['All', 'Pune', 'Mumbai Suburban', 'Gadchiroli & Nandurbar', 'Nashik'];
  const statuses = ['All', 'Published', 'Active Pilot'];

  const filteredChallenges = challenges.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.problemDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.requiredTech.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDept = selectedDept === 'All' || c.department.includes(selectedDept);
    const matchesDistrict = selectedDistrict === 'All' || c.district.includes(selectedDistrict);
    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;

    return matchesSearch && matchesDept && matchesDistrict && matchesStatus;
  });

  const getSmartMatchScore = (cId: string) => {
    if (cId === 'CH-MH-2026-001') return 94;
    if (cId === 'CH-MH-2026-002') return 92;
    if (cId === 'CH-MH-2026-003') return 88;
    if (cId === 'CH-MH-2026-004') return 86;
    return 78;
  };

  const handleApply = (cId: string) => {
    setRole('startup');
    setSubmitChallengeId(cId);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-gov-700" />
            <h1 className="text-xl font-extrabold text-slate-900">
              Government Innovation Challenge Marketplace
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Discover verified operational bottlenecks across Maharashtra departments and pilot your solutions with grant funding.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Available Challenges:</span>
          <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
            {filteredChallenges.length} Open
          </span>
        </div>
      </div>

      {/* Search and Multi-Parameter Filtering Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search challenges by keyword, required technology, department, or district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gov-500 focus:border-transparent font-medium"
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Department
            </label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full p-2 text-xs rounded-lg border border-slate-200 focus:outline-none"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              District / Region
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-2 text-xs rounded-lg border border-slate-200 focus:outline-none"
            >
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Pilot Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 text-xs rounded-lg border border-slate-200 focus:outline-none"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => {
          const matchScore = getSmartMatchScore(challenge.id);
          return (
            <div
              key={challenge.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-5 space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 text-[11px] font-bold border border-purple-200">
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    <span>{matchScore}% Smart Match</span>
                  </span>
                  <Badge status={challenge.status} size="sm" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-gov-700 transition-colors line-clamp-2">
                    {challenge.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1.5 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{challenge.department}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{challenge.location}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {challenge.problemDescription}
                </p>

                {/* Target KPIs */}
                <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Target KPIs
                  </div>
                  {challenge.kpis.slice(0, 2).map((k) => (
                    <div key={k.id} className="flex items-center justify-between text-xs text-slate-700">
                      <span className="truncate pr-2">{k.name}</span>
                      <span className="font-bold text-gov-800 shrink-0">{k.target}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1">
                  {challenge.requiredTech.slice(0, 3).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Budget</div>
                  <div className="text-xs font-extrabold text-slate-900">{challenge.budget}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Duration</div>
                  <div className="text-xs font-medium text-slate-700">{challenge.pilotDuration}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setDetailChallengeId(challenge.id)}
                    className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleApply(challenge.id)}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-gov-700 hover:bg-gov-800 rounded-lg shadow-xs transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Challenge Detail Dossier Modal */}
      <ChallengeDetailModal
        challengeId={detailChallengeId}
        onClose={() => setDetailChallengeId(null)}
        onApply={(cId) => handleApply(cId)}
      />

      {/* Submit Solution Modal */}
      <SubmitSolutionModal
        isOpen={Boolean(submitChallengeId)}
        onClose={() => setSubmitChallengeId(null)}
        defaultChallengeId={submitChallengeId}
      />
    </div>
  );
};
