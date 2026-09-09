'use client';

import React from 'react';
import { Logo } from './Logo';
import { FileText, Cpu, Activity, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenReport: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenReport,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-obsidian-900/90 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl">
      <div className="h-16 lg:h-20 w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand & System Status */}
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('diagnostic')}>
            <Logo size={42} />
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white leading-none">
                CardioSense <span className="text-cyan-400">AI</span>
              </span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-slate-400 mt-1">
                Clinical Diagnostic Cockpit
              </span>
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-obsidian-800 rounded-full border border-white/5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-rose-300 font-semibold">
              SCIKIT-LEARN LR ENGINE v2.4 • CALIBRATED
            </span>
          </div>
        </div>

        {/* Cockpit Nav Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-obsidian-950/80 p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setActiveTab('diagnostic')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'diagnostic'
                ? 'bg-slate-800 text-cyan-300 shadow-md border border-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Diagnostic Cockpit
          </button>
          <button
            onClick={() => setActiveTab('explainability')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'explainability'
                ? 'bg-slate-800 text-cyan-300 shadow-md border border-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            Model Explainability
          </button>
          <button
            onClick={() => setActiveTab('validation')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'validation'
                ? 'bg-slate-800 text-cyan-300 shadow-md border border-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Validation & Benchmark
          </button>
        </nav>

        {/* Right Tools & Export Button */}
        <div className="flex items-center gap-3">
          <div className="hidden 2xl:flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-obsidian-800 rounded-lg border border-white/5">
              <span className="font-mono text-[10px] text-slate-400 uppercase">Scaler:</span>
              <span className="font-mono text-[10px] text-cyan-400 uppercase font-semibold">StandardScaler</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-obsidian-800 rounded-lg border border-white/5">
              <span className="font-mono text-[10px] text-slate-400 uppercase">Test Acc:</span>
              <span className="font-mono text-[10px] text-emerald-400 uppercase font-bold">89.1%</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-obsidian-800 rounded-lg border border-white/5">
              <span className="font-mono text-[10px] text-slate-400 uppercase">ROC-AUC:</span>
              <span className="font-mono text-[10px] text-emerald-400 uppercase font-bold">0.914</span>
            </div>
          </div>

          <button
            onClick={onOpenReport}
            type="button"
            className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-obsidian-950 font-display text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Export Clinical Summary</span>
            <span className="sm:hidden">Report</span>
          </button>
        </div>
      </div>
    </header>
  );
};
