import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Rocket,
  FileText,
  Upload,
  Coins,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Challenge, Milestone } from '../../types';

interface SubmitSolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultChallengeId?: string | null;
}

export const SubmitSolutionModal: React.FC<SubmitSolutionModalProps> = ({
  isOpen,
  onClose,
  defaultChallengeId,
}) => {
  const { challenges, submitSolution } = useApp();
  const [step, setStep] = useState(1);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  // Selected Challenge
  const [challengeId, setChallengeId] = useState<string>(
    defaultChallengeId || challenges[0]?.id || ''
  );

  const selectedChallenge = challenges.find((c) => c.id === challengeId) || challenges[0];

  // Step 1: Overview
  const [solutionName, setSolutionName] = useState('AquaHydro Acoustic Leak Hunter & Subsurface IoT Grid');
  const [problemAddressed, setProblemAddressed] = useState(
    'Eliminates unmetered underground pipeline water losses and road subsidence by identifying micro-leaks in real-time.'
  );
  const [solutionDescription, setSolutionDescription] = useState(
    'AquaHydro integrates non-intrusive magnetic-mount acoustic logger nodes installed on valve shafts. Nodes record nighttime acoustic vibrations, perform edge wavelet denoising, and triangulate leak positions within +/- 1.5 meters.'
  );
  const [innovation, setInnovation] = useState(
    'Proprietary Wavelet Denoising Filter removes urban traffic, metro vibrations and ambient pipe noise, achieving 94.2% leak classification accuracy.'
  );
  const [expectedImpact, setExpectedImpact] = useState(
    'Reduce leak pinpointing SLA from 48 hours to under 4 hours; save an estimated 1.8 MLD treated drinking water in the pilot ward.'
  );

  // Step 2: Technical Details
  const [architecture, setArchitecture] = useState(
    'Three-Tier: IP68 battery-powered acoustic loggers -> NB-IoT/4G band 3/5 with TLS 1.3 -> Geo-Spatial Analytics Cloud on MeitY GovCloud.'
  );
  const [technologies, setTechnologies] = useState<string[]>([
    'IoT Acoustic Sensors',
    'Machine Learning',
    'SCADA Integration',
    'Edge Computing',
    'GIS Mapping',
    'NB-IoT',
  ]);
  const [deploymentModel, setDeploymentModel] = useState('SaaS + Edge Hardware-as-a-Service on MeitY GovCloud.');
  const [security, setSecurity] = useState(
    'End-to-end encrypted payload using AES-256; device-to-cloud mutual TLS; zero open inbound ports on edge units; ISO 27001 certified cloud.'
  );
  const [dataHandling, setDataHandling] = useState(
    'All acoustic telemetry stored strictly in Indian data centers; audio stripped of voice frequencies; 99.9% uptime SLA.'
  );

  // Step 3: Implementation
  const [pilotPlan, setPilotPlan] = useState(
    'Phase 1: Mount 80 sensors across Swargate DMA-3 & 7. Phase 2: Live continuous monitoring and municipal alert triggers. Phase 3: Verification water balance audit.'
  );
  const [timelineWeeks, setTimelineWeeks] = useState(24);
  const [team, setTeam] = useState(
    'Dr. Nikhil Kulkarni (PhD Signal Processing, IIT Bombay), Priya Shinde (Embedded IoT Architect), 4 field hydraulics technicians.'
  );
  const [resources, setResources] = useState(
    '80 acoustic loggers, 4 field test calibrators, GIS software licenses, field testing vehicle.'
  );

  // Step 4: Commercial
  const [estimatedCost, setEstimatedCost] = useState('₹35,00,000');
  const [fundingRequired, setFundingRequired] = useState(35);
  const [paymentRequirements, setPaymentRequirements] = useState(
    'Direct Bank Transfer to Startup Escrow Account against Department Milestone Inspection Sign-off.'
  );

  const [milestones] = useState<Milestone[]>([
    {
      id: 'sm-1',
      title: 'Milestone 1: Sensor Deployment & Baseline Calibration',
      amount: 800000,
      description: 'Deploy 80 IoT acoustic logger nodes on valve chambers; establish baseline noise profile and GIS calibration.',
      status: 'Pending',
      paymentStatus: 'Pending',
      durationWeeks: 6,
      deliverables: ['GIS Sensor Topology Map', 'Hardware Installation Signoff', 'Baseline Acoustic Dataset'],
    },
    {
      id: 'sm-2',
      title: 'Milestone 2: Field Pilot & Algorithmic Leak Pinpointing',
      amount: 1200000,
      description: 'Live continuous monitoring; detect and report live leaks to municipal engineers; benchmark response SLA.',
      status: 'Pending',
      paymentStatus: 'Pending',
      durationWeeks: 12,
      deliverables: ['Live Leak Detection Incident Reports (min 10)', 'Engineer Mobile Alert Verification', 'Interim Pilot Report'],
    },
    {
      id: 'sm-3',
      title: 'Milestone 3: Performance Validation & Scale-Up Blueprint',
      amount: 1500000,
      description: 'Independent water audit validation; final KPI impact assessment and enterprise rollout specification.',
      status: 'Pending',
      paymentStatus: 'Pending',
      durationWeeks: 6,
      deliverables: ['Third-Party NRW Audit Report', 'Municipal Sign-off Certificate', 'City-wide Scale Up Proposal'],
    },
  ]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = submitSolution({
      challengeId: selectedChallenge.id,
      challengeTitle: selectedChallenge.title,
      department: selectedChallenge.department,
      startupId: 'startup-aquasense',
      startupName: 'AquaSense Technologies Pvt Ltd',
      solutionName,
      tagline: 'Precision Acoustic Sensing & Edge AI for Underground Pipeline Leak Detection',
      problemAddressed,
      solutionDescription,
      innovation,
      expectedImpact,
      architecture,
      technologies,
      deploymentModel,
      security,
      dataHandling,
      pilotPlan,
      timelineWeeks,
      team,
      resources,
      estimatedCost,
      fundingRequired,
      milestones,
      paymentRequirements,
      documents: [
        { name: 'DPIIT_Certificate_AquaSense.pdf', type: 'Certificate', size: '1.2 MB', verified: true },
        { name: 'Technical_Proposal_AquaHydro.pdf', type: 'Proposal', size: '4.8 MB', verified: true },
        { name: 'STQC_Cybersecurity_Compliance.pdf', type: 'Compliance', size: '2.1 MB', verified: true },
      ],
    });

    setSubmittedAppId(created.applicationId);
    setStep(6); // Success confirmation step
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gov-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-700/80 flex items-center justify-center text-white">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Submit Startup Solution Proposal</h2>
              <p className="text-xs text-slate-300">
                Official MSInS Pilot Sandbox Application (5-Step Submission)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress */}
        {step <= 5 && (
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {[
                { num: 1, label: 'Overview' },
                { num: 2, label: 'Technical' },
                { num: 3, label: 'Implementation' },
                { num: 4, label: 'Commercial' },
                { num: 5, label: 'Documents' },
              ].map((s) => (
                <div key={s.num} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      step === s.num
                        ? 'bg-purple-700 text-white shadow-sm'
                        : step > s.num
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {step > s.num ? <CheckCircle2 className="w-3.5 h-3.5" /> : s.num}
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:inline ${
                      step === s.num ? 'text-purple-900 font-bold' : 'text-slate-500'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-4">
          {/* Step 1: Solution Overview */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Target Government Challenge *
                </label>
                <select
                  value={challengeId}
                  onChange={(e) => setChallengeId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  {challenges.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.department} - {c.budget})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Solution Name *
                </label>
                <input
                  type="text"
                  required
                  value={solutionName}
                  onChange={(e) => setSolutionName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Problem Addressed
                </label>
                <textarea
                  rows={2}
                  value={problemAddressed}
                  onChange={(e) => setProblemAddressed(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Detailed Solution Description
                </label>
                <textarea
                  rows={3}
                  value={solutionDescription}
                  onChange={(e) => setSolutionDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Core Innovation & Unique Advantage
                  </label>
                  <textarea
                    rows={2}
                    value={innovation}
                    onChange={(e) => setInnovation(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Expected Civic Impact & ROI
                  </label>
                  <textarea
                    rows={2}
                    value={expectedImpact}
                    onChange={(e) => setExpectedImpact(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Technical Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  System Architecture & Hardware Integration
                </label>
                <textarea
                  rows={2}
                  value={architecture}
                  onChange={(e) => setArchitecture(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Deployment Model
                </label>
                <input
                  type="text"
                  value={deploymentModel}
                  onChange={(e) => setDeploymentModel(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Security, Encryption & Hardening
                  </label>
                  <textarea
                    rows={2}
                    value={security}
                    onChange={(e) => setSecurity(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Data Handling & Residency
                  </label>
                  <textarea
                    rows={2}
                    value={dataHandling}
                    onChange={(e) => setDataHandling(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>
              </div>

              {/* Technologies tags */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Core Technologies Employed
                </label>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-xs bg-purple-50 text-purple-800 font-semibold border border-purple-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Implementation */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Controlled Pilot Execution Plan
                </label>
                <textarea
                  rows={3}
                  value={pilotPlan}
                  onChange={(e) => setPilotPlan(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Estimated Timeline (Weeks)
                  </label>
                  <input
                    type="number"
                    value={timelineWeeks}
                    onChange={(e) => setTimelineWeeks(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Deployable Hardware & Resources
                  </label>
                  <input
                    type="text"
                    value={resources}
                    onChange={(e) => setResources(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Project Team & Domain Specialists
                </label>
                <textarea
                  rows={2}
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Step 4: Commercial */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Total Estimated Cost
                  </label>
                  <input
                    type="text"
                    value={estimatedCost}
                    onChange={(e) => setEstimatedCost(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Grant Funding Required (₹ Lakhs)
                  </label>
                  <input
                    type="number"
                    value={fundingRequired}
                    onChange={(e) => setFundingRequired(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none font-bold text-gov-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  Proposed Milestone Tranches
                </label>
                <div className="space-y-2">
                  {milestones.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-900">{m.title}</div>
                        <div className="text-slate-500 text-[11px]">{m.description}</div>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-slate-900">
                          ₹{(m.amount / 100000).toFixed(1)} Lakhs
                        </span>
                        <div className="text-[10px] text-slate-400">Tranche {idx + 1}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Payment & Escrow Disbursement Instructions
                </label>
                <input
                  type="text"
                  value={paymentRequirements}
                  onChange={(e) => setPaymentRequirements(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Step 5: Documents */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center space-y-2 bg-slate-50/50">
                <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="text-xs font-bold text-slate-700">Attach Supporting Credentials</h4>
                <p className="text-[11px] text-slate-500">
                  DPIIT recognition, STQC cybersecurity compliance, past pilot testimonials, and financial balance sheets
                </p>
                <button
                  type="button"
                  className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 shadow-xs"
                >
                  Browse Files
                </button>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Verified Attachments Attached to Proposal
                </label>
                {[
                  { name: 'DPIIT_Certificate_AquaSense.pdf', size: '1.2 MB', verified: true },
                  { name: 'Technical_Proposal_AquaHydro.pdf', size: '4.8 MB', verified: true },
                  { name: 'STQC_Cybersecurity_Compliance.pdf', size: '2.1 MB', verified: true },
                ].map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold text-slate-800">{doc.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{doc.size}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Confirmation Step */}
          {step === 6 && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">Solution Successfully Submitted!</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Your proposal has been logged in the Maharashtra State Innovation Sandbox registry.
                </p>
              </div>

              <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Application ID:</span>
                  <span className="font-mono font-bold text-gov-800">{submittedAppId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Submission Date:</span>
                  <span className="font-medium text-slate-800">
                    {new Date().toISOString().split('T')[0]}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Current Status:</span>
                  <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Under Eligibility Screening
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Next Stage:</span>
                  <span className="font-medium text-slate-800">
                    Department Scrutiny & Expert Technical Scoring
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-gov-700 hover:bg-gov-800 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {step <= 5 && (
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>

              {step < 5 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl shadow-sm transition-colors"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Solution</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
