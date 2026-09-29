import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  Rocket,
  Building2,
  MapPin,
  Calendar,
  Users,
  Award,
  FileText,
  Mail,
  Phone,
  ExternalLink,
  Cpu,
} from 'lucide-react';

export const StartupProfileView: React.FC = () => {
  const { startups, solutions, pilots } = useApp();
  const startup = startups[0]; // AquaSense Technologies

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-gov-900 text-white flex items-center justify-center text-3xl shadow-md">
              {startup.logo}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-900">{startup.name}</h1>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{startup.tagline}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {startup.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Est. {startup.foundedYear}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  {startup.teamSize} Team Members
                </span>
              </div>
            </div>
          </div>

          {/* Verification Badges */}
          <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Startup (MSInS)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>DPIIT & GFR Eligible</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-bold border border-purple-200">
              <Rocket className="w-4 h-4 text-purple-600" />
              <span>Pilot Ready (TRL 7+)</span>
            </span>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">DPIIT Reg Number</div>
            <div className="text-xs font-bold font-mono text-slate-800 mt-0.5">{startup.dpiitNumber}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Funding Stage</div>
            <div className="text-xs font-bold text-gov-800 mt-0.5">{startup.fundingStage}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Gov Experience</div>
            <div className="text-xs font-bold text-emerald-700 mt-0.5">Yes (Municipal Pilot)</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">MSME Certified</div>
            <div className="text-xs font-bold text-purple-700 mt-0.5">Udyam Active</div>
          </div>
        </div>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Capabilities & Core Tech */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Core Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {startup.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs bg-blue-50 text-blue-800 font-semibold border border-blue-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Engineering Capabilities
              </h3>
              <ul className="space-y-1 text-xs text-slate-600">
                {startup.capabilities.map((cap, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gov-600" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Previous Deployments & Certifications */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Prior Municipal & Public Projects
              </h3>
              <div className="space-y-2">
                {startup.previousProjects.map((p, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                    <span className="font-semibold text-slate-800">{p}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Accreditations & Certifications
              </h3>
              <div className="flex flex-wrap gap-2">
                {startup.certifications.map((cert, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 text-slate-800 font-medium border border-slate-200"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact info bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              {startup.contactEmail}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              {startup.phone}
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Registered on Samarth Platform: March 2025
          </span>
        </div>
      </div>

      {/* Solutions & Pilots Catalog */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Registered Solutions & Products</h3>
        <div className="space-y-3">
          {solutions.filter((s) => s.startupId === startup.id).map((sol) => (
            <div
              key={sol.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">{sol.solutionName}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    {sol.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">{sol.tagline}</p>
                <div className="text-[11px] text-slate-400 mt-1">
                  Target: {sol.challengeTitle}
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Budget</div>
                <div className="text-xs font-bold text-slate-900">{sol.estimatedCost}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
