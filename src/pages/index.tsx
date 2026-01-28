import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Start Learning
          </Link>
        </div>
      </div>
    </header>
  );
}

function Features() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--4">
            <div className="text--center padding-horiz--md">
              <h3>Simulation-First Design</h3>
              <p>
                Learn robotics safely through simulation before deploying to hardware.
                Build skills with Gazebo and Isaac Sim.
              </p>
            </div>
          </div>
          <div className="col col--4">
            <div className="text--center padding-horiz--md">
              <h3>ROS 2 and Python</h3>
              <p>
                All code examples use ROS 2 (Humble/Iron) with Python rclpy.
                Industry-standard tools for modern robotics.
              </p>
            </div>
          </div>
          <div className="col col--4">
            <div className="text--center padding-horiz--md">
              <h3>AI-Native Content</h3>
              <p>
                Content optimized for RAG retrieval and AI-assisted learning.
                Find concepts quickly with structured, searchable chapters.
              </p>
            </div>
          </div>
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
      </main>
    </Layout>
  );
}
