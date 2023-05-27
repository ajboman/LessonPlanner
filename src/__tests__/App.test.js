import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('App Render Test', () => {
    expect(render(<App />));
  });

});
