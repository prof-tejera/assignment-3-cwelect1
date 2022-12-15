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

const XY = (props) => {
  const startTime = props.startTime;
  const endTime = 0;
  let totalRounds = props.rounds;
  const [time, setTime] = useState(startTime);
  const [currentRound, setCurrentRound] = useState(1);
  const [hideControls, setHideControls] = useState({visibility:'hidden'});

  const {removeItem, paused, queue, setElapsedTime, activeIndex, setActiveIndex, setReset, reset} = useContext(AppContext);
  const active = activeIndex === props.index;

  useInterval(() => {
    if (paused || !active) return;

    if (time !== endTime) {
      setTime(c => c - 1000);
      setElapsedTime(c => c + 1);
    } else if (time === endTime && (currentRound < totalRounds)) { // Rounds are still active
      setCurrentRound(currentRound + 1);
      setTime(startTime);
    } else {
      setActiveIndex(props.index + 1);
    }
  }, (time === props.startTime) ? 0 : 1000);
  
  // User reset Workout?
  useEffect(() => {
    if (reset) {
      setTime(startTime);
      setCurrentRound(1);
      return;
    }
  }, [reset, startTime]);
      
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
          <Delete onClick={handleDelete} hideControls={hideControls}>x</Delete>
        </RowDiv>
        <Title>{props.type}</Title>
          <div className="xy">
            <Panel time={time} displayType='xy' currentRound={currentRound}/>
          </div>
        <RowDiv>
          {downButton}
          <Description>{props.description}</Description>
        </RowDiv>
      </Timer>
    </div>
  );
};

export default XY;