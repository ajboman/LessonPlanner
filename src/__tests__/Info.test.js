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
      'Provide as many details as you need. More details will result in a more precise plan. Login to save the Lesson Plan and view it in the Lessons page. Verify your email for longer responses. Examples will not affect your lesson.'
    );
    expect(headingElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});
