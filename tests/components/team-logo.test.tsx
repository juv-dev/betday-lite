import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { getTeamCrestUrl, getTeamColor } from '@/lib/league-icons';
import TeamLogo from '@/components/ui/team-logo';

// Mock the league-icons module
jest.mock('@/lib/league-icons');

const mockGetTeamCrestUrl = getTeamCrestUrl as jest.MockedFunction<typeof getTeamCrestUrl>;
const mockGetTeamColor = getTeamColor as jest.MockedFunction<typeof getTeamColor>;

// Mock Next.js Image
jest.mock('next/image', () => {
  return function MockImage({ src, alt, onError, ...props }: any) {
    return <img src={src} alt={alt} onError={onError} {...props} data-testid="team-logo-image" />;
  };
});

describe('TeamLogo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    teamId: 'ars',
    shortName: 'ARS',
    size: 44,
  };

  it('should render image when crest URL is available', () => {
    mockGetTeamCrestUrl.mockReturnValue('https://crests.football-data.org/57.png');
    mockGetTeamColor.mockReturnValue('#EF0107');

    render(<TeamLogo {...defaultProps} />);

    const image = screen.getByTestId('team-logo-image');
    expect(image).toBeTruthy();
    expect(image).toHaveAttribute('src', 'https://crests.football-data.org/57.png');
    expect(image).toHaveAttribute('alt', 'ARS');
    expect(image).toHaveAttribute('width', '44');
    expect(image).toHaveAttribute('height', '44');
  });

  it('should render fallback shield when crest URL is not available', () => {
    mockGetTeamCrestUrl.mockReturnValue(null);
    mockGetTeamColor.mockReturnValue('#EF0107');

    render(<TeamLogo {...defaultProps} />);

    const shield = document.querySelector('svg');
    expect(shield).toBeTruthy();
    expect(screen.queryByTestId('team-logo-image')).toBeFalsy();
    
    const text = shield?.querySelector('text');
    expect(text?.textContent).toBe('ARS');
  });

  it('should render fallback shield when image errors', () => {
    mockGetTeamCrestUrl.mockReturnValue('https://crests.football-data.org/57.png');
    mockGetTeamColor.mockReturnValue('#EF0107');

    render(<TeamLogo {...defaultProps} />);

    const image = screen.getByTestId('team-logo-image');
    
    // Simulate image error
    fireEvent.error(image);

    const shield = document.querySelector('svg');
    expect(shield).toBeTruthy();
    expect(screen.queryByTestId('team-logo-image')).toBeFalsy();
  });

  it('should use custom size when provided', () => {
    mockGetTeamCrestUrl.mockReturnValue('https://crests.football-data.org/57.png');
    mockGetTeamColor.mockReturnValue('#EF0107');

    render(<TeamLogo {...defaultProps} size={32} />);

    const image = screen.getByTestId('team-logo-image');
    expect(image).toHaveAttribute('width', '32');
    expect(image).toHaveAttribute('height', '32');
  });

  it('should use default size when not provided', () => {
    mockGetTeamCrestUrl.mockReturnValue('https://crests.football-data.org/57.png');
    mockGetTeamColor.mockReturnValue('#EF0107');

    const { size, ...propsWithoutSize } = defaultProps;
    render(<TeamLogo {...propsWithoutSize} />);

    const image = screen.getByTestId('team-logo-image');
    expect(image).toHaveAttribute('width', '44');
    expect(image).toHaveAttribute('height', '44');
  });

  it('should call getTeamCrestUrl with correct team ID', () => {
    mockGetTeamCrestUrl.mockReturnValue('https://crests.football-data.org/57.png');
    mockGetTeamColor.mockReturnValue('#EF0107');

    render(<TeamLogo {...defaultProps} />);

    expect(mockGetTeamCrestUrl).toHaveBeenCalledWith('ars');
  });

  it('should call getTeamColor with correct team ID', () => {
    mockGetTeamCrestUrl.mockReturnValue(null);
    mockGetTeamColor.mockReturnValue('#EF0107');

    render(<TeamLogo {...defaultProps} />);

    expect(mockGetTeamColor).toHaveBeenCalledWith('ars');
  });

  it('should use team color in shield gradient', () => {
    mockGetTeamCrestUrl.mockReturnValue(null);
    mockGetTeamColor.mockReturnValue('#EF0107');

    render(<TeamLogo {...defaultProps} />);

    const shield = document.querySelector('svg');
    const gradient = shield?.querySelector('linearGradient');
    const stops = gradient?.querySelectorAll('stop');
    
    expect(stops?.[0]).toHaveAttribute('stop-color', '#EF0107');
    expect(stops?.[1]).toHaveAttribute('stop-color', '#EF0107');
  });

  it('should display short name in shield text', () => {
    mockGetTeamCrestUrl.mockReturnValue(null);
    mockGetTeamColor.mockReturnValue('#EF0107');

    render(<TeamLogo {...defaultProps} shortName="MCI" />);

    const shield = document.querySelector('svg');
    const text = shield?.querySelector('text');
    expect(text?.textContent).toBe('MCI');
  });

  it('should have correct SVG dimensions', () => {
    mockGetTeamCrestUrl.mockReturnValue(null);
    mockGetTeamColor.mockReturnValue('#EF0107');

    render(<TeamLogo {...defaultProps} size={40} />);

    const shield = document.querySelector('svg');
    expect(shield).toHaveAttribute('viewBox', '0 0 40 48');
    expect(shield).toHaveAttribute('width', '34'); // size * 0.85
    expect(shield).toHaveAttribute('height', '40');
  });

  it('should have correct CSS class on image', () => {
    mockGetTeamCrestUrl.mockReturnValue('https://crests.football-data.org/57.png');
    mockGetTeamColor.mockReturnValue('#EF0107');

    render(<TeamLogo {...defaultProps} />);

    const image = screen.getByTestId('team-logo-image');
    expect(image).toHaveClass('object-contain');
  });

  it('should have correct container styling', () => {
    mockGetTeamCrestUrl.mockReturnValue(null);
    mockGetTeamColor.mockReturnValue('#EF0107');

    render(<TeamLogo {...defaultProps} />);

    const container = document.querySelector('[style*="width: 44px"]');
    expect(container).toBeTruthy();
    expect(container).toHaveStyle('width: 44px');
    expect(container).toHaveStyle('height: 44px');
  });
});
