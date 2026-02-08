/**
 * Swizzled Layout component to inject authentication and ChatbotWidget globally.
 *
 * This wraps the default Docusaurus Layout and adds:
 * - Firebase Authentication (email/password)
 * - Protected routes (entire book requires login)
 * - RAG chatbot
 * - Multilingual support (English/Urdu)
 */

import React from 'react';
import Layout from '@theme-original/Layout';
import type LayoutType from '@theme/Layout';
import type { WrapperProps } from '@docusaurus/types';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ChatbotWidget from '@site/src/components/ChatbotWidget';
import { LanguageProvider } from '@site/src/contexts/LanguageContext';
import { AuthProvider } from '@site/src/contexts/AuthContext';
import ProtectedRoute from '@site/src/components/ProtectedRoute';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): JSX.Element {
  return (
    <BrowserOnly fallback={<Layout {...props} />}>
      {() => (
        <LanguageProvider>
          <AuthProvider>
            <ProtectedRoute>
              <Layout {...props} />
              <ChatbotWidget />
            </ProtectedRoute>
          </AuthProvider>
        </LanguageProvider>
      )}
    </BrowserOnly>
  );
}
