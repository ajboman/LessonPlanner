import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Popup from '../components/Popup';

describe('Popup component', () => {
  const mockResponse = 'Test API response';
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  test('renders correctly', () => {
    const { container } = render(
      <Popup response={mockResponse} isVisible={true} onClose={mockOnClose} onSave={mockOnSave} />
    );
    expect(container).toMatchSnapshot();
  });

  test('displays the response', () => {
    const { getByText } = render(
      <Popup response={mockResponse} isVisible={true} onClose={mockOnClose} onSave={mockOnSave} />
    );

    const responseElement = getByText(mockResponse);
    expect(responseElement).toBeInTheDocument();
  });

  test('calls onClose when Close button is clicked', () => {
    const { getByText } = render(
      <Popup response={mockResponse} isVisible={true} onClose={mockOnClose} onSave={mockOnSave} />
    );

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onSave when Save button is clicked', () => {
    const { getByText } = render(
      <Popup response={mockResponse} isVisible={true} onClose={mockOnClose} onSave={mockOnSave} />
    );

    const saveButton = getByText('Save');
    fireEvent.click(saveButton);
    expect(mockOnSave).toHaveBeenCalled();
  });
});
