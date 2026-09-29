import React from 'react';
import {
  Home,
  Radio,
  AlertTriangle,
  BarChart3,
  Bot,
  Info,
  CheckCircle2,
  Activity,
  Menu,
  X,
} from 'lucide-react';
import { PageId } from '../types';

interface SidebarProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
  mobileOpen: boolean;
  onToggleMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onSelectPage,
  mobileOpen,
  onToggleMobile,
}) => {
  const navItems: { id: PageId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: <Home className="w-5 h-5" /> },
    { id: 'sensor_monitoring', label: 'Sensor Monitoring', icon: <Radio className="w-5 h-5" /> },
    {
      id: 'anomaly_detection',
      label: 'Anomaly Detection',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'ai_model', label: 'AI Model', icon: <Bot className="w-5 h-5" /> },
    { id: 'system', label: 'System', icon: <Info className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={onToggleMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <span className="text-xl">🛰️</span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-white tracking-tight flex items-center gap-2">
                SkyGuard AI
              </h1>
              <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                AI Sensor Intelligence
              </p>
            </div>
          </div>
          <button
            onClick={onToggleMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="p-4 flex-1 overflow-y-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Navigation
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectPage(item.id);
                    if (mobileOpen) onToggleMobile();
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-medium text-sm transition-colors text-left ${
                    active
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <span className={active ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="my-5 border-t border-slate-800" />

          {/* System Status Section */}
          <div className="px-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              System Status
            </p>
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-center gap-2.5 text-xs font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span className="inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Dataset Ready</span>
            </div>
          </div>

          <div className="my-5 border-t border-slate-800" />

          {/* About Section */}
          <div className="px-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              About
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              SkyGuard AI monitors temperature, humidity, and pressure readings from Automatic
              Weather Stations and identifies unusual sensor behavior.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>SIH26073 • AI/ML</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">v1.0</span>
        </div>
      </aside>
    </>
  );
};
