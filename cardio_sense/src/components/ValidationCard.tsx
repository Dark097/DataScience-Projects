'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, Binary, Database } from 'lucide-react';

export const ValidationCard: React.FC = () => {
  return (
    <div className="glass-panel rounded-2xl p-5 flex flex-col gap-4 border border-white/[0.08]">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-display font-semibold text-sm text-white uppercase tracking-wider">
            Model Validation &amp; Metrics
          </span>
        </div>
        <span className="font-mono text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          ROC-AUC: 0.914
        </span>
      </div>

      {/* ROC Curve Visualizer */}
      <div className="bg-obsidian-950/90 rounded-xl p-3 flex flex-col justify-between relative overflow-hidden border border-white/5">
        <div className="flex justify-between text-[11px] font-mono text-slate-400 z-10">
          <span>Sensitivity (TPR)</span>
          <span>1 - Specificity (FPR)</span>
        </div>

        <div className="relative w-full h-24 my-1">
          <svg className="w-full h-full text-cyan-400 overflow-visible" viewBox="0 0 300 80">
            {/* Chance diagonal line */}
            <line
              x1="0"
              y1="80"
              x2="300"
              y2="0"
              stroke="rgba(255,255,255,0.15)"
              strokeDasharray="3 3"
              strokeWidth="1"
            />
            {/* Area under curve */}
            <path
              d="M 0 80 L 15 28 L 40 14 L 80 8 L 140 4 L 220 2 L 300 0 L 300 80 Z"
              fill="rgba(6, 182, 212, 0.12)"
            />
            {/* ROC Curve path */}
            <path
              d="M 0 80 L 15 28 L 40 14 L 80 8 L 140 4 L 220 2 L 300 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
            />
          </svg>
        </div>

        <div className="flex justify-between text-[10px] font-mono text-slate-400 z-10">
          <span>Decision Cutpoint: 0.50</span>
          <span className="text-cyan-400">Optimal Youden J: 0.44</span>
        </div>
      </div>

      {/* Key Metric Gauges */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-obsidian-950/70 p-2.5 rounded-lg border border-white/5">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Accuracy</span>
          <span className="font-mono text-base font-bold text-emerald-400">89.1%</span>
        </div>
        <div className="bg-obsidian-950/70 p-2.5 rounded-lg border border-white/5">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">F1-Score</span>
          <span className="font-mono text-base font-bold text-cyan-400">0.892</span>
        </div>
        <div className="bg-obsidian-950/70 p-2.5 rounded-lg border border-white/5">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Inference</span>
          <span className="font-mono text-base font-bold text-amber-400">&lt; 1 ms</span>
        </div>
      </div>

      {/* Architecture Specs */}
      <div className="text-[11px] font-mono text-slate-400 flex flex-col gap-1 bg-obsidian-950/50 p-2.5 rounded-lg border border-white/5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Database className="w-3 h-3 text-cyan-400" />
            Training Cohort:
          </span>
          <span className="text-slate-200">918 Patients (heart.csv)</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Binary className="w-3 h-3 text-cyan-400" />
            Feature Matrix:
          </span>
          <span className="text-slate-200">15 Scaled Dimensions</span>
        </div>
      </div>
    </div>
  );
};
