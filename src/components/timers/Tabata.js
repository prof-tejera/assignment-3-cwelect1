// A timer that counts from a specified time (in milliseconds) to 0 (e.g. count down from 2 minutes and 30 seconds to 0)
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

const Tabata = (props) => {
  const workTime = props.workTime;
  const restTime = props.restTime;
  const endTime = 0;
  const totalRounds = props.rounds;
  const [time, setTime] = useState(workTime);
  const [currentRound, setCurrentRound] = useState(1);
  const [isResting, setIsResting] = useState(false);

  const {removeItem, paused, activeIndex, setActiveIndex} = useContext(AppContext);
  const [isRunning, setIsRunning] = useState(false);
  const active = activeIndex === props.index;

  useInterval(() => {
    if (paused || !active) return;

    setIsRunning(true);
    if (time !== endTime) {
      setTime(c => c - 1000);
    } else if (time === endTime && (currentRound <= totalRounds) && isResting === false) { // Working done. Change to Resting
      setIsResting(true);
      setTime(restTime);
    } else if (time === endTime && (currentRound < totalRounds)) { // Resting done. Change to Working
      setIsResting(false);
      setCurrentRound(currentRound + 1);
      setTime(workTime);
    } else { // Running Completed
      setActiveIndex(props.index + 1);
      setIsRunning(false);
    }
  }, (((time === props.workTime) & (isResting === true)) & (currentRound !== 1)) ? 0 : 1000); // fix this...not accurate

  const handleDelete = () => {
    removeItem(props.index);
  }

  return (
    <div>
      <Timer border={isRunning ? 'red' : 'gray'} id={'workout-timer-' + props.index} key={props.type}>
        <Delete onClick={handleDelete}>x</Delete>
        <Title>{props.type}</Title>
          <div className="tabata">
            <Panel time={time} displayType='tabata' currentRound={currentRound} totalRounds={totalRounds} isResting={isResting}/>
          </div>
      </Timer>
    </div>
  );
};

export default Tabata;