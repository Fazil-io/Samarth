import React from 'react';
import { ChallengeStatus, SolutionStatus } from '../../types';

interface BadgeProps {
  status: ChallengeStatus | SolutionStatus | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, size = 'md', className = '' }) => {
  const getColors = () => {
    switch (status) {
      case 'Published':
      case 'Active':
      case 'Eligible':
      case 'Verified':
      case 'Achieved':
      case 'Paid':
      case 'Approved':
      case 'Procured':
      case 'Scaled':
      case 'Sanctioned':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      
      case 'Pilot Approved':
      case 'Active Pilot':
      case 'In Progress':
      case 'Pilot In Progress':
      case 'Processing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      
      case 'Screening':
      case 'Under Review':
      case 'Under Expert Review':
      case 'Pending':
      case 'Milestone Pending':
      case 'Procurement Review':
      case 'Compliance Check':
        return 'bg-amber-50 text-amber-700 border-amber-200';

      case 'Validated':
      case 'Recommend Pilot':
      case 'Pilot Ready':
        return 'bg-teal-50 text-teal-800 border-teal-200';

      case 'Conditionally Eligible':
      case 'Needs Improvement':
      case 'Request Revision':
        return 'bg-purple-50 text-purple-700 border-purple-200';

      case 'Not Eligible':
      case 'Rejected':
      case 'At Risk':
      case 'Closed':
        return 'bg-rose-50 text-rose-700 border-rose-200';

      case 'Draft':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs';
      case 'lg':
        return 'px-3 py-1.5 text-sm font-semibold';
      case 'md':
      default:
        return 'px-2.5 py-1 text-xs font-medium';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${getColors()} ${getSizeClasses()} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
};
