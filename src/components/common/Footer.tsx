import React from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Shield, Heart, ExternalLink, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setIsDemoGuideOpen, setRole, setActiveTab } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-auto pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand and Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-gov-600 text-white flex items-center justify-center text-xs">
                GI
              </div>
              <span>GovInnovate</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Maharashtra State Innovation Society (MSInS) digital platform connecting Government challenges with startup innovations for controlled funded pilots, validation, and procurement.
            </p>
            <div className="text-[11px] text-slate-500">
              Department of Skills, Employment, Entrepreneurship & Innovation, Government of Maharashtra.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Platform Workflow
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setRole('government');
                    setActiveTab('challenges');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Challenge Creation
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRole('startup');
                    setActiveTab('discover');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Startup Smart Match
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRole('expert');
                    setActiveTab('evaluations');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Expert 6-Criterion Scoring
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRole('government');
                    setActiveTab('pilots');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Pilot & Milestone Escrow
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRole('government');
                    setActiveTab('procurement');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Procurement & Scale-Up
                </button>
              </li>
            </ul>
          </div>

          {/* Governance & Policies */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Governance & Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('templates')}
                  className="hover:text-white transition-colors"
                >
                  Government MoU & RFP Templates
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('audit')}
                  className="hover:text-white transition-colors"
                >
                  Immutable Audit Trail
                </button>
              </li>
              <li>
                <span className="text-slate-500">Rule 149 GFR Innovation Exemption</span>
              </li>
              <li>
                <span className="text-slate-500">Maharashtra Innovation Policy 2026</span>
              </li>
              <li>
                <span className="text-slate-500">MeitY Cloud Data Residency</span>
              </li>
            </ul>
          </div>

          {/* Hackathon Prototype Notice */}
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 space-y-2">
            <div className="flex items-center gap-1.5 text-teal-400 font-semibold text-xs">
              <Shield className="w-4 h-4" />
              <span>Hackathon Prototype Note</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Designed as a presentation-ready prototype for the Maharashtra State Innovation Society. Includes persistent interactive state across 4 roles.
            </p>
            <button
              onClick={() => setIsDemoGuideOpen(true)}
              className="w-full mt-2 py-1.5 px-3 bg-gov-600 hover:bg-gov-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1"
            >
              <span>Launch 22-Step Journey</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 Government of Maharashtra. All rights reserved. GovInnovate Platform.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Accessibility</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Contact MSInS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
