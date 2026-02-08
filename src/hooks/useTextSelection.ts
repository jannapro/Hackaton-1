/**
 * Hook for detecting and capturing text selection in the document.
 */

import { useState, useEffect, useCallback } from 'react';

export interface TextSelection {
  text: string;
  startOffset: number;
  endOffset: number;
}

export function useTextSelection() {
  const [selection, setSelection] = useState<TextSelection | null>(null);

  const handleSelectionChange = useCallback(() => {
    const windowSelection = window.getSelection();

    if (!windowSelection || windowSelection.isCollapsed) {
      // No selection or cursor only
      return;
    }

    const selectedText = windowSelection.toString().trim();

    // Only capture meaningful selections (more than a few characters)
    if (selectedText.length < 10) {
      return;
    }

    // Limit selection length to prevent extremely long context
    const trimmedText = selectedText.length > 2000
      ? selectedText.substring(0, 2000) + '...'
      : selectedText;

    setSelection({
      text: trimmedText,
      startOffset: windowSelection.anchorOffset,
      endOffset: windowSelection.focusOffset,
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelection(null);
  }, []);

  useEffect(() => {
    // Listen for mouseup to capture selection after user finishes selecting
    document.addEventListener('mouseup', handleSelectionChange);

    // Also listen for keyboard selection (Shift+Arrow keys)
    document.addEventListener('keyup', (e) => {
      if (e.shiftKey) {
        handleSelectionChange();
      }
    });

    return () => {
      document.removeEventListener('mouseup', handleSelectionChange);
      document.removeEventListener('keyup', handleSelectionChange);
    };
  }, [handleSelectionChange]);

  return {
    selection,
    clearSelection,
    hasSelection: selection !== null && selection.text.length > 0,
  };
}
