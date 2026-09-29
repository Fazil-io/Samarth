import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Building2,
  FileText,
  Activity,
  Shield,
  Plus,
  Trash2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { KPI, Milestone } from '../../types';

interface CreateChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateChallengeModal: React.FC<CreateChallengeModalProps> = ({ isOpen, onClose }) => {
  const { addChallenge } = useApp();
  const [step, setStep] = useState(1);

  // Form State
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Water Resources Department & MJP');
  const [problemDescription, setProblemDescription] = useState('');
  const [currentSituation, setCurrentSituation] = useState('');
  const [expectedOutcome, setExpectedOutcome] = useState('');
  const [location, setLocation] = useState('Pune Municipal Corporation & Pimpri Chinchwad');
  const [district, setDistrict] = useState('Pune');
  const [problemCategory, setProblemCategory] = useState('Water & Urban Infrastructure');

  // Step 2: Requirements
  const [functionalReqs, setFunctionalReqs] = useState<string[]>([
    'Non-invasive or tap-mounted acoustic / pressure sensors',
    'Battery-operated IoT nodes with minimum 3-year autonomous life',
    'Web-based GIS dashboard showing pipe health and leak heatmaps',
  ]);
  const [newFuncReq, setNewFuncReq] = useState('');

  const [technicalReqs, setTechnicalReqs] = useState<string[]>([
    '4G/NB-IoT or LoRaWAN communication capability',
    'Machine learning model to distinguish leak acoustic signatures from traffic noise',
    'Submersible IP68 rating for subsurface sensors',
  ]);
  const [newTechReq, setNewTechReq] = useState('');

  const [requiredTech, setRequiredTech] = useState<string[]>([
    'IoT Acoustic Sensors',
    'Machine Learning',
    'GIS / SCADA',
  ]);
  const [newTech, setNewTech] = useState('');

  const [dataReqs, setDataReqs] = useState(
    'Municipal pipe GIS layout and inlet telemetry provided under standard Department NDA.'
  );
  const [cybersecurityReqs, setCybersecurityReqs] = useState(
    'All data stored on MeitY-empaneled Indian cloud servers with AES-256 data-in-transit encryption.'
  );

  // Step 3: Pilot Definition
  const [pilotDuration, setPilotDuration] = useState('6 Months');
  const [pilotLocation, setPilotLocation] = useState('Pune Swargate Water Distribution Sector (15 km testbed)');
  const [budget, setBudget] = useState('₹35 Lakhs');
  const [budgetValue, setBudgetValue] = useState(35);

  const [kpis, setKpis] = useState<KPI[]>([
    { id: 'k1', name: 'Leakage Detection Response Time', target: '< 4 Hours', baseline: '48 Hours', unit: 'Hours', status: 'On Track' },
    { id: 'k2', name: 'Non-Revenue Water Loss Reduction', target: '< 20% NRW (15% absolute reduction)', baseline: '38% NRW', unit: '%', status: 'On Track' },
    { id: 'k3', name: 'Acoustic Triangulation Accuracy', target: 'Within +/- 2 Meters', baseline: '+/- 25 Meters', unit: 'Meters', status: 'On Track' },
  ]);

  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: 'm1', title: 'Milestone 1: Prototype Deployment & Baseline Profile', amount: 800000, description: 'Deploy 80 logger units on valve chambers; establish baseline noise map.', status: 'Pending', paymentStatus: 'Pending', deliverables: ['GIS Map', 'Hardware Installation Signoff'] },
    { id: 'm2', title: 'Milestone 2: Field Pilot & Algorithmic Leak Pinpointing', amount: 1200000, description: 'Live continuous monitoring; detect and report live leaks to municipal engineers.', status: 'Pending', paymentStatus: 'Pending', deliverables: ['Live Incident Reports', 'Engineer SMS Verification'] },
    { id: 'm3', title: 'Milestone 3: Performance Validation & Scale-Up Blueprint', amount: 1500000, description: 'Independent water audit validation; final KPI impact assessment.', status: 'Pending', paymentStatus: 'Pending', deliverables: ['Third-Party Audit', 'Municipal Sign-off'] },
  ]);

  // Step 4: Legal & Compliance
  const [legalIpClauses, setLegalIpClauses] = useState(
    'Core sensor algorithm IP remains with startup. Government of Maharashtra receives perpetual royalty-free civic license for public utility usage across Maharashtra.'
  );
  const [riskConsiderations, setRiskConsiderations] = useState(
    'Traffic disruption during sensor chamber installation will be mitigated via night work (1 AM - 5 AM). Physical tampering insured by startup.'
  );
  const [procurementPathway, setProcurementPathway] = useState(
    'Applicable procurement pathway: Maharashtra State Innovative Procurement Policy / Rule 149 GFR Innovation Exemption for validated pilots.'
  );

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    addChallenge({
      title: title || 'Smart Water Leakage Detection & Non-Revenue Water Reduction',
      department,
      location,
      district,
      budget,
      budgetValue,
      timeline: pilotDuration,
      timelineMonths: 6,
      problemCategory,
      problemDescription: problemDescription || 'Municipal water distribution pipelines experience acute unmetered physical losses. Real-time acoustic sensing is needed to pinpoint underground leaks in urban sectors.',
      currentSituation: currentSituation || 'Response time from leak occurrence to repair is 48-72 hours with high road excavation costs.',
      expectedOutcome: expectedOutcome || 'Reduce water leakage response time to under 4 hours and save 15% treated drinking water.',
      functionalReqs,
      technicalReqs,
      requiredTech,
      dataReqs,
      cybersecurityReqs,
      pilotDuration,
      pilotLocation,
      kpis,
      milestones,
      legalIpClauses,
      procurementPathway,
      successCriteria: ['Minimum 80 sensors active', 'Zero false dry excavations', 'Demonstrated 15% reduction in NRW'],
    });

    onClose();
  };

  const addQuickTemplateData = () => {
    setTitle('Smart Water Leakage Detection & Non-Revenue Water Reduction');
    setDepartment('Water Resources Department & MJP');
    setLocation('Pune Municipal Corporation & Pimpri Chinchwad');
    setDistrict('Pune');
    setProblemCategory('Water & Urban Infrastructure');
    setProblemDescription(
      'Municipal water distribution pipelines in dense urban zones experience non-revenue water (NRW) losses exceeding 35% due to aging underground ductile iron pipes, hidden bursts, and illegal tapping. Traditional manual acoustic listening rods take 48-72 hours to pinpoint leaks, leading to millions of liters wasted daily and road cave-ins.'
    );
    setCurrentSituation(
      'Current response time from citizen complaint to ground repair is ~48 hours. No real-time sensor network exists to detect subsurface micro-leaks before they manifest as major street bursts.'
    );
    setExpectedOutcome(
      'Achieve continuous acoustic/pressure monitoring across a pilot zone (min 15 km pipeline). Pinpoint leak locations within +/- 2 meters in less than 4 hours. Reduce NRW loss by at least 15% in the pilot zone.'
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gov-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gov-700/80 flex items-center justify-center text-sky-300">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Create Government Innovation Challenge</h2>
              <p className="text-xs text-slate-300">
                Structured formulation for startup discovery and pilot sandbox testing
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
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
          <div className="flex items-center justify-between max-w-xl mx-auto">
            {[
              { num: 1, label: 'Challenge Info' },
              { num: 2, label: 'Requirements' },
              { num: 3, label: 'Pilot Sandbox' },
              { num: 4, label: 'Legal & Procurement' },
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step === s.num
                      ? 'bg-gov-700 text-white shadow-sm'
                      : step > s.num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:inline ${
                    step === s.num ? 'text-gov-800 font-bold' : 'text-slate-500'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-5">
          {/* Quick Demo Pre-fill Button */}
          {step === 1 && !title && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
              <span className="text-blue-900 font-medium">
                Want to pre-fill with the demo water leakage problem statement?
              </span>
              <button
                type="button"
                onClick={addQuickTemplateData}
                className="px-3 py-1 bg-gov-700 hover:bg-gov-800 text-white rounded-lg font-semibold transition-colors"
              >
                Auto-Fill Demo Challenge
              </button>
            </div>
          )}

          {/* Step 1: Challenge Information */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Challenge Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smart Water Leakage Detection & Non-Revenue Water Reduction"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Government Department *
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-500 focus:outline-none"
                  >
                    <option>Water Resources Department & MJP</option>
                    <option>Urban Development Department</option>
                    <option>Transport Department & Traffic Police</option>
                    <option>Public Health Department</option>
                    <option>Agriculture Department</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Problem Category
                  </label>
                  <input
                    type="text"
                    value={problemCategory}
                    onChange={(e) => setProblemCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Location / Urban Body *
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Pune Municipal Corporation"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    District
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Pune"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Problem Description *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail the operational challenge, physical pain point, and scale of inefficiency..."
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Current Situation & Baseline Bottleneck
                  </label>
                  <textarea
                    rows={2}
                    value={currentSituation}
                    onChange={(e) => setCurrentSituation(e.target.value)}
                    placeholder="e.g. Response takes 48 hours; high exploratory digging costs..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Expected Outcome
                  </label>
                  <textarea
                    rows={2}
                    value={expectedOutcome}
                    onChange={(e) => setExpectedOutcome(e.target.value)}
                    placeholder="e.g. Real-time leak pinpointing within 4 hours; 15% water loss reduction..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Requirements */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Functional Requirements
                </label>
                <div className="space-y-1.5 mb-2">
                  {functionalReqs.map((req, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <span>• {req}</span>
                      <button
                        type="button"
                        onClick={() => setFunctionalReqs(functionalReqs.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add functional requirement..."
                    value={newFuncReq}
                    onChange={(e) => setNewFuncReq(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newFuncReq.trim()) {
                        setFunctionalReqs([...functionalReqs, newFuncReq.trim()]);
                        setNewFuncReq('');
                      }
                    }}
                    className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-medium"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Technical Requirements & Hardware Readiness
                </label>
                <div className="space-y-1.5 mb-2">
                  {technicalReqs.map((req, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <span>• {req}</span>
                      <button
                        type="button"
                        onClick={() => setTechnicalReqs(technicalReqs.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add technical requirement..."
                    value={newTechReq}
                    onChange={(e) => setNewTechReq(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newTechReq.trim()) {
                        setTechnicalReqs([...technicalReqs, newTechReq.trim()]);
                        setNewTechReq('');
                      }
                    }}
                    className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-medium"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Data Sharing & Telemetry Requirements
                  </label>
                  <textarea
                    rows={2}
                    value={dataReqs}
                    onChange={(e) => setDataReqs(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Cybersecurity & Data Residency
                  </label>
                  <textarea
                    rows={2}
                    value={cybersecurityReqs}
                    onChange={(e) => setCybersecurityReqs(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Pilot Definition */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Pilot Duration
                  </label>
                  <select
                    value={pilotDuration}
                    onChange={(e) => setPilotDuration(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                  >
                    <option>3 Months</option>
                    <option>6 Months</option>
                    <option>9 Months</option>
                    <option>12 Months</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Grant / Pilot Budget
                  </label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. ₹35 Lakhs"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Pilot Testbed Location
                  </label>
                  <input
                    type="text"
                    value={pilotLocation}
                    onChange={(e) => setPilotLocation(e.target.value)}
                    placeholder="e.g. Pune Ward 4"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>
              </div>

              {/* KPIs Table */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Target Key Performance Indicators (KPIs)
                  </label>
                  <span className="text-[11px] text-slate-400">Must be objectively verifiable</span>
                </div>
                <div className="space-y-2">
                  {kpis.map((kpi, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Metric</span>
                        <div className="font-semibold text-slate-800">{kpi.name}</div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Baseline</span>
                        <div className="text-slate-600">{kpi.baseline}</div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Target</span>
                        <div className="font-bold text-gov-700">{kpi.target}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestones Preview */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  Tranche Milestones (Total: {budget})
                </label>
                <div className="space-y-2">
                  {milestones.map((m, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-slate-900">{m.title}</div>
                        <div className="text-slate-500 text-[11px]">{m.description}</div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-slate-900">₹{(m.amount / 100000).toFixed(1)} L</span>
                        <div className="text-[10px] text-slate-400">Escrow Tranche</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Legal & Compliance */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Intellectual Property (IP) Ownership Terms
                </label>
                <textarea
                  rows={2}
                  value={legalIpClauses}
                  onChange={(e) => setLegalIpClauses(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Risk Considerations & Operational Mitigation
                </label>
                <textarea
                  rows={2}
                  value={riskConsiderations}
                  onChange={(e) => setRiskConsiderations(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Applicable Post-Pilot Procurement Pathway
                </label>
                <input
                  type="text"
                  value={procurementPathway}
                  onChange={(e) => setProcurementPathway(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Ready for Departmental Publication</span>
                </div>
                <p className="text-emerald-800 leading-relaxed">
                  Upon publishing, this challenge will be immediately broadcast on the GovInnovate Marketplace. Verified startups across Maharashtra will receive smart-match notifications.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
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

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-gov-700 hover:bg-gov-800 rounded-xl shadow-sm transition-colors"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublish}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Publish Challenge</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
