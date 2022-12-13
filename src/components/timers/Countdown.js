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
  align-self: end;
`;

const Countdown = (props) => {
  const startTime = props.startTime;
  const endTime = 0;
  const [time, setTime] = useState(startTime);

  const {reset, setElapsedTime, removeItem, paused, activeIndex, setActiveIndex} = useContext(AppContext);
  const active = activeIndex === props.index;

  useInterval(() => {
    if (paused || !active) return;
    
    if (time === endTime) {
      setActiveIndex(props.index + 1);
    } else {
      setTime(c => c - 1000);
      setElapsedTime(c => c + 1);
    }
  }, ((time === props.startTime) & (props.index !== 0)) ? 0 : 1000);

  // User reset Workout?
  useEffect(() => {
    if (reset) {
      setTime(startTime);
      return;
    }
  }, [reset, startTime]);
  
  const handleDelete = () => {
    removeItem(props.index);
    console.log('props.index: ' + props.index)
  }

  const handleEdit = () => {
    console.log('Clicked on Countdown Timer')
  }

  return (
    <div>
      <Timer border={(!paused && active) ? 'red' : 'gray'} id={'workout-timer-' + props.index} key={props.type}>
        <Delete onClick={handleDelete}>x</Delete>
        <Title onClick={handleEdit}>{props.type}</Title>
          <div className="countdown">
            <Panel endTime={endTime} time={time}/>
          </div>
      </Timer>
    </div>
  );
};

export default Countdown;