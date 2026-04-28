/**
 * Swizzled Navbar Content — adds Language Switcher, User Menu, and optional Login button.
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
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.\nPlease double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:\n${JSON.stringify(item, null, 2)}`,
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

function LoginButton() {
  const { user } = useAuth();
  if (user) return null;
  return (
    <Link
      to="/login"
      style={{
        fontSize: '0.8rem',
        fontWeight: 600,
        padding: '5px 14px',
        borderRadius: '6px',
        border: '1px solid rgba(0,212,255,0.5)',
        color: '#00d4ff',
        textDecoration: 'none',
        marginLeft: '8px',
        transition: 'all 0.2s',
        letterSpacing: '0.03em',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.1)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = 'transparent';
      }}
    >
      Login
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
          <BrowserOnly>{() => <UserMenu />}</BrowserOnly>
          <BrowserOnly>{() => <LoginButton />}</BrowserOnly>
          <LanguageSwitcher />
          <NavbarColorModeToggle className={styles.colorModeToggle} />
          {!searchBarItem && (
            <NavbarSearch>
              <div className="navbar__search" />
            </NavbarSearch>
          )}
        </>
      }
    />
  );
}
