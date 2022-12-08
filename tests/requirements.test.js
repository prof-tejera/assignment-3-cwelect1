/**
  This file is here to capture the requirements of this project:
  It is the basis for which tests will spawn from (likely after assignment 2).

  1. FIFO Queue for timers
    a) Each timer can be in one of three states: running, completed, and not running. You will need a way to keep track of what state the timer is in, so that you can display it accordingly (see the image above)
    b) During configuration, the user can remove any timer from the queue, so you will be supporting deleting
    c) While the timer is running, you will need to either store or dynamically calculate which timer is active.
    d) You don't want to clear the configurations as the timers are running. The user should be able to restart the entire workout at anytime

  2. Routing - use react-router
    a) / - Home
        - List of timers to be run for a workout. User should be able to remove a timer
          How can we use QUEUE if user can remove any timer here
        - The total time the workout will take
        - A button to "Add" a new timer. This button brings the user to the /add screen
        - Controls to Pause/Resume the workout
        - Controls to reset the workout back to its initial state
        - Controls to "fast-forward" - ends the current running timer and moves onto the next one
    b) /add - Add Timer
        - When user clicks "Add" from Home screen, they are routed to this page, where they can choose the type of timer and configure all inputs for each timer. After configuring, the user confirms and the timer is added to the list.
        - The /add page should allow the user to configure any of the four timers (stopwatch, countdown, XY, and tabata)
          - user can choose type of timer to add (dropdown?)
          - configuration fields appear after selection
            - Countdown
              - Start time (max value?)
            - StopWatch
              - End Time (max time?)
            - XY
              - Start Time
              - # rounds
            - Tabata
              - # Rounds
              - Work Time
              - Rest Time
          - what's the best data structure to store timer config...object?Array?
            - timer.type
            - timer.start
            - timer.end
            - timer.work_time
            - timer.rounds
          - create added timer list (newest timer at top or bottom?)
          - store in browser local storage?
        - The user should be able to go back to the home page from here
          - refresh state when returning home (so configured timers appear)
    c) /docs  - doumentation

  3. Deliverable
    a) A user can configure (combination of any timers in any order) and execute a workout
    b) All four timers must be functional: stopwatch, countdown, tabata, and XY.
    c) Routing must be configured to support the home route (/) and add route (/add)
    d) As you make modifications to your generic components, make sure to update documentation and prop-types.

  4. Grading Rubric
    a) A workout can be configured with any combination of timers
    b) Final workout application should be bug free
    c) DRY (do not repeat yourself). Try to make sure common code is shared and not copy/pasted
    d) Console is free of warnings/errors
    e) Deploy your application

 */

/*
  Tasks
  1. Move calculations from DisplayTime to helper
  2. Style control/pages according to modern standards (Color wheel, etc...)
    - AddTimer

  3. Add indication that timer was added
  4. Bug: Add Timer button doesn't depress
  5. WorkoutView - correct state when staring the app (no workout, no buttons and proper text for user)
  6. Remove buttons from timers on workout page
  7. Add Start, Pause, and reset workout
  8. Add delete timer on workout page
  9. 

*/

/*
THINGS I want and need more info:
  1. Fade completed Timer - When next timer starts (a few seconds in), completed fades and dissapears (does this meet project req?)
      - https://stackoverflow.com/questions/15907079/css3-transition-fade-out-effect
  2. 
  3. 
  */

/*import renderer from 'react-test-renderer';
// import homepage (or App?)

test('test starts when start button clicked', () => {
  const component = renderer.create(
    //<Link page="http://www.facebook.com">Facebook</Link>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseEnter();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseLeave();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});*/