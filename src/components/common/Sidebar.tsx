import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Target,
  FileCheck2,
  GraduationCap,
  Activity,
  CreditCard,
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
  FileText,
  History,
  Bell,
  Building,
  Rocket,
  Compass,
  FileSpreadsheet,
  CheckCircle,
  X,
} from 'lucide-react';

interface SidebarProps {
  isMobileMenuOpen?: boolean;
  onCloseMobileMenu?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileMenuOpen, onCloseMobileMenu }) => {
  const { currentRole, activeTab, setActiveTab, challenges, solutions, pilots, notifications } = useApp();

  const unreadNotifs = notifications.filter((n) => !n.read).length;
  const pendingSolutions = solutions.filter((s) => s.status === 'Screening' || s.status === 'Applied').length;
  const activePilotsCount = pilots.filter((p) => p.status === 'In Progress' || p.status === 'Planning').length;

  const getNavItems = () => {
    switch (currentRole) {
      case 'government':
        return [
          { id: 'dashboard', label: 'Department Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'challenges', label: 'Innovation Challenges', icon: <Target className="w-4 h-4" />, badge: challenges.length },
          { id: 'solutions', label: 'Startup Solutions', icon: <FileCheck2 className="w-4 h-4" />, badge: pendingSolutions },
          { id: 'evaluations', label: 'Expert Evaluations', icon: <GraduationCap className="w-4 h-4" /> },
          { id: 'pilots', label: 'Pilot Management', icon: <Activity className="w-4 h-4" />, badge: activePilotsCount },
          { id: 'milestones', label: 'Milestones & Funding', icon: <CreditCard className="w-4 h-4" /> },
          { id: 'validation', label: 'Validation Decisions', icon: <ShieldCheck className="w-4 h-4" /> },
          { id: 'procurement', label: 'Procurement Pathway', icon: <ShoppingBag className="w-4 h-4" /> },
          { id: 'scaleup', label: 'Multi-District Scale-Up', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'templates', label: 'Document & Templates', icon: <FileSpreadsheet className="w-4 h-4" /> },
          { id: 'audit', label: 'Audit & Transparency', icon: <History className="w-4 h-4" /> },
          { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, badge: unreadNotifs },
        ];

      case 'startup':
        return [
          { id: 'dashboard', label: 'Startup Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'discover', label: 'Discover Challenges', icon: <Compass className="w-4 h-4" />, badge: 'Smart Match' },
          { id: 'applications', label: 'My Proposals & Solutions', icon: <FileText className="w-4 h-4" /> },
          { id: 'pilots', label: 'My Active Pilots', icon: <Activity className="w-4 h-4" /> },
          { id: 'milestones', label: 'Milestone Deliverables', icon: <CheckCircle className="w-4 h-4" /> },
          { id: 'payments', label: 'Payments & Escrow', icon: <CreditCard className="w-4 h-4" /> },
          { id: 'profile', label: 'Startup Profile & Badges', icon: <Rocket className="w-4 h-4" /> },
          { id: 'templates', label: 'Government Templates', icon: <FileSpreadsheet className="w-4 h-4" /> },
          { id: 'notifications', label: 'Notifications & Alerts', icon: <Bell className="w-4 h-4" />, badge: unreadNotifs },
        ];

      case 'expert':
        return [
          { id: 'dashboard', label: 'Evaluator Console', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'evaluations', label: 'Score Proposals (6-Criteria)', icon: <GraduationCap className="w-4 h-4" /> },
          { id: 'challenges', label: 'Active Department Challenges', icon: <Target className="w-4 h-4" /> },
          { id: 'templates', label: 'Evaluation Scoring Rubric', icon: <FileSpreadsheet className="w-4 h-4" /> },
          { id: 'notifications', label: 'Review Assignments', icon: <Bell className="w-4 h-4" />, badge: unreadNotifs },
        ];

      case 'admin':
        return [
          { id: 'dashboard', label: 'Admin Command Center', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'challenges', label: 'Manage All Challenges', icon: <Target className="w-4 h-4" />, badge: challenges.length },
          { id: 'solutions', label: 'All Submitted Solutions', icon: <FileCheck2 className="w-4 h-4" /> },
          { id: 'pilots', label: 'All Active State Pilots', icon: <Activity className="w-4 h-4" /> },
          { id: 'procurement', label: 'Procurement Records', icon: <ShoppingBag className="w-4 h-4" /> },
          { id: 'scaleup', label: 'Scale-Up Projects', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'templates', label: 'Manage Template Center', icon: <FileSpreadsheet className="w-4 h-4" /> },
          { id: 'audit', label: 'Immutable Audit Trail', icon: <History className="w-4 h-4" /> },
        ];

      case 'public':
      default:
        return [
          { id: 'landing', label: 'Home & How It Works', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'discover', label: 'Browse Challenges', icon: <Compass className="w-4 h-4" />, badge: challenges.length },
          { id: 'templates', label: 'GovTech Templates', icon: <FileSpreadsheet className="w-4 h-4" /> },
          { id: 'audit', label: 'Public Transparency Portal', icon: <History className="w-4 h-4" /> },
        ];
    }
  };

  const navItems = getNavItems();

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    if (onCloseMobileMenu) onCloseMobileMenu();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={onCloseMobileMenu}
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-16 z-50 lg:z-0 w-72 max-w-[85vw] lg:w-64 h-full lg:h-[calc(100vh-4rem)] bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 ease-in-out shrink-0 overflow-y-auto pb-24 lg:pb-4 shadow-xl lg:shadow-none ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-4">
          {/* Mobile Top Header with Close Button */}
          <div className="lg:hidden flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gov-700 text-white font-bold flex items-center justify-center text-sm">
                SM
              </div>
              <span className="font-bold text-sm text-slate-900">Samarth Menu</span>
            </div>
            <button
              onClick={onCloseMobileMenu}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Active Role Indicator Card */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Active Environment
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800 capitalize">
                {currentRole === 'public' ? 'Public Visitor' : `${currentRole} Portal`}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
              {currentRole === 'government' && 'Water Resources / Urban Dev Dept'}
              {currentRole === 'startup' && 'AquaSense Technologies (Pune)'}
              {currentRole === 'expert' && 'COEP Tech Technical Panel'}
              {currentRole === 'admin' && 'MSInS State Administrator'}
              {currentRole === 'public' && 'Explore challenges & innovation results'}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gov-700 text-white shadow-sm shadow-gov-800/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-white' : 'text-slate-500'}>{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : typeof item.badge === 'string'
                          ? 'bg-teal-50 text-teal-700 border border-teal-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer info */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50 hidden lg:block">
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-gov-600 shrink-0" />
            <div>
              <div className="font-semibold text-slate-700">Samarth v2.4</div>
              <div>Gov of Maharashtra Sandbox</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
