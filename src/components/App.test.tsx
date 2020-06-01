import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App'


test('fetches and displays a list of scenes in the default workout', async () => {
  const { queryByText } = render(<App />)

  expect(queryByText(/timer scene 1/i)).toBeTruthy();
  expect(queryByText(/timer scene 2/i)).toBeTruthy();
})

// TODO
test('when another workout is selected, it loads that workout scenes', async () => {
  expect(true).toBeTruthy();
})

// TODO
test('when the start button is pressed, it starts playing the workout', async () => {
  expect(true).toBeTruthy();
})

// TODO
test('when a workout contains a timer scene, it should show a timer', async () => {
  expect(true).toBeTruthy();
})

// TODO
test('when a workout contains a rest scene, it should show a timer', async () => {
  expect(true).toBeTruthy();
})

// TODO
test('when a workout contains a video scene, it should show a video player', async () => {
  expect(true).toBeTruthy();
})

// TODO
test('when a timer is showing, the pause button should pause the timer', async () => {
  expect(true).toBeTruthy();
})

// TODO
test('when a timer is showing, the skip button should move to the next scene', async () => {
  expect(true).toBeTruthy();
})

// TODO
test('on the end screen, the back-to-start button should move to the start screen', async () => {
  expect(true).toBeTruthy();
})

// TODO
test('on the end screen, the close button should close the app', async () => {
  expect(true).toBeTruthy();
})