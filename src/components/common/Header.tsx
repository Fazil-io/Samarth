import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Building2,
  Rocket,
  GraduationCap,
  ShieldAlert,
  Globe,
  Bell,
  Sparkles,
  ChevronDown,
  RotateCcw,
  Check,
  Menu,
  X,
} from 'lucide-react';

interface HeaderProps {
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu, isMobileMenuOpen }) => {
  const {
    currentRole,
    setRole,
    notifications,
    setIsDemoGuideOpen,
    resetDemoData,
    setActiveTab,
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const rolesConfig: { role: UserRole; title: string; email: string; icon: React.ReactNode; color: string }[] = [
    {
      role: 'public',
      title: 'Public Portal',
      email: 'Citizen / Visitor View',
      icon: <Globe className="w-4 h-4 text-emerald-600" />,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      role: 'government',
      title: 'Government Dept',
      email: 'government@demo.com',
      icon: <Building2 className="w-4 h-4 text-gov-600" />,
      color: 'bg-blue-50 text-gov-700 border-blue-200',
    },
    {
      role: 'startup',
      title: 'Startup (AquaSense)',
      email: 'startup@demo.com',
      icon: <Rocket className="w-4 h-4 text-purple-600" />,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      role: 'expert',
      title: 'Expert Evaluator',
      email: 'expert@demo.com',
      icon: <GraduationCap className="w-4 h-4 text-amber-600" />,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      role: 'admin',
      title: 'Platform Admin',
      email: 'admin@demo.com',
      icon: <ShieldAlert className="w-4 h-4 text-rose-600" />,
      color: 'bg-rose-50 text-rose-700 border-rose-200',
    },
  ];

  const currentRoleInfo = rolesConfig.find((r) => r.role === currentRole) || rolesConfig[0];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm w-full">
      {/* Top Government Ribbon */}
      <div className="bg-slate-900 text-slate-300 text-[10px] sm:text-[11px] px-3 sm:px-6 py-1.5 flex items-center justify-between border-b border-slate-800 gap-2 overflow-hidden">
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
          <div className="flex items-center gap-1 sm:gap-1.5 font-medium shrink-0">
            <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
            <span className="w-2 h-2 rounded-full bg-white inline-block" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span className="text-white ml-1 font-semibold truncate">
              महाराष्ट्र शासन <span className="hidden sm:inline">| Government of Maharashtra</span>
            </span>
          </div>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span className="text-slate-400 hidden lg:inline truncate">Maharashtra State Innovation Society (MSInS)</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={() => setIsDemoGuideOpen(true)}
            className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1 transition-colors text-[10px] sm:text-xs"
          >
            <Sparkles className="w-3 h-3 text-teal-300" />
            <span className="hidden sm:inline">Interactive Demo Guide (22 Steps)</span>
            <span className="sm:hidden">Demo Guide</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 shrink-0"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}

          <div
            onClick={() => {
              if (currentRole === 'public') setActiveTab('landing');
              else setActiveTab('dashboard');
            }}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-gov-700 to-gov-900 flex items-center justify-center text-white font-bold shadow-md shadow-gov-900/10 group-hover:scale-105 transition-transform shrink-0">
              <span className="text-lg sm:text-xl tracking-tight">GI</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-gov-700 transition-colors truncate">
                  GovInnovate
                </span>
                <span className="hidden xs:inline-block px-1.5 py-0.5 text-[9px] font-bold rounded bg-gov-100 text-gov-800 tracking-wide uppercase shrink-0">
                  MSInS
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden md:block truncate">
                Connecting Government Challenges with Startup Innovation
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls & Role Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Demo Guide Shortcut Pill */}
          <button
            onClick={() => setIsDemoGuideOpen(true)}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gov-50 text-gov-800 border border-gov-200 hover:bg-gov-100 transition-colors shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-gov-600" />
            <span>Workflow Walkthrough</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors shrink-0"
              title="Notifications"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-rose-600 text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 max-w-[calc(100vw-2rem)]">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-2">
                  <div className="font-semibold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                    <span>Notifications</span>
                    <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {notifications.length}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('notifications');
                      setIsNotifDropdownOpen(false);
                    }}
                    className="text-xs text-gov-600 hover:underline font-medium"
                  >
                    View All
                  </button>
                </div>
                <div className="divide-y divide-slate-100 max-h-64 sm:max-h-72 overflow-y-auto mt-2">
                  {notifications.slice(0, 4).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        if (n.linkTo) setActiveTab(n.linkTo);
                        setIsNotifDropdownOpen(false);
                      }}
                      className="p-2 sm:p-2.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-900 truncate pr-2">{n.title}</span>
                        <span className="text-[9px] text-slate-400 shrink-0">{n.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 transition-all text-left shadow-xs shrink-0"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                {currentRoleInfo.icon}
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {currentRoleInfo.title}
                </div>
                <div className="text-[10px] text-slate-500 leading-tight truncate max-w-[130px]">{currentRoleInfo.email}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 max-w-[calc(100vw-2rem)]">
                <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Active Role (Demo)
                </div>
                {rolesConfig.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => {
                      setRole(r.role);
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      currentRole === r.role ? 'bg-blue-50/60 font-semibold' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                        {r.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-slate-900 font-medium truncate">{r.title}</div>
                        <div className="text-[10px] text-slate-500 truncate">{r.email}</div>
                      </div>
                    </div>
                    {currentRole === r.role && <Check className="w-4 h-4 text-gov-600 shrink-0 ml-1" />}
                  </button>
                ))}
                <div className="mt-2 pt-2 border-t border-slate-100 px-3 flex items-center justify-between text-[11px]">
                  <button
                    onClick={() => {
                      resetDemoData();
                      setIsRoleDropdownOpen(false);
                    }}
                    className="text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Data</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsDemoGuideOpen(true);
                      setIsRoleDropdownOpen(false);
                    }}
                    className="text-gov-600 hover:text-gov-700 font-semibold"
                  >
                    Demo Guide
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
