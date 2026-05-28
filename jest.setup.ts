import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
    pathname: '/test-path',  
    query: {},
    asPath: '/test-path',
  }),
}));
