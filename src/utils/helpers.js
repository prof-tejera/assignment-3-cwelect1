// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.

import { useContext } from 'react';
import { AppContext } from "../Context";

const calculateTotalWorkoutTime = (queue) => {
  let total = 0;
  const millisecondsToSecondsDivisor = 1000;

  for (let item in queue) {
    if (queue[item].type === 'Stopwatch') {
      total = total + parseInt(queue[item].maxTime/millisecondsToSecondsDivisor);

    } else if (queue[item].type === 'Countdown') {
      total = total + parseInt(queue[item].startTime/millisecondsToSecondsDivisor);

    } else if (queue[item].type === 'XY') {
      const rounds = parseInt(queue[item].rounds);
      const start = parseInt(queue[item].startTime/millisecondsToSecondsDivisor);
      
      total = total + (rounds * start);

    } else if (queue[item].type === 'Tabata') {
      const rounds = parseInt(queue[item].rounds);
      const work = parseInt(queue[item].workTime/millisecondsToSecondsDivisor);
      const rest = parseInt(queue[item].restTime/millisecondsToSecondsDivisor);
     
      total = total + (rounds * work) + (rounds * rest);
    }
  }
  return total;
}

const DisplayTotalWorkoutTime = (totalWorkoutTime) => {
  const {elapsedTime, setElapsedTime} = useContext(AppContext);

  const totalTime = totalWorkoutTime - elapsedTime;
  const hours = ("" + Math.floor((totalTime / 3600) % 360)).slice(-2);
  let hour_or_hours = (hours > 1 || hours < 1) ? "hours" : "hour";
  const minutes = (" " + Math.floor((totalTime / 60) % 60)).slice(-2) + " min ";
  const seconds = (" 0" + Math.floor((totalTime / 1) % 60)).slice(-2) + " sec";
  
  if ((hours < 0) || (minutes < 0) || (seconds < 0)) {
    setElapsedTime(0);
    return (0 + " " + hour_or_hours + " 0 min 00 sec");
  } else {
    return (hours + " " + hour_or_hours + " " + minutes + seconds);
  }
}

// saveURL
/*const saveURL = (queue, url) => {
  console.log('URL before: ' + url);
  window.history.pushState({},'',`${url.origin}${url.pathname}?queue=${encodeURI(JSON.stringify(queue))}`);
  console.log('URL after: ' + url);
}*/

// getSearchParams
const getSearchParams = (url) => {
  let queue = url.searchParams.get('queue');
  console.log('URL Queue Search Param: ' + queue);
  console.log(JSON.parse(queue));
  return JSON.parse(queue);
}

export {getSearchParams, DisplayTotalWorkoutTime}
export default calculateTotalWorkoutTime;