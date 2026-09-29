import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { OverviewPage } from './components/OverviewPage';
import { SensorMonitoringPage } from './components/SensorMonitoringPage';
import { AnomalyDetectionPage } from './components/AnomalyDetectionPage';
import { AnalyticsPage } from './components/AnalyticsPage';
import { AiModelPage } from './components/AiModelPage';
import { SystemPage } from './components/SystemPage';
import { PageId } from './types';
import { Menu, Activity, Radio, AlertCircle } from 'lucide-react';
import { criticalCount, latestRecord } from './data/dataset';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row antialiased">
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onSelectPage={setCurrentPage}
        mobileOpen={mobileMenuOpen}
        onToggleMobile={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-72">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h2 className="text-sm font-bold text-white tracking-wide uppercase">
                  Station {latestRecord.station_id}
                </h2>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono hidden sm:inline-block">
                  Station Dataset
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {criticalCount > 0 && (
              <button
                onClick={() => setCurrentPage('anomaly_detection')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold hover:bg-rose-900/50 transition-colors"
              >
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>{criticalCount} Critical</span>
              </button>
            )}

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="text-slate-500">Dataset Observation:</span>
              <span className="text-slate-200">{latestRecord.timestamp}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {currentPage === 'overview' && <OverviewPage onNavigate={setCurrentPage} />}
          {currentPage === 'sensor_monitoring' && <SensorMonitoringPage />}
          {currentPage === 'anomaly_detection' && <AnomalyDetectionPage />}
          {currentPage === 'analytics' && <AnalyticsPage />}
          {currentPage === 'ai_model' && <AiModelPage />}
          {currentPage === 'system' && <SystemPage />}
        </main>
      </div>
    </div>
  );
};
