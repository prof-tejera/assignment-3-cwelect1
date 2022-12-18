import React from "react";
import styled from "styled-components";
import { useContext, useEffect } from 'react';
import { AppContext } from "../Context";
import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";
import { DisplayTotalWorkoutTime } from "../utils/helpers";

const Container = styled.section`
  width: 100%;
  height: 1fr;

  display: grid;
  grid-template-columns: .33fr .34fr .33fr;
  grid-template-areas:
    "Sidebar Body Sidebar"
    "Sidebar Body Sidebar"
`;

const SideBar = styled.div`
`;

const Body = styled.div`
  justify-items: center;
`;

const Timers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 7px;
  margin-bottom: 20px;
`;

const TotalTimeDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  font-size: 20px;
  text-align: center;
`;

const RowDiv = styled.div`
  display: grid;
  grid-template-columns: .33fr .34fr .33fr;
  gap: 10px;
  padding: 7px;
  align-items: center;
`;

const WorkoutView = () => {
  const {addWorkoutHistory, ff, paused, queue, setPaused, setReset, setSearchParams, TIMER_TYPES, totalWorkoutTime, workoutEnded} = useContext(AppContext);
  console.log(queue);
  useEffect(() => {
    setSearchParams({ 'queue': JSON.stringify(queue) });
  }, [setSearchParams, queue]);
  
  useEffect(() => {
    if (workoutEnded) {
      addWorkoutHistory(queue);
    }
  }, [queue, workoutEnded]);
  //const [searchParams, setSearchParams] = useSearchParams();
  //setQueue(JSON.stringify(searchParams.get('queue')));
  //setSearchParams({ 'queue': JSON.stringify(searchParams.get('queue')) });

  return (
    <Container>
      <SideBar/>
      <Body>
        <ColumnDiv>
          <TotalTimeDiv>Workout Time: {DisplayTotalWorkoutTime(totalWorkoutTime)}</TotalTimeDiv>
            <RowDiv>
              <button onClick={() => {setPaused(!paused);}}>
                {paused ? 'Run' : 'Pause'}
              </button>
              <button onClick={() => {setReset(true);}}>
                Start Over
              </button>
              <button onClick={() => {ff()}}>
                End Workout
              </button>
            </RowDiv>
          <Timers>
            {queue.map((t, i) => {
              const timerProps = {
                key: i,
                index: i,
                ...t
              };
              if (t.type === TIMER_TYPES.STOPWATCH) {
                return <Stopwatch {...timerProps} />;
              } else if (t.type === TIMER_TYPES.COUNTDOWN) {
                return <Countdown {...timerProps} />;
              } else if (t.type === TIMER_TYPES.XY) {
                return <XY {...timerProps} />;
              } else if (t.type === TIMER_TYPES.TABATA) {
                return <Tabata {...timerProps} />;
              } 
              return null;
            })}
          </Timers>
        </ColumnDiv>
      </Body>
      <SideBar/>
    </Container>
  )
};

export default WorkoutView;