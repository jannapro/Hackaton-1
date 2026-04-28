import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

// ─── Particle Network ────────────────────────────────────────────────────────

function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: any[] = [];
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.6,
        o: Math.random() * 0.4 + 0.15,
        p: Math.random() * Math.PI * 2,
      });
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', onMove);

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; p.p += 0.018;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) { const f = (120 - d) / 120; p.x += (dx / d) * f * 2; p.y += (dy / d) * f * 2; }
        const op = p.o + Math.sin(p.p) * 0.15;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${op})`; ctx.fill();
        particles.slice(i + 1).forEach(p2 => {
          const dx2 = p.x - p2.x, dy2 = p.y - p2.y;
          const d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (d2 < 130) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0,212,255,${0.12 * (1 - d2 / 130)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.particleCanvas} />;
}

// ─── Robot Panel (right side of hero) ────────────────────────────────────────

function RobotPanel() {
  const lines = [
    { label: 'SYSTEM', value: 'Humanoid v2.4', color: '#00d4ff' },
    { label: 'ROS 2', value: 'Humble · Active', color: '#22c55e' },
    { label: 'GAZEBO', value: 'Physics OK', color: '#22c55e' },
    { label: 'ISAAC', value: 'GPU Ready', color: '#a855f7' },
    { label: 'VLA', value: 'Model Loaded', color: '#f59e0b' },
    { label: 'AGENT', value: 'Autonomous', color: '#00d4ff' },
  ];

  return (
    <div className={styles.robotPanel}>
      <div className={styles.robotPanelHeader}>
        <div className={styles.panelDots}>
          <span className={styles.dot} style={{ background: '#ff5f56' }} />
          <span className={styles.dot} style={{ background: '#ffbd2e' }} />
          <span className={styles.dot} style={{ background: '#27c93f' }} />
        </div>
        <span className={styles.panelTitle}>robot_system.py</span>
      </div>
      <div className={styles.robotPanelBody}>
        <div className={styles.codeComment}># Initializing Physical AI Stack</div>
        <div className={styles.codeBlank} />
        {lines.map((line, i) => (
          <div key={i} className={styles.codeLine} style={{ animationDelay: `${0.3 + i * 0.15}s` }}>
            <span className={styles.codeKey}>{line.label}</span>
            <span className={styles.codeSep}> → </span>
            <span className={styles.codeVal} style={{ color: line.color }}>{line.value}</span>
          </div>
        ))}
        <div className={styles.codeBlank} />
        <div className={styles.codePrompt}>
          <span className={styles.promptCaret}>❯</span>
          <span className={styles.promptText}>ready to build</span>
          <span className={styles.cursor} />
        </div>
      </div>
      <div className={styles.panelGlow} />
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

const techBadges = ['ROS 2', 'Python', 'Gazebo', 'Isaac Sim', 'VLA', 'Agents'];

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.gridOverlay} />
      <ParticleNetwork />
      <div className={styles.heroShapes}>
        <div className={styles.shape1} /><div className={styles.shape2} />
        <div className={styles.shape3} /><div className={styles.shape4} />
      </div>

      <div className={clsx('container', styles.heroInner)}>
        {/* Left: text */}
        <div className={styles.heroText}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeDot} />
            <span>OPEN BETA · Free Access</span>
          </div>

          <h1 className={styles.heroTitle}>
            Build Humanoid Robots with
            <span className={styles.heroAccent}> AI, ROS 2</span>
            {' '}and Simulation
          </h1>

          <p className={styles.heroSubtitle}>
            Learn Physical AI step by step using Python, ROS 2, Gazebo, Isaac Sim,
            VLA systems, and autonomous agents.
          </p>

          <div className={styles.heroCtas}>
            <Link className={styles.ctaPrimary} to="/docs/intro">
              Start Learning <span className={styles.ctaArrow}>→</span>
            </Link>
            <button
              className={styles.ctaOutline}
              onClick={() => document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Modules
            </button>
            <Link className={styles.ctaGhost} to="/docs/capstone-autonomous-agent">
              Try Robot Demo
            </Link>
          </div>

          <div className={styles.techBadges}>
            {techBadges.map(b => (
              <span key={b} className={styles.techBadge}>{b}</span>
            ))}
          </div>
        </div>

        {/* Right: robot panel */}
        <div className={styles.heroVisual}>
          <RobotPanel />
        </div>
      </div>
    </section>
  );
}

// ─── What You Will Build ──────────────────────────────────────────────────────

const outcomes = [
  { icon: '🦾', title: 'Autonomous Humanoid Agent', desc: 'A full stack robot that perceives, reasons, and acts in the real world using AI.' },
  { icon: '🔗', title: 'ROS 2 Robot Systems', desc: 'Production-grade nodes, topics, services, and actions with Python rclpy.' },
  { icon: '🌐', title: 'Digital Twin Simulations', desc: 'High-fidelity Gazebo and Isaac Sim environments that mirror real hardware.' },
  { icon: '👁️', title: 'VLA-Powered Robots', desc: 'Vision-Language-Action models that understand language and manipulate objects.' },
];

function useIntersection(ref: React.RefObject<Element>, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function WhatYouBuild() {
  const refs = outcomes.map(() => useRef<HTMLDivElement>(null));
  const visible = refs.map(r => useIntersection(r));

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>Outcomes</span>
          <h2 className={styles.sectionTitle}>What You Will Build</h2>
          <p className={styles.sectionSub}>Hands-on projects across every chapter — from simulation to deployment.</p>
        </div>
        <div className={styles.outcomesGrid}>
          {outcomes.map((o, i) => (
            <div
              key={i}
              ref={refs[i]}
              className={clsx(styles.outcomeCard, visible[i] && styles.cardVisible)}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={styles.outcomeIcon}>{o.icon}</div>
              <h3 className={styles.outcomeTitle}>{o.title}</h3>
              <p className={styles.outcomeDesc}>{o.desc}</p>
              <div className={styles.cardGlow} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Course Roadmap ───────────────────────────────────────────────────────────

const modules = [
  {
    number: '01', icon: '🧠', title: 'Physical AI Foundations',
    desc: 'Core concepts of embodied intelligence, sensor-actuator loops, and real-world AI systems.',
    link: 'docs/physical-ai-foundations',
    difficulty: 'Beginner', lessons: 12, labs: 4, quizzes: 2,
  },
  {
    number: '02', icon: '🔗', title: 'ROS 2: Robotic Nervous System',
    desc: 'Master ROS 2 nodes, topics, services, actions, and QoS for robust robot communication.',
    link: 'docs/ros2-robotic-nervous-system',
    difficulty: 'Beginner', lessons: 14, labs: 5, quizzes: 3,
  },
  {
    number: '03', icon: '🌐', title: 'Digital Twins: Gazebo & Unity',
    desc: 'Build high-fidelity simulations with Gazebo physics and Unity visualization.',
    link: 'docs/digital-twins-gazebo-unity',
    difficulty: 'Intermediate', lessons: 10, labs: 6, quizzes: 2,
  },
  {
    number: '04', icon: '⚡', title: 'NVIDIA Isaac & Robot Intelligence',
    desc: 'Leverage Isaac Sim, Isaac ROS, and GPU-accelerated perception pipelines.',
    link: 'docs/nvidia-isaac-robot-intelligence',
    difficulty: 'Intermediate', lessons: 11, labs: 5, quizzes: 2,
  },
  {
    number: '05', icon: '👁️', title: 'Vision-Language-Action Systems',
    desc: 'Integrate VLMs for semantic understanding and language-guided manipulation.',
    link: 'docs/vision-language-action',
    difficulty: 'Advanced', lessons: 9, labs: 4, quizzes: 2,
  },
  {
    number: '06', icon: '🦿', title: 'Humanoid Locomotion & Manipulation',
    desc: 'Bipedal walking, balance control, whole-body coordination, and dexterous grasping.',
    link: 'docs/humanoid-locomotion-manipulation',
    difficulty: 'Advanced', lessons: 13, labs: 6, quizzes: 3,
  },
  {
    number: '07', icon: '💬', title: 'Conversational Robotics',
    desc: 'Speech recognition, NLU, dialogue management, and multimodal human-robot interaction.',
    link: 'docs/conversational-robotics',
    difficulty: 'Intermediate', lessons: 8, labs: 3, quizzes: 2,
  },
  {
    number: '08', icon: '🤖', title: 'Capstone: Autonomous Agent',
    desc: 'Build a complete autonomous humanoid with behavior trees and integrated subsystems.',
    link: 'docs/capstone-autonomous-agent',
    difficulty: 'Advanced', lessons: 10, labs: 8, quizzes: 1,
  },
];

const difficultyColor: Record<string, string> = {
  Beginner: '#22c55e',
  Intermediate: '#f59e0b',
  Advanced: '#ef4444',
};

function CourseRoadmap() {
  const cardRefs = modules.map(() => useRef<HTMLDivElement>(null));
  const visible = cardRefs.map(r => useIntersection(r, 0.1));

  return (
    <section id="modules" className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>Curriculum</span>
          <h2 className={styles.sectionTitle}>Course Roadmap</h2>
          <p className={styles.sectionSub}>8 comprehensive modules covering the complete humanoid robotics stack.</p>
        </div>
        <div className={styles.modulesGrid}>
          {modules.map((m, i) => (
            <div
              key={i}
              ref={cardRefs[i]}
              className={clsx(styles.moduleCard, visible[i] && styles.cardVisible)}
              style={{ transitionDelay: `${(i % 4) * 0.08}s` }}
            >
              <div className={styles.moduleTop}>
                <span className={styles.moduleNum}>{m.number}</span>
                <span
                  className={styles.diffBadge}
                  style={{ color: difficultyColor[m.difficulty], borderColor: difficultyColor[m.difficulty] + '40' }}
                >
                  {m.difficulty}
                </span>
              </div>
              <div className={styles.moduleIcon}>{m.icon}</div>
              <h3 className={styles.moduleTitle}>{m.title}</h3>
              <p className={styles.moduleDesc}>{m.desc}</p>
              <div className={styles.moduleStats}>
                <span>{m.lessons} Lessons</span>
                <span className={styles.statDot}>·</span>
                <span>{m.labs} Labs</span>
                <span className={styles.statDot}>·</span>
                <span>{m.quizzes} Quizzes</span>
              </div>
              <Link to={m.link} className={styles.moduleBtn}>
                Start Module <span>→</span>
              </Link>
              <div className={styles.cardGlow} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Simulation Labs ──────────────────────────────────────────────────────────

const labs = [
  {
    icon: '⚙️', color: '#00d4ff', title: 'Gazebo Physics Sandbox',
    desc: 'Run real-time physics simulations of humanoid robots. Experiment with gravity, friction, and joint dynamics.',
    cta: 'Launch Simulation', link: 'docs/digital-twins-gazebo-unity',
  },
  {
    icon: '🧬', color: '#a855f7', title: 'Isaac Sim Neural Training',
    desc: 'GPU-accelerated reinforcement learning for locomotion, grasping, and navigation tasks.',
    cta: 'Open Lab', link: 'docs/nvidia-isaac-robot-intelligence',
  },
  {
    icon: '🔴', color: '#22c55e', title: 'ROS 2 Live Playground',
    desc: 'Publish topics, call services, and watch your robot respond — all in the browser.',
    cta: 'Try It Now', link: 'docs/ros2-robotic-nervous-system',
  },
];

function SimLabs() {
  const refs = labs.map(() => useRef<HTMLDivElement>(null));
  const visible = refs.map(r => useIntersection(r));

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>Interactive</span>
          <h2 className={styles.sectionTitle}>Simulation Labs</h2>
          <p className={styles.sectionSub}>Learn by doing — run robot simulations directly from your browser.</p>
        </div>
        <div className={styles.labsGrid}>
          {labs.map((lab, i) => (
            <div
              key={i}
              ref={refs[i]}
              className={clsx(styles.labCard, visible[i] && styles.cardVisible)}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className={styles.labAccent} style={{ background: lab.color }} />
              <div className={styles.labIcon}>{lab.icon}</div>
              <h3 className={styles.labTitle}>{lab.title}</h3>
              <p className={styles.labDesc}>{lab.desc}</p>
              <Link to={lab.link} className={styles.labBtn} style={{ borderColor: lab.color + '60', color: lab.color }}>
                {lab.cta} →
              </Link>
              <div className={styles.cardGlow} style={{ background: `radial-gradient(circle at 50% 100%, ${lab.color}15, transparent 70%)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AI Mentor Preview ────────────────────────────────────────────────────────

function AIMentor() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref);

  return (
    <section className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <div ref={ref} className={clsx(styles.mentorInner, visible && styles.cardVisible)}>
          <div className={styles.mentorLeft}>
            <span className={styles.sectionEyebrow}>AI-Powered</span>
            <h2 className={styles.sectionTitle}>Your AI Robotics Mentor</h2>
            <ul className={styles.mentorList}>
              <li><span className={styles.mentorCheck}>✓</span> Available 24/7 — ask anything about the textbook</li>
              <li><span className={styles.mentorCheck}>✓</span> Cites exact chapter and section sources</li>
              <li><span className={styles.mentorCheck}>✓</span> Supports English and Urdu</li>
              <li><span className={styles.mentorCheck}>✓</span> Context-aware — understands your selected text</li>
            </ul>
            <button
              className={styles.ctaPrimary}
              onClick={() => {
                const btn = document.querySelector<HTMLElement>('[class*="chatbotToggle"], [class*="chatbot-toggle"], .chatbot-button, [aria-label*="chat"]');
                btn?.click();
              }}
            >
              Ask the AI Mentor →
            </button>
          </div>
          <div className={styles.mentorRight}>
            <div className={styles.chatDemo}>
              <div className={styles.chatHeader}>
                <div className={styles.chatAvatar}>🤖</div>
                <div>
                  <div className={styles.chatName}>Physical AI Assistant</div>
                  <div className={styles.chatStatus}><span className={styles.onlineDot} />Online</div>
                </div>
              </div>
              <div className={styles.chatMessages}>
                <div className={styles.msgUser}>What is a VLA system?</div>
                <div className={styles.msgBot}>
                  A Vision-Language-Action (VLA) system combines visual perception, language understanding, and motor control into one unified model. It allows robots to follow natural language instructions...
                  <div className={styles.msgSource}>[Ch. 5: VLA Systems · Score 0.94]</div>
                </div>
                <div className={styles.msgUser}>How does ROS 2 handle communication?</div>
                <div className={styles.msgBotTyping}>
                  <span className={styles.typingDot} /><span className={styles.typingDot} /><span className={styles.typingDot} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Capstone ─────────────────────────────────────────────────────────────────

const milestones = ['Design Architecture', 'Build Subsystems', 'Integrate & Test', 'Deploy Agent'];

function Capstone() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref);

  return (
    <section className={styles.capstone}>
      <div className="container">
        <div ref={ref} className={clsx(styles.capstoneInner, visible && styles.cardVisible)}>
          <span className={styles.sectionEyebrow}>Final Project</span>
          <h2 className={styles.capstonTitle}>Build a Full Autonomous Agent</h2>
          <p className={styles.capstoneDesc}>
            Integrate everything you've learned — perception, reasoning, locomotion, and communication —
            into a single autonomous humanoid robot that can navigate, manipulate, and converse.
          </p>
          <div className={styles.milestones}>
            {milestones.map((m, i) => (
              <div key={i} className={styles.milestone}>
                <div className={styles.milestoneNum}>{String(i + 1).padStart(2, '0')}</div>
                <div className={styles.milestoneName}>{m}</div>
                {i < milestones.length - 1 && <div className={styles.milestoneArrow}>→</div>}
              </div>
            ))}
          </div>
          <Link to="docs/capstone-autonomous-agent" className={styles.ctaPrimary}>
            View Capstone →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description="An AI-Native Textbook for Physical AI and Humanoid Robotics">
      <Hero />
      <main>
        <WhatYouBuild />
        <CourseRoadmap />
        <SimLabs />
        <AIMentor />
        <Capstone />
      </main>
    </Layout>
  );
}
