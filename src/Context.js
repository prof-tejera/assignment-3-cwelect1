import React, { useEffect, useState } from 'react';
import TIMER_TYPES from './Constants';
import calculateTotalWorkoutTime from "./utils/helpers";

export const AppContext = React.createContext({});

const AppProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [displayTimer, setDisplayTimer] = useState(true);
  const [totalWorkoutTime, setTotalWorkoutTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [paused, setPaused] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reset, setReset] = useState(false);
  const [workoutEnded, setWorkoutEnded] = useState(false);
  const [workoutHistory, addWorkoutHistory] = useState([[]]);
  
  useEffect(() => {
    setTotalWorkoutTime(calculateTotalWorkoutTime(queue));
  }, [queue, setTotalWorkoutTime]);

  // Check if workout ended
  useEffect(() => {
    console.log('queue.length: ' + queue.length + ' workoutEnded: ' + workoutEnded + ' activeIndex: ' + activeIndex + ' totalWorkoutTime: ' + totalWorkoutTime + ' elapsedTime: ' + elapsedTime)
    if ((activeIndex === queue.length) && totalWorkoutTime - elapsedTime === 0) {
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
    console.log('addToHistory(item): ' + item);
    let copy = [...workoutHistory];
    copy.push(item);
    addWorkoutHistory([copy]);
    /*if (workoutHistory === []) {
      addWorkoutHistory([item]);
    } else if (workoutHistory.length > 0) {
      addWorkoutHistory(workoutHistory => [...workoutHistory, item]);
    }*/
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