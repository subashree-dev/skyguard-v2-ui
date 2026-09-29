export interface SensorRecord {
  station_id: string;
  timestamp: string;
  temperature_c: number;
  humidity_pct: number;
  pressure_hpa: number;
  is_anomaly: number;
  anomaly_type: string;
  prediction: number;
  anomaly_score: number;
  ai_anomaly: number;
  trust_score: number;
  status: 'NORMAL' | 'SUSPICIOUS' | 'WARNING' | 'CRITICAL';
  explanation: string;
}

export type PageId =
  | 'overview'
  | 'sensor_monitoring'
  | 'anomaly_detection'
  | 'analytics'
  | 'ai_model'
  | 'system';
