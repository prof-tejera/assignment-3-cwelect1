import React from "react";
import styled from "styled-components";
import { useContext } from 'react';
import { AppContext } from "../Context";
import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";
import {DisplayTotalWorkoutTime} from "../utils/helpers";


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
  const {setReset, paused, setPaused, ff, queue, totalWorkoutTime, TIMER_TYPES, workoutEnded, workoutHistory} = useContext(AppContext);
  //console.log (queue);
  
  if (workoutEnded) {
    console.log('workoutHistory: ' + workoutHistory);
  } 
  
  //const handleSearchParams = () => {
    //searchParams = setSearchParams({q:21});
  //}

  // readURL

  /*let [searchParams, setSearchParams] = useSearchParams();
  //console.log(searchParams.getAll());
  const url = new URL(document.location.href);
  console.log('URL.search: ' + url.search)
  if (url.search === '' && queue > 0) {
    console.log(url); 
    const newUrl = url + '?' + queue;
    document.location.href = newUrl;
  } else {
    console.log(url);
    console.log(url.search)
  }*/

  // updateURL

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
                Reset
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