/**
  This file is here to capture the requirements of this project:
  It is the basis for which tests will spawn from (likely after assignment 2).
			

  1. Persisting state
      Our workout app has a pretty big problem, when the user refreshes the page we lose all configuration.
			 We want to solve this by persisting state, so that if the page is reloaded or closed accidentally, we can restore the user to the same state.
			 I like to think of it as we have two separate chunks of state we want to store.
			 The first is the initial timer configuration and the second is the running state.
			 For the timer configuration state we can store this in the URL.
			 As the user changes the configuration, we want to update the url.
			 We should only do this when the user has added/removed/moved the timer from configuration.
			 We recommend that you don't update URL every time they enter an input, but instead have some sort of save button that would sync URL.
			 Once the user has configured the workout and started the workout, we want to store the running state in local storage.
			 We don't want to be doing a million writes to local storage, so I recommend that you think about how we can accomplish this with fewer writes.
			 It doesn't have to restore to the latest millisecond, but it should be somewhat close (5-10 seconds) to what the workout was at after a reload/refresh of the page.
			

  2. Workout history
      We want to create a new screen that displays a list of previous workouts (create a new route and link to the history page in the navbar).
			Once a workout has been completed, add this workout to the history and save it to local storage.
			On the new history screen display all workouts completed and for each workout you should display some summary of all timers run and what the durations/rounds for each timer was.
			

  3. Edit a timer
      After the workout has been configured and the user is on the main run workout screen, add functionality that allows the user to edit any of the timer configurations (remember to update URL).
			

  4. Change the order of a timer in configured workout
      After the workout has been configured and the user is on the main run workout screen, the user can move any timer to a different position in the queue.
			This can be done a couple of ways.
			You are welcome to use a drag and drop third party package or come up with something on your own (remember to update URL).
			

  5. Display total time
      After the workout has been configured and the user is on the main run workout screen, display the total workout time and count down from total time to zero (when workout is complete) once the workout has been started.
			

  6. Add description to each timer
      Add a description field to each time that the user can add when creating the timer and when editing the timer.
			It should be displayed while the timer is running.
			

  7. Wrap app using react-error-boundary
      If for any reason your workout app errors out, then you should handle this and present the user with an error message.
			react-error-boundary package has a nice implementation of react "error boundaries" that you can use to handle this scenario.
			

Deliverables
  Complete all features listed above
  As always deploy your app
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

/*

We will be grading based on the features listed above and overall code quality

  Persisting state (20pt)
  Workout history (20pt)
  Edit a timer (10pt)
  Change the order of a timer in configured workout (10pt)
  Display total time (10pt)
  Add description to each timer (10pt)
  Wrap app using react-error-boundary (10pt)
  DRY and overall code quality (20pt)
*/
