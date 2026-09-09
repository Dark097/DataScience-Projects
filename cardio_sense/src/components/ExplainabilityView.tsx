'use client';

import React from 'react';
import { PredictionResult, PatientData } from '@/types';
import { MODEL_META } from '@/lib/model';
import { Cpu, HelpCircle, Activity, Sparkles, CheckCircle2 } from 'lucide-react';

interface ExplainabilityViewProps {
  patient: PatientData;
  result: PredictionResult;
}

export const ExplainabilityView: React.FC<ExplainabilityViewProps> = ({ result }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Overview Banner */}
      <div className="glass-panel-elevated rounded-2xl p-6 border border-white/[0.08]">
        <div className="flex items-center gap-2 mb-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <h2 className="font-display font-bold text-xl text-white">
            Scikit-Learn Logistic Regression Mathematical Architecture
          </h2>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          The prediction engine computes the exact log-odds score z via a linear dot-product of standardized clinical predictors with trained model coefficients β, plus the intercept β₀. The sigmoid function then computes the calibrated posterior probability P(Disease = 1).
        </p>

        {/* Live Mathematical Formula State */}
        <div className="mt-4 p-4 rounded-xl bg-obsidian-950 border border-white/5 flex flex-wrap items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Intercept (β₀):</span>
            <span className="font-bold text-cyan-400">+{MODEL_META.intercept.toFixed(4)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Sum of Standardized Features (Σ βᵢ zᵢ):</span>
            <span className={`font-bold ${result.logOdds - MODEL_META.intercept >= 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {(result.logOdds - MODEL_META.intercept >= 0 ? '+' : '')}
              {(result.logOdds - MODEL_META.intercept).toFixed(4)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Final Log-Odds (z):</span>
            <span className={`font-bold text-sm ${result.logOdds >= 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {result.logOdds >= 0 ? `+${result.logOdds.toFixed(4)}` : result.logOdds.toFixed(4)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Sigmoid σ(z):</span>
            <span className="font-bold text-cyan-300 text-sm">{result.percentage.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Complete Feature Decomposition Matrix */}
      <div className="glass-panel rounded-2xl p-6 border border-white/[0.08] overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-base text-white">
            Complete 15-Dimensional Feature Matrix Decomposition
          </h3>
          <span className="font-mono text-xs text-slate-400">StandardScaler + β Weights</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-2.5 px-3">Predictor Name</th>
                <th className="py-2.5 px-3">Patient Value</th>
                <th className="py-2.5 px-3">Cohort Mean (μ)</th>
                <th className="py-2.5 px-3">Std Scale (σ)</th>
                <th className="py-2.5 px-3">Standardized (x - μ)/σ</th>
                <th className="py-2.5 px-3">Model Weight (β)</th>
                <th className="py-2.5 px-3 text-right">Contribution (β · z)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {result.allContributions.map((c) => (
                <tr key={c.featureName} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-white">{c.displayLabel}</td>
                  <td className="py-2.5 px-3 text-cyan-300">{String(c.rawValue)}</td>
                  <td className="py-2.5 px-3 text-slate-400">
                    {MODEL_META.mean[MODEL_META.columns.indexOf(c.featureName)]?.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400">
                    {MODEL_META.scale[MODEL_META.columns.indexOf(c.featureName)]?.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">{c.standardizedValue.toFixed(3)}</td>
                  <td className="py-2.5 px-3 text-slate-300">
                    {c.weight > 0 ? `+${c.weight.toFixed(3)}` : c.weight.toFixed(3)}
                  </td>
                  <td
                    className={`py-2.5 px-3 text-right font-bold ${
                      c.contribution > 0.05
                        ? 'text-rose-400'
                        : c.contribution < -0.05
                        ? 'text-emerald-400'
                        : 'text-slate-400'
                    }`}
                  >
                    {c.contribution > 0 ? `+${c.contribution.toFixed(4)}` : c.contribution.toFixed(4)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
