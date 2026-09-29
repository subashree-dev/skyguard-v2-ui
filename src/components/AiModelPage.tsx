import React, { useState, useMemo } from 'react';
import {
  Bot,
  Cpu,
  Layers,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Shield,
  HelpCircle,
  Play,
  Info,
} from 'lucide-react';
import {
  sensorData,
  averageTrust,
  simulateReading,
} from '../data/dataset';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export const AiModelPage: React.FC = () => {
  // Live Simulator state
  const [simTemp, setSimTemp] = useState<number>(28.5);
  const [simHumidity, setSimHumidity] = useState<number>(75.0);
  const [simPressure, setSimPressure] = useState<number>(1012.0);

  const simResult = useMemo(() => {
    return simulateReading(simTemp, simHumidity, simPressure);
  }, [simTemp, simHumidity, simPressure]);

  // Downsample anomaly scores for line chart
  const scoreChartData = useMemo(() => {
    const step = Math.max(1, Math.floor(sensorData.length / 120));
    return sensorData.filter((_, idx) => idx % step === 0).map((r) => ({
      time: r.timestamp.substring(5, 16),
      score: r.anomaly_score,
    }));
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">🤖</span>
          <h1 className="text-2xl font-bold text-white tracking-tight">AI Model Intelligence</h1>
        </div>
        <p className="text-slate-400 text-sm mt-1">
          Isolation Forest based unsupervised anomaly detection for Automatic Weather Station sensor readings.
        </p>
      </div>

      {/* Model Overview */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🧠</span> Model Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="font-bold text-white text-base flex items-center gap-2 mb-2">
              <span>🌲</span> Algorithm
            </h4>
            <p className="font-semibold text-indigo-300 text-sm">Isolation Forest</p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              An unsupervised machine-learning algorithm designed to identify unusual observations
              by isolating anomalies in random feature partitions.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="font-bold text-white text-base flex items-center gap-2 mb-2">
              <span>📡</span> Input Features
            </h4>
            <ul className="text-xs text-slate-300 space-y-1.5 mt-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                <strong>Temperature</strong> (°C)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <strong>Relative Humidity</strong> (%)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <strong>Station Pressure</strong> (hPa)
              </li>
            </ul>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="font-bold text-white text-base flex items-center gap-2 mb-2">
              <span>🎯</span> Output
            </h4>
            <ul className="text-xs text-slate-300 space-y-1.5 mt-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <strong>Anomaly Decision</strong> (Normal vs Anomaly)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <strong>Anomaly Score</strong> (Decision Function)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <strong>Trust Score</strong> (0–100 scale)
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How Isolation Forest Works */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🌲</span> How Isolation Forest Works
        </h3>
        <p className="text-xs text-slate-400">
          Instead of learning every possible type of faulty sensor, Isolation Forest learns the
          general pattern of normal sensor observations.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-2xl mb-2 block">1️⃣</span>
            <h4 className="font-bold text-white text-sm mb-1">Learn</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              The model analyzes combinations of temperature, humidity and pressure.
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-2xl mb-2 block">2️⃣</span>
            <h4 className="font-bold text-white text-sm mb-1">Isolate</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unusual observations are easier to isolate than normal observations.
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-2xl mb-2 block">3️⃣</span>
            <h4 className="font-bold text-amber-300 text-sm mb-1">Detect</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Readings that are isolated quickly are treated as potential anomalies.
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-2xl mb-2 block">4️⃣</span>
            <h4 className="font-bold text-emerald-400 text-sm mb-1">Trust</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              The model output is converted into a 0–100 trust score.
            </p>
          </div>
        </div>
      </section>

      {/* Model Configuration */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>⚙️</span> Model Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-medium">Estimators</span>
            <p className="text-2xl font-bold text-white mt-1">200</p>
            <p className="text-xs text-slate-400 mt-1">Number of isolation trees in ensemble</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-medium">Contamination</span>
            <p className="text-2xl font-bold text-amber-400 mt-1">7%</p>
            <p className="text-xs text-slate-400 mt-1">Expected proportion of outliers (0.07)</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-medium">Random State</span>
            <p className="text-2xl font-bold text-indigo-400 mt-1">42</p>
            <p className="text-xs text-slate-400 mt-1">Deterministic seed for reproducibility</p>
          </div>
        </div>
        <p className="text-xs text-slate-400">
          The current prototype uses 200 Isolation Forest estimators with a contamination parameter of 0.07.
        </p>
      </section>

      {/* Offline Model Evaluation */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>📊</span> Offline Model Evaluation
        </h3>
        <p className="text-xs text-slate-400">
          Evaluation results computed offline on the prototype synthetic fault-injection benchmark. These represent offline model testing, not live runtime performance.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-medium">Accuracy</span>
            <p className="text-2xl font-bold text-emerald-400 mt-1">92%</p>
            <p className="text-[11px] text-slate-400 mt-1">Offline benchmark accuracy</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-medium">Anomaly Precision</span>
            <p className="text-2xl font-bold text-amber-400 mt-1">36%</p>
            <p className="text-[11px] text-slate-400 mt-1">Positive predictive value on faults</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-medium">Anomaly Recall</span>
            <p className="text-2xl font-bold text-cyan-400 mt-1">40%</p>
            <p className="text-[11px] text-slate-400 mt-1">Sensitivity on injected faults</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-medium">Anomaly F1</span>
            <p className="text-2xl font-bold text-indigo-400 mt-1">38%</p>
            <p className="text-[11px] text-slate-400 mt-1">Harmonic mean of precision & recall</p>
          </div>
        </div>
      </section>

      {/* Confusion Matrix */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🎯</span> Confusion Matrix
        </h3>
        <p className="text-xs text-slate-400">
          Offline evaluation results from prototype training benchmark on synthetic fault injections:
        </p>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 overflow-x-auto shadow-sm">
          <table className="w-full text-center text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="py-2.5 px-4 text-left text-xs font-semibold text-slate-400 uppercase">
                  Class
                </th>
                <th className="py-2.5 px-4 text-xs font-semibold text-emerald-400 uppercase">
                  Predicted Normal
                </th>
                <th className="py-2.5 px-4 text-xs font-semibold text-rose-400 uppercase">
                  Predicted Anomaly
                </th>
                <th className="py-2.5 px-4 text-xs font-semibold text-slate-400 uppercase">
                  Total Actual
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              <tr>
                <td className="py-3 px-4 text-left font-sans font-semibold text-slate-300">
                  Actual Normal
                </td>
                <td className="py-3 px-4 bg-emerald-950/20 font-bold text-emerald-300">
                  1,063 <span className="text-xs font-normal text-emerald-400/80 block">True Negative</span>
                </td>
                <td className="py-3 px-4 bg-yellow-950/20 font-bold text-yellow-300">
                  54 <span className="text-xs font-normal text-yellow-400/80 block">False Positive</span>
                </td>
                <td className="py-3 px-4 text-slate-400">1,117</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-left font-sans font-semibold text-slate-300">
                  Actual Anomaly
                </td>
                <td className="py-3 px-4 bg-yellow-950/20 font-bold text-yellow-300">
                  45 <span className="text-xs font-normal text-yellow-400/80 block">False Negative</span>
                </td>
                <td className="py-3 px-4 bg-rose-950/20 font-bold text-rose-300">
                  30 <span className="text-xs font-normal text-rose-400/80 block">True Positive</span>
                </td>
                <td className="py-3 px-4 text-slate-400">75</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Performance Interpretation */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🔍</span> Performance Interpretation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-5">
            <h4 className="font-bold text-emerald-300 text-sm flex items-center gap-2 mb-2">
              <span>🟢</span> Normal Reading Detection
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              The prototype correctly identified a large majority of normal observations (95.2% True Negative rate),
              minimizing false alarms during standard operational periods.
            </p>
          </div>

          <div className="bg-slate-900 border border-yellow-500/30 rounded-xl p-5">
            <h4 className="font-bold text-yellow-300 text-sm flex items-center gap-2 mb-2">
              <span>🟡</span> Anomaly Detection
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              The anomaly-class metrics show that synthetic faults are harder to identify reliably. This
              highlights the need for more representative labeled fault data during future validation.
            </p>
          </div>
        </div>
      </section>

      {/* Anomaly Score Chart */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>📈</span> Anomaly Score (Decision Function)
        </h3>
        <p className="text-xs text-slate-400">
          Isolation Forest produces a decision-function score for each observation. SkyGuard AI uses this score
          as the basis for its trust calculation. Lower values indicate greater deviation from normal patterns.
        </p>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#94a3b8', fontSize: '12px' }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#a855f7"
                  strokeWidth={2}
                  dot={false}
                  name="Decision Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Trust Score Generation */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🛡️</span> Trust Score Generation
        </h3>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <p className="text-xs text-slate-400">
            The Isolation Forest decision-function values are min-max normalized to a 0–100 scale:
          </p>
          <div className="p-3 bg-slate-950 font-mono text-xs text-indigo-300 rounded-lg border border-slate-800">
            Trust_Score = ((Score - Min_Score) / (Max_Score - Min_Score)) × 100
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Current Average Trust</span>
              <span className="font-semibold text-white">{averageTrust.toFixed(1)}/100</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-indigo-500 h-3 rounded-full"
                style={{ width: `${Math.min(100, Math.max(0, averageTrust))}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Testing Simulator */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🧪</span> Custom Reading Simulation (Offline Heuristics)
        </h3>
        <p className="text-xs text-slate-400">
          Adjust the sliders below to simulate how physical sensor boundaries and heuristic decision rules evaluate hypothetical weather measurements offline:
        </p>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Temp Slider */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                <span>Temperature</span>
                <span className="font-mono text-orange-400 font-bold">{simTemp.toFixed(1)} °C</span>
              </div>
              <input
                type="range"
                min={-5}
                max={55}
                step={0.5}
                value={simTemp}
                onChange={(e) => setSimTemp(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>-5 °C</span>
                <span>Normal: 15–40°C</span>
                <span>55 °C</span>
              </div>
            </div>

            {/* Humidity Slider */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                <span>Relative Humidity</span>
                <span className="font-mono text-cyan-400 font-bold">{simHumidity.toFixed(1)} %</span>
              </div>
              <input
                type="range"
                min={0}
                max={120}
                step={1}
                value={simHumidity}
                onChange={(e) => setSimHumidity(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>0 %</span>
                <span>Normal: 20–100%</span>
                <span>120 %</span>
              </div>
            </div>

            {/* Pressure Slider */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                <span>Station Pressure</span>
                <span className="font-mono text-emerald-400 font-bold">{simPressure.toFixed(1)} hPa</span>
              </div>
              <input
                type="range"
                min={950}
                max={1060}
                step={1}
                value={simPressure}
                onChange={(e) => setSimPressure(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>950 hPa</span>
                <span>Normal: 980–1040</span>
                <span>1060 hPa</span>
              </div>
            </div>
          </div>

          {/* Simulator Result Preview */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div>
              <span className="text-xs text-slate-400 block mb-1">AI Classification</span>
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold ${
                  simResult.isAiAnomaly === 1
                    ? 'bg-rose-950 text-rose-300 border border-rose-500/30'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                {simResult.isAiAnomaly === 1 ? '🚨 ANOMALY' : '🟢 NORMAL'}
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 block mb-1">Status</span>
              <span className="font-bold text-sm text-white">{simResult.status}</span>
            </div>

            <div>
              <span className="text-xs text-slate-400 block mb-1">Trust Score</span>
              <span className="font-bold text-base text-indigo-400 font-mono">
                {simResult.trustScore.toFixed(1)}/100
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 block mb-1">Anomaly Score</span>
              <span className="font-mono text-xs text-slate-300">
                {simResult.anomalyScore.toFixed(4)}
              </span>
            </div>

            <div className="md:col-span-4 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
              <strong className="text-white">Explanation:</strong> {simResult.explanation}
            </div>
          </div>
        </div>
      </section>

      {/* AI Decision Pipeline */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>🤖</span> AI Decision Pipeline
        </h3>
        <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30 text-indigo-200 text-xs font-medium overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-white">Sensor Reading</span>
            <span>→</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-white">Feature Analysis</span>
            <span>→</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-indigo-300">Isolation Forest</span>
            <span>→</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-white">Anomaly Score</span>
            <span>→</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-white">Anomaly Decision</span>
            <span>→</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-300">Trust Score</span>
            <span>→</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-amber-300">Human Investigation</span>
          </div>
        </div>
        <p className="text-xs text-slate-400">
          SkyGuard AI is designed to support sensor monitoring and human investigation rather than automatically declaring the physical sensor faulty.
        </p>
      </section>

      {/* Important Evaluation Note */}
      <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">⚠️ Evaluation Note:</strong> The current performance evaluation
          uses NOAA/NCEI baseline weather observations with synthetically injected sensor faults. The
          dataset does not contain real-world ground-truth sensor-fault labels. Therefore, these metrics
          represent prototype testing and should not be presented as validated real-world
          fault-detection performance.
        </p>
      </div>
    </div>
  );
};
