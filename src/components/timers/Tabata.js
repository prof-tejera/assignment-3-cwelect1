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

  const {removeItem, paused, queue, activeIndex, setActiveIndex, setElapsedTime, setReset, reset} = useContext(AppContext);
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
    }
  }, [reset, workTime]);
    
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
 
  let upButton = '';
  if (props.index === 0) {                   // Only 1 timer - Don't show up button
    upButton = <UpDown hideControls={{visibility:'hidden'}}>&#8593;</UpDown>
  } else {                                    // Display Move Up button
    upButton = <UpDown hideControls={hideControls}>&#8593;</UpDown>
  }

  let downButton = '';
  if (props.index === queue.length - 1) {     // Last timer - Don't show down buttom
    downButton = <UpDown hideControls={{visibility:'hidden'}}>&#8595;</UpDown>   
  } else {                                    // Move Up and Move Down button
    downButton = <UpDown hideControls={hideControls}>&#8595;</UpDown>
  }

  return (
    <div>
      <Timer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} border={!paused && active ? 'red' : 'gray'} id={'workout-timer-' + props.index} key={props.type}>
        <RowDiv>
          {upButton}
          <Delete hideControls={hideControls} onClick={handleDelete}>x</Delete>
        </RowDiv>
        <Title>{props.type}</Title>
          <div className="tabata">
            <Panel time={time} displayType='tabata' currentRound={currentRound} totalRounds={totalRounds} isResting={isResting}/>
          </div>
        <RowDiv>
          {downButton}
          <Description>{props.description}</Description>
        </RowDiv>
      </Timer>
    </div>
  );
};

export default Tabata;