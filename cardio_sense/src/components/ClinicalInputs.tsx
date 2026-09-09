'use client';

import React from 'react';
import { PatientData, Sex, ChestPainType, RestingECG, ExerciseAngina, STSlope, FastingBS } from '@/types';
import { ECGWaveform } from './ECGWaveform';
import { User, HeartPulse, Activity, Stethoscope, Sparkles } from 'lucide-react';

interface ClinicalInputsProps {
  patient: PatientData;
  onChange: (updated: Partial<PatientData>) => void;
}

export const ClinicalInputs: React.FC<ClinicalInputsProps> = ({ patient, onChange }) => {
  // Blood pressure classification tag
  const bpTag =
    patient.restingBP < 120
      ? { text: 'Optimal (<120)', color: 'text-emerald-400 bg-emerald-500/10' }
      : patient.restingBP < 130
      ? { text: 'Elevated (120-129)', color: 'text-cyan-400 bg-cyan-500/10' }
      : patient.restingBP < 140
      ? { text: 'Hypertension Stage 1 (130-139)', color: 'text-amber-400 bg-amber-500/10' }
      : { text: 'Hypertension Stage 2 (≥140)', color: 'text-rose-400 bg-rose-500/10' };

  // Cholesterol classification tag
  const cholTag =
    patient.cholesterol < 200
      ? { text: 'Desirable (<200)', color: 'text-emerald-400 bg-emerald-500/10' }
      : patient.cholesterol < 240
      ? { text: 'Borderline High (200-239)', color: 'text-amber-400 bg-amber-500/10' }
      : { text: 'Hypercholesterolemia (≥240)', color: 'text-rose-400 bg-rose-500/10' };

  // Age target max HR: 220 - age
  const agePredictedMaxHR = 220 - patient.age;
  const hrPercentage = Math.round((patient.maxHR / agePredictedMaxHR) * 100);

  return (
    <div className="flex flex-col gap-6">
      {/* SECTION 1: Demographics & Core Hemodynamics */}
      <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            <h2 className="font-display font-semibold text-base sm:text-lg text-white">
              Demographics &amp; Core Hemodynamics
            </h2>
          </div>
          <span className="font-mono text-[10px] uppercase text-slate-400 px-2 py-0.5 bg-obsidian-950 rounded">
            Group A: 4 Variables
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Age */}
          <div className="bg-obsidian-950/80 p-4 rounded-xl border border-white/5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="input-age" className="font-mono text-xs uppercase text-slate-400">
                Patient Age (Years)
              </label>
              <span className="font-mono text-lg font-bold text-cyan-400">{patient.age}</span>
            </div>
            <input
              id="input-age"
              type="range"
              min="28"
              max="82"
              value={patient.age}
              onChange={(e) => onChange({ age: Number(e.target.value) })}
              className="w-full accent-cyan-400 mt-1"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>Min: 28y</span>
              <span className="text-cyan-400/80">Mean: 53y</span>
              <span>Max: 82y</span>
            </div>
          </div>

          {/* Biological Sex */}
          <div className="bg-obsidian-950/80 p-4 rounded-xl border border-white/5 flex flex-col gap-2">
            <span className="font-mono text-xs uppercase text-slate-400">Biological Sex</span>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                type="button"
                onClick={() => onChange({ sex: 'M' })}
                className={`py-2 px-3 rounded-lg font-mono text-xs uppercase font-semibold transition-all border ${
                  patient.sex === 'M'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-glow-cyan'
                    : 'bg-slate-900 text-slate-400 border-white/5 hover:bg-slate-800'
                }`}
              >
                Male (M)
              </button>
              <button
                type="button"
                onClick={() => onChange({ sex: 'F' })}
                className={`py-2 px-3 rounded-lg font-mono text-xs uppercase font-semibold transition-all border ${
                  patient.sex === 'F'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-glow-red'
                    : 'bg-slate-900 text-slate-400 border-white/5 hover:bg-slate-800'
                }`}
              >
                Female (F)
              </button>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              {patient.sex === 'M' ? 'Model Coefficient β: +0.604' : 'Reference Baseline Category (0)'}
            </span>
          </div>

          {/* Resting Blood Pressure */}
          <div className="bg-obsidian-950/80 p-4 rounded-xl border border-white/5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="input-trestbps" className="font-mono text-xs uppercase text-slate-400">
                Resting Blood Pressure
              </label>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-lg font-bold text-amber-400">{patient.restingBP}</span>
                <span className="font-mono text-[10px] text-slate-500">mmHg</span>
              </div>
            </div>
            <input
              id="input-trestbps"
              type="range"
              min="80"
              max="200"
              value={patient.restingBP}
              onChange={(e) => onChange({ restingBP: Number(e.target.value) })}
              className="w-full accent-amber-400 mt-1"
            />
            <div className="flex justify-between items-center text-[10px] font-mono mt-0.5">
              <span className="text-slate-500">Normal &lt;120</span>
              <span className={`px-2 py-0.5 rounded ${bpTag.color}`}>{bpTag.text}</span>
            </div>
          </div>

          {/* Serum Cholesterol */}
          <div className="bg-obsidian-950/80 p-4 rounded-xl border border-white/5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="input-chol" className="font-mono text-xs uppercase text-slate-400">
                Serum Cholesterol
              </label>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-lg font-bold text-rose-400">{patient.cholesterol}</span>
                <span className="font-mono text-[10px] text-slate-500">mg/dL</span>
              </div>
            </div>
            <input
              id="input-chol"
              type="range"
              min="100"
              max="450"
              value={patient.cholesterol}
              onChange={(e) => onChange({ cholesterol: Number(e.target.value) })}
              className="w-full accent-rose-400 mt-1"
            />
            <div className="flex justify-between items-center text-[10px] font-mono mt-0.5">
              <span className="text-slate-500">&lt;200 Desirable</span>
              <span className={`px-2 py-0.5 rounded ${cholTag.color}`}>{cholTag.text}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Cardiac Stress Test & Ischemic Telemetry */}
      <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-rose-400" />
            <h2 className="font-display font-semibold text-base sm:text-lg text-white">
              Cardiac Stress Test &amp; Exercise ECG
            </h2>
          </div>
          <span className="font-mono text-[10px] uppercase text-slate-400 px-2 py-0.5 bg-obsidian-950 rounded">
            Group B: Exercise Dynamics
          </span>
        </div>

        {/* Max Heart Rate + Real-Time ECG Rhythm Display */}
        <div className="bg-obsidian-950/90 p-4 rounded-xl border border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-4 flex flex-col gap-2">
            <label htmlFor="input-maxhr" className="font-mono text-xs uppercase text-slate-400">
              Max Heart Rate Achieved (MaxHR)
            </label>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl font-bold text-cyan-400">{patient.maxHR}</span>
              <span className="font-mono text-xs uppercase text-slate-500">bpm</span>
            </div>
            <input
              id="input-maxhr"
              type="range"
              min="60"
              max="210"
              value={patient.maxHR}
              onChange={(e) => onChange({ maxHR: Number(e.target.value) })}
              className="w-full accent-cyan-400 mt-1"
            />
            <span className="font-mono text-[10px] text-slate-400">
              Target ({agePredictedMaxHR} bpm): {hrPercentage}% achieved
            </span>
          </div>

          <div className="lg:col-span-8">
            <ECGWaveform
              maxHR={patient.maxHR}
              oldpeak={patient.oldpeak}
              stSlope={patient.stSlope}
              isAngina={patient.exerciseAngina === 'Y'}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Exercise Induced Angina */}
          <div className="bg-obsidian-950/80 p-4 rounded-xl border border-white/5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase text-slate-400">Exercise Angina</span>
              <span
                className={`font-mono text-[11px] px-2 py-0.5 rounded font-bold uppercase ${
                  patient.exerciseAngina === 'Y'
                    ? 'bg-rose-500/20 text-rose-300'
                    : 'bg-emerald-500/20 text-emerald-300'
                }`}
              >
                {patient.exerciseAngina === 'Y' ? 'Present (Y)' : 'Absent (N)'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                type="button"
                onClick={() => onChange({ exerciseAngina: 'Y' })}
                className={`py-2 px-3 rounded-lg font-mono text-xs uppercase font-semibold transition-all border ${
                  patient.exerciseAngina === 'Y'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-glow-red'
                    : 'bg-slate-900 text-slate-400 border-white/5 hover:bg-slate-800'
                }`}
              >
                Yes (Positive)
              </button>
              <button
                type="button"
                onClick={() => onChange({ exerciseAngina: 'N' })}
                className={`py-2 px-3 rounded-lg font-mono text-xs uppercase font-semibold transition-all border ${
                  patient.exerciseAngina === 'N'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-glow-emerald'
                    : 'bg-slate-900 text-slate-400 border-white/5 hover:bg-slate-800'
                }`}
              >
                No (Negative)
              </button>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              Model weight β: +0.498 (Odds Ratio ~1.65x)
            </span>
          </div>

          {/* ST Depression (Oldpeak) */}
          <div className="bg-obsidian-950/80 p-4 rounded-xl border border-white/5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="input-oldpeak" className="font-mono text-xs uppercase text-slate-400">
                ST Depression (Oldpeak)
              </label>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-lg font-bold text-rose-400">
                  {patient.oldpeak.toFixed(1)}
                </span>
                <span className="font-mono text-[10px] text-slate-500">mm</span>
              </div>
            </div>
            <input
              id="input-oldpeak"
              type="range"
              min="0.0"
              max="6.0"
              step="0.1"
              value={patient.oldpeak}
              onChange={(e) => onChange({ oldpeak: Number(e.target.value) })}
              className="w-full accent-rose-400 mt-1"
            />
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>0.0mm (Physiologic)</span>
              <span className="text-amber-400">&gt;1.0mm Ischemic Threshold</span>
              <span>6.0mm (Severe)</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Clinical Biomarkers & ECG Morphology */}
      <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-cyan-400" />
            <h2 className="font-display font-semibold text-base sm:text-lg text-white">
              Symptom Presentation &amp; ECG Morphology
            </h2>
          </div>
          <span className="font-mono text-[10px] uppercase text-slate-400 px-2 py-0.5 bg-obsidian-950 rounded">
            Group C: Categorical Biomarkers
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Chest Pain Type */}
          <div className="bg-obsidian-950/80 p-4 rounded-xl border border-white/5 flex flex-col gap-2">
            <label htmlFor="select-chestpain" className="font-mono text-xs uppercase text-slate-400">
              Chest Pain Type
            </label>
            <select
              id="select-chestpain"
              value={patient.chestPainType}
              onChange={(e) => onChange({ chestPainType: e.target.value as ChestPainType })}
              className="bg-slate-900 border border-white/10 rounded-lg p-2.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="ASY">ASY: Asymptomatic (High Risk)</option>
              <option value="ATA">ATA: Atypical Angina</option>
              <option value="NAP">NAP: Non-Anginal Pain</option>
              <option value="TA">TA: Typical Angina</option>
            </select>
            <span className="text-[10px] font-mono text-slate-500">
              {patient.chestPainType === 'ASY'
                ? 'Reference baseline (Highest risk factor)'
                : 'Protective contrast relative to ASY'}
            </span>
          </div>

          {/* Resting ECG */}
          <div className="bg-obsidian-950/80 p-4 rounded-xl border border-white/5 flex flex-col gap-2">
            <label htmlFor="select-restingecg" className="font-mono text-xs uppercase text-slate-400">
              Resting ECG
            </label>
            <select
              id="select-restingecg"
              value={patient.restingECG}
              onChange={(e) => onChange({ restingECG: e.target.value as RestingECG })}
              className="bg-slate-900 border border-white/10 rounded-lg p-2.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="Normal">Normal: Normal Sinus Rhythm</option>
              <option value="ST">ST: ST-T Wave Abnormality</option>
              <option value="LVH">LVH: Left Ventricular Hypertrophy</option>
            </select>
            <span className="text-[10px] font-mono text-slate-500">
              Baseline: LVH • ST-T inversion patterns
            </span>
          </div>

          {/* ST Slope */}
          <div className="bg-obsidian-950/80 p-4 rounded-xl border border-white/5 flex flex-col gap-2">
            <label htmlFor="select-st-slope" className="font-mono text-xs uppercase text-slate-400">
              Peak Exercise ST Slope
            </label>
            <select
              id="select-st-slope"
              value={patient.stSlope}
              onChange={(e) => onChange({ stSlope: e.target.value as STSlope })}
              className="bg-slate-900 border border-white/10 rounded-lg p-2.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="Flat">Flat: Flat Slope (Elevated Risk)</option>
              <option value="Up">Up: Upsloping (Protective / Normal)</option>
              <option value="Down">Down: Downsloping (Reference)</option>
            </select>
            <span className="text-[10px] font-mono text-slate-500">
              {patient.stSlope === 'Flat'
                ? 'β: +0.559 (Strong risk driver)'
                : patient.stSlope === 'Up'
                ? 'β: -0.605 (Protective sign)'
                : 'Baseline reference category'}
            </span>
          </div>

          {/* Fasting Blood Sugar */}
          <div className="bg-obsidian-950/80 p-4 rounded-xl border border-white/5 flex flex-col gap-2">
            <span className="font-mono text-xs uppercase text-slate-400">
              Fasting Blood Sugar &gt; 120
            </span>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                type="button"
                onClick={() => onChange({ fastingBS: 1 })}
                className={`py-2 px-2 rounded-lg font-mono text-xs uppercase font-semibold transition-all border ${
                  patient.fastingBS === 1
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-glow-red'
                    : 'bg-slate-900 text-slate-400 border-white/5 hover:bg-slate-800'
                }`}
              >
                True (&gt;120)
              </button>
              <button
                type="button"
                onClick={() => onChange({ fastingBS: 0 })}
                className={`py-2 px-2 rounded-lg font-mono text-xs uppercase font-semibold transition-all border ${
                  patient.fastingBS === 0
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-glow-emerald'
                    : 'bg-slate-900 text-slate-400 border-white/5 hover:bg-slate-800'
                }`}
              >
                False (≤120)
              </button>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              Diabetic comorbidity weight β: +0.505
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
