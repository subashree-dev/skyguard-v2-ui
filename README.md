# SkyGuard AI 🛰️

Intelligent AWS Sensor Monitoring & Anomaly Detection Dashboard.

SkyGuard AI continuously monitors temperature, relative humidity, and barometric pressure readings from Automatic Weather Stations (AWS) using an unsupervised **Isolation Forest** machine learning model combined with physical sensor heuristic rules.

## ✨ Features

- **System Snapshot & Overview**: Real-time status monitoring, anomaly rate tracking, sensor health metrics, and key telemetry indicators.
- **Interactive Sensor Monitoring**: Inspect individual time-stamped weather readings with interactive time-scrubbing sliders and reliability scoring.
- **AI Anomaly Detection**: Unsupervised Isolation Forest detection identifying multi-variable sensor anomalies, with plain-language diagnostic explanations.
- **Sensor Analytics**: Time-series charts for Temperature, Humidity, Pressure, Anomaly Score, and Trust Score, alongside fault distribution statistics.
- **AI Model Intelligence & Live Simulator**: Isolation Forest architecture breakdown, confusion matrix evaluation, and an interactive real-time weather reading simulator.
- **System Documentation**: Architecture overview, end-to-end meteorological pipeline, parameter definitions, and SIH26073 project specifications.

## 🛠️ Technology Stack

- **Runtime**: Node.js 22
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Dataset**: NOAA/NCEI Global Historical Climatology Network Hourly (GHCNh) AWS Records (Station INM00043278)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
