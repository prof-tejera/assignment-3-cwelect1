// A timer that counts from a specified time (in milliseconds) to 0 (e.g. count down from 2 minutes and 30 seconds to 0)
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Context";
import { useInterval } from '../../hooks';
import styled from "styled-components";
import Panel from "../generic/Panel";

const Timer = styled.div`
background-color: rgba(50, 150, 150, .5);
border: 2px solid ${props => props.border};
border-radius: 1rem;
display: flex;
flex-direction: column;
align-items: center;
padding: .5rem;
`;

const Title = styled.div`
margin: .25rem;
font-size: 1.5rem;
`;

const Delete = styled.button`
  background-color: transparent;
  color: red;
  float: right;
  ${(props) => props.hideControls};
`;

const UpDown = styled.button`
  color: black;
  ${(props) => props.hideControls};
`;

const RowDiv = styled.div`
  width: 100%;
`;

const Description = styled.div`
  text-align: center;
  width: 100%;
`;

const Tabata = (props) => {
  const workTime = props.workTime;
  const restTime = props.restTime;
  const endTime = 0;
  const totalRounds = props.rounds;
  const [time, setTime] = useState(workTime);
  const [currentRound, setCurrentRound] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [hideControls, setHideControls] = useState({visibility:'hidden'});

  const { reset, moveTimer, setElapsedTime, queue, setReset, removeItem, paused, activeIndex, setActiveIndex, workoutEnded } = useContext(AppContext);
  const active = activeIndex === props.index;

  useInterval(() => {
    if (paused || !active) return;

    if (time !== endTime) {
      setTime(c => c - 1000);
      setElapsedTime(c => c + 1);
    } else if (time === endTime && (currentRound <= totalRounds) && isResting === false) { // Working done. Change to Resting
      setIsResting(true);
      setTime(restTime);
    } else if (time === endTime && (currentRound < totalRounds)) { // Resting done. Change to Working
      setIsResting(false);
      setCurrentRound(currentRound + 1);
      setTime(workTime);
    } else { // Running Completed
      setActiveIndex(props.index + 1);
    }
  }, (((time === props.workTime) & (isResting === true)) & (currentRound !== 1)) ? 0 : 1000); // fix this...not accurate

  // User reset Workout?
  useEffect(() => {
    if (reset) {
      setTime(workTime);
      setCurrentRound(1);
      setIsResting(false);
      return;
    } else if (workoutEnded) {
      setTime(endTime);
      setCurrentRound(totalRounds);
      setIsResting(true);
    }
  }, [reset, workTime, totalRounds, workoutEnded]);
    
  const handleDelete = () => {
    removeItem(props.index);
    setReset(true); 
  }

  const handleMouseEnter = (e) => {
    setHideControls();
  }

  const handleMouseLeave = (e) => {
    setHideControls({visibility: 'hidden'});
  }
 
  const handleMoveTimerUp = (direction) => {
    moveTimer(props.index, 'up');
  }
 
  const handleMoveTimerDown = (direction) => {
    moveTimer(props.index, 'down')
  }
 
  let displayUpButton = '', displayDownButton = '';
  if (queue.length <= 1) {                   // Only 1 timer - Don't show up or down buttons
    displayUpButton = {visibility:'hidden'}
    displayDownButton = {visibility:'hidden'};
  } else if (props.index === 0) {                   // 1st of more than 1 button - Don't show up button
    displayUpButton = {visibility:'hidden'}
    displayDownButton = hideControls;
  } else if (props.index === queue.length - 1) {     // Last timer - Don't show down buttom
    displayUpButton = hideControls
    displayDownButton = {visibility:'hidden'}
  } else {                                    // Display Move Up button
    displayUpButton = hideControls;
    displayDownButton = hideControls;
  }

  return (
    <div>
      <Timer  onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave} 
              border={!paused && active ? 'red' : 'gray'} 
              id={props.index} key={props.type}
      >
        <RowDiv>
          <UpDown onClick={handleMoveTimerUp} hideControls={displayUpButton}>&#8593;</UpDown>
          <Delete hideControls={hideControls} onClick={handleDelete}>x</Delete>
        </RowDiv>
        <Title>{props.type}</Title>
          <div className="tabata">
            <Panel time={time} displayType='tabata' currentRound={currentRound} totalRounds={totalRounds} isResting={isResting}/>
          </div>
        <RowDiv>
          <UpDown onClick={handleMoveTimerDown} hideControls={displayDownButton}>&#8595;</UpDown>
          <Description>{props.description}</Description>
        </RowDiv>
      </Timer>
    </div>
  );
};

export default Tabata;