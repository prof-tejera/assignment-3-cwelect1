import React from "react";
import styled from "styled-components";
import { useContext } from 'react';
import { AppContext } from "../Context";

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

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 7px;
`;

const HistoryView = () => {

  const {queue, workoutHistory} = useContext(AppContext);
  console.log('queue.length: ' + queue.length);
  console.log('queue: ' + queue);
  console.log('workoutHistory.length: ' + workoutHistory.length);
  if (workoutHistory.length <= 1) {
    workoutHistory.forEach (
      workouts => {
        workouts.forEach ( timer => {
          for (const [key, value] of Object.entries(timer)) {
            console.log(`${key}: ${value}`)
        }
      })
    })
  } else {
    console.log('Shitake mushrooms!');
    let count = 0;
    workoutHistory.forEach (
      workouts => {
        console.log('Workout: ' + count);
        count++;
        //workouts.forEach ( workout => {
          workouts.forEach ( timer => {
            for (const [key, value] of Object.entries(timer)) {
              console.log(`${key}: ${value}`)
          }
        //})
      })
    })
  }

  
        

  /*console.log('workoutHist: ' + workoutHistory)
  workoutHistory.forEach(
    arr => console.log('workout: ' + arr)
  );
  
  for (const [key, value] of Object.entries(workoutHistory)) {
    console.log(`www ${key}: ${value}`);
    for (const item in workout) {
      for (const [key, value] of Object.entries(item)) {
        console.log(`iii ${key}: ${value}`);
      }
    }
  }*/
  
  return (
    <Container>
      <SideBar/>
      <Body>
        <ColumnDiv>
        Nothing to see here. Check back when you've completed a workout.
        </ColumnDiv>
      </Body>
      <SideBar/>
    </Container>
  )
};

export default HistoryView;