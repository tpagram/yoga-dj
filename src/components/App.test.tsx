import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App'


test('fetches and displays a list of scenes in the default workout', async () => {
  const { queryByText } = render(<App />)

  expect(queryByText(/timer scene 1/i)).toBeTruthy();
  expect(queryByText(/timer scene 2/i)).toBeTruthy();
})