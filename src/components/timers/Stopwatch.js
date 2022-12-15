// A timer that counts up to X amount of time (e.g. count up to 2 minutes and 30 seconds, starting at 0)
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

const Stopwatch = (props) => {
  const [time, setTime] = useState(0);
  const endTime = props.maxTime;
  const [hideControls, setHideControls] = useState({visibility:'hidden'});

  const { removeItem, paused, queue, reset, activeIndex, setActiveIndex, setElapsedTime, setReset } = useContext(AppContext);
  const active = activeIndex === props.index;

  useInterval(() => {
    if (paused || !active) return;
    if (reset) {
      setTime(0);
      setReset(false);
      return;
    }

    if (time === endTime) {
      setActiveIndex(props.index + 1);
    } else {
      setTime(c => c + 1000);
      setElapsedTime(c => c + 1);
    }
  }, ((time === 0) & (props.index !== 0)) ? 0 : 1000);

  // User reset Workout?
  useEffect(() => {
    if (reset) {
      setTime(0);
      return;
    }
  }, [reset]);
  
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
          <div className="stop-watch">
            <Panel time={time}/>
          </div>
        <RowDiv>
          {downButton}
          <Description>{props.description}</Description>
        </RowDiv>
      </Timer>
    </div>
  );
};

export default Stopwatch;