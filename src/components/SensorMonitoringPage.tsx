import React, { useState } from 'react';
import {
  Radio,
  Thermometer,
  Droplets,
  Gauge,
  Shield,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Info,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { sensorData } from '../data/dataset';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceDot,
} from 'recharts';

export const SensorMonitoringPage: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(sensorData.length - 1);

  const selected = sensorData[selectedIndex] || sensorData[sensorData.length - 1];
  const trust = selected.trust_score;

  // Chart data downsampled for smooth visualization
  const chartData = React.useMemo(() => {
    const step = Math.max(1, Math.floor(sensorData.length / 120));
    return sensorData.filter((_, idx) => idx % step === 0).map((r) => ({
      index: sensorData.indexOf(r),
      time: r.timestamp.substring(5, 16),
      temperature: r.temperature_c,
      status: r.status,
    }));
  }, []);

  // Last 15 readings
  const recentReadings = React.useMemo(() => {
    return sensorData.slice(-15).reverse();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NORMAL':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
            NORMAL
          </span>
        );
      case 'SUSPICIOUS':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-yellow-950 text-yellow-300 border border-yellow-500/30">
            SUSPICIOUS
          </span>
        );
      case 'WARNING':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-950 text-amber-300 border border-amber-500/30">
            WARNING
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-rose-950 text-rose-300 border border-rose-500/30">
            CRITICAL
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">📡</span>
          <h1 className="text-2xl font-bold text-white tracking-tight">Sensor Monitoring</h1>
        </div>
        <p className="text-slate-400 text-sm mt-1">
          Inspect weather-station measurements and evaluate sensor reliability.
        </p>
      </div>

      {/* Sensor Reading Selector Card */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎚️</span>
            <h3 className="font-semibold text-white text-sm">Select Sensor Reading</h3>
          </div>
          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <button
              onClick={() => setSelectedIndex(0)}
              title="Jump to oldest reading"
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedIndex((prev) => Math.max(0, prev - 1))}
              disabled={selectedIndex <= 0}
              title="Previous reading"
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 rounded bg-slate-950 text-xs font-mono text-slate-300 border border-slate-800">
              #{selectedIndex} / {sensorData.length - 1}
            </span>
            <button
              onClick={() => setSelectedIndex((prev) => Math.min(sensorData.length - 1, prev + 1))}
              disabled={selectedIndex >= sensorData.length - 1}
              title="Next reading"
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedIndex(sensorData.length - 1)}
              title="Jump to latest reading"
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <input
            type="range"
            min={0}
            max={sensorData.length - 1}
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="flex justify-between items-center text-xs text-slate-400 mt-2 font-mono">
            <span>Start: {sensorData[0]?.timestamp.substring(0, 10)}</span>
            <span className="text-indigo-300 font-sans font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              Timestamp: {selected.timestamp}
            </span>
            <span>Latest: {sensorData[sensorData.length - 1]?.timestamp.substring(0, 10)}</span>
          </div>
        </div>
      </section>

      {/* Current Sensor Measurements */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🌡️</span> Current Sensor Measurements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-orange-400" />
                Temperature
              </span>
              <span className="text-xs font-mono text-slate-400">°C</span>
            </div>
            <p className="text-3xl font-extrabold text-white">{selected.temperature_c.toFixed(2)} °C</p>
            <p className="text-xs text-slate-400 mt-2">Surface ambient temperature reading</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-cyan-400" />
                Relative Humidity
              </span>
              <span className="text-xs font-mono text-slate-400">%</span>
            </div>
            <p className="text-3xl font-extrabold text-white">{selected.humidity_pct.toFixed(2)} %</p>
            <p className="text-xs text-slate-400 mt-2">Atmospheric moisture content</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-emerald-400" />
                Station Pressure
              </span>
              <span className="text-xs font-mono text-slate-400">hPa</span>
            </div>
            <p className="text-3xl font-extrabold text-white">{selected.pressure_hpa.toFixed(2)} hPa</p>
            <p className="text-xs text-slate-400 mt-2">Station barometric level</p>
          </div>
        </div>
      </section>

      {/* Sensor Health & Status */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🩺</span> Sensor Health
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-400" />
                Sensor Trust Score
              </span>
              <span className="text-xl font-bold text-indigo-300">{trust.toFixed(1)}/100</span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  trust >= 70
                    ? 'bg-emerald-500'
                    : trust >= 40
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(100, Math.max(0, trust))}%` }}
              />
            </div>

            <div>
              {trust >= 70 ? (
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>High confidence in this sensor reading.</span>
                </div>
              ) : trust >= 40 ? (
                <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>Moderate confidence — reading should be monitored.</span>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>Low confidence — reading requires investigation.</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <span className="text-xs font-semibold text-slate-400 block">Sensor Status</span>

            {selected.status === 'NORMAL' && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200">
                <p className="font-bold text-sm text-emerald-300 flex items-center gap-2">
                  <span>🟢</span> SENSOR STATUS: NORMAL
                </p>
                <p className="text-xs text-emerald-300/80 mt-1.5 leading-relaxed">
                  The AI model considers this reading consistent with the learned normal pattern.
                </p>
              </div>
            )}

            {selected.status === 'SUSPICIOUS' && (
              <div className="p-4 rounded-xl bg-yellow-950/40 border border-yellow-500/30 text-yellow-200">
                <p className="font-bold text-sm text-yellow-300 flex items-center gap-2">
                  <span>🟡</span> SENSOR STATUS: SUSPICIOUS
                </p>
                <p className="text-xs text-yellow-300/80 mt-1.5 leading-relaxed">
                  The reading differs from the learned normal pattern and should be monitored.
                </p>
              </div>
            )}

            {selected.status === 'WARNING' && (
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200">
                <p className="font-bold text-sm text-amber-300 flex items-center gap-2">
                  <span>🟠</span> SENSOR STATUS: WARNING
                </p>
                <p className="text-xs text-amber-300/80 mt-1.5 leading-relaxed">
                  The reading shows unusual behavior and may require investigation.
                </p>
              </div>
            )}

            {selected.status === 'CRITICAL' && (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200">
                <p className="font-bold text-sm text-rose-300 flex items-center gap-2">
                  <span>🔴</span> SENSOR STATUS: CRITICAL
                </p>
                <p className="text-xs text-rose-300/80 mt-1.5 leading-relaxed">
                  The AI model has identified a highly unusual sensor reading.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Diagnostic Explanation (Rule-Based) */}
      <section className="space-y-2">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>📋</span> Diagnostic Explanation (Rule-Based)
        </h3>
        <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/25 text-indigo-200 text-sm flex items-start gap-3">
          <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <p className="leading-relaxed">{selected.explanation}</p>
            <p className="text-[11px] text-slate-400 mt-2">
              Rule-based explanation generated during offline batch processing (not generated in real-time by an LLM).
            </p>
          </div>
        </div>
      </section>

      {/* Reading Details */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>📋</span> Reading Details
        </h3>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Station ID</span>
              <span className="font-mono font-medium text-white">{selected.station_id}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Timestamp</span>
              <span className="font-mono font-medium text-white">{selected.timestamp}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Reading Index</span>
              <span className="font-mono font-medium text-white">{selectedIndex}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">AI Prediction</span>
              <span
                className={`font-semibold ${
                  selected.ai_anomaly === 1 ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {selected.ai_anomaly === 1 ? 'Anomaly' : 'Normal'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Anomaly Score</span>
              <span className="font-mono font-medium text-white">
                {selected.anomaly_score.toFixed(4)}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Trust Score</span>
              <span className="font-mono font-medium text-indigo-300">
                {selected.trust_score.toFixed(1)}/100
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Temperature Trend across readings */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🌡️</span> Temperature Trend
        </h3>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
          <p className="text-xs text-slate-400 mt-3">
            Temperature trend across the available weather-station readings.
          </p>
        </div>
      </section>

      {/* Recent Sensor Readings Table */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <span>📈</span> Recent Sensor Readings (Last 15)
          </h3>
          <span className="text-xs text-slate-400">Click any row to inspect</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Temp (°C)</th>
                  <th className="py-3 px-4">Humidity (%)</th>
                  <th className="py-3 px-4">Pressure (hPa)</th>
                  <th className="py-3 px-4">Trust</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {recentReadings.map((r, i) => {
                  const actualIdx = sensorData.indexOf(r);
                  const isSelected = actualIdx === selectedIndex;
                  return (
                    <tr
                      key={i}
                      onClick={() => setSelectedIndex(actualIdx)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-indigo-950/40 text-indigo-100 font-semibold'
                          : 'hover:bg-slate-800/40 text-slate-300'
                      }`}
                    >
                      <td className="py-2.5 px-4 font-sans">{r.timestamp.substring(0, 16)}</td>
                      <td className="py-2.5 px-4">{r.temperature_c.toFixed(1)}</td>
                      <td className="py-2.5 px-4">{r.humidity_pct.toFixed(1)}</td>
                      <td className="py-2.5 px-4">{r.pressure_hpa.toFixed(1)}</td>
                      <td className="py-2.5 px-4 text-indigo-300">{r.trust_score.toFixed(1)}</td>
                      <td className="py-2.5 px-4 font-sans">{getStatusBadge(r.status)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
