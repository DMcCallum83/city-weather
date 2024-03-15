import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Header } from '../src/components/Header/Header';

describe('Header', () => {
  it('renders a header with heading and logo', () => {
    render(<Header />);

    const heading = screen.getByRole('heading', { name: /city weather/i });
    expect(heading).toBeInTheDocument();

    const logo = screen.getByRole('img', { name: /city weather logo/i });
    expect(logo).toBeInTheDocument();
  });
});
