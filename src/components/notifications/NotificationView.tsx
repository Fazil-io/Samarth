import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  AlertCircle,
  ExternalLink,
  Trash2,
} from 'lucide-react';

export const NotificationView: React.FC = () => {
  const { notifications, markNotificationRead, setActiveTab } = useApp();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gov-700" />
            <h1 className="text-xl font-extrabold text-slate-900">
              Notification & Alert Center
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time stage transitions, milestone verification requests, and treasury payment disbursements.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="divide-y divide-slate-100">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                markNotificationRead(notif.id);
                if (notif.linkTo) setActiveTab(notif.linkTo);
              }}
              className={`p-4 rounded-xl transition-all cursor-pointer flex items-start gap-4 ${
                !notif.read ? 'bg-blue-50/50' : 'hover:bg-slate-50'
              }`}
            >
              <div className="p-2 rounded-xl bg-white shadow-xs border border-slate-200 shrink-0 mt-0.5">
                {notif.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : notif.type === 'warning' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                ) : notif.type === 'alert' ? (
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                ) : (
                  <Info className="w-4 h-4 text-gov-600" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">{notif.title}</h4>
                  <span className="text-[10px] text-slate-400">{notif.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    Role: {notif.targetRole}
                  </span>
                  {!notif.read && (
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      Unread
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
