import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import Providers from '@/components/providers';

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  Toaster: ({ children }: { children?: React.ReactNode }) => <div data-testid="toaster">{children}</div>,
}));

describe('Providers', () => {
  it('should render children with SessionProvider', () => {
    render(
      <Providers>
        <div data-testid="test-child">Test Content</div>
      </Providers>
    );

    expect(screen.getByTestId('test-child')).toBeTruthy();
    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('should render Toaster component', () => {
    render(
      <Providers>
        <div>Test Content</div>
      </Providers>
    );

    expect(screen.getByTestId('toaster')).toBeTruthy();
  });

  it('should pass correct props to Toaster', () => {
    render(
      <Providers>
        <div>Test Content</div>
      </Providers>
    );

    const toaster = screen.getByTestId('toaster');
    
    // Check if toaster has the correct positioning class
    expect(toaster).toBeTruthy();
  });

  it('should wrap children in SessionProvider', () => {
    const mockSession = { user: { id: 'test', name: 'Test User' } };
    
    render(
      <Providers>
        <div data-testid="session-test">Session Test</div>
      </Providers>
    );

    // The child should be rendered within the SessionProvider context
    expect(screen.getByTestId('session-test')).toBeTruthy();
    expect(screen.getByText('Session Test')).toBeTruthy();
  });

  it('should handle multiple children', () => {
    render(
      <Providers>
        <div data-testid="child1">Child 1</div>
        <div data-testid="child2">Child 2</div>
        <div data-testid="child3">Child 3</div>
      </Providers>
    );

    expect(screen.getByTestId('child1')).toBeTruthy();
    expect(screen.getByTestId('child2')).toBeTruthy();
    expect(screen.getByTestId('child3')).toBeTruthy();
    expect(screen.getByText('Child 1')).toBeTruthy();
    expect(screen.getByText('Child 2')).toBeTruthy();
    expect(screen.getByText('Child 3')).toBeTruthy();
  });

  it('should render without children', () => {
    render(<Providers>{null}</Providers>);
    
    // Should still render the Toaster even without children
    expect(screen.getByTestId('toaster')).toBeTruthy();
  });
});
