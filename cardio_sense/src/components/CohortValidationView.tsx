'use client';

import React from 'react';
import { DATASET_BENCHMARKS, DatasetPatient } from '@/lib/dataset_samples';
import { predictHeartDisease } from '@/lib/model';
import { PatientData } from '@/types';
import { ShieldCheck, CheckCircle2, XCircle, ArrowRight, Play } from 'lucide-react';

interface CohortValidationViewProps {
  onSelectPatient: (patient: PatientData) => void;
}

export const CohortValidationView: React.FC<CohortValidationViewProps> = ({ onSelectPatient }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Benchmark Cohort Test Grid */}
      <div className="glass-panel-elevated rounded-2xl p-6 border border-white/[0.08]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="font-display font-bold text-xl text-white">
              Ground-Truth Benchmark Cohort (heart.csv)
            </h2>
          </div>
          <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            8 Benchmark Patients Loaded
          </span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed mb-6 max-w-3xl">
          Test the live prediction pipeline against verified clinical patient records from the training and holdout test sets. Click <strong>&quot;Load Into Cockpit&quot;</strong> on any record to inspect live telemetry and parameter breakdowns.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DATASET_BENCHMARKS.map((item: DatasetPatient) => {
            const pred = predictHeartDisease(item.data);
            const isMatch = pred.prediction === item.groundTruth;

            return (
              <div
                key={item.id}
                className="bg-obsidian-950/80 rounded-xl p-4 border border-white/5 flex flex-col justify-between gap-3 hover:border-cyan-500/30 transition-all shadow-inner"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-display font-semibold text-white text-sm">
                      {item.caseTitle}
                    </h4>
                    <p className="font-mono text-[11px] text-slate-400 mt-0.5">
                      {item.data.age}yo {item.data.sex === 'M' ? 'Male' : 'Female'} • BP {item.data.restingBP} • Chol {item.data.cholesterol} • CP: {item.data.chestPainType}
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded ${
                      isMatch
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {isMatch ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span>{isMatch ? 'Model Match' : 'Boundary'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/5 text-center font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Ground Truth</span>
                    <span className={`font-bold ${item.groundTruth === 1 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {item.groundTruth === 1 ? 'Disease (1)' : 'Normal (0)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Model P(D=1)</span>
                    <span className="font-bold text-cyan-300">{pred.percentage.toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Classification</span>
                    <span className={`font-bold ${pred.prediction === 1 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {pred.prediction === 1 ? 'Positive (1)' : 'Negative (0)'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-[10px] text-slate-500">
                    Oldpeak: {item.data.oldpeak}mm | ST: {item.data.stSlope}
                  </span>
                  <button
                    onClick={() => onSelectPatient(item.data)}
                    type="button"
                    className="px-2.5 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 rounded font-mono text-xs flex items-center gap-1 border border-cyan-500/20 transition-all active:scale-95"
                  >
                    <Play className="w-3 h-3" />
                    Load Into Cockpit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
