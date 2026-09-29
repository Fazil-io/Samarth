import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { DemoGuideModal } from './components/common/DemoGuideModal';
import { LandingPage } from './components/landing/LandingPage';
import { GovDashboard } from './components/government/GovDashboard';
import { EligibilityScreeningView } from './components/government/EligibilityScreeningView';
import { StartupDashboard } from './components/startup/StartupDashboard';
import { StartupProfileView } from './components/startup/StartupProfileView';
import { ChallengeMarketplace } from './components/challenges/ChallengeMarketplace';
import { ExpertDashboard } from './components/expert/ExpertDashboard';
import { PilotManagementView } from './components/pilot/PilotManagementView';
import { MilestoneTrackingView } from './components/pilot/MilestoneTrackingView';
import { ValidationView } from './components/validation/ValidationView';
import { ProcurementView } from './components/procurement/ProcurementView';
import { ScaleUpView } from './components/scaleup/ScaleUpView';
import { TemplatesView } from './components/templates/TemplatesView';
import { AuditLogView } from './components/audit/AuditLogView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { NotificationView } from './components/notifications/NotificationView';
import {
  LayoutDashboard,
  Target,
  FileCheck2,
  Activity,
  CreditCard,
  ShieldCheck,
  History,
  Rocket,
  Compass,
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentRole, activeTab, setActiveTab } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    // If public role on landing tab
    if (currentRole === 'public' && activeTab === 'landing') {
      return <LandingPage />;
    }

    switch (activeTab) {
      case 'landing':
        return <LandingPage />;

      case 'dashboard':
        if (currentRole === 'government') return <GovDashboard />;
        if (currentRole === 'startup') return <StartupDashboard />;
        if (currentRole === 'expert') return <ExpertDashboard />;
        if (currentRole === 'admin') return <AdminDashboard />;
        return <LandingPage />;

      case 'challenges':
      case 'discover':
        return <ChallengeMarketplace />;

      case 'solutions':
      case 'applications':
        return <EligibilityScreeningView />;

      case 'evaluations':
        return <ExpertDashboard />;

      case 'pilots':
        return <PilotManagementView />;

      case 'milestones':
      case 'payments':
        return <MilestoneTrackingView />;

      case 'validation':
        return <ValidationView />;

      case 'procurement':
        return <ProcurementView />;

      case 'scaleup':
        return <ScaleUpView />;

      case 'templates':
      case 'reports':
        return <TemplatesView />;

      case 'audit':
        return <AuditLogView />;

      case 'profile':
        return <StartupProfileView />;

      case 'notifications':
      case 'messages':
        return <NotificationView />;

      default:
        return <GovDashboard />;
    }
  };

  const isPublicLanding = currentRole === 'public' && activeTab === 'landing';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans w-full max-w-full overflow-x-hidden">
      {/* Top Header */}
      <Header
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Main Body */}
      <div className="flex-1 flex w-full relative">
        {/* Sidebar (shown on desktop and in mobile drawer, except full landing) */}
        {!isPublicLanding && (
          <Sidebar
            isMobileMenuOpen={isMobileMenuOpen}
            onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Dynamic Content */}
        <main
          className={`flex-1 p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-24 lg:pb-8 transition-all duration-200 overflow-x-hidden ${
            isPublicLanding ? 'max-w-7xl px-3 sm:px-6' : ''
          }`}
        >
          {renderContent()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setActiveTab(currentRole === 'public' ? 'landing' : 'dashboard')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold py-1 px-2 rounded-lg transition-colors ${
            activeTab === 'dashboard' || activeTab === 'landing'
              ? 'text-gov-700 font-bold bg-gov-50'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('challenges')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold py-1 px-2 rounded-lg transition-colors ${
            activeTab === 'challenges' || activeTab === 'discover'
              ? 'text-gov-700 font-bold bg-gov-50'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Challenges</span>
        </button>

        {currentRole === 'government' && (
          <button
            onClick={() => setActiveTab('solutions')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold py-1 px-2 rounded-lg transition-colors ${
              activeTab === 'solutions' ? 'text-gov-700 font-bold bg-gov-50' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Screening</span>
          </button>
        )}

        {currentRole === 'startup' && (
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold py-1 px-2 rounded-lg transition-colors ${
              activeTab === 'profile' ? 'text-gov-700 font-bold bg-gov-50' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Rocket className="w-4 h-4" />
            <span>Profile</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('pilots')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold py-1 px-2 rounded-lg transition-colors ${
            activeTab === 'pilots' ? 'text-gov-700 font-bold bg-gov-50' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Pilots</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold py-1 px-2 rounded-lg transition-colors ${
            activeTab === 'audit' ? 'text-gov-700 font-bold bg-gov-50' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Audit</span>
        </button>
      </div>

      {/* Global Interactive Elements */}
      <DemoGuideModal />
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
