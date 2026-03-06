import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { getLeagueLogoUrl, getLeagueFlag } from '@/lib/league-icons';
import LeagueLogo from '@/components/ui/league-logo';

// Mock the league-icons module
jest.mock('@/lib/league-icons');

const mockGetLeagueLogoUrl = getLeagueLogoUrl as jest.MockedFunction<typeof getLeagueLogoUrl>;
const mockGetLeagueFlag = getLeagueFlag as jest.MockedFunction<typeof getLeagueFlag>;

// Mock Next.js Image
jest.mock('next/image', () => {
  return function MockImage({ src, alt, onError, ...props }: any) {
    return <img src={src} alt={alt} onError={onError} {...props} data-testid="league-logo-image" />;
  };
});

describe('LeagueLogo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    leagueId: 'premier_league',
    leagueName: 'Premier League',
    country: 'England',
    size: 20,
  };

  it('should render image when logo URL is available', () => {
    mockGetLeagueLogoUrl.mockReturnValue('/leagues/premier-league.png');

    render(<LeagueLogo {...defaultProps} />);

    const image = screen.getByTestId('league-logo-image');
    expect(image).toBeTruthy();
    expect(image).toHaveAttribute('src', '/leagues/premier-league.png');
    expect(image).toHaveAttribute('alt', 'Premier League');
    expect(image).toHaveAttribute('width', '20');
    expect(image).toHaveAttribute('height', '20');
  });

  it('should render flag when logo URL is not available', () => {
    mockGetLeagueLogoUrl.mockReturnValue(null);
    mockGetLeagueFlag.mockReturnValue('🏴󠁧󠁢󠁥󠁮󠁧󠁿');

    render(<LeagueLogo {...defaultProps} />);

    const flag = screen.getByText('🏴󠁧󠁢󠁥󠁮󠁧󠁿');
    expect(flag).toBeTruthy();
    expect(flag).toHaveAttribute('title', 'Premier League');
    expect(screen.queryByTestId('league-logo-image')).toBeFalsy();
  });

  it('should render flag when image errors', () => {
    mockGetLeagueLogoUrl.mockReturnValue('/leagues/premier-league.png');
    mockGetLeagueFlag.mockReturnValue('🏴󠁧󠁢󠁥󠁮󠁧󠁿');

    render(<LeagueLogo {...defaultProps} />);

    const image = screen.getByTestId('league-logo-image');
    
    // Simulate image error
    fireEvent.error(image);

    const flag = screen.getByText('🏴󠁧󠁢󠁥󠁮󠁧󠁿');
    expect(flag).toBeTruthy();
    expect(screen.queryByTestId('league-logo-image')).toBeFalsy();
  });

  it('should use custom size when provided', () => {
    mockGetLeagueLogoUrl.mockReturnValue('/leagues/premier-league.png');

    render(<LeagueLogo {...defaultProps} size={32} />);

    const image = screen.getByTestId('league-logo-image');
    expect(image).toHaveAttribute('width', '32');
    expect(image).toHaveAttribute('height', '32');
  });

  it('should use default size when not provided', () => {
    mockGetLeagueLogoUrl.mockReturnValue('/leagues/premier-league.png');

    const { size, ...propsWithoutSize } = defaultProps;
    render(<LeagueLogo {...propsWithoutSize} />);

    const image = screen.getByTestId('league-logo-image');
    expect(image).toHaveAttribute('width', '20');
    expect(image).toHaveAttribute('height', '20');
  });

  it('should call getLeagueLogoUrl with correct league ID', () => {
    mockGetLeagueLogoUrl.mockReturnValue('/leagues/premier-league.png');

    render(<LeagueLogo {...defaultProps} />);

    expect(mockGetLeagueLogoUrl).toHaveBeenCalledWith('premier_league');
  });

  it('should call getLeagueFlag with correct country', () => {
    mockGetLeagueLogoUrl.mockReturnValue(null);
    mockGetLeagueFlag.mockReturnValue('🏴󠁧󠁢󠁥󠁮󠁧󠁿');

    render(<LeagueLogo {...defaultProps} />);

    expect(mockGetLeagueFlag).toHaveBeenCalledWith('England');
  });

  it('should have correct CSS class on flag element', () => {
    mockGetLeagueLogoUrl.mockReturnValue(null);
    mockGetLeagueFlag.mockReturnValue('🏴󠁧󠁢󠁥󠁮󠁧󠁿');

    render(<LeagueLogo {...defaultProps} />);

    const flag = screen.getByText('🏴󠁧󠁢󠁥󠁮󠁧󠁿');
    expect(flag).toHaveClass('text-sm');
  });

  it('should have correct CSS class on image', () => {
    mockGetLeagueLogoUrl.mockReturnValue('/leagues/premier-league.png');

    render(<LeagueLogo {...defaultProps} />);

    const image = screen.getByTestId('league-logo-image');
    expect(image).toHaveClass('object-contain');
  });
});
