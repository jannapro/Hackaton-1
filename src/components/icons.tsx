/**
 * Custom SVG icon fragments for the futuristic robotics design system.
 * Each export renders path/shape elements only — no <svg> wrapper.
 * Intended for use inside <RoboIcon>.
 */
import React from 'react';

export function CpuChipIcon() {
  return (
    <>
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 3H4a1 1 0 00-1 1v5M3 15v5a1 1 0 001 1h5M15 3h5a1 1 0 011 1v5M21 15v5a1 1 0 01-1 1h-5" />
      <path d="M9 3v3M15 3v3M3 9h3M3 15h3M9 21v-3M15 21v-3M21 9h-3M21 15h-3" />
    </>
  );
}

export function NetworkGraphIcon() {
  return (
    <>
      <circle cx="5" cy="12" r="2.5" />
      <circle cx="19" cy="5" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <line x1="7.2" y1="10.8" x2="17" y2="6.2" />
      <line x1="7.2" y1="13.2" x2="17" y2="17.8" />
    </>
  );
}

export function CubeWireframeIcon() {
  return (
    <>
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <line x1="3.27" y1="6.96" x2="12" y2="12" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
      <line x1="20.73" y1="6.96" x2="12" y2="12" />
    </>
  );
}

export function CameraApertureIcon() {
  return (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <line x1="12" y1="3" x2="12" y2="9" />
      <line x1="18.5" y1="6.5" x2="14.12" y2="10.88" />
      <line x1="5.5" y1="6.5" x2="9.88" y2="10.88" />
    </>
  );
}

export function CircuitBrainIcon() {
  return (
    <>
      <path d="M12 4C9 4 6.5 6 6.5 9c0 1.5.6 2.8 1.5 3.8V17l2-1 2 1 2-1 2 1v-4.2c.9-1 1.5-2.3 1.5-3.8C17.5 6 15 4 12 4z" />
      <circle cx="9.5" cy="10" r="1" />
      <circle cx="14.5" cy="10" r="1" />
      <path d="M10 13.5c.6.3 1.4.5 2 .5s1.4-.2 2-.5" />
      <line x1="12" y1="4" x2="12" y2="2" />
      <line x1="8" y1="5" x2="6.5" y2="3.5" />
      <line x1="16" y1="5" x2="17.5" y2="3.5" />
    </>
  );
}

export function GpuBoltIcon() {
  return (
    <>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M13 10l-3 4h5l-3 4" />
      <line x1="6" y1="10" x2="6" y2="14" />
      <line x1="18" y1="10" x2="18" y2="14" />
    </>
  );
}

export function RobotLimbIcon() {
  return (
    <>
      <circle cx="12" cy="5" r="2" />
      <line x1="12" y1="7" x2="8" y2="14" />
      <circle cx="8" cy="14" r="1.5" />
      <line x1="8" y1="15.5" x2="5" y2="21" />
      <line x1="12" y1="7" x2="16" y2="14" />
      <circle cx="16" cy="14" r="1.5" />
      <line x1="16" y1="15.5" x2="19" y2="21" />
    </>
  );
}

export function SpeechWaveIcon() {
  return (
    <>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      <line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="13" y2="14" />
    </>
  );
}

export function RobotHeadIcon() {
  return (
    <>
      <rect x="5" y="7" width="14" height="11" rx="2" />
      <circle cx="9" cy="12" r="1.5" />
      <circle cx="15" cy="12" r="1.5" />
      <line x1="9" y1="16" x2="15" y2="16" />
      <line x1="12" y1="7" x2="12" y2="4" />
      <line x1="9" y1="4" x2="15" y2="4" />
    </>
  );
}

export function GearIcon() {
  return (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </>
  );
}

export function NeuralNetIcon() {
  return (
    <>
      <circle cx="5" cy="6" r="1.8" />
      <circle cx="5" cy="12" r="1.8" />
      <circle cx="5" cy="18" r="1.8" />
      <circle cx="12" cy="9" r="1.8" />
      <circle cx="12" cy="15" r="1.8" />
      <circle cx="19" cy="12" r="1.8" />
      <line x1="6.8" y1="6.5" x2="10.2" y2="8.5" />
      <line x1="6.8" y1="11.5" x2="10.2" y2="9.5" />
      <line x1="6.8" y1="12.5" x2="10.2" y2="14.5" />
      <line x1="6.8" y1="17.5" x2="10.2" y2="15.5" />
      <line x1="13.8" y1="9.5" x2="17.2" y2="11.5" />
      <line x1="13.8" y1="14.5" x2="17.2" y2="12.5" />
    </>
  );
}

export function HexagonNodeIcon() {
  return (
    <>
      <path d="M12 2l8.66 5v10L12 22l-8.66-5V7z" />
      <circle cx="12" cy="12" r="2.5" />
      <line x1="12" y1="9.5" x2="12" y2="7" />
      <line x1="14.17" y1="10.75" x2="16.33" y2="9.5" />
      <line x1="14.17" y1="13.25" x2="16.33" y2="14.5" />
      <line x1="12" y1="14.5" x2="12" y2="17" />
      <line x1="9.83" y1="13.25" x2="7.67" y2="14.5" />
      <line x1="9.83" y1="10.75" x2="7.67" y2="9.5" />
    </>
  );
}
