import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';
import Navbar from '@/components/layout/navbar';
import { usePathname } from 'next/navigation';

// Mock Next.js hooks
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock NextAuth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    nav: ({ children }: { children: React.ReactNode }) => <nav>{children}</nav>,
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  },
}));

const mockUseSession = useSession as jest.MockedFunction<typeof useSession>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePathname.mockReturnValue('/');
  });

  const renderNavbar = (session: any = null) => {
    mockUseSession.mockReturnValue({ 
      data: session, 
      status: session ? 'authenticated' : 'unauthenticated',
      update: jest.fn().mockResolvedValue({} as any),
    } as any);
    
    return render(
      <SessionProvider session={session}>
        <Navbar />
      </SessionProvider>
    );
  };

  it('should render logo and brand name', () => {
    renderNavbar();
    
    expect(screen.getByText('B')).toBeTruthy();
    expect(screen.getByText('Bet')).toBeTruthy();
    expect(screen.getByText('Day')).toBeTruthy();
  });

  it('should render navigation links', () => {
    renderNavbar();
    
    expect(screen.getByText('Eventos')).toBeTruthy();
    expect(screen.getByText('Mis Apuestas')).toBeTruthy();
  });

  it('should show login button when not authenticated', () => {
    renderNavbar();
    
    expect(screen.getByText('Ingresar')).toBeTruthy();
  });

  it('should show user info and logout when authenticated', () => {
    const mockSession = {
      user: {
        id: 'user-1',
        name: 'testuser',
        email: 'test@example.com',
      },
    };
    
    renderNavbar(mockSession);
    
    expect(screen.getByText('testuser')).toBeTruthy();
    expect(screen.getByText('Salir')).toBeTruthy();
    expect(screen.queryByText('Ingresar')).toBeFalsy();
  });

  it('should show loading state while checking session', () => {
    mockUseSession.mockReturnValue({ 
      data: null, 
      status: 'loading',
      update: jest.fn().mockResolvedValue({} as any),
    } as any);
    
    render(
      <SessionProvider session={null}>
        <Navbar />
      </SessionProvider>
    );
    
    const loadingElement = document.querySelector('.animate-pulse');
    expect(loadingElement).toBeTruthy();
  });

  it('should call signIn when login button is clicked', () => {
    renderNavbar();
    
    const loginButton = screen.getByText('Ingresar');
    fireEvent.click(loginButton);
    
    expect(signIn).toHaveBeenCalled();
  });

  it('should call signOut when logout button is clicked', () => {
    const mockSession = {
      user: {
        id: 'user-1',
        name: 'testuser',
        email: 'test@example.com',
      },
    };
    
    renderNavbar(mockSession);
    
    const logoutButton = screen.getByText('Salir');
    fireEvent.click(logoutButton);
    
    expect(signOut).toHaveBeenCalled();
  });

  it('should have correct navigation link hrefs', () => {
    renderNavbar();
    
    const eventosLink = screen.getByText('Eventos');
    const profileLink = screen.getByText('Mis Apuestas');
    
    expect(eventosLink.closest('a')).toBeTruthy();
    expect(profileLink.closest('a')).toBeTruthy();
  });

  it('should show navigation icons', () => {
    renderNavbar();
    
    expect(screen.getByText('⚽')).toBeTruthy();
    expect(screen.getByText('🎫')).toBeTruthy();
  });
});
