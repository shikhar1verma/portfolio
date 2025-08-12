import '@testing-library/jest-dom';

// Mock next/image to behave like a standard img
jest.mock('next/image', () => ({ __esModule: true, default: (props) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} />;
}}));

// Silence framer-motion warnings in tests and support refs on motion.*
jest.mock('framer-motion', () => {
  const React = require('react');
  const motion = new Proxy({}, {
    get: () =>
      React.forwardRef((props, ref) => {
        const { children, ...rest } = props || {};
        return (
          <div ref={ref} {...rest}>
            {children}
          </div>
        );
      }),
  });
  const AnimatePresence = ({ children }) => <>{children}</>;
  return { __esModule: true, motion, AnimatePresence };
}); 