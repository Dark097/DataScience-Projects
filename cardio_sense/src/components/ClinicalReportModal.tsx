'use client';

import React, { useState } from 'react';
import { PatientData, PredictionResult } from '@/types';
import { X, Copy, Check, Printer, FileText, Activity } from 'lucide-react';
import { Logo } from './Logo';

interface ClinicalReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientData;
  result: PredictionResult;
}

export const ClinicalReportModal: React.FC<ClinicalReportModalProps> = ({
  isOpen,
  onClose,
  patient,
  result,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const clinicalSummaryText = `
CARDIOSENSE AI — CLINICAL CARDIOVASCULAR RISK REPORT
Generated: ${new Date().toLocaleString()}
Engine: Scikit-Learn Calibrated Logistic Regression (v2.4)
============================================================
PATIENT BIOMETRIC PROFILE:
- Age: ${patient.age} years | Biological Sex: ${patient.sex === 'M' ? 'Male' : 'Female'}
- Resting Blood Pressure: ${patient.restingBP} mmHg
- Serum Cholesterol: ${patient.cholesterol} mg/dL
- Fasting Blood Sugar: ${patient.fastingBS === 1 ? '> 120 mg/dL (Elevated)' : '≤ 120 mg/dL (Normal)'}
- Chest Pain Presentation: ${patient.chestPainType}
- Resting ECG: ${patient.restingECG}
- Exercise Stress Test Max Heart Rate: ${patient.maxHR} bpm
- Exercise-Induced Angina: ${patient.exerciseAngina === 'Y' ? 'Positive' : 'Negative'}
- ST Depression (Oldpeak): ${patient.oldpeak.toFixed(1)} mm
- Peak ST Slope: ${patient.stSlope}

DIAGNOSTIC INFERENCE OUTCOME:
- Probability P(Disease=1): ${result.percentage.toFixed(1)}% (${result.probability.toFixed(4)})
- Stratification Category: ${result.riskCategory}
- Log-Odds Score (z): ${result.logOdds.toFixed(4)}
- Calculated Odds Ratio: ${result.odds.toFixed(2)}x
- Binary Classification: ${result.prediction === 1 ? 'Positive for Coronary Heart Disease' : 'Negative for Coronary Heart Disease'}

KEY LOG-ODDS CONTRIBUTORS:
Top Risk Drivers:
${result.topRiskDrivers.map((d) => `  * ${d.displayLabel}: +${d.contribution.toFixed(2)} (Value: ${d.rawValue})`).join('\n')}

Top Protective Factors:
${result.topProtectiveFactors.map((d) => `  * ${d.displayLabel}: ${d.contribution.toFixed(2)} (Value: ${d.rawValue})`).join('\n')}
============================================================
Disclaimer: CardioSense AI provides assistive statistical stratification calibrated on clinical cohort data. Diagnosis must be confirmed by a licensed medical practitioner.
`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(clinicalSummaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-obsidian-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-obsidian-950/80">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <div>
              <h2 className="font-display font-bold text-base sm:text-lg text-white">
                Clinical Diagnostic Report
              </h2>
              <p className="font-mono text-xs text-slate-400">
                Patient Cardiovascular Stratification Dossier
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs font-mono">
          {/* Risk Level Badge */}
          <div className="p-4 rounded-xl bg-obsidian-950 border border-white/5 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-slate-400">Disease Probability</span>
              <span className="text-3xl font-bold text-cyan-400">
                {result.percentage.toFixed(1)}%
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase text-slate-400">Classification</span>
              <div
                className={`text-sm font-bold uppercase px-3 py-1 rounded-lg mt-1 ${
                  result.prediction === 1
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                {result.riskCategory}
              </div>
            </div>
          </div>

          {/* Formatted Report Pre */}
          <div className="bg-obsidian-950 p-4 rounded-xl border border-white/5 overflow-x-auto text-slate-300 leading-relaxed max-h-72">
            <pre className="whitespace-pre-wrap">{clinicalSummaryText}</pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-obsidian-950/80 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-slate-500">
            Engine: Logistic Regression (15 Standardized Dummies)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              type="button"
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all flex items-center gap-1.5 font-mono text-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Dossier'}
            </button>
            <button
              onClick={handlePrint}
              type="button"
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-obsidian-950 font-bold rounded-xl transition-all flex items-center gap-1.5 font-display text-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
