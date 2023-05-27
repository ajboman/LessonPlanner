import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('should save a lesson', () => {
    const lesson = { id: 1, title: 'Math' };
    const { getByText } = render(<App />);
    fireEvent.click(getByText('Plan')); // Simulate clicking on the "Plan" link
    fireEvent.change(getByText('Lesson Title'), { target: { value: lesson.title } }); // Simulate entering the lesson title in the input field
    fireEvent.click(getByText('Save')); // Simulate clicking on the "Save" button
    const savedLesson = JSON.parse(localStorage.getItem('lessons'))[0];
    expect(savedLesson).toEqual(lesson);
  });

  test('should delete a lesson', () => {
    const lesson = { id: 1, title: 'Math' };
    localStorage.setItem('lessons', JSON.stringify([lesson]));
    const { getByText } = render(<App />);
    fireEvent.click(getByText('Lessons')); // Simulate clicking on the "Lessons" link
    fireEvent.click(getByText('Delete')); // Simulate clicking on the "Delete" button
    const updatedLessons = JSON.parse(localStorage.getItem('lessons'));
    expect(updatedLessons).toEqual([]);
  });
});
