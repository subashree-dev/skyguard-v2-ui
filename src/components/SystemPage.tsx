import React from 'react';
import {
  Info,
  Target,
  AlertTriangle,
  Radio,
  Cpu,
  Workflow,
  Code2,
  Database,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { totalReadings, aiAnomalies } from '../data/dataset';

export const SystemPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">ℹ️</span>
          <h1 className="text-2xl font-bold text-white tracking-tight">SkyGuard AI System</h1>
        </div>
        <p className="text-slate-400 text-sm mt-1">
          Project information, architecture, workflow and technology stack.
        </p>
      </div>

      {/* Project Objective */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🎯</span> Project Objective
        </h3>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-sm font-medium">
            SkyGuard AI is an intelligent anomaly-detection system for Automatic Weather Station sensors.
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The system monitors temperature, relative humidity and station-level pressure to identify readings
            that differ significantly from the learned normal sensor pattern.
          </p>
          <p className="text-xs text-slate-400">The primary question addressed by the system is:</p>
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-base font-bold flex items-center gap-3">
            <span className="text-xl">💡</span>
            <span>Can I trust this sensor reading?</span>
          </div>
        </div>
      </section>

      {/* Problem Being Addressed */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>⚠️</span> Problem Being Addressed
        </h3>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            Automatic Weather Stations continuously generate sensor measurements in remote and unmanned
            locations. Harsh environments, calibration drift, hardware degradation, or communication glitches
            can produce abnormal, inconsistent, or misleading readings.
          </p>
          <p>
            SkyGuard AI provides an automated screening mechanism to identify potentially unreliable
            observations before they propagate into downstream meteorological modeling,
            aviation forecasts, or climate archives.
          </p>
        </div>
      </section>

      {/* Monitored Parameters */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>📡</span> Monitored Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <span className="text-2xl mb-2 block">🌡️</span>
            <h4 className="font-bold text-white text-base mb-1">Temperature</h4>
            <p className="text-xs text-indigo-300 font-mono mb-2">Unit: °C</p>
            <p className="text-xs text-slate-400">
              Detects unusual surface ambient temperature behavior, drift, and frozen sensor values.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <span className="text-2xl mb-2 block">💧</span>
            <h4 className="font-bold text-white text-base mb-1">Relative Humidity</h4>
            <p className="text-xs text-cyan-300 font-mono mb-2">Unit: %</p>
            <p className="text-xs text-slate-400">
              Detects abnormal humidity spikes, saturation latching, or dry-bias sensor degradation.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <span className="text-2xl mb-2 block">🌍</span>
            <h4 className="font-bold text-white text-base mb-1">Station Pressure</h4>
            <p className="text-xs text-emerald-300 font-mono mb-2">Unit: hPa</p>
            <p className="text-xs text-slate-400">
              Detects unexpected barometric jumps, venting blockages, and station-level pressure drops.
            </p>
          </div>
        </div>
      </section>

      {/* System Architecture */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🏗️</span> System Architecture
        </h3>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex flex-col items-center gap-3 text-xs max-w-xl mx-auto">
            <div className="w-full text-center py-2.5 px-4 rounded-xl bg-slate-800 border border-slate-700 font-semibold text-white">
              NOAA / NCEI GHCNh Weather Observation Data (Station INM00043278)
            </div>
            <span className="text-slate-500 font-bold">⬇</span>
            <div className="w-full text-center py-2.5 px-4 rounded-xl bg-slate-800 border border-slate-700 font-semibold text-indigo-300">
              Data Cleaning & Feature Engineering
            </div>
            <span className="text-slate-500 font-bold">⬇</span>
            <div className="w-full text-center py-2.5 px-4 rounded-xl bg-slate-800 border border-slate-700 font-semibold text-amber-300">
              Synthetic Sensor Fault Injection (Spikes, Drift, Stuck Scenarios)
            </div>
            <span className="text-slate-500 font-bold">⬇</span>
            <div className="w-full text-center py-2.5 px-4 rounded-xl bg-slate-800 border border-slate-700 font-semibold text-rose-300">
              Isolation Forest Machine Learning Model (200 Estimators, Contamination 0.07)
            </div>
            <span className="text-slate-500 font-bold">⬇</span>
            <div className="w-full text-center py-2.5 px-4 rounded-xl bg-slate-800 border border-slate-700 font-semibold text-cyan-300">
              Decision Function Anomaly Score & Normalized Trust Score (0–100)
            </div>
            <span className="text-slate-500 font-bold">⬇</span>
            <div className="w-full text-center py-3 px-4 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/30">
              🛰️ SkyGuard AI Interactive Operational Dashboard
            </div>
          </div>
        </div>
      </section>

      {/* End-to-End Workflow */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🔄</span> End-to-End Workflow
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-2xl mb-2 block">1️⃣</span>
            <h4 className="font-bold text-white text-sm mb-1">Data</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Weather observations are ingested from the NOAA/NCEI GHCNh meteorological baseline.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-2xl mb-2 block">2️⃣</span>
            <h4 className="font-bold text-white text-sm mb-1">Processing</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Relevant temperature, humidity and pressure features are cleaned and prepared.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-2xl mb-2 block">3️⃣</span>
            <h4 className="font-bold text-amber-300 text-sm mb-1">AI Detection</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Isolation Forest identifies observations that differ from the learned normal pattern.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-2xl mb-2 block">4️⃣</span>
            <h4 className="font-bold text-emerald-400 text-sm mb-1">Decision Support</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              The dashboard displays anomaly status, trust score, and an actionable explanation.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🛠️</span> Technology Stack
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>Development & Frontend</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <p className="text-slate-400">Framework & UI</p>
                <p className="font-medium text-slate-200">React 19, TypeScript, Vite, Tailwind CSS</p>
              </div>
              <div>
                <p className="text-slate-400">Visualization Engine</p>
                <p className="font-medium text-slate-200">Recharts (Interactive Time Series, Bar Charts)</p>
              </div>
              <div>
                <p className="text-slate-400">Iconography</p>
                <p className="font-medium text-slate-200">Lucide React</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>AI & Machine Learning</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <p className="text-slate-400">Machine Learning Algorithm</p>
                <p className="font-medium text-slate-200">Scikit-learn Isolation Forest Ensemble</p>
              </div>
              <div>
                <p className="text-slate-400">Baseline Dataset</p>
                <p className="font-medium text-slate-200">NOAA/NCEI GHCNh AWS Records (INM00043278)</p>
              </div>
              <div>
                <p className="text-slate-400">Rule Logic</p>
                <p className="font-medium text-slate-200">Sequential stuck sensor detection & range boundary checks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Prototype Dataset */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>📊</span> Current Prototype Dataset
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-medium">Baseline Readings</span>
            <p className="text-2xl font-bold text-white mt-1">{totalReadings.toLocaleString()}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-medium">Synthetic Anomalies</span>
            <p className="text-2xl font-bold text-amber-400 mt-1">{aiAnomalies.toLocaleString()}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-medium">Sensor Features</span>
            <p className="text-2xl font-bold text-cyan-400 mt-1">3</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-medium">ML Algorithm</span>
            <p className="text-base font-bold text-indigo-300 mt-2 truncate">Isolation Forest</p>
          </div>
        </div>
      </section>

      {/* Prototype Fault Scenarios */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🧩</span> Prototype Fault Scenarios
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              <span>Temperature Faults</span>
            </h4>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li><strong>Temperature Spike:</strong> Sudden unnatural thermal excursion</li>
              <li><strong>Temperature Drift:</strong> Gradual cumulative calibration degradation</li>
              <li><strong>Temperature Stuck:</strong> Unchanging sensor value over sequential cycles</li>
            </ul>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Humidity & Pressure Faults</span>
            </h4>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li><strong>Humidity Spike:</strong> Infeasible moisture surge exceeding saturation</li>
              <li><strong>Stuck Readings:</strong> Repetitive readings across static atmospheric states</li>
              <li>Additional fault scenarios can be incorporated as labeled sensor datasets expand.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Current Prototype Limitations */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>⚠️</span> Current Prototype Limitations
        </h3>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs leading-relaxed">
            The current prototype uses NOAA/NCEI baseline observations and synthetically injected sensor
            faults because the baseline dataset does not provide ground-truth labels for real sensor
            failures.
          </div>
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs leading-relaxed">
            Therefore, the current performance metrics demonstrate prototype behavior and should not be
            interpreted as validated real-world sensor-fault detection performance.
          </div>
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs leading-relaxed">
            🚀 <strong>Future Roadmap:</strong> Future iterations can integrate multi-station spatial cross-validation,
            larger labeled physical failure datasets, historical seasonal baselines, and edge IoT deployment.
          </div>
        </div>
      </section>

      {/* Final Project Message */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950 to-slate-900 border border-indigo-500/30 text-center space-y-2">
        <p className="text-lg font-bold text-white flex items-center justify-center gap-2">
          <span>🛰️</span> SkyGuard AI — Intelligent Sensor Anomaly Detection
        </p>
        <p className="text-xs text-slate-400">
          SIH26073 • Automatic Weather Station Sensor Intelligence
        </p>
      </div>
    </div>
  );
};
