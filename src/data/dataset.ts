import rawData from './skyguardData.json';
import { SensorRecord } from '../types';

export const sensorData: SensorRecord[] = rawData as SensorRecord[];

export const totalReadings = sensorData.length;
export const aiAnomalies = sensorData.filter((r) => r.ai_anomaly === 1).length;
export const normalReadings = totalReadings - aiAnomalies;
export const anomalyRate = totalReadings > 0 ? (aiAnomalies / totalReadings) * 100 : 0;

export const criticalCount = sensorData.filter((r) => r.status === 'CRITICAL').length;
export const warningCount = sensorData.filter((r) => r.status === 'WARNING').length;
export const suspiciousCount = sensorData.filter((r) => r.status === 'SUSPICIOUS').length;

export const averageTrust =
  sensorData.reduce((acc, curr) => acc + curr.trust_score, 0) / (totalReadings || 1);

export const latestRecord = sensorData[sensorData.length - 1];

export const highTrustCount = sensorData.filter((r) => r.trust_score >= 70).length;
export const mediumTrustCount = sensorData.filter(
  (r) => r.trust_score >= 40 && r.trust_score < 70
).length;
export const lowTrustCount = sensorData.filter((r) => r.trust_score < 40).length;

// Status counts
export const statusCounts = {
  NORMAL: sensorData.filter((r) => r.status === 'NORMAL').length,
  SUSPICIOUS: suspiciousCount,
  WARNING: warningCount,
  CRITICAL: criticalCount,
};

// Fault types counts in prototype
export const faultTypeCounts: Record<string, number> = {};
sensorData.forEach((r) => {
  if (r.anomaly_type && r.anomaly_type !== 'normal') {
    faultTypeCounts[r.anomaly_type] = (faultTypeCounts[r.anomaly_type] || 0) + 1;
  }
});

// Min and Max anomaly scores for normalizing custom simulated inputs
export const minScore = Math.min(...sensorData.map((r) => r.anomaly_score));
export const maxScore = Math.max(...sensorData.map((r) => r.anomaly_score));

// Simulation helper function for interactive AI testing
export function simulateReading(temp: number, humidity: number, pressure: number) {
  // Check physical limits & known patterns
  const explanations: string[] = [];
  let isAiAnomaly = 0;
  let simulatedScore = 0.08; // typical normal baseline

  if (temp > 45) {
    explanations.push('temperature is unusually high');
    isAiAnomaly = 1;
    simulatedScore -= 0.12;
  } else if (temp < 10) {
    explanations.push('temperature is unusually low');
    isAiAnomaly = 1;
    simulatedScore -= 0.1;
  }

  if (humidity > 100) {
    explanations.push('humidity is outside the normal physical range');
    isAiAnomaly = 1;
    simulatedScore -= 0.15;
  } else if (humidity < 15) {
    explanations.push('humidity is exceptionally low');
    isAiAnomaly = 1;
    simulatedScore -= 0.08;
  }

  if (pressure < 980 || pressure > 1040) {
    explanations.push('pressure is outside the expected range');
    isAiAnomaly = 1;
    simulatedScore -= 0.14;
  }

  // Statistical covariance check (e.g. 42C with 99% humidity is an extreme mismatch)
  if (temp > 35 && humidity > 90) {
    if (!explanations.length) {
      explanations.push('extreme temperature-humidity combination deviates from climate baseline');
    }
    isAiAnomaly = 1;
    simulatedScore -= 0.09;
  }

  let explanationText = '';
  if (isAiAnomaly === 0) {
    explanationText = 'Sensor readings appear consistent with the learned normal pattern.';
  } else if (explanations.length === 0) {
    explanationText =
      'The combination of temperature, humidity and pressure differs significantly from the learned normal pattern.';
  } else {
    explanationText = 'Anomaly detected because ' + explanations.join(' and ') + '.';
  }

  // Normalize score between minScore and maxScore for trust score
  const clampedScore = Math.max(minScore, Math.min(maxScore, simulatedScore));
  const rawTrust = ((clampedScore - minScore) / (maxScore - minScore)) * 100;
  const trustScore = Math.round(Math.max(5, Math.min(99, rawTrust)) * 10) / 10;

  let status: 'NORMAL' | 'SUSPICIOUS' | 'WARNING' | 'CRITICAL' = 'NORMAL';
  if (isAiAnomaly === 1) {
    if (trustScore < 20) {
      status = 'CRITICAL';
    } else if (trustScore < 40) {
      status = 'WARNING';
    } else {
      status = 'SUSPICIOUS';
    }
  }

  return {
    isAiAnomaly,
    anomalyScore: Math.round(clampedScore * 10000) / 10000,
    trustScore,
    status,
    explanation: explanationText,
  };
}
