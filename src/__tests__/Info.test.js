import React from 'react';
import { render } from '@testing-library/react';
import Info from '../components/Info';

describe('Info component', () => {
  test('renders correctly', () => {
    const { container } = render(<Info />);
    expect(container).toMatchSnapshot();
  });

  test('displays the correct heading and description', () => {
    const { getByText } = render(<Info />);
    const headingElement = getByText('Plan Lessons Quick and Easy');
    const descriptionElement = getByText(/Provide as many details as you need/i);
    const line2Element = getByText(/More details will result in a more precise plan/i);
    const line3Element = getByText(/Login to save the Lesson Plan and view it in the Lessons page/i);
    const line4Element = getByText(/Verify your email for longer responses/i);
    const line5Element = getByText(/Example will not affect your lesson/i);

    expect(headingElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(line2Element).toBeInTheDocument();
    expect(line3Element).toBeInTheDocument();
    expect(line4Element).toBeInTheDocument();
    expect(line5Element).toBeInTheDocument();
  });
});
