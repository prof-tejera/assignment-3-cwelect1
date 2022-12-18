import React from "react";
import styled from "styled-components";
import DisplayTime from "../generic/DisplayTime";
import DisplayRounds from "../generic/DisplayRounds";

const ColoredDiv = styled.div`
  background-color: ${props => props.inputColor || "rgb(27, 238, 16)"};
  margin: 5px;
`;

const ClearDiv = styled.div`
  margin: 5px;
`;

const Panel = (props) => {

  const displayRound = <DisplayRounds displayType={props.displayType} currentRound={props.currentRound} isResting={props.isResting}/>;
  const displayTime = <DisplayTime time={props.time} isStarted={props.isStarted}/>;

  if (props.displayType === 'tabata') {
    return(
      <ColoredDiv className={props.displayType + "-timer"} inputColor={props.isResting ? "rgb(238, 50, 0)": "rgb(27, 238, 16)"}>
        {displayRound}
        {displayTime}
      </ColoredDiv>
    );
  } else if (props.displayType === 'xy') {
    return(
      <ClearDiv className={props.displayType + "-timer"}>
        {displayRound}
        {displayTime}
      </ClearDiv>
    );
  } else {
    return(
      <div className="timer">
        {displayTime}
      </div>
    );
  }
};

export default Panel;