'use client';

import React from 'react';
import { PredictionResult } from '@/types';
import { AlertOctagon, Pill, Monitor, CheckCircle, HeartHandshake } from 'lucide-react';

interface ClinicalRecommendationsProps {
  result: PredictionResult;
}

export const ClinicalRecommendations: React.FC<ClinicalRecommendationsProps> = ({ result }) => {
  const { probability, riskCategory } = result;

  if (probability >= 0.75) {
    return (
      <div className="flex flex-col gap-2.5">
        <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
          Recommended Clinical Action Protocol (Urgent)
        </span>
        <div className="flex items-start gap-3 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl">
          <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-display font-semibold text-xs text-white">
              Emergency Coronary Angiography (ICA)
            </span>
            <span className="text-[11px] text-slate-300">
              Schedule formal cardiac catheterization to assess arterial stenosis within 48-72h.
            </span>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-obsidian-950/80 border border-white/5 rounded-xl">
          <Pill className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-display font-semibold text-xs text-white">
              High-Intensity Statin &amp; Beta-Blocker Protocol
            </span>
            <span className="text-[11px] text-slate-400">
              Initiate Atorvastatin 80mg and titrated Metoprolol under hemodynamic supervision.
            </span>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-obsidian-950/80 border border-white/5 rounded-xl">
          <Monitor className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-display font-semibold text-xs text-white">
              Continuous Holter Rhythm Telemetry
            </span>
            <span className="text-[11px] text-slate-400">
              Prescribe 14-day ambulatory rhythm recording to detect silent ischemic episodes.
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (probability >= 0.5) {
    return (
      <div className="flex flex-col gap-2.5">
        <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
          Recommended Clinical Action Protocol (Elevated Risk)
        </span>
        <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <AlertOctagon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-display font-semibold text-xs text-white">
              Coronary CT Angiography (CCTA)
            </span>
            <span className="text-[11px] text-slate-300">
              Non-invasive arterial plaque quantification to evaluate luminal narrowing.
            </span>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-obsidian-950/80 border border-white/5 rounded-xl">
          <Pill className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-display font-semibold text-xs text-white">
              Cardiovascular Risk Pharmacotherapy
            </span>
            <span className="text-[11px] text-slate-400">
              Consider low-dose aspirin and moderate-intensity lipid lowering therapy.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
        Preventative Maintenance Protocol (Low/Baseline Risk)
      </span>
      <div className="flex items-start gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="flex flex-col">
          <span className="font-display font-semibold text-xs text-white">
            Maintain Aerobic Conditioning &amp; Lifestyle
          </span>
          <span className="text-[11px] text-slate-300">
            Biomarkers indicate low probability of obstructive coronary artery disease.
          </span>
        </div>
      </div>
      <div className="flex items-start gap-3 p-3 bg-obsidian-950/80 border border-white/5 rounded-xl">
        <HeartHandshake className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="flex flex-col">
          <span className="font-display font-semibold text-xs text-white">
            Annual Cardiovascular Check-up
          </span>
          <span className="text-[11px] text-slate-400">
            Repeat lipid profile, fasting blood glucose, and resting blood pressure monitoring.
          </span>
        </div>
      </div>
    </div>
  );
};
