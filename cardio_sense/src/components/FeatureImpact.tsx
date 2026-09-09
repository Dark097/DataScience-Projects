'use client';

import React from 'react';
import { FeatureContribution } from '@/types';
import { ArrowUpRight, ArrowDownRight, Layers } from 'lucide-react';

interface FeatureImpactProps {
  contributions: FeatureContribution[];
  topRiskDrivers: FeatureContribution[];
  topProtectiveFactors: FeatureContribution[];
}

export const FeatureImpact: React.FC<FeatureImpactProps> = ({
  topRiskDrivers,
  topProtectiveFactors,
  contributions,
}) => {
  return (
    <div className="glass-panel rounded-2xl p-5 flex flex-col gap-4 border border-white/[0.08]">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="font-display font-semibold text-sm text-white uppercase tracking-wider">
            Feature Attribution &amp; Log-Odds
          </span>
        </div>
        <span className="font-mono text-[11px] text-cyan-400 uppercase">
          Standardized β-Weights
        </span>
      </div>

      {/* Top Risk Escalators */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[11px] uppercase tracking-wider text-rose-400 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            Top Risk Escalators (+ Log-Odds)
          </span>
          <span className="text-[10px] font-mono text-slate-400">Impact</span>
        </div>

        {topRiskDrivers.length === 0 ? (
          <p className="text-xs text-slate-500 italic">No significant positive risk drivers active.</p>
        ) : (
          topRiskDrivers.map((item) => (
            <div key={item.featureName} className="flex flex-col gap-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-200">{item.displayLabel}</span>
                <span className="font-mono text-rose-400 font-bold">
                  +{item.contribution.toFixed(2)} ({item.percentageEffect}%)
                </span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-red-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(8, item.percentageEffect * 2.2))}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>Value: {String(item.rawValue)}</span>
                <span>β = {item.weight.toFixed(3)}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Top Protective Factors */}
      <div className="flex flex-col gap-3 pt-3 border-t border-white/[0.06]">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1">
            <ArrowDownRight className="w-3.5 h-3.5" />
            Protective Factors (- Log-Odds)
          </span>
          <span className="text-[10px] font-mono text-slate-400">Impact</span>
        </div>

        {topProtectiveFactors.length === 0 ? (
          <p className="text-xs text-slate-500 italic">No protective factors active for this profile.</p>
        ) : (
          topProtectiveFactors.map((item) => (
            <div key={item.featureName} className="flex flex-col gap-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-200">{item.displayLabel}</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {item.contribution.toFixed(2)} ({item.percentageEffect}%)
                </span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(8, item.percentageEffect * 2.2))}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>Value: {String(item.rawValue)}</span>
                <span>β = {item.weight.toFixed(3)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
