/**
 * RoboIcon — futuristic glassmorphism icon container for the robotics design system.
 */
import React from 'react';
import styles from './RoboIcon.module.css';

type Variant = 'cyan' | 'purple' | 'green' | 'amber';
type Size = 'sm' | 'md' | 'lg';
type Animation = 'none' | 'glow' | 'pulse' | 'spin';

interface RoboIconProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  animation?: Animation;
  label?: string;
  className?: string;
}

const VARIANTS: Record<Variant, { accent: string; glow: string; bg: string; border: string }> = {
  cyan:   { accent: '#00d4ff', glow: 'rgba(0,212,255,0.3)',   bg: 'rgba(0,212,255,0.08)',   border: 'rgba(0,212,255,0.28)' },
  purple: { accent: '#a855f7', glow: 'rgba(168,85,247,0.3)',  bg: 'rgba(124,58,237,0.09)',  border: 'rgba(168,85,247,0.28)' },
  green:  { accent: '#22c55e', glow: 'rgba(34,197,94,0.3)',   bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.28)' },
  amber:  { accent: '#f59e0b', glow: 'rgba(245,158,11,0.3)',  bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.28)' },
};

const SIZES: Record<Size, { container: number; icon: number; radius: number }> = {
  sm: { container: 36, icon: 18, radius: 8 },
  md: { container: 48, icon: 22, radius: 10 },
  lg: { container: 56, icon: 26, radius: 12 },
};

const ANIM_CLASS: Record<Animation, string> = {
  none:  '',
  glow:  styles.animGlow,
  pulse: styles.animPulse,
  spin:  styles.animSpin,
};

export default function RoboIcon({
  children,
  variant = 'cyan',
  size = 'md',
  animation = 'glow',
  label,
  className,
}: RoboIconProps): JSX.Element {
  const v = VARIANTS[variant];
  const s = SIZES[size];
  const animCls = ANIM_CLASS[animation];

  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      className={[styles.wrap, animCls, className].filter(Boolean).join(' ')}
      style={{
        width: s.container,
        height: s.container,
        borderRadius: s.radius,
        background: v.bg,
        border: `1px solid ${v.border}`,
        '--glow': v.glow,
      } as React.CSSProperties}
    >
      <span
        className={styles.innerGlow}
        style={{ background: `radial-gradient(circle at 50% 50%, ${v.glow}, transparent 70%)` }}
      />
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke={v.accent}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.svg}
      >
        {children}
      </svg>
    </span>
  );
}
