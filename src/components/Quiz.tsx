/**
 * Quiz Component
 * T050: Embedded quiz component for knowledge checks
 *
 * Supports multiple choice and true/false questions with
 * immediate feedback and explanations.
 */

import React, { useState } from 'react';

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false';
  question: string;
  options: QuizOption[];
  correctAnswer: string;
  explanation: string;
}

interface QuizProps {
  title?: string;
  questions: QuizQuestion[];
}

export default function Quiz({
  title = 'Knowledge Check',
  questions,
}: QuizProps): JSX.Element {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  const handleAnswerChange = (questionId: string, answerId: string) => {
    if (!submitted) {
      setAnswers({ ...answers, [questionId]: answerId });
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShowExplanations({});
  };

  const toggleExplanation = (questionId: string) => {
    setShowExplanations({
      ...showExplanations,
      [questionId]: !showExplanations[questionId],
    });
  };

  const getScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <div className="quiz-container" style={{
      border: '2px solid var(--ifm-color-primary)',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '2rem',
    }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>

      {questions.map((question, index) => (
        <div
          key={question.id}
          style={{
            marginBottom: '1.5rem',
            padding: '1rem',
            backgroundColor: 'var(--ifm-background-surface-color)',
            borderRadius: '4px',
          }}
        >
          <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
            {index + 1}. {question.question}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {question.options.map((option) => {
              const isSelected = answers[question.id] === option.id;
              const isCorrect = option.id === question.correctAnswer;

              let backgroundColor = 'transparent';
              if (submitted) {
                if (isSelected && isCorrect) {
                  backgroundColor = 'rgba(0, 200, 83, 0.2)';
                } else if (isSelected && !isCorrect) {
                  backgroundColor = 'rgba(255, 82, 82, 0.2)';
                } else if (isCorrect) {
                  backgroundColor = 'rgba(0, 200, 83, 0.1)';
                }
              }

              return (
                <label
                  key={option.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    cursor: submitted ? 'default' : 'pointer',
                    backgroundColor,
                    border: isSelected ? '1px solid var(--ifm-color-primary)' : '1px solid transparent',
                  }}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.id}
                    checked={isSelected}
                    onChange={() => handleAnswerChange(question.id, option.id)}
                    disabled={submitted}
                    style={{ marginRight: '0.75rem' }}
                  />
                  {option.text}
                  {submitted && isCorrect && ' ✓'}
                </label>
              );
            })}
          </div>

          {submitted && (
            <div style={{ marginTop: '1rem' }}>
              <button
                onClick={() => toggleExplanation(question.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ifm-color-primary)',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: '0.9rem',
                }}
              >
                {showExplanations[question.id] ? 'Hide' : 'Show'} Explanation
              </button>

              {showExplanations[question.id] && (
                <p style={{
                  marginTop: '0.5rem',
                  padding: '0.75rem',
                  backgroundColor: 'rgba(0, 102, 204, 0.1)',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                }}>
                  {question.explanation}
                </p>
              )}
            </div>
          )}
        </div>
      ))}

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '1rem',
      }}>
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== questions.length}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--ifm-color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: Object.keys(answers).length !== questions.length ? 'not-allowed' : 'pointer',
              opacity: Object.keys(answers).length !== questions.length ? 0.5 : 1,
            }}
          >
            Submit Answers
          </button>
        ) : (
          <>
            <span style={{ fontWeight: 'bold' }}>
              Score: {getScore()} / {questions.length}
            </span>
            <button
              onClick={handleReset}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'transparent',
                color: 'var(--ifm-font-color-base)',
                border: '1px solid var(--ifm-color-emphasis-300)',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
