/**
 * CodePlayground Component
 * T049: Interactive code execution component for ROS 2 / Python examples
 *
 * Note: Full interactive execution requires backend integration.
 * This component provides a UI foundation for future WebContainer or
 * JupyterLite integration.
 */

import React, { useState } from 'react';

interface CodePlaygroundProps {
  code: string;
  language?: string;
  title?: string;
  readOnly?: boolean;
}

export default function CodePlayground({
  code,
  language = 'python',
  title = 'Code Playground',
  readOnly = false,
}: CodePlaygroundProps): JSX.Element {
  const [currentCode, setCurrentCode] = useState(code);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setOutput('// Code execution requires backend integration.\n// For now, copy this code to your local ROS 2 environment.');
    setTimeout(() => setIsRunning(false), 1000);
  };

  const handleReset = () => {
    setCurrentCode(code);
    setOutput('');
  };

  return (
    <div className="code-playground" style={{
      border: '1px solid var(--ifm-color-primary)',
      borderRadius: '8px',
      overflow: 'hidden',
      marginBottom: '1.5rem',
    }}>
      <div style={{
        backgroundColor: 'var(--ifm-color-primary)',
        color: 'white',
        padding: '0.5rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span>{title}</span>
        <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>{language}</span>
      </div>

      <textarea
        value={currentCode}
        onChange={(e) => setCurrentCode(e.target.value)}
        readOnly={readOnly}
        style={{
          width: '100%',
          minHeight: '200px',
          padding: '1rem',
          fontFamily: 'var(--ifm-font-family-monospace)',
          fontSize: '14px',
          border: 'none',
          backgroundColor: 'var(--ifm-background-surface-color)',
          color: 'var(--ifm-font-color-base)',
          resize: 'vertical',
        }}
      />

      <div style={{
        display: 'flex',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: 'var(--ifm-background-surface-color)',
        borderTop: '1px solid var(--ifm-color-emphasis-300)',
      }}>
        <button
          onClick={handleRun}
          disabled={isRunning}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--ifm-color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isRunning ? 'wait' : 'pointer',
          }}
        >
          {isRunning ? 'Running...' : 'Run'}
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            color: 'var(--ifm-font-color-base)',
            border: '1px solid var(--ifm-color-emphasis-300)',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>

      {output && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          fontFamily: 'var(--ifm-font-family-monospace)',
          fontSize: '13px',
          whiteSpace: 'pre-wrap',
        }}>
          <strong>Output:</strong>
          <pre style={{ margin: '0.5rem 0 0 0' }}>{output}</pre>
        </div>
      )}
    </div>
  );
}
