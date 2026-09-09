'use client';

import React from 'react';
import { Activity, Shield, CheckCircle2, Zap, RotateCcw, AlertTriangle } from 'lucide-react';
import { PRESET_PATIENTS } from '@/lib/model';
import { PatientData } from '@/types';

interface HudStripProps {
  onLoadPreset: (key: keyof typeof PRESET_PATIENTS) => void;
  onRandomPatient: () => void;
  onReset: () => void;
  currentPatient: PatientData;
}

export const HudStrip: React.FC<HudStripProps> = ({
  onLoadPreset,
  onRandomPatient,
  onReset,
}) => {
  return (
    <div className="w-full bg-obsidian-950/70 border-b border-white/[0.06] backdrop-blur-lg px-4 sm:px-6 lg:px-8 py-2.5">
      <div className="max-w-[1720px] mx-auto flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3">
        {/* Left Telemetry Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-obsidian-800/90 rounded-lg border border-rose-500/20 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-rose-400 font-bold">
              LIVE TELEMETRY ACTIVE
            </span>
          </div>

          <div className="hidden sm:block h-4 w-px bg-white/10" />

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-cyan-400 uppercase tracking-widest text-[10px]">Loaded:</span>
            <span className="px-2 py-0.5 bg-obsidian-800 rounded border border-white/5 text-emerald-400 text-[11px]">
              Logistic Regression.pkl
            </span>
            <span className="hidden md:inline px-2 py-0.5 bg-obsidian-800 rounded border border-white/5 text-emerald-400 text-[11px]">
              scaler_heart.pkl
            </span>
            <span className="hidden lg:inline px-2 py-0.5 bg-obsidian-800 rounded border border-white/5 text-cyan-300 text-[11px]">
              15 Standardized Dummies
            </span>
          </div>
        </div>

        {/* Preset Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline">
            Presets:
          </span>
          <button
            onClick={() => onLoadPreset('highRisk')}
            type="button"
            className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 active:scale-95"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            Critical Profile
          </button>
          <button
            onClick={() => onLoadPreset('healthyProfile')}
            type="button"
            className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 active:scale-95"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Low Risk Baseline
          </button>
          <button
            onClick={() => onLoadPreset('ischemicCase')}
            type="button"
            className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            Ischemia Case
          </button>
          <button
            onClick={onRandomPatient}
            type="button"
            className="px-2.5 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            Random Patient
          </button>
          <button
            onClick={onReset}
            title="Reset to default"
            type="button"
            className="p-1.5 bg-obsidian-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg border border-white/5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
