import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Clock,
  ArrowRight,
  ShieldAlert,
  BarChart3,
  Calendar,
} from 'lucide-react';

export const KpiAnalyticsView: React.FC = () => {
  const { pilots, setActiveTab } = useApp();
  const pilot = pilots[0]; // Primary Water Leakage pilot

  if (!pilot) {
    return <div className="p-8 text-center text-slate-500">No pilot data available.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-gov-700">
            Real-Time Field Telemetry & Independent Audit
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 mt-1">
            KPI & Pilot Performance Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Objective baseline vs actual performance benchmarking verified by third-party municipal audit.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('validation')}
            className="px-4 py-2 bg-gov-700 hover:bg-gov-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <span>Proceed to Validation Decision</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Highlight Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pilot.kpis.map((kpi) => (
          <div
            key={kpi.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-bold text-slate-900 leading-snug">{kpi.name}</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{kpi.status}</span>
              </span>
            </div>

            {/* Baseline vs Actual */}
            <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Pre-Pilot Baseline</div>
                <div className="text-xs font-bold text-slate-600 mt-0.5">{kpi.baseline}</div>
              </div>
              <div className="border-l border-slate-200">
                <div className="text-[10px] font-bold text-gov-800 uppercase">Actual Achieved</div>
                <div className="text-base font-black text-gov-800 mt-0.5">{kpi.actual || kpi.target}</div>
              </div>
            </div>

            <div className="text-xs text-slate-500 flex justify-between">
              <span>Target Benchmark:</span>
              <span className="font-bold text-slate-800">{kpi.target}</span>
            </div>

            {/* Visual Progress bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400 font-medium">Outcome Exceedance:</span>
                <span className="text-emerald-700 font-bold">114% of Target Met</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500 w-[95%]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Before vs After Visual Comparison Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Before vs After Field Pilot Impact Analysis
            </h3>
            <p className="text-xs text-slate-500">
              Measured in Pune Swargate & Kothrud Water Sectors over 6 months
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Validated by Municipal Water Audit
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Comparison Metric 1 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 block">
              Subsurface Leak Detection Time
            </span>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Before (Manual Listening Rods):</span>
                  <span className="font-bold text-slate-800">48.0 Hours</span>
                </div>
                <div className="w-full h-3 rounded-full bg-rose-200 overflow-hidden">
                  <div className="h-full bg-rose-500 w-[100%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-gov-800 mb-1">
                  <span>After (AquaHydro Acoustic Nodes):</span>
                  <span className="font-bold text-emerald-700">3.2 Hours (-93%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[15%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Metric 2 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 block">
              Non-Revenue Water Loss %
            </span>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Before Pilot Baseline:</span>
                  <span className="font-bold text-slate-800">38.0% Loss</span>
                </div>
                <div className="w-full h-3 rounded-full bg-rose-200 overflow-hidden">
                  <div className="h-full bg-rose-500 w-[76%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-gov-800 mb-1">
                  <span>After 6-Month Pilot:</span>
                  <span className="font-bold text-emerald-700">18.5% Loss (-19.5% abs)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[37%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Metric 3 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 block">
              Trench Excavation Precision
            </span>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Before (Approx Guesswork):</span>
                  <span className="font-bold text-slate-800">+/- 25 Meters</span>
                </div>
                <div className="w-full h-3 rounded-full bg-rose-200 overflow-hidden">
                  <div className="h-full bg-rose-500 w-[90%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-gov-800 mb-1">
                  <span>After (Acoustic Cross-Correlation):</span>
                  <span className="font-bold text-emerald-700">+/- 1.4 Meters</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[12%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Performance Trendline Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          Monthly Water Loss Trendline (6-Month Pilot Progression)
        </h3>
        <p className="text-xs text-slate-500">
          Consistent month-over-month reduction in unmetered physical distribution losses
        </p>

        <div className="grid grid-cols-6 gap-2 pt-4">
          {[
            { month: 'Month 1', value: '37.5%', height: 'h-36', valNum: 37.5 },
            { month: 'Month 2', value: '34.0%', height: 'h-32', valNum: 34.0 },
            { month: 'Month 3', value: '29.2%', height: 'h-28', valNum: 29.2 },
            { month: 'Month 4', value: '24.8%', height: 'h-24', valNum: 24.8 },
            { month: 'Month 5', value: '21.0%', height: 'h-20', valNum: 21.0 },
            { month: 'Month 6', value: '18.5%', height: 'h-16', valNum: 18.5, highlight: true },
          ].map((bar, i) => (
            <div key={i} className="flex flex-col items-center justify-end h-44 space-y-2">
              <span className="text-xs font-bold text-slate-900">{bar.value}</span>
              <div
                className={`w-full max-w-[48px] rounded-t-xl transition-all ${
                  bar.highlight ? 'bg-emerald-500' : 'bg-gov-600 hover:bg-gov-700'
                } ${bar.height}`}
              />
              <span className="text-[11px] font-semibold text-slate-500">{bar.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
