/**
 * Custom NavbarItem ComponentTypes to replace localeDropdown
 * with our custom LanguageSwitcher that works in dev mode.
 */

import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import LanguageSwitcher from '@site/src/components/LanguageSwitcher';

export default {
  ...ComponentTypes,
  // Replace the built-in locale dropdown with our custom switcher
  'custom-languageSwitcher': LanguageSwitcher,
};
