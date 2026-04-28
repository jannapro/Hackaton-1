/**
 * Swizzled Navbar Content — futuristic SaaS header.
 */

import React from 'react';
import { useThemeConfig, ErrorCauseBoundary } from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import UserMenu from '@site/src/components/UserMenu';
import LanguageSwitcher from '@site/src/components/LanguageSwitcher';
import { useAuth } from '@site/src/contexts/AuthContext';
import styles from './styles.module.css';

function useNavbarItems() {
  return useThemeConfig().navbar.items;
}

function NavbarItems({ items }: { items: any[] }) {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={error =>
            new Error(
              `A theme navbar item failed to render.\n${JSON.stringify(item, null, 2)}`,
              { cause: error }
            )
          }
        >
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

function NavbarContentLayout({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  );
}

/** Small "Login" button — shown only when not authenticated */
function LoginButton() {
  const { user } = useAuth();
  if (user) return null;
  return (
    <Link
      to="/login"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: '12px',
        fontWeight: 600,
        fontFamily: 'Space Grotesk, sans-serif',
        padding: '5px 14px',
        borderRadius: '8px',
        border: '1px solid rgba(0,212,255,0.3)',
        color: '#7799bb',
        textDecoration: 'none',
        marginLeft: '4px',
        letterSpacing: '0.04em',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = '#00d4ff';
        el.style.borderColor = 'rgba(0,212,255,0.6)';
        el.style.background = 'rgba(0,212,255,0.06)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = '#7799bb';
        el.style.borderColor = 'rgba(0,212,255,0.3)';
        el.style.background = 'transparent';
      }}
    >
      Login
    </Link>
  );
}

/** "Start Learning" CTA — shown when not authenticated */
function StartLearningCTA() {
  const { user } = useAuth();
  if (user) return null;
  return (
    <Link
      to="/docs/intro"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '12px',
        fontWeight: 700,
        fontFamily: 'Space Grotesk, sans-serif',
        padding: '7px 16px',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #00b4d8, #0077b6)',
        color: '#fff',
        textDecoration: 'none',
        marginLeft: '8px',
        letterSpacing: '0.04em',
        boxShadow: '0 0 16px rgba(0,212,255,0.2)',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = '0 0 24px rgba(0,212,255,0.4)';
        el.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = '0 0 16px rgba(0,212,255,0.2)';
        el.style.transform = 'none';
      }}
    >
      Start Learning →
    </Link>
  );
}

export default function NavbarContent(): JSX.Element {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const filteredItems = items.filter((item: any) => item.type !== 'custom-languageSwitcher');
  const [leftItems, rightItems] = splitNavbarItems(filteredItems);
  const searchBarItem = items.find((item: any) => item.type === 'search');

  return (
    <NavbarContentLayout
      left={
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          <NavbarItems items={leftItems} />
        </>
      }
      right={
        <>
          <NavbarItems items={rightItems} />
          {!searchBarItem && (
            <NavbarSearch>
              <div className="navbar__search" />
            </NavbarSearch>
          )}
          <NavbarColorModeToggle className={styles.colorModeToggle} />
          <LanguageSwitcher />
          <BrowserOnly>{() => <LoginButton />}</BrowserOnly>
          <BrowserOnly>{() => <UserMenu />}</BrowserOnly>
          <BrowserOnly>{() => <StartLearningCTA />}</BrowserOnly>
        </>
      }
    />
  );
}
