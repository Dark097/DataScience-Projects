'use client';

import React, { useState, useMemo } from 'react';
import { PatientData } from '@/types';
import { predictHeartDisease, PRESET_PATIENTS } from '@/lib/model';
import { DATASET_BENCHMARKS } from '@/lib/dataset_samples';
import { Header } from '@/components/Header';
import { HudStrip } from '@/components/HudStrip';
import { ClinicalInputs } from '@/components/ClinicalInputs';
import { RiskGauge } from '@/components/RiskGauge';
import { FeatureImpact } from '@/components/FeatureImpact';
import { ClinicalRecommendations } from '@/components/ClinicalRecommendations';
import { ValidationCard } from '@/components/ValidationCard';
import { ExplainabilityView } from '@/components/ExplainabilityView';
import { CohortValidationView } from '@/components/CohortValidationView';
import { ClinicalReportModal } from '@/components/ClinicalReportModal';
import { Activity, Zap, Layers, ShieldCheck, Heart } from 'lucide-react';

const DEFAULT_PATIENT: PatientData = {
  age: 54,
  sex: 'M',
  chestPainType: 'ASY',
  restingBP: 135,
  cholesterol: 242,
  fastingBS: 0,
  restingECG: 'Normal',
  maxHR: 138,
  exerciseAngina: 'Y',
  oldpeak: 1.4,
  stSlope: 'Flat',
};

export default function Home() {
  const [patient, setPatient] = useState<PatientData>(DEFAULT_PATIENT);
  const [activeTab, setActiveTab] = useState<string>('diagnostic');
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  // Live real-time inference executed synchronously on every parameter change
  const predictionResult = useMemo(() => {
    return predictHeartDisease(patient);
  }, [patient]);

  const handlePatientChange = (updated: Partial<PatientData>) => {
    setPatient((prev) => ({ ...prev, ...updated }));
  };

  const handleLoadPreset = (key: keyof typeof PRESET_PATIENTS) => {
    const preset = PRESET_PATIENTS[key];
    if (preset) {
      setPatient({ ...preset.data });
      setActiveTab('diagnostic');
    }
  };

  const handleRandomPatient = () => {
    const randomIndex = Math.floor(Math.random() * DATASET_BENCHMARKS.length);
    const chosen = DATASET_BENCHMARKS[randomIndex];
    setPatient({ ...chosen.data });
    setActiveTab('diagnostic');
  };

  const handleReset = () => {
    setPatient(DEFAULT_PATIENT);
  };

  return (
    <div className="min-h-screen flex flex-col bg-obsidian-900 text-slate-100">
      {/* Top Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenReport={() => setIsReportModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 w-full pt-16 lg:pt-20">
        {/* HUD Telemetry Strip with Presets */}
        <HudStrip
          currentPatient={patient}
          onLoadPreset={handleLoadPreset}
          onRandomPatient={handleRandomPatient}
          onReset={handleReset}
        />

        {/* Tab Views */}
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activeTab === 'diagnostic' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* LEFT COLUMN: Biometric Matrix & Inputs (7 cols) */}
              <section className="lg:col-span-7 flex flex-col gap-6">
                {/* Intro Ribbon */}
                <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute -right-16 -top-16 w-52 h-52 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
                        Biometric Telemetry Matrix
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-slate-400">
                      Standardized Pipeline • 11 Clinical Features (15-Dim Matrix)
                    </span>
                  </div>
                  <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                    Clinical Heart Disease Diagnostic Cockpit
                  </h1>
                  <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                    Recalibrates logistic probability σ(wᵀx + b) instantly as telemetry sliders are adjusted. Trained and validated on the 918-patient Heart Disease cohort with 89.1% classification accuracy and 0.914 ROC-AUC.
                  </p>
                </div>

                {/* Patient Input Controls */}
                <ClinicalInputs patient={patient} onChange={handlePatientChange} />

                {/* Perfusion / Anatomical Visualizer Banner (from Stitch design) */}
                <div className="glass-panel rounded-2xl p-5 overflow-hidden flex flex-col sm:flex-row items-center gap-5 border border-white/[0.08]">
                  <div className="w-full sm:w-40 h-32 shrink-0 rounded-xl bg-gradient-to-br from-obsidian-950 via-slate-900 to-rose-950/40 p-3 flex flex-col justify-between border border-rose-500/20 relative shadow-inner">
                    <div className="flex items-center justify-between">
                      <Heart className="w-5 h-5 text-rose-400 animate-heartbeat" />
                      <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 bg-rose-500/20 text-rose-300 rounded">
                        Simulated
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      <div>LAD &amp; RCA Flux</div>
                      <div className="text-cyan-400">Perfusion Model</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 text-xs">
                    <span className="font-mono text-[10px] text-rose-400 font-bold uppercase tracking-wider">
                      Myocardial Perfusion Synthesis
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {predictionResult.probability >= 0.5 ? (
                        <>
                          Model weights flag exercise-induced ST depression (<strong className="text-rose-400">{patient.oldpeak.toFixed(1)}mm</strong>) coupled with {patient.stSlope.toLowerCase()} ST slope and {patient.chestPainType} symptoms as strong indicators of arterial compromise.
                        </>
                      ) : (
                        <>
                          Current hemodynamic parameters show benign exercise recovery (<strong className="text-emerald-400">{patient.maxHR} bpm</strong>) with no critical ischemic ST shifts detected.
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </section>

              {/* RIGHT COLUMN: Diagnostic Decision Cockpit (5 cols) */}
              <section className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
                {/* Primary Risk Gauge */}
                <RiskGauge result={predictionResult} />

                {/* Feature Attribution Waterfall */}
                <FeatureImpact
                  contributions={predictionResult.allContributions}
                  topRiskDrivers={predictionResult.topRiskDrivers}
                  topProtectiveFactors={predictionResult.topProtectiveFactors}
                />

                {/* Adaptive Clinical Recommendations */}
                <div className="glass-panel rounded-2xl p-5 border border-white/[0.08]">
                  <ClinicalRecommendations result={predictionResult} />
                </div>

                {/* ROC Curve & Model Validation */}
                <ValidationCard />
              </section>
            </div>
          )}

          {activeTab === 'explainability' && (
            <ExplainabilityView patient={patient} result={predictionResult} />
          )}

          {activeTab === 'validation' && (
            <CohortValidationView onSelectPatient={(p) => {
              setPatient(p);
              setActiveTab('diagnostic');
            }} />
          )}
        </div>
      </main>

      {/* Clinical Report Export Modal */}
      <ClinicalReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        patient={patient}
        result={predictionResult}
      />
    </div>
  );
}
