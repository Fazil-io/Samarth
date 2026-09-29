import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileSpreadsheet,
  Download,
  Eye,
  FileText,
  CheckCircle2,
  Search,
  ExternalLink,
  X,
  Sparkles,
} from 'lucide-react';
import { TemplateItem } from '../../types';

export const TemplatesView: React.FC = () => {
  const { templates, showToast, setActiveTab, setRole } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingTemplate, setViewingTemplate] = useState<TemplateItem | null>(null);

  const filteredTemplates = templates.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (templateTitle: string) => {
    showToast(`Downloaded: "${templateTitle}" (Official MSInS Format)`, 'success');
  };

  const handleUseTemplate = (templateId: string) => {
    if (templateId === 'tpl-1') {
      setRole('government');
      setActiveTab('challenges');
      showToast('Loaded Problem Statement framework into Challenge Wizard.', 'info');
    } else if (templateId === 'tpl-2') {
      setRole('expert');
      setActiveTab('evaluations');
      showToast('Loaded Evaluation Scoring Rubric.', 'info');
    } else {
      showToast('Template downloaded for departmental use.', 'success');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-gov-700" />
            <h1 className="text-xl font-extrabold text-slate-900">
              Document & Template Center
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Standardized legal frameworks, MoUs, scoring rubrics, and procurement checklists approved by Government of Maharashtra.
          </p>
        </div>

        <div className="w-full sm:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gov-500"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gov-800 uppercase px-2 py-0.5 bg-blue-50 rounded border border-blue-200">
                  {template.category}
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  {template.fileFormat}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {template.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {template.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setViewingTemplate(template)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 py-1.5 px-2.5 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleDownload(template.title)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 py-1.5 px-3 rounded-lg transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => handleUseTemplate(template.id)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-white bg-gov-700 hover:bg-gov-800 py-1.5 px-3 rounded-lg shadow-xs transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Use</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Template Content Modal */}
      {viewingTemplate && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-gov-800 uppercase px-2 py-0.5 bg-blue-50 rounded">
                  {viewingTemplate.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {viewingTemplate.title}
                </h3>
              </div>
              <button
                onClick={() => setViewingTemplate(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">{viewingTemplate.description}</p>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Standard Content Specification Preview
              </label>
              <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto max-h-60">
                {viewingTemplate.contentSnippet}
              </pre>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400">
                Format: {viewingTemplate.fileFormat} • Downloaded {viewingTemplate.downloads} times
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(viewingTemplate.title)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Template</span>
                </button>
                <button
                  onClick={() => {
                    const id = viewingTemplate.id;
                    setViewingTemplate(null);
                    handleUseTemplate(id);
                  }}
                  className="px-4 py-2 bg-gov-700 hover:bg-gov-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
                >
                  Apply in Workflow
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
