import React, { useEffect, useState } from 'react';
import TIMER_TYPES from './Constants';
import calculateTotalWorkoutTime from './utils/helpers';
import { usePersistedState } from './hooks';

export const AppContext = React.createContext({});

const AppProvider = ({ children }) => {
  const [queue, setQueue] = usePersistedState('queue', []);
  const [displayTimer, setDisplayTimer] = usePersistedState('displayTimer', true);
  const [totalWorkoutTime, setTotalWorkoutTime] = usePersistedState('totalWorkoutTime', 0);
  const [elapsedTime, setElapsedTime] = usePersistedState('elapsedTime', 0);
  const [paused, setPaused] = usePersistedState('paused', true);
  const [activeIndex, setActiveIndex] = usePersistedState('activeIndex', 0);
  const [reset, setReset] = usePersistedState('reset', false);
  const [workoutEnded, setWorkoutEnded] = usePersistedState('workoutEnded', false);
  const [workoutHistory, addWorkoutHistory] = usePersistedState('workoutHistory', [[]]);
  
  //if (SearchParams === undefined) {
  //  ClearPersistedState; // Start over and clear all data
  //}

  useEffect(() => {
    setTotalWorkoutTime(calculateTotalWorkoutTime(queue));
  }, [queue, setTotalWorkoutTime]);

  // Check if workout ended
  useEffect(() => {
    //console.log('queue.length: ' + queue.length + ' workoutEnded: ' + workoutEnded + ' activeIndex: ' + activeIndex + ' totalWorkoutTime: ' + totalWorkoutTime + ' elapsedTime: ' + elapsedTime)
    if ((queue.length !== 0) && (activeIndex === queue.length) && totalWorkoutTime - elapsedTime === 0) {
      setWorkoutEnded(true);
      setPaused(true);
      addToHistory([queue]);
    } else {
      setWorkoutEnded(false);
      setReset(false); // bit hackish, but I'm out of time baby
    }
  }, [activeIndex, elapsedTime, setWorkoutEnded, totalWorkoutTime, queue, workoutEnded]);
  
  const fastForward = () => {
    setActiveIndex(queue.length-1);
    console.log(totalWorkoutTime);
    setElapsedTime(totalWorkoutTime);
    setPaused(true);
  }

  const resetWorkout = (reset) => {
    setActiveIndex(0);
    setElapsedTime(0);
    setPaused(true);
    setReset(reset);
  }

  const addToHistory = (item) => {
    addWorkoutHistory(workoutHistory => {
      const copy = workoutHistory.slice();
      if (workoutHistory.length > 1) {
        copy[workoutHistory[workoutHistory.length]] = item;
        return copy;
      } else {
        return workoutHistory[workoutHistory.length] = item;
      }
    });
  }
  
  const addToQueue = (item) => {
    setQueue(q => [...q, item]);
  }

  const removeFromQueue = (item) => {
    setQueue(q => q.filter((_, index) => index !==item));
  }
  
  return (
    <AppContext.Provider
      value={{
        displayTimer,
        setDisplayTimer,
        TIMER_TYPES,
        activeIndex,
        setActiveIndex,
        totalWorkoutTime,
        setTotalWorkoutTime: (time) => setTotalWorkoutTime(time),
        elapsedTime,
        setElapsedTime,
        paused,
        setPaused,
        ff: fastForward,
        reset,
        setReset: resetWorkout,
        addItem: (item) => {addToQueue(item)},
        removeItem: (item) => {removeFromQueue(item)},
        queue,
        workoutEnded,
        workoutHistory,
        addWorkoutHistory: (item) => addToHistory(item)
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;