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
    const descriptionElement = getByText(
      'Provide as many details as you need. More details will result in a more precise plan. Save the Lesson Plan to view it in the Lessons page.'
    );
    expect(headingElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});
