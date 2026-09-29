import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import {
  ArrowRight,
  Target,
  FileCheck2,
  GraduationCap,
  Activity,
  CheckCircle2,
  TrendingUp,
  Shield,
  Zap,
  Users,
  Coins,
  Search,
  Building2,
  MapPin,
  Calendar,
  IndianRupee,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';

interface LandingPageProps {
  onOpenChallengeDetail?: (challengeId: string) => void;
  onOpenSubmitModal?: (challengeId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenChallengeDetail, onOpenSubmitModal }) => {
  const { challenges, setRole, setActiveTab, setSelectedChallengeId, setIsDemoGuideOpen } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const filteredChallenges = challenges.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.problemCategory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || c.department.includes(selectedDept);
    return matchesSearch && matchesDept;
  });

  const departmentsList = [
    'All',
    'Water Resources',
    'Transport',
    'Public Health',
    'Urban Development',
    'Agriculture',
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gov-900 via-gov-800 to-gov-950 text-white pt-10 sm:pt-16 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-xl w-full">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-teal-300 border border-white/10 text-xs font-semibold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
            <span>Government of Maharashtra • Innovation Sandbox</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
            Turn Government Challenges into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-300 to-blue-200">
              Scalable Innovation
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            A transparent digital platform connecting government departments with startups to identify, evaluate, pilot, validate and scale innovative solutions.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
            <button
              onClick={() => {
                const el = document.getElementById('challenges-marketplace-preview');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/25 transition-all flex items-center gap-2 hover:-translate-y-0.5"
            >
              <span>Explore Challenges</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setRole('startup');
                setActiveTab('discover');
              }}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm backdrop-blur-sm transition-all flex items-center gap-2"
            >
              <span>Register as Startup</span>
            </button>

            <button
              onClick={() => {
                setRole('government');
                setActiveTab('dashboard');
              }}
              className="px-5 py-3 rounded-xl bg-gov-700/80 hover:bg-gov-600 text-white font-semibold text-sm border border-gov-500/40 transition-all flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-sky-300" />
              <span>Government Portal</span>
            </button>
          </div>

          {/* Quick Demo Workflow Guide Trigger */}
          <div className="pt-4">
            <button
              onClick={() => setIsDemoGuideOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-medium text-teal-300 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-teal-500/30 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              <span>Hackathon Evaluator: Launch 22-Step Guided Walkthrough</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Section D: Platform Statistics */}
      <section className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 -mt-6 sm:-mt-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Maharashtra State Innovation Metrics (Demo Statistics)
            </span>
            <span className="text-xs text-slate-400">Live Pilot Data Verified</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="pt-2 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-gov-800">120+</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">Government Challenges</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Across 18 State Departments</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-purple-700">350+</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">Registered Startups</div>
              <div className="text-[11px] text-slate-400 mt-0.5">DPIIT & MSInS Certified</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-700">78+</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">Active Pilots</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Milestone-Based Escrow</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700">32+</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">Solutions Validated</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Moving to Scale-Up & Tenders</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section A: How It Works (6 steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-gov-700">
            End-to-End Pipeline
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            How GovInnovate Works
          </h2>
          <p className="text-sm text-slate-600">
            A structured 6-stage lifecycle bridging the gap between public problem statements and commercial public procurement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              title: 'Government Posts Challenge',
              icon: <Target className="w-5 h-5 text-gov-600" />,
              color: 'border-blue-200 bg-blue-50/40',
              desc: 'Departments publish operational bottlenecks with quantitative baseline metrics, target KPIs, pilot durations, and milestone funding ceilings.',
            },
            {
              step: '02',
              title: 'Startups Submit Solutions',
              icon: <FileCheck2 className="w-5 h-5 text-purple-600" />,
              color: 'border-purple-200 bg-purple-50/40',
              desc: 'Verified startups discover challenges via Smart Matching (location, tech stack, readiness) and submit technical & financial proposals.',
            },
            {
              step: '03',
              title: 'Experts Evaluate',
              icon: <GraduationCap className="w-5 h-5 text-amber-600" />,
              color: 'border-amber-200 bg-amber-50/40',
              desc: 'Academic & technical panels score proposals across a 6-criterion rubric (Innovation, Feasibility, Impact, Cost, Scale, Cybersecurity).',
            },
            {
              step: '04',
              title: 'Pilot & Milestone Funding',
              icon: <Coins className="w-5 h-5 text-teal-600" />,
              color: 'border-teal-200 bg-teal-50/40',
              desc: 'Approved startups enter a controlled municipal sandbox. Funding is released in strict milestone-based tranches upon verified deliverables.',
            },
            {
              step: '05',
              title: 'Validate Results',
              icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
              color: 'border-emerald-200 bg-emerald-50/40',
              desc: 'Departments and independent auditors measure post-pilot KPIs against baseline. Formal validation certification is granted.',
            },
            {
              step: '06',
              title: 'Procure & Scale',
              icon: <TrendingUp className="w-5 h-5 text-rose-600" />,
              color: 'border-rose-200 bg-rose-50/40',
              desc: 'Successful solutions transition into state procurement under Rule 149 Innovation Exemption and scale across Maharashtra districts.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className={`p-6 rounded-2xl border ${item.color} gov-card flex flex-col justify-between`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-white shadow-sm border border-slate-200">
                    {item.icon}
                  </div>
                  <span className="text-xl font-extrabold text-slate-300">{item.step}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section B: Platform Benefits */}
      <section className="bg-slate-100/80 py-10 sm:py-14 px-4 sm:px-8 rounded-3xl border border-slate-200/80 w-full">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Why GovInnovate
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Solving the Government–Startup Procurement Divide
            </h2>
            <p className="text-sm text-slate-600">
              Transforming how public departments de-risk and adopt frontier technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Faster Innovation',
                desc: 'Bypass months of legacy RFP bureaucracy with pre-formulated problem statements and standardized pilot sandboxes.',
                icon: <Zap className="w-5 h-5 text-amber-500" />,
              },
              {
                title: 'Startup Inclusion',
                desc: 'Removes restrictive 3-year turnover barriers for early-stage startups with demonstrated technical readiness (TRL 6+).',
                icon: <Users className="w-5 h-5 text-blue-500" />,
              },
              {
                title: 'Lower Procurement Risk',
                desc: 'Government tests the hardware and software in real civic environments before committing to long-term enterprise procurement.',
                icon: <Shield className="w-5 h-5 text-emerald-500" />,
              },
              {
                title: 'Transparent Evaluation',
                desc: 'Weighted 6-criterion evaluation by empaneled domain experts with documented scoring and audit logs.',
                icon: <GraduationCap className="w-5 h-5 text-purple-500" />,
              },
              {
                title: 'Milestone-Based Funding',
                desc: 'Clear escrow tranche releases guarantee startups get timely cashflow while ensuring public accountability.',
                icon: <Coins className="w-5 h-5 text-teal-500" />,
              },
              {
                title: 'Scalable Solutions',
                desc: 'Proven municipal pilots seamlessly transition to multi-district expansion across Maharashtra.',
                icon: <TrendingUp className="w-5 h-5 text-rose-500" />,
              },
            ].map((b, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 shrink-0">
                  {b.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{b.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section C: Active Government Challenges */}
      <section id="challenges-marketplace-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gov-700">
              Live Opportunities
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Active Government Challenges
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Real operational problems seeking startup solutions across Maharashtra.
            </p>
          </div>
          <button
            onClick={() => {
              setRole('startup');
              setActiveTab('discover');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gov-700 hover:text-gov-800 transition-colors"
          >
            <span>Explore All {challenges.length} Challenges</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search challenges by title, location, domain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gov-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
            {departmentsList.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedDept === dept
                    ? 'bg-gov-700 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Challenge Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                    {challenge.problemCategory}
                  </span>
                  <Badge status={challenge.status} size="sm" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-gov-700 transition-colors line-clamp-2">
                    {challenge.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-600 mt-2 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{challenge.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{challenge.location}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {challenge.problemDescription}
                </p>

                {/* Key KPIs */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Key Performance Indicators (KPIs)
                  </div>
                  <div className="space-y-1 text-xs">
                    {challenge.kpis.slice(0, 2).map((kpi) => (
                      <div key={kpi.id} className="flex items-center justify-between text-slate-700">
                        <span className="truncate pr-2">{kpi.name}</span>
                        <span className="font-semibold text-gov-700 shrink-0">{kpi.target}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {challenge.requiredTech.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {challenge.requiredTech.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded text-[11px] bg-slate-50 text-slate-500">
                      +{challenge.requiredTech.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer with Budget & Action */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Pilot Budget</div>
                  <div className="text-sm font-extrabold text-slate-900">{challenge.budget}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Timeline</div>
                  <div className="text-xs font-semibold text-slate-700">{challenge.timeline}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      if (onOpenChallengeDetail) onOpenChallengeDetail(challenge.id);
                      else {
                        setSelectedChallengeId(challenge.id);
                        setActiveTab('discover');
                      }
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-gov-700 hover:bg-gov-100/60 rounded-lg transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      setRole('startup');
                      setSelectedChallengeId(challenge.id);
                      if (onOpenSubmitModal) onOpenSubmitModal(challenge.id);
                      else setActiveTab('discover');
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-gov-700 hover:bg-gov-800 rounded-lg shadow-sm transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Innovation Features Highlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-gov-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/10 text-teal-300 text-xs font-semibold border border-teal-400/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core GovTech Innovations</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              4 Structural Innovations in Public Procurement
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-1">
                <h4 className="font-bold text-teal-300 text-sm">1. Smart Problem–Startup Matching</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Explainable matching factoring in geographic jurisdiction, technical readiness (TRL), past municipal pilots, and regulatory eligibility.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-teal-300 text-sm">2. Pilot-First Validation Sandbox</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Government departments test startups in small, controlled zones (e.g. 15km water network or 8 traffic junctions) with milestone escrow funding.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-teal-300 text-sm">3. End-to-End Innovation Pipeline</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Seamless digital continuity from problem formulation to expert rubric scoring, pilot validation, GFR Rule 149 exemption, and multi-district scale-up.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-teal-300 text-sm">4. Transparent Performance Tracking</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tamper-evident audit logging for every evaluation, milestone sign-off, and treasury disbursement, eliminating discretionary bias.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
