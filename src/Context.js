import React, { useEffect } from 'react';
import TIMER_TYPES from './Constants';
import calculateTotalWorkoutTime from './utils/helpers';
import { usePersistedState } from './hooks';
import { useSearchParams } from 'react-router-dom';

export const AppContext = React.createContext({});

const AppProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const workoutConfig = searchParams.get('queue') === null ? [] : JSON.parse(searchParams.get('queue'));
  const [queue, setQueue] = usePersistedState('queue', workoutConfig);
  const [displayTimer, setDisplayTimer] = usePersistedState('displayTimer', true);
  const [totalWorkoutTime, setTotalWorkoutTime] = usePersistedState('totalWorkoutTime', 0);
  const [elapsedTime, setElapsedTime] = usePersistedState('elapsedTime', 0);
  const [paused, setPaused] = usePersistedState('paused', true);
  const [activeIndex, setActiveIndex] = usePersistedState('activeIndex', 0);
  const [reset, setReset] = usePersistedState('reset', false);
  const [workoutEnded, setWorkoutEnded] = usePersistedState('workoutEnded', false);
  const [workoutHistory, addWorkoutHistory] = usePersistedState('workoutHistory', []);
  
  const fastForward = () => {
    setActiveIndex(queue.length-1);
    setElapsedTime(totalWorkoutTime);
    setPaused(true);
    setWorkoutEnded(true);
  }

  const resetWorkout = (reset) => {
    setActiveIndex(0);
    setElapsedTime(0);
    setPaused(true);
    setReset(reset);
  }

  useEffect(() => {
    setTotalWorkoutTime(calculateTotalWorkoutTime(queue));
  }, [queue, setTotalWorkoutTime]);

  // Check if workout ended
  useEffect(() => {
    if ((queue.length !== 0) && (activeIndex === queue.length -1) && totalWorkoutTime - elapsedTime === 0) {
      setWorkoutEnded(true);
      setPaused(true);
      //addToHistory([queue]);
    } else {
      setWorkoutEnded(false);
      setReset(false); 
    }
  }, [activeIndex, elapsedTime, setPaused, setReset, setWorkoutEnded, totalWorkoutTime, queue, workoutEnded]);
  
  const addToQueue = (item) => {
    setQueue(q => [...q, item]);
  }

  const moveTimer = (index, direction) => {
    let existingQueue = [...queue];
    if (direction === 'up') {
      const holdTimer = existingQueue.splice(index, 1)[0];
      existingQueue.splice(index-1, 0, holdTimer);
      setQueue(existingQueue);
    } else if (direction === 'down') {
      const holdTimer = existingQueue.splice(index, 1)[0];
      existingQueue.splice(index + 1, 0, holdTimer);
      setQueue(existingQueue);
    }
  }

  const removeFromQueue = (item) => {
    setQueue(q => q.filter((_, index) => index !==item));
  }
  
  return (
    <AppContext.Provider
      value={{
        activeIndex,	
        addItem: (item) => {addToQueue(item)},	
        addWorkoutHistory: (item) => {addWorkoutHistory(() => [...workoutHistory, item])},
		    displayTimer,
        elapsedTime,	
        ff: fastForward,
        moveTimer: (index, direction) => {moveTimer(index, direction)},	
        paused,	
        queue,	
        removeItem: (item) => {removeFromQueue(item)},	
        reset,	
        setActiveIndex,	
        setDisplayTimer,	
        setElapsedTime,	
        setPaused,	
        setQueue,
        setReset: resetWorkout,	
        setSearchParams,
        setTotalWorkoutTime: (time) => setTotalWorkoutTime(time),	
        TIMER_TYPES,	
        totalWorkoutTime,	
        workoutEnded,	
        workoutHistory
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;