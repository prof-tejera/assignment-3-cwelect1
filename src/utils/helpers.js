// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.

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

//displayTotalWorkoutTime()
//getWorkoutTimeLeft()

const displayTotalWorkoutTime = (totalWorkoutTime) => {
  const hours = ("" + Math.floor((totalWorkoutTime / 3600) % 360)).slice(-2);
  let hour_or_hours = (hours > 1 || hours < 1) ? "hours" : "hour";
  const minutes = (" " + Math.floor((totalWorkoutTime / 60) % 60)).slice(-2) + " min ";
  const seconds = (" 0" + Math.floor((totalWorkoutTime / 1) % 60)).slice(-2) + " sec";
  
  return (hours + " " + hour_or_hours + " " + minutes + seconds);
}

export {displayTotalWorkoutTime}
export default calculateTotalWorkoutTime;