import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { SubmitSolutionModal } from './SubmitSolutionModal';
import {
  Compass,
  FileText,
  Activity,
  CreditCard,
  Rocket,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Building2,
  MapPin,
  Calendar,
  Percent,
  Info,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  X,
} from 'lucide-react';
import { Challenge } from '../../types';

export const StartupDashboard: React.FC = () => {
  const { challenges, solutions, pilots, setActiveTab, setSelectedChallengeId } = useApp();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [targetChallengeId, setTargetChallengeId] = useState<string | null>(null);
  const [explainingMatchChallenge, setExplainingMatchChallenge] = useState<Challenge | null>(null);

  // Mock Startup state: AquaSense Technologies
  const mySolutions = solutions.filter((s) => s.startupId === 'startup-aquasense');
  const myPilots = pilots.filter((p) => p.startupId === 'startup-aquasense');
  const pendingMilestones = myPilots.flatMap((p) => p.milestones).filter((m) => m.status === 'In Progress' || m.status === 'Submitted');

  // Total payments released
  const totalEarned = myPilots.flatMap((p) => p.milestones)
    .filter((m) => m.paymentStatus === 'Paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Smart matching logic for recommended challenges
  const recommendedChallenges = challenges.map((c) => {
    let matchScore = 75;
    let matchDetails = {
      domain: 20,
      tech: 20,
      location: 15,
      capability: 10,
      eligibility: 10,
      reasons: ['Eligible Maharashtra startup entity'],
    };

    if (c.id === 'CH-MH-2026-001') {
      matchScore = 94;
      matchDetails = {
        domain: 25,
        tech: 24,
        location: 20,
        capability: 13,
        eligibility: 12,
        reasons: [
          'Domain Match (25/25): Exact alignment with municipal water loss & leak detection',
          'Technology Match (24/25): IoT Acoustic sensors, edge AI, and GIS integration directly match challenge requirements',
          'Location Match (20/20): Startup based in Pune; pilot location is PMC Swargate sector',
          'Capability Match (13/15): Verified prior municipal pilot in Pimpri Chinchwad',
          'Eligibility Match (12/15): Verified DPIIT recognition and STQC cybersecurity certification',
        ],
      };
    } else if (c.id === 'CH-MH-2026-004') {
      matchScore = 86;
      matchDetails = {
        domain: 22,
        tech: 22,
        location: 20,
        capability: 11,
        eligibility: 11,
        reasons: [
          'Domain Match (22/25): Civic infrastructure & sensor monitoring',
          'Location Match (20/20): Pune Municipal Corporation testbed proximity',
          'Technology Match (22/25): IoT telemetry and cloud telemetry infrastructure',
        ],
      };
    } else {
      matchScore = 78;
      matchDetails = {
        domain: 18,
        tech: 18,
        location: 18,
        capability: 12,
        eligibility: 12,
        reasons: ['Hardware IoT capability overlap', 'Eligible state enterprise'],
      };
    }

    return {
      challenge: c,
      matchScore,
      matchDetails,
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  const handleApply = (challengeId: string) => {
    setTargetChallengeId(challengeId);
    setSelectedChallengeId(challengeId);
    setIsSubmitModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Startup Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-700 to-gov-900 text-white flex items-center justify-center text-2xl shadow-md">
            💧
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900">
                AquaSense Technologies
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                Verified Startup
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Pune, Maharashtra • Acoustic IoT Sensors & AI Hydroinformatics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('discover')}
            className="px-4 py-2.5 rounded-xl bg-gov-700 hover:bg-gov-800 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            <span>Discover Challenges</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
          >
            My Profile
          </button>
        </div>
      </div>

      {/* 6 Startup Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {[
          {
            title: 'Recommended',
            value: `${recommendedChallenges.length} Open`,
            sub: 'Smart Match > 75%',
            icon: <Sparkles className="w-4 h-4 text-purple-600" />,
            border: 'border-purple-200 bg-purple-50/30',
          },
          {
            title: 'Submitted Solutions',
            value: mySolutions.length,
            sub: 'Active Applications',
            icon: <FileText className="w-4 h-4 text-blue-600" />,
            border: 'border-blue-200 bg-blue-50/30',
          },
          {
            title: 'Active Pilots',
            value: myPilots.length,
            sub: 'Funded Sandboxes',
            icon: <Activity className="w-4 h-4 text-teal-600" />,
            border: 'border-teal-200 bg-teal-50/30',
          },
          {
            title: 'Milestones Due',
            value: pendingMilestones.length,
            sub: 'Deliverables Underway',
            icon: <CheckCircle2 className="w-4 h-4 text-amber-600" />,
            border: 'border-amber-200 bg-amber-50/30',
          },
          {
            title: 'Payments Received',
            value: `₹${(totalEarned / 100000).toFixed(1)}L`,
            sub: 'Escrow Tranches Paid',
            icon: <CreditCard className="w-4 h-4 text-emerald-600" />,
            border: 'border-emerald-200 bg-emerald-50/30',
          },
          {
            title: 'Success Rate',
            value: '100%',
            sub: 'Pilot KPIs Achieved',
            icon: <Percent className="w-4 h-4 text-gov-600" />,
            border: 'border-gov-200 bg-gov-50/30',
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border ${card.border} gov-card flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between">
              <span className="p-1.5 rounded-lg bg-white shadow-xs border border-slate-200">
                {card.icon}
              </span>
              <span className="text-xl font-black text-slate-900">{card.value}</span>
            </div>
            <div className="mt-3">
              <div className="text-xs font-bold text-slate-800">{card.title}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{card.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Challenges Section with Smart Match */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <h2 className="text-base font-bold text-slate-900">
                Recommended Challenges (Smart Match Engine)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Matched algorithmically against your Domain (WaterTech), Technologies (IoT/Acoustic), Location (Pune), and TRL-7 readiness.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Explainable Matching for Prototype
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedChallenges.map(({ challenge, matchScore, matchDetails }) => (
            <div
              key={challenge.id}
              className="rounded-2xl border border-slate-200 hover:border-purple-300 bg-white hover:bg-slate-50/50 transition-all p-5 flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div className="space-y-3">
                {/* Match Score Badge */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setExplainingMatchChallenge(challenge)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-extrabold border border-purple-200 hover:bg-purple-100 transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    <span>{matchScore}% Smart Match</span>
                    <Info className="w-3 h-3 text-purple-400 ml-0.5" />
                  </button>
                  <Badge status={challenge.status} size="sm" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2">
                    {challenge.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{challenge.department}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{challenge.location}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {challenge.problemDescription}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
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

              {/* Card Bottom */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Budget</div>
                  <div className="text-xs font-bold text-slate-900">{challenge.budget}</div>
                </div>
                <button
                  onClick={() => handleApply(challenge.id)}
                  className="px-3.5 py-1.5 bg-gov-700 hover:bg-gov-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                >
                  Submit Solution
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Startup's Submitted Applications & Pilots Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Submitted Solutions */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">My Solution Submissions</h3>
            <span className="text-xs text-slate-400">{mySolutions.length} Active</span>
          </div>

          <div className="space-y-3">
            {mySolutions.map((sol) => (
              <div
                key={sol.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{sol.solutionName}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{sol.challengeTitle}</p>
                  </div>
                  <Badge status={sol.status} size="sm" />
                </div>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200/60 text-slate-600">
                  <span>App ID: <strong className="font-mono text-gov-800">{sol.applicationId}</strong></span>
                  <span>Grant: <strong>{sol.estimatedCost}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Active Field Pilot & Milestones */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Active Field Sandbox</h3>
            <button
              onClick={() => setActiveTab('milestones')}
              className="text-xs text-gov-700 hover:underline font-bold"
            >
              Milestone View
            </button>
          </div>

          {myPilots.length > 0 ? (
            <div className="space-y-3">
              {myPilots.map((pilot) => (
                <div key={pilot.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{pilot.solutionName}</h4>
                      <p className="text-[11px] text-slate-500">{pilot.pilotLocation}</p>
                    </div>
                    <Badge status={pilot.status} size="sm" />
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Total Pilot Grant:</span>
                      <span className="font-bold text-slate-900">{pilot.budget}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Disbursed Tranche:</span>
                      <span className="font-bold text-emerald-700">₹8,00,000 (Milestone 1 Paid)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-slate-400 p-4 text-center">No active pilots yet.</div>
          )}
        </div>
      </div>

      {/* Explainable Match Modal */}
      {explainingMatchChallenge && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Smart Match Score Breakdown
                </h3>
              </div>
              <button
                onClick={() => setExplainingMatchChallenge(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-800">
                {explainingMatchChallenge.title}
              </div>
              <div className="text-xs text-slate-500">
                Department: {explainingMatchChallenge.department}
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 text-center space-y-1">
              <div className="text-3xl font-extrabold text-purple-900">94% Match</div>
              <div className="text-xs text-purple-800 font-medium">
                High Compatibility with AquaSense Technologies Profile
              </div>
            </div>

            {/* Explainable Factors */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Explainable Matching Factors
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <strong>Domain Match (25/25):</strong> Water distribution, pipe network hydroinformatics, and leak minimization.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <strong>Technology Match (24/25):</strong> Acoustic loggers, edge ML wavelets, and SCADA integration match 100%.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <strong>Location Match (20/20):</strong> Headquartered in Baner, Pune; testbed is Swargate, Pune (45-min on-site SLA).
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <strong>Capability Match (13/15):</strong> Verified prior field pilot in PCMC.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <strong>Statutory Eligibility (12/15):</strong> DPIIT Maharashtra recognized entity with STQC security pass.
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const cId = explainingMatchChallenge.id;
                setExplainingMatchChallenge(null);
                handleApply(cId);
              }}
              className="w-full py-2.5 bg-gov-700 hover:bg-gov-800 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Proceed to Submit Solution
            </button>
          </div>
        </div>
      )}

      {/* Solution Submission Modal */}
      <SubmitSolutionModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        defaultChallengeId={targetChallengeId}
      />
    </div>
  );
};
