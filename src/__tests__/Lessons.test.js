import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Lessons from '../components/Lessons';

describe('Lessons component', () => {
  const mockLessons = [
    'Lesson 1',
    'Lesson 2',
    'Lesson 3',
  ];

  test('renders correctly', () => {
    const { container } = render(
      <Lessons allLessons={mockLessons} onDeleteLesson={() => {}} />
    );
    expect(container).toMatchSnapshot();
  });

  test('displays lessons correctly', () => {
    const { getByText } = render(
      <Lessons allLessons={mockLessons} onDeleteLesson={() => {}} />
    );

    mockLessons.forEach((lesson) => {
      const lessonElement = getByText(lesson);
      expect(lessonElement).toBeInTheDocument();
    });
  });

  test('calls onDeleteLesson when delete button is clicked', () => {
    const mockDeleteLesson = jest.fn();
    const { getByLabelText } = render(
      <Lessons allLessons={mockLessons} onDeleteLesson={mockDeleteLesson} />
    );

    mockLessons.forEach((lesson, index) => {
      const deleteButton = getByLabelText(`Delete lesson ${index}`);
      fireEvent.click(deleteButton);
      expect(mockDeleteLesson).toHaveBeenCalledWith(index);
    });
  });
});
