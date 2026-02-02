import type {ReactNode} from 'react';
import {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

// Particle Network Component
function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({x: 0, y: 0});
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    // Set canvas size
    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const particleCount = 80;
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;

      // Update and draw particles
      particles.forEach((p, i) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse repulsion
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.x += (dx / dist) * force * 2;
          p.y += (dy / dist) * force * 2;
        }

        // Draw particle with pulse effect
        const pulseOpacity = p.opacity + Math.sin(p.pulse) * 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${pulseOpacity})`;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.particleCanvas} />;
}

// Floating geometric shapes
function FloatingShapes() {
  return (
    <div className={styles.floatingShapes}>
      <div className={styles.shape1}></div>
      <div className={styles.shape2}></div>
      <div className={styles.shape3}></div>
      <div className={styles.shape4}></div>
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.gridOverlay}></div>
      <ParticleNetwork />
      <FloatingShapes />

      <div className={clsx('container', styles.heroContent)}>
        <div className={clsx(styles.badge, isVisible && styles.badgeVisible)}>
          <span className={styles.badgeGlow}></span>
          <span className={styles.badgeText}>AI-NATIVE TEXTBOOK</span>
        </div>

        <Heading as="h1" className={clsx(styles.heroTitle, isVisible && styles.titleVisible)}>
          {siteConfig.title}
        </Heading>

        <p className={clsx(styles.heroSubtitle, isVisible && styles.subtitleVisible)}>
          {siteConfig.tagline}
        </p>

        <div className={clsx(styles.buttons, isVisible && styles.buttonsVisible)}>
          <Link
            className={styles.ctaButton}
            to="/docs/intro">
            <span className={styles.ctaGlow}></span>
            <span className={styles.ctaText}>Start Learning</span>
            <span className={styles.ctaArrow}>→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

const featureList = [
  {
    title: 'Simulation-First Design',
    icon: '🎮',
    description: 'Learn robotics safely through simulation before deploying to hardware. Build skills with Gazebo and Isaac Sim.',
  },
  {
    title: 'ROS 2 and Python',
    icon: '🐍',
    description: 'All code examples use ROS 2 (Humble/Iron) with Python rclpy. Industry-standard tools for modern robotics.',
  },
  {
    title: 'AI-Native Content',
    icon: '🤖',
    description: 'Content optimized for RAG retrieval and AI-assisted learning. Find concepts quickly with structured, searchable chapters.',
  },
];

const moduleList = [
  {
    number: '01',
    title: 'Physical AI Foundations',
    description: 'Core concepts of embodied intelligence, sensor-actuator loops, and real-world AI systems.',
    icon: '🧠',
    link: 'docs/physical-ai-foundations',
  },
  {
    number: '02',
    title: 'ROS 2: Robotic Nervous System',
    description: 'Master ROS 2 nodes, topics, services, actions, and QoS for robust robot communication.',
    icon: '🔗',
    link: 'docs/ros2-robotic-nervous-system',
  },
  {
    number: '03',
    title: 'Digital Twins: Gazebo & Unity',
    description: 'Build high-fidelity simulations with Gazebo physics and Unity visualization.',
    icon: '🌐',
    link: 'docs/digital-twins-gazebo-unity',
  },
  {
    number: '04',
    title: 'NVIDIA Isaac & Robot Intelligence',
    description: 'Leverage Isaac Sim, Isaac ROS, and GPU-accelerated perception pipelines.',
    icon: '⚡',
    link: 'docs/nvidia-isaac-robot-intelligence',
  },
  {
    number: '05',
    title: 'Vision-Language-Action Systems',
    description: 'Integrate VLMs for semantic understanding and language-guided manipulation.',
    icon: '👁️',
    link: 'docs/vision-language-action',
  },
  {
    number: '06',
    title: 'Humanoid Locomotion & Manipulation',
    description: 'Bipedal walking, balance control, whole-body coordination, and dexterous grasping.',
    icon: '🦿',
    link: 'docs/humanoid-locomotion-manipulation',
  },
  {
    number: '07',
    title: 'Conversational Robotics',
    description: 'Speech recognition, NLU, dialogue management, and multimodal human-robot interaction.',
    icon: '💬',
    link: 'docs/conversational-robotics',
  },
  {
    number: '08',
    title: 'Capstone: Autonomous Agent',
    description: 'Build a complete autonomous humanoid with behavior trees and integrated subsystems.',
    icon: '🤖',
    link: 'docs/capstone-autonomous-agent',
  },
];

function Features() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    const timers = featureList.map((_, i) =>
      setTimeout(() => {
        setVisibleCards(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 200 + i * 150)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresGrid}>
          {featureList.map((feature, idx) => (
            <div
              key={idx}
              className={clsx(styles.featureCard, visibleCards[idx] && styles.featureCardVisible)}
            >
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
              <div className={styles.featureGlow}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Modules() {
  const [visibleModules, setVisibleModules] = useState<boolean[]>(new Array(8).fill(false));

  useEffect(() => {
    const timers = moduleList.map((_, i) =>
      setTimeout(() => {
        setVisibleModules(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 100 + i * 100)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className={styles.modules}>
      <div className="container">
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>📚</span>
          Course Modules
        </h2>
        <p className={styles.sectionSubtitle}>
          8 comprehensive chapters covering the complete humanoid robotics stack
        </p>
        <div className={styles.modulesGrid}>
          {moduleList.map((module, idx) => (
            <Link
              key={idx}
              to={module.link}
              className={clsx(styles.moduleCard, visibleModules[idx] && styles.moduleCardVisible)}
            >
              <div className={styles.moduleNumber}>{module.number}</div>
              <div className={styles.moduleContent}>
                <div className={styles.moduleIcon}>{module.icon}</div>
                <h3 className={styles.moduleTitle}>{module.title}</h3>
                <p className={styles.moduleDescription}>{module.description}</p>
              </div>
              <div className={styles.moduleArrow}>→</div>
              <div className={styles.moduleGlow}></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="An AI-Native Textbook for Physical AI and Humanoid Robotics">
      <HomepageHeader />
      <main>
        <Features />
        <Modules />
      </main>
    </Layout>
  );
}
