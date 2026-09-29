import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Shield,
  Search,
  Filter,
  Download,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Info,
} from 'lucide-react';
import {
  sensorData,
  totalReadings,
  aiAnomalies,
  anomalyRate,
  criticalCount,
  faultTypeCounts,
} from '../data/dataset';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';

export const AnomalyDetectionPage: React.FC = () => {
  // Find first anomaly index to be interesting by default, or default to 0
  const firstAnomalyIndex = useMemo(() => {
    const idx = sensorData.findIndex((r) => r.ai_anomaly === 1);
    return idx >= 0 ? idx : 0;
  }, []);

  const [selectedIndex, setSelectedIndex] = useState<number>(firstAnomalyIndex);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const selected = sensorData[selectedIndex] || sensorData[0];
  const trust = selected.trust_score;

  // All flagged anomalies
  const anomaliesList = useMemo(() => {
    return sensorData.filter((r) => r.ai_anomaly === 1);
  }, []);

  // Filtered anomalies
  const filteredAnomalies = useMemo(() => {
    return anomaliesList.filter((r) => {
      const matchesSearch =
        r.timestamp.includes(searchTerm) ||
        r.explanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.anomaly_type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [anomaliesList, searchTerm, statusFilter]);

  // Fault types bar chart data
  const faultChartData = useMemo(() => {
    return Object.entries(faultTypeCounts).map(([type, count]) => ({
      name: type.replace('_', ' '),
      count,
    }));
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
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">🚨</span>
          <h1 className="text-2xl font-bold text-white tracking-tight">Anomaly Detection</h1>
        </div>
        <p className="text-slate-400 text-sm mt-1">
          Identify unusual weather-station readings using the Isolation Forest anomaly-detection model.
        </p>
      </div>

      {/* Reading Selection Slider */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔎</span>
            <h3 className="font-semibold text-white text-sm">Analyze a Sensor Reading</h3>
          </div>
          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <button
              onClick={() => setSelectedIndex(0)}
              title="Jump to oldest"
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedIndex((prev) => Math.max(0, prev - 1))}
              disabled={selectedIndex <= 0}
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
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedIndex(sensorData.length - 1)}
              title="Jump to latest"
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
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between items-center text-xs text-slate-400 mt-2 font-mono">
            <span>Index 0</span>
            <span className="text-amber-300 font-sans font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Timestamp: {selected.timestamp}
            </span>
            <span>Index {sensorData.length - 1}</span>
          </div>
        </div>
      </section>

      {/* Sensor Measurements */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>📡</span> Sensor Measurements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-medium">🌡️ Temperature</span>
            <p className="text-2xl font-bold text-white mt-1">{selected.temperature_c.toFixed(2)} °C</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-medium">💧 Humidity</span>
            <p className="text-2xl font-bold text-white mt-1">{selected.humidity_pct.toFixed(2)} %</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-medium">🌍 Pressure</span>
            <p className="text-2xl font-bold text-white mt-1">{selected.pressure_hpa.toFixed(2)} hPa</p>
          </div>
        </div>
      </section>

      {/* AI Decision */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🤖</span> AI Decision
        </h3>
        {selected.ai_anomaly === 1 ? (
          <div className="p-5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200">
            <p className="font-bold text-base text-rose-300 flex items-center gap-2">
              <span>🚨</span> ANOMALY DETECTED
            </p>
            <p className="text-sm text-rose-200/90 mt-2 leading-relaxed">
              The Isolation Forest model classified this sensor reading as unusual compared with the learned normal pattern.
            </p>
          </div>
        ) : (
          <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200">
            <p className="font-bold text-base text-emerald-300 flex items-center gap-2">
              <span>🟢</span> NORMAL READING
            </p>
            <p className="text-sm text-emerald-200/90 mt-2 leading-relaxed">
              The Isolation Forest model found this reading consistent with the learned normal pattern.
            </p>
          </div>
        )}
      </section>

      {/* Trust Score & Anomaly Score */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-400" />
              Trust Score
            </span>
            <span className="text-2xl font-bold text-indigo-300">{trust.toFixed(1)}/100</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                trust >= 70 ? 'bg-emerald-500' : trust >= 40 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(100, Math.max(0, trust))}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-400">📊 Anomaly Score (Decision Function)</span>
          <p className="text-3xl font-mono font-bold text-white mt-2">
            {selected.anomaly_score.toFixed(4)}
          </p>
          <span className="text-[11px] text-slate-400 mt-2">
            Values &lt; 0 typically indicate isolation anomaly in model feature space.
          </span>
        </div>
      </section>

      {/* Why was this reading flagged? */}
      <section className="space-y-2">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>💡</span> Why was this reading flagged?
        </h3>
        <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/25 text-indigo-200 text-sm">
          <p className="leading-relaxed font-medium">{selected.explanation}</p>
        </div>
        <p className="text-xs text-slate-400">
          The rule-based explanation describes observable sensor behavior evaluated during offline batch processing (not generated in real-time by an LLM). The synthetic fault label used during prototype testing is not treated as an explanation.
        </p>
      </section>

      {/* Anomaly Status */}
      <section className="space-y-2">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🚦</span> Anomaly Status
        </h3>
        {selected.status === 'NORMAL' && (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-sm font-medium">
            🟢 NORMAL — No significant deviation detected.
          </div>
        )}
        {selected.status === 'SUSPICIOUS' && (
          <div className="p-4 rounded-xl bg-yellow-950/40 border border-yellow-500/30 text-yellow-300 text-sm font-medium">
            🟡 SUSPICIOUS — The reading differs from the learned normal pattern.
          </div>
        )}
        {selected.status === 'WARNING' && (
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-sm font-medium">
            🟠 WARNING — The reading requires closer inspection.
          </div>
        )}
        {selected.status === 'CRITICAL' && (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-sm font-medium">
            🔴 CRITICAL — The reading shows a strong deviation from the learned normal pattern.
          </div>
        )}
      </section>

      {/* Anomaly Summary Metrics */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>📊</span> Anomaly Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 font-medium">Total Readings</p>
            <p className="text-2xl font-bold text-white mt-1">{totalReadings.toLocaleString()}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 font-medium">AI Anomalies</p>
            <p className="text-2xl font-bold text-rose-400 mt-1">{aiAnomalies.toLocaleString()}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 font-medium">Anomaly Rate</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">{anomalyRate.toFixed(1)}%</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 font-medium">Critical</p>
            <p className="text-2xl font-bold text-rose-400 mt-1">{criticalCount.toLocaleString()}</p>
          </div>
        </div>
      </section>

      {/* Detected Anomalies Table with Filtering */}
      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <span>📋</span> Detected Anomalies ({filteredAnomalies.length} Flagged)
          </h3>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search anomalies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-48"
              />
            </div>

            {/* Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-1.5 px-3 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="SUSPICIOUS">Suspicious</option>
              <option value="WARNING">Warning</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 sticky top-0 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider z-10">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Temp (°C)</th>
                  <th className="py-3 px-4">Humidity (%)</th>
                  <th className="py-3 px-4">Pressure (hPa)</th>
                  <th className="py-3 px-4">Trust</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Explanation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredAnomalies.length > 0 ? (
                  filteredAnomalies.map((r, i) => {
                    const actualIdx = sensorData.indexOf(r);
                    const isSelected = actualIdx === selectedIndex;
                    return (
                      <tr
                        key={i}
                        onClick={() => setSelectedIndex(actualIdx)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-rose-950/40 text-rose-100 font-semibold'
                            : 'hover:bg-slate-800/40 text-slate-300'
                        }`}
                      >
                        <td className="py-2.5 px-4 font-sans whitespace-nowrap">
                          {r.timestamp.substring(0, 16)}
                        </td>
                        <td className="py-2.5 px-4">{r.temperature_c.toFixed(1)}</td>
                        <td className="py-2.5 px-4">{r.humidity_pct.toFixed(1)}</td>
                        <td className="py-2.5 px-4">{r.pressure_hpa.toFixed(1)}</td>
                        <td className="py-2.5 px-4 text-indigo-300 font-semibold">
                          {r.trust_score.toFixed(1)}
                        </td>
                        <td className="py-2.5 px-4 font-sans">{getStatusBadge(r.status)}</td>
                        <td className="py-2.5 px-4 font-sans text-slate-300 max-w-xs truncate">
                          {r.explanation}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400 font-sans">
                      No matching anomalies found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Fault Types in Prototype Dataset */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🧩</span> Fault Types in Prototype Dataset
        </h3>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={faultChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  tick={{ fontSize: 11 }}
                  angle={-10}
                  textAnchor="end"
                />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#94a3b8', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#f43f5e" radius={[4, 4, 0, 0]}>
                  {faultChartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={['#f43f5e', '#fb923c', '#eab308', '#38bdf8'][index % 4]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            These fault categories come from the synthetic fault-injection dataset used to evaluate the prototype.
          </p>
        </div>
      </section>
    </div>
  );
};
