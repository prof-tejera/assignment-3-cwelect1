import React from "react";
import styled from "styled-components";
import Select from "../components/generic/Select";
import TimerConfig from "../components/timers/TimerConfig";
import { useState } from "react";

const Container = styled.div`
  display: grid;
  height: 100vh;
  width: 100%;
  overflow: auto;
`;

const Section = styled.section`
  width: 90%;
  height: 10rem;
  display: grid;
  padding-left: 60px;
  align-items: center;
`;

const AddTimerView = () => {
  const [timerType, setTimerType] = useState('Default');

  const handleOnChange = (type) => {
    setTimerType(type.target.value);
  };

  return (
    <Container>
      <Section>
        <Select 
          value={timerType}
          name='timer-type'
          width='35%'
          onChange={handleOnChange} 
          dd_items={['Add Timer', 'Stopwatch', 'Countdown', 'XY', 'Tabata']}
        />
        <TimerConfig type={timerType}/>
      </Section>
    </Container>
  )
}

export default AddTimerView;