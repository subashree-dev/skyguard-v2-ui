import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Shield,
  Activity,
  Radio,
  Thermometer,
  Droplets,
  Gauge,
  ArrowRight,
  Info,
} from 'lucide-react';
import {
  totalReadings,
  aiAnomalies,
  normalReadings,
  anomalyRate,
  criticalCount,
  warningCount,
  suspiciousCount,
  averageTrust,
  latestRecord,
  sensorData,
} from '../data/dataset';
import { PageId } from '../types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface OverviewPageProps {
  onNavigate: (page: PageId) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ onNavigate }) => {
  // Downsample data for the quick overview temperature trend chart for smooth rendering
  const chartData = React.useMemo(() => {
    const step = Math.max(1, Math.floor(sensorData.length / 100));
    return sensorData.filter((_, idx) => idx % step === 0).map((r) => ({
      time: r.timestamp.substring(5, 16),
      temperature: r.temperature_c,
      trust: r.trust_score,
    }));
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NORMAL':
        return (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-emerald-200">
                🟢 Current sensor status: <span className="uppercase">{status}</span>
              </p>
              <p className="text-sm text-emerald-300/80 mt-1">
                Sensor readings appear consistent with the learned normal pattern.
              </p>
            </div>
          </div>
        );
      case 'SUSPICIOUS':
        return (
          <div className="p-4 rounded-xl bg-yellow-950/40 border border-yellow-500/30 text-yellow-300 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-yellow-200">
                🟡 Current sensor status: <span className="uppercase">{status}</span>
              </p>
              <p className="text-sm text-yellow-300/80 mt-1">
                The reading differs slightly from the learned normal pattern.
              </p>
            </div>
          </div>
        );
      case 'WARNING':
        return (
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-amber-200">
                🟠 Current sensor status: <span className="uppercase">{status}</span>
              </p>
              <p className="text-sm text-amber-300/80 mt-1">
                Unusual sensor behavior detected — requires closer monitoring.
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-rose-200">
                🔴 Current sensor status: <span className="uppercase">{status}</span>
              </p>
              <p className="text-sm text-rose-300/80 mt-1">
                Severe deviation detected — urgent sensor inspection recommended.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Title & Introduction */}
      <div>
        <div className="flex items-center gap-3">
          <span className="text-3xl">🛰️</span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">SkyGuard AI</h1>
        </div>
        <h2 className="text-lg font-medium text-indigo-300 mt-1">
          Intelligent Sensor Monitoring & Anomaly Detection
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Intelligent analysis of temperature, humidity, and pressure observations for Automatic Weather Stations.
        </p>
      </div>

      {/* Top Status Banner */}
      {criticalCount > 0 ? (
        <div className="p-4 rounded-xl bg-amber-950/50 border border-amber-500/30 text-amber-200 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-sm font-medium">
            ⚠️ Dataset loaded — <strong className="font-bold">{criticalCount}</strong> critical
            sensor event(s) in record.
          </span>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-200 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">
            🟢 Dataset loaded — no critical sensor events in record.
          </span>
        </div>
      )}

      {/* System Snapshot (Key Metrics) */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>📊</span> System Snapshot
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
            <p className="text-xs text-slate-400 font-medium">📡 Total Readings</p>
            <p className="text-2xl font-bold text-white mt-1">{totalReadings.toLocaleString()}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
            <p className="text-xs text-slate-400 font-medium">🚨 AI Anomalies</p>
            <p className="text-2xl font-bold text-rose-400 mt-1">{aiAnomalies.toLocaleString()}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
            <p className="text-xs text-slate-400 font-medium">🛡️ Average Trust</p>
            <p className="text-2xl font-bold text-indigo-400 mt-1">{averageTrust.toFixed(1)}/100</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
            <p className="text-xs text-slate-400 font-medium">⚠️ Anomaly Rate</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">{anomalyRate.toFixed(1)}%</p>
          </div>
        </div>
      </section>

      {/* Latest Sensor Status */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <span>📡</span> Latest Sensor Status
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {latestRecord.station_id} • {latestRecord.timestamp}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1">
              <Thermometer className="w-4 h-4 text-orange-400" />
              <span>Temperature</span>
            </div>
            <p className="text-2xl font-bold text-white">{latestRecord.temperature_c.toFixed(1)} °C</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <span>Humidity</span>
            </div>
            <p className="text-2xl font-bold text-white">{latestRecord.humidity_pct.toFixed(1)} %</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1">
              <Gauge className="w-4 h-4 text-emerald-400" />
              <span>Pressure</span>
            </div>
            <p className="text-2xl font-bold text-white">{latestRecord.pressure_hpa.toFixed(1)} hPa</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1">
              <Shield className="w-4 h-4 text-indigo-400" />
              <span>Trust Score</span>
            </div>
            <p className="text-2xl font-bold text-indigo-300">{latestRecord.trust_score.toFixed(1)}/100</p>
          </div>
        </div>

        {/* Status Box */}
        {getStatusBadge(latestRecord.status)}

        {/* Rule-Based Explanation Box */}
        <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-indigo-200 text-sm flex items-start gap-3">
          <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <div>
              <strong className="font-semibold text-indigo-100">Rule-Based Explanation:</strong>{' '}
              <span className="text-indigo-200/90">{latestRecord.explanation}</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Deterministic rule-based explanation generated during offline batch processing.
            </p>
          </div>
        </div>
      </section>

      {/* Anomaly Summary */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🚨</span> Anomaly Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-medium">Normal</p>
              <p className="text-xl font-bold text-white">{normalReadings.toLocaleString()}</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-yellow-500 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-medium">Suspicious</p>
              <p className="text-xl font-bold text-yellow-300">{suspiciousCount.toLocaleString()}</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-medium">Warning</p>
              <p className="text-xl font-bold text-amber-300">{warningCount.toLocaleString()}</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-rose-500 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-medium">Critical</p>
              <p className="text-xl font-bold text-rose-300">{criticalCount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Analytics */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>📈</span> Quick Analytics
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-orange-400" />
              <span>Temperature Trend (°C)</span>
            </h4>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                  <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} domain={['auto', 'auto']} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#94a3b8', fontSize: '12px' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#f97316"
                    strokeWidth={2}
                    dot={false}
                    name="Temperature (°C)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <h4 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-400" />
                <span>Sensor Reliability</span>
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Average Trust</span>
                    <span className="font-semibold text-white">{averageTrust.toFixed(1)}/100</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(0, averageTrust))}%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Normal Readings</span>
                    <span className="text-sm font-semibold text-emerald-400">
                      {normalReadings.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Critical Events</span>
                    <span className="text-sm font-semibold text-rose-400">
                      {criticalCount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('analytics')}
              className="mt-6 w-full py-2.5 px-3 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold hover:bg-indigo-600/30 transition-colors flex items-center justify-center gap-2"
            >
              <span>View Deep Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* How SkyGuard Works */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🔄</span> How SkyGuard AI Works
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-2xl mb-2 block">1️⃣</span>
            <h4 className="font-bold text-white text-base mb-1">Collect</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Weather-station readings are collected for temperature, humidity and pressure.
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-2xl mb-2 block">2️⃣</span>
            <h4 className="font-bold text-white text-base mb-1">Analyze</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Isolation Forest learns the normal pattern of sensor measurements.
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-2xl mb-2 block">3️⃣</span>
            <h4 className="font-bold text-amber-300 text-base mb-1">Detect</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unusual combinations of readings are flagged as potential anomalies.
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-2xl mb-2 block">4️⃣</span>
            <h4 className="font-bold text-emerald-400 text-base mb-1">Trust</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every reading receives a trust score from 0 to 100 for easier monitoring.
            </p>
          </div>
        </div>
      </section>

      {/* Explore SkyGuard AI Quick Navigation */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>⚡</span> Explore SkyGuard AI
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('sensor_monitoring')}
            className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-2">
                <span>📡</span> Sensor Monitoring
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inspect individual sensor readings, health and reliability with the interactive time scrubber.
            </p>
          </button>

          <button
            onClick={() => onNavigate('anomaly_detection')}
            className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/50 transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>🚨</span> Anomaly Detection
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Find unusual readings, inspect AI-generated anomaly decisions, and view prototype fault types.
            </p>
          </button>

          <button
            onClick={() => onNavigate('ai_model')}
            className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                <span>🤖</span> AI Model
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              View Isolation Forest performance, confusion matrix evaluation, and test custom readings offline.
            </p>
          </button>
        </div>
      </section>

      <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-400">
        SkyGuard AI • SIH26073 • Intelligent Anomaly Detection for Automatic Weather Stations
      </div>
    </div>
  );
};
