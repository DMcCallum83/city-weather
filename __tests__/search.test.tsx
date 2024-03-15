import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Search } from '@/components/Search/Search';

describe('Search', () => {
  it('renders an input with expected placeholder text', () => {
    const mockOnSelect = jest.fn();
    render(<Search onSelect={mockOnSelect} />);

    const input = screen.getByPlaceholderText(
      'Enter a city name to see results...'
    );

    expect(input).toBeInTheDocument();
  });

  it('entering text results in call to onSelect', () => {
    const mockOnSelect = jest.fn();
    render(<Search onSelect={mockOnSelect} />);

    const input = screen.getByPlaceholderText(
      'Enter a city name to see results...'
    );

    fireEvent.change(input, { target: { value: 'search text' } });

    waitFor(() => expect(mockOnSelect).toHaveBeenCalledTimes(1));
  });
});
