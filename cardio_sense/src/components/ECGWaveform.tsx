'use client';

import React, { useMemo } from 'react';
import { STSlope } from '@/types';

interface ECGWaveformProps {
  maxHR: number;
  oldpeak: number;
  stSlope: STSlope;
  isAngina: boolean;
}

export const ECGWaveform: React.FC<ECGWaveformProps> = ({
  maxHR,
  oldpeak,
  stSlope,
  isAngina,
}) => {
  // Compute animation duration based on beats per minute: 60 / maxHR
  const beatDurationSeconds = useMemo(() => {
    const clampedHR = Math.max(50, Math.min(220, maxHR));
    return (60 / clampedHR).toFixed(2);
  }, [maxHR]);

  // Compute ST segment vertical offset in SVG coordinates based on oldpeak & stSlope
  // SVG baseline is around y = 30. ST depression pulls y down (larger y in SVG).
  const { stY1, stY2, pathData, traceColor, statusLabel } = useMemo(() => {
    const depressionOffset = Math.min(22, oldpeak * 4.5);
    let slopeOffset = 0;
    if (stSlope === 'Up') slopeOffset = -6; // Upsloping recovers back toward baseline
    if (stSlope === 'Down') slopeOffset = 8; // Downsloping worsens

    const stStart = 30 + depressionOffset;
    const stEnd = Math.max(10, Math.min(54, 30 + depressionOffset + slopeOffset));

    // Two full P-Q-R-S-T complexes across 500 units width
    const p1 = `M 0 30 L 35 30 L 45 25 L 55 30 L 70 30 L 78 8 L 86 54 L 94 18 L 102 30 L 115 30 L 130 ${stStart} L 165 ${stEnd} L 180 30 L 250 30`;
    const p2 = `L 285 30 L 295 25 L 305 30 L 320 30 L 328 8 L 336 54 L 344 18 L 352 30 L 365 30 L 380 ${stStart} L 415 ${stEnd} L 430 30 L 500 30`;
    const fullPath = `${p1} ${p2}`;

    let color = 'text-cyan-400';
    let label = 'NORMAL SINUS RHYTHM';

    if (oldpeak >= 2.0 || stSlope === 'Flat' || isAngina) {
      color = 'text-rose-500';
      label = `ISCHEMIC ST FLUX (${oldpeak.toFixed(1)}mm ${stSlope.toUpperCase()})`;
    } else if (oldpeak >= 1.0) {
      color = 'text-amber-400';
      label = `BORDERLINE ST DEPRESSION (${oldpeak.toFixed(1)}mm)`;
    }

    return {
      stY1: stStart,
      stY2: stEnd,
      pathData: fullPath,
      traceColor: color,
      statusLabel: label,
    };
  }, [oldpeak, stSlope, isAngina]);

  return (
    <div className="h-28 bg-obsidian-950 rounded-xl p-3 flex flex-col justify-between relative overflow-hidden border border-white/5 shadow-inner">
      {/* Top telemetry bar */}
      <div className="flex items-center justify-between z-10">
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${oldpeak >= 1.5 ? 'bg-rose-500 animate-ping' : 'bg-cyan-400'}`} />
          Lead II Real-Time Rhythm
        </span>
        <span className="font-mono text-[10px] text-cyan-300 font-semibold">
          CYCLE: {beatDurationSeconds}s • {statusLabel}
        </span>
      </div>

      {/* Dynamic ECG Waveform */}
      <div className="relative w-full h-14 overflow-hidden flex items-center">
        <svg
          className={`w-full h-full ${traceColor} overflow-visible transition-colors duration-300`}
          preserveAspectRatio="none"
          viewBox="0 0 500 60"
        >
          <path
            d={pathData}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_8px_currentColor]"
          />
        </svg>

        {/* Scan line indicator that sweeps across */}
        <div
          className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-cyan-400/20 to-cyan-400/60 pointer-events-none"
          style={{
            animation: `scanline ${beatDurationSeconds}s linear infinite`,
          }}
        />
      </div>

      {/* Ambient ECG background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:12px_12px] opacity-10 pointer-events-none" />

      {/* Bottom status readout */}
      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 z-10">
        <span>SPEED: 25 mm/s</span>
        <span>VOLTAGE: 10 mm/mV</span>
        <span>RATE: {maxHR} BPM</span>
      </div>
    </div>
  );
};
