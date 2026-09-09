'use client';

import React from 'react';
import { PredictionResult } from '@/types';
import { AlertCircle, CheckCircle2, AlertTriangle, Flame } from 'lucide-react';

interface RiskGaugeProps {
  result: PredictionResult;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ result }) => {
  const { percentage, probability, odds, logOdds, riskCategory, riskColor } = result;

  // Circle radius 58 -> circumference = 2 * PI * 58 ≈ 364.42
  const circumference = 364.42;
  // Offset decreases as probability increases (0% -> 364.42, 100% -> 0)
  const strokeDashoffset = Math.max(0, circumference - (probability * circumference));

  // Color configurations based on risk
  const colorMap = {
    emerald: {
      stroke: 'text-emerald-500',
      fill: 'bg-emerald-500/10',
      badge: 'bg-emerald-500 text-obsidian-950 shadow-emerald-500/30',
      border: 'border-emerald-500/30',
      glow: 'shadow-glow-emerald',
      text: 'text-emerald-400',
      icon: CheckCircle2,
    },
    amber: {
      stroke: 'text-amber-500',
      fill: 'bg-amber-500/10',
      badge: 'bg-amber-500 text-obsidian-950 shadow-amber-500/30',
      border: 'border-amber-500/30',
      glow: 'shadow-[0_0_20px_-5px_rgba(245,158,11,0.35)]',
      text: 'text-amber-400',
      icon: AlertCircle,
    },
    rose: {
      stroke: 'text-rose-500',
      fill: 'bg-rose-500/10',
      badge: 'bg-rose-500 text-white shadow-rose-500/40',
      border: 'border-rose-500/30',
      glow: 'shadow-[0_0_20px_-5px_rgba(244,63,94,0.4)]',
      text: 'text-rose-400',
      icon: AlertTriangle,
    },
    red: {
      stroke: 'text-red-500',
      fill: 'bg-red-500/10',
      badge: 'bg-red-500 text-white shadow-red-500/50',
      border: 'border-red-500/40',
      glow: 'shadow-glow-red',
      text: 'text-red-400',
      icon: Flame,
    },
  };

  const currentTheme = colorMap[riskColor] || colorMap.rose;
  const IconComponent = currentTheme.icon;

  return (
    <div
      className={`glass-panel-elevated rounded-2xl p-6 relative overflow-hidden flex flex-col gap-5 transition-all duration-500 border ${currentTheme.border}`}
    >
      {/* Background ambient radial glow */}
      <div
        className={`absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl pointer-events-none ${currentTheme.fill}`}
      />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 z-10">
        <div className="flex flex-col">
          <span className={`font-mono text-[10px] uppercase tracking-widest font-bold ${currentTheme.text}`}>
            INFERENCE ENGINE OUTCOME
          </span>
          <span className="font-display font-semibold text-lg text-white">
            Cardiovascular Risk Stratification
          </span>
        </div>
        <div
          className={`px-3 py-1 font-mono text-xs uppercase font-bold rounded-lg shadow-lg flex items-center gap-1.5 ${currentTheme.badge}`}
        >
          <IconComponent className="w-3.5 h-3.5" />
          {riskCategory}
        </div>
      </div>

      {/* Circular Speedometer Gauge */}
      <div className="flex flex-col items-center justify-center py-2 relative z-10">
        <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 140 140">
            {/* Track background */}
            <circle
              className="text-slate-800"
              cx="70"
              cy="70"
              fill="none"
              r="58"
              stroke="currentColor"
              strokeWidth="10"
            />
            {/* Dynamic gauge stroke */}
            <circle
              className={`${currentTheme.stroke} transition-all duration-700 ease-out`}
              cx="70"
              cy="70"
              fill="none"
              r="58"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Central Values Readout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-[11px] text-slate-400 uppercase tracking-widest">
              P(Disease = 1)
            </span>
            <span className="font-mono text-4xl sm:text-5xl font-bold text-white leading-none my-2 tracking-tight">
              {percentage.toFixed(1)}%
            </span>
            <span className="font-mono text-xs text-cyan-300 uppercase tracking-wider font-semibold">
              Odds: {odds < 1 ? `1:${(1 / odds).toFixed(1)}` : `${odds.toFixed(2)}x`}
            </span>
          </div>
        </div>

        {/* Mathematical formula badge */}
        <div className="mt-3 px-3 py-1.5 bg-obsidian-950/80 rounded-xl border border-white/5 font-mono text-xs text-slate-300 text-center max-w-sm">
          <span>z = w^T x + b = </span>
          <span className={`font-bold ${logOdds >= 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {logOdds >= 0 ? `+${logOdds.toFixed(3)}` : logOdds.toFixed(3)}
          </span>
          <span className="text-slate-500 mx-1.5">•</span>
          <span>σ(z) = {probability.toFixed(4)}</span>
        </div>
      </div>

      {/* Clinical Context Description */}
      <div className="bg-obsidian-950/70 p-3.5 rounded-xl border border-white/5 text-xs text-slate-300 leading-relaxed z-10">
        {probability >= 0.75 ? (
          <p>
            <strong className="text-rose-400">Critical Predictive Elevation:</strong> The mathematical log-odds strongly indicate significant coronary artery disease. Immediate clinical evaluation and diagnostic angiography correlation advised.
          </p>
        ) : probability >= 0.5 ? (
          <p>
            <strong className="text-amber-400">Elevated Cardiac Risk:</strong> Probability crosses the clinical decision threshold of 50%. Further non-invasive imaging or stress testing is recommended.
          </p>
        ) : probability >= 0.25 ? (
          <p>
            <strong className="text-cyan-400">Moderate / Borderline Risk:</strong> The patient exhibits intermediate risk markers. Lifestyle modifications and routine cardiometabolic monitoring suggested.
          </p>
        ) : (
          <p>
            <strong className="text-emerald-400">Low Probability / Baseline:</strong> Biomarkers align with physiological normal or protective cardiovascular parameters. Maintain preventative health protocol.
          </p>
        )}
      </div>
    </div>
  );
};
