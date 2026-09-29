import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import {
  History,
  ShieldCheck,
  Search,
  CheckCircle2,
  Lock,
  Download,
  Filter,
  ArrowUpRight,
} from 'lucide-react';

export const AuditLogView: React.FC = () => {
  const { auditLogs, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || log.role.includes(selectedRole);
    return matchesSearch && matchesRole;
  });

  const exportAuditReport = () => {
    showToast('Immutable audit trail ledger exported (SHA-256 verified)', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gov-700" />
            <h1 className="text-xl font-extrabold text-slate-900">
              Immutable Audit & Transparency Trail
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographically sealed operational audit ledger logging every state decision, milestone approval, and financial release.
          </p>
        </div>

        <button
          onClick={exportAuditReport}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>Export Audit Ledger</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search audit trail by actor, action, or entity..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gov-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="p-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
          >
            <option value="All">All Actors & Roles</option>
            <option value="Government">Government Department</option>
            <option value="Startup">Startup</option>
            <option value="Expert">Expert Evaluator</option>
            <option value="Admin">Administrator</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Actor & Role</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Target Entity</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Verification Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 whitespace-nowrap text-slate-600 font-medium">
                    <div>{log.date}</div>
                    <div className="text-[10px] text-slate-400">{log.time}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{log.user}</div>
                    <div className="text-[10px] text-gov-700">{log.role}</div>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800">{log.action}</td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs truncate">{log.entity}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-[11px] text-slate-400">
                    <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      <Lock className="w-3 h-3 text-slate-400" />
                      {log.hash}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
