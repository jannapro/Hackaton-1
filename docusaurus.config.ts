import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  // T010: Book title
  title: 'Physical Humanoid Robots',
  // T011: Subtitle/tagline
  tagline: 'An AI-Native Textbook for Physical AI and Humanoid Robotics',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // T012: Site metadata - T008: Deployment target (GitHub Pages)
  url: 'https://jannapro.github.io',
  baseUrl: '/physical-humanoid-robots-textbook/',

  // GitHub pages deployment config
  organizationName: 'jannapro',
  projectName: 'physical-humanoid-robots-textbook',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // i18n config - multilingual support (English default, Urdu)
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ur'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
      },
      ur: {
        label: 'اردو',
        direction: 'rtl',
        htmlLang: 'ur-PK',
      },
    },
  },

  // Custom fields for RAG Chatbot configuration
  customFields: {
    // Backend API URL - update for production deployment
    chatbotApiUrl: process.env.CHATBOT_API_URL || 'http://localhost:8000',
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/jannapro/physical-humanoid-robots-textbook/tree/main/',
          // Enable MDX for interactive components
          remarkPlugins: [],
          rehypePlugins: [],
        },
        // Disable blog for textbook focus
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Social card for sharing
    image: 'img/physical-humanoid-robots-social-card.jpg',

    // T015: Light/dark theme toggle
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    // T013: Navbar configuration
    navbar: {
      title: 'Physical Humanoid Robots',
      logo: {
        alt: 'Physical Humanoid Robots Textbook Logo',
        src: 'img/logo.svg',
      },
      items: [],
    },

    // T014: Footer configuration
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Textbook',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'Physical AI Foundations',
              to: '/docs/physical-ai-foundations',
            },
            {
              label: 'ROS 2',
              to: '/docs/ros2-robotic-nervous-system',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'ROS 2 Documentation',
              href: 'https://docs.ros.org/en/humble/',
            },
            {
              label: 'Gazebo Sim',
              href: 'https://gazebosim.org/',
            },
            {
              label: 'NVIDIA Isaac Sim',
              href: 'https://developer.nvidia.com/isaac-sim',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/jannapro/physical-humanoid-robots-textbook',
            },
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} Physical Humanoid Robots Textbook. Built with Docusaurus.`,
    },

    // Code highlighting for Python (rclpy) examples
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'bash', 'yaml', 'json'],
    },

    // Docs configuration
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
