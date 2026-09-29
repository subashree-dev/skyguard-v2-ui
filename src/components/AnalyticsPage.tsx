import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  TrendingUp,
  Thermometer,
  Droplets,
  Gauge,
  Shield,
  Info,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  sensorData,
  totalReadings,
  normalReadings,
  aiAnomalies,
  averageTrust,
  statusCounts,
  faultTypeCounts,
  highTrustCount,
  mediumTrustCount,
  lowTrustCount,
} from '../data/dataset';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  Legend,
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = 20;

  // Downsample data for smooth line charts (120 data points)
  const timeSeriesData = useMemo(() => {
    const step = Math.max(1, Math.floor(sensorData.length / 120));
    return sensorData.filter((_, idx) => idx % step === 0).map((r) => ({
      time: r.timestamp.substring(5, 16),
      temperature: r.temperature_c,
      humidity: r.humidity_pct,
      pressure: r.pressure_hpa,
      trust: r.trust_score,
      status: r.status,
    }));
  }, []);

  // Status chart data
  const statusChartData = useMemo(() => {
    return [
      { name: 'Normal', count: statusCounts.NORMAL, color: '#10b981' },
      { name: 'Suspicious', count: statusCounts.SUSPICIOUS, color: '#eab308' },
      { name: 'Warning', count: statusCounts.WARNING, color: '#f97316' },
      { name: 'Critical', count: statusCounts.CRITICAL, color: '#ef4444' },
    ];
  }, []);

  // Fault chart data
  const faultChartData = useMemo(() => {
    return Object.entries(faultTypeCounts).map(([type, count]) => ({
      name: type.replace('_', ' '),
      count,
    }));
  }, []);

  // Recent data paginated
  const recentData = useMemo(() => {
    return [...sensorData].reverse();
  }, []);

  const totalPages = Math.ceil(recentData.length / pageSize);
  const paginatedData = recentData.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

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
          <span className="text-2xl">📊</span>
          <h1 className="text-2xl font-bold text-white tracking-tight">Sensor Analytics</h1>
        </div>
        <p className="text-slate-400 text-sm mt-1">
          Visual analysis of weather-station readings, sensor reliability and anomaly patterns.
        </p>
      </div>

      {/* Analytics Overview Metrics */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>📌</span> Analytics Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-medium">Total Readings</span>
            <p className="text-2xl font-bold text-white mt-1">{totalReadings.toLocaleString()}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-medium">Normal</span>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{normalReadings.toLocaleString()}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-medium">AI Anomalies</span>
            <p className="text-2xl font-bold text-rose-400 mt-1">{aiAnomalies.toLocaleString()}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-medium">Average Trust</span>
            <p className="text-2xl font-bold text-indigo-400 mt-1">{averageTrust.toFixed(1)}/100</p>
          </div>
        </div>
      </section>

      {/* Temperature Trend */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-orange-400" />
          <span>Temperature Trend (°C)</span>
        </h3>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            Temperature variation across the available weather-station observations.
          </p>
        </div>
      </section>

      {/* Humidity Trend */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Droplets className="w-4 h-4 text-cyan-400" />
          <span>Humidity Trend (%)</span>
        </h3>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} domain={['auto', 'auto']} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#94a3b8', fontSize: '12px' }}
                />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={false}
                  name="Relative Humidity (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Relative humidity variation across the observations.
          </p>
        </div>
      </section>

      {/* Pressure Trend */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Gauge className="w-4 h-4 text-emerald-400" />
          <span>Pressure Trend (hPa)</span>
        </h3>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} domain={['auto', 'auto']} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#94a3b8', fontSize: '12px' }}
                />
                <Line
                  type="monotone"
                  dataKey="pressure"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                  name="Station Pressure (hPa)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Station-level barometric pressure variation across the dataset.
          </p>
        </div>
      </section>

      {/* Anomaly Analytics (Distribution & Fault Types) */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🚨</span> Anomaly Analytics
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status Distribution */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="font-semibold text-white text-sm mb-3">Anomaly Status Distribution</h4>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                  <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#94a3b8', fontSize: '12px' }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {statusChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Fault Types */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="font-semibold text-white text-sm mb-3">Prototype Fault Scenarios</h4>
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
                  <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]}>
                    {faultChartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={['#ec4899', '#f43f5e', '#fb923c', '#a855f7'][index % 4]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Sensor Trust Analysis */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Shield className="w-4 h-4 text-indigo-400" />
          <span>Sensor Trust Analysis</span>
        </h3>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#94a3b8', fontSize: '12px' }}
                />
                <Line
                  type="monotone"
                  dataKey="trust"
                  stroke="#818cf8"
                  strokeWidth={2}
                  dot={false}
                  name="Trust Score (/100)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Trust score is derived from the Isolation Forest decision function and normalized to a 0–100 scale.
          </p>
        </div>
      </section>

      {/* Trust Categories */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>📊</span> Trust Score Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-emerald-400 text-sm">🟢 High Trust</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300">
                &ge; 70
              </span>
            </div>
            <p className="text-3xl font-extrabold text-white">{highTrustCount.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-1">Readings with strong confidence</p>
          </div>

          <div className="bg-slate-900 border border-yellow-500/30 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-yellow-400 text-sm">🟡 Medium Trust</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-yellow-950 text-yellow-300">
                40–69
              </span>
            </div>
            <p className="text-3xl font-extrabold text-white">{mediumTrustCount.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-1">Readings needing observation</p>
          </div>

          <div className="bg-slate-900 border border-rose-500/30 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-rose-400 text-sm">🔴 Low Trust</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300">
                &lt; 40
              </span>
            </div>
            <p className="text-3xl font-extrabold text-white">{lowTrustCount.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-1">Readings with high anomaly likelihood</p>
          </div>
        </div>
      </section>

      {/* Recent Sensor Data Table */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <span>📋</span> Recent Sensor Data ({sensorData.length} Total Records)
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage <= 0}
              className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-400 font-mono">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage >= totalPages - 1}
              className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
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
                {paginatedData.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-800/40 text-slate-300 transition-colors">
                    <td className="py-2.5 px-4 font-sans">{r.timestamp.substring(0, 16)}</td>
                    <td className="py-2.5 px-4">{r.temperature_c.toFixed(1)}</td>
                    <td className="py-2.5 px-4">{r.humidity_pct.toFixed(1)}</td>
                    <td className="py-2.5 px-4">{r.pressure_hpa.toFixed(1)}</td>
                    <td className="py-2.5 px-4 text-indigo-300">{r.trust_score.toFixed(1)}</td>
                    <td className="py-2.5 px-4 font-sans">{getStatusBadge(r.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Analytics Note */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs flex items-start gap-3">
        <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Analytics Note:</strong> The current dataset is based on
          NOAA/NCEI baseline weather observations with synthetically injected sensor faults for
          prototype evaluation.
        </p>
      </div>
    </div>
  );
};
