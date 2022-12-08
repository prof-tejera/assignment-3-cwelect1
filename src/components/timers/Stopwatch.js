// A timer that counts up to X amount of time (e.g. count up to 2 minutes and 30 seconds, starting at 0)
import { useState } from "react";
import { useContext } from 'react';
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

const Stopwatch = (props) => {
  const [time, setTime] = useState(0);
  const endTime = props.maxTime;

  const { removeItem, paused, activeIndex, setActiveIndex } = useContext(AppContext);
  const [isRunning, setIsRunning] = useState(false);
  const active = activeIndex === props.index;

  useInterval(() => {
    if (paused || !active) return;
    
    setIsRunning(true);
    if (time === endTime) {
      setActiveIndex(props.index + 1);
      setIsRunning(false);
    } else {
      setTime(c => c + 1000);
    }
  }, ((time === 0) & (props.index !== 0)) ? 0 : 1000);

  const handleDelete = () => {
    removeItem(props.index);
  }
  
  return (
    <div>
      <Timer border={isRunning ? 'red' : 'gray'} id={'workout-timer-' + props.index} key={props.type}>
        <Delete onClick={handleDelete}>x</Delete>
        <Title>{props.type}</Title>
          <div className="stop-watch">
            <Panel time={time}/>
          </div>
      </Timer>
    </div>
  );
};

export default Stopwatch;