/**
 * Swizzled Layout component to inject the ChatbotWidget globally.
 *
 * This wraps the default Docusaurus Layout and adds the RAG chatbot
 * to every page of the textbook. Includes LanguageProvider for
 * multilingual support (English/Urdu).
 */

import React from 'react';
import Layout from '@theme-original/Layout';
import type LayoutType from '@theme/Layout';
import type { WrapperProps } from '@docusaurus/types';
import ChatbotWidget from '@site/src/components/ChatbotWidget';
import { LanguageProvider } from '@site/src/contexts/LanguageContext';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): JSX.Element {
  return (
    <LanguageProvider>
      <Layout {...props} />
      <ChatbotWidget />
    </LanguageProvider>
  );
}
