import React from 'react'
import { render, fireEvent, getByLabelText, findByText, findAllByText } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App'

window.HTMLMediaElement.prototype.play = async (): Promise<void> => { /* do nothing */ };

test('fetches and displays a list of scenes in the first workout', async () => {
  const { queryByText } = render(<App />)

  expect(queryByText(/timer scene 1/i)).toBeTruthy();
  expect(queryByText(/timer scene 2/i)).toBeTruthy();
})

test('when another workout is selected, it loads that workout\'s scenes', async () => {
  const { container, queryByText } = render(<App />)

  await selectWorkout(container, /rest workout/i)

  expect(queryByText(/short rest/i)).toBeTruthy();
  expect(queryByText(/medium rest/i)).toBeTruthy();
})

test('when the start button is pressed, it starts playing the workout', async () => {
  const { getByText, queryByText } = render(<App />)

  fireEvent.click(getByText(/start/i))
  expect(queryByText(/YogaDj/i)).toBeFalsy();
  expect(queryByText(/Pause/i)).toBeTruthy();
  expect(queryByText(/Skip/i)).toBeTruthy();
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

const selectWorkout = async (container: HTMLElement, workoutName: RegExp): Promise<void> => {
  const select = getByLabelText(container, 'workout-selector')

  fireEvent.focus(select)
  fireEvent.keyDown(select, {
    keyCode: 40,
  })

  const newWorkout = await findByText(container, workoutName)
  fireEvent.click(newWorkout)

  await findAllByText(container, workoutName)
}