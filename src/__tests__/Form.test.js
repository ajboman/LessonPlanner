import createOpenAICompletion from '../services/route';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Form from '../components/Form';

jest.mock('../services/route', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({ text: 'test response' }),
}));

const mockSaveLesson = jest.fn();
const mockDeleteLesson = jest.fn();

describe('Form component', () => {
  let component;

  beforeEach(() => {
    component = render(<Form saveLesson={mockSaveLesson} deleteLesson={mockDeleteLesson} />);
  });

  test('renders correctly', () => {
    expect(component.container).toMatchSnapshot();
  });

  test('updates field value on change', async () => {
    const gradeInput = component.getByPlaceholderText('9th Grade');
    fireEvent.change(gradeInput, { target: { value: '10th Grade' } });
    expect(gradeInput.value).toBe('10th Grade');
  });

  test('form submission receives test response', async () => {
    // fill in the form
    fireEvent.change(component.getByPlaceholderText('9th Grade'), { target: { value: '10th Grade' } });
    // add similar fireEvent.change calls for other form inputs as needed
  
    const submitButton = component.getByText('Submit');
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      const popupContent = component.getByText('test response');
      expect(popupContent).toBeInTheDocument();
    });
  });
  

  // add more tests here as needed
});
