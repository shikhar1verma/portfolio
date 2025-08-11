import '@testing-library/jest-dom';

// Mock next/image to behave like a standard img
jest.mock('next/image', () => ({ __esModule: true, default: (props) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} />;
}}));

// Silence framer-motion warnings in tests
jest.mock('framer-motion', () => ({
  __esModule: true,
  motion: new Proxy({}, { get: () => (props) => <div {...props} /> }),
  AnimatePresence: ({ children }) => <div>{children}</div>,
})); 