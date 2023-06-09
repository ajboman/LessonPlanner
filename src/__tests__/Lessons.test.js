import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Lessons from '../components/Lessons';

describe('Lessons component', () => {
  const mockLessons = [
    { id: 'lesson1', lesson: '\n\nLesson 1' },
    { id: 'lesson2', lesson: 'Lesson 2' },
    { id: 'lesson3', lesson: '\n\nLesson 3' },
  ];

  test('renders correctly', () => {
    const { container } = render(
      <Lessons allLessons={mockLessons} onDeleteLesson={() => {}} />
    );
    expect(container).toMatchSnapshot();
  });

  test('correctly removes leading newline characters', () => {
    const { getByText } = render(
      <Lessons allLessons={mockLessons} onDeleteLesson={() => {}} />
    );

    expect(getByText(/Lesson 1/i)).toBeInTheDocument();
    expect(getByText(/Lesson 2/i)).toBeInTheDocument();
    expect(getByText(/Lesson 3/i)).toBeInTheDocument();
  });
});
