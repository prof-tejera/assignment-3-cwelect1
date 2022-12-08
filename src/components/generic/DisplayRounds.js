import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  font-size: 1.5rem;
  height: 2rem;
  padding: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TabataRoundsDiv = styled.div`
  className: ${props => props.isResting ? 'tabata-rest':'tabata-work'}>{props.isResting ? 'REST':'WORK'};
`;

const DisplayRounds = (props) => {
  
  if (props.displayType === 'xy' ) {
    return(
      <StyledDiv className="display-xy-rounds">
        <div>Round: {props.currentRound}</div>
      </StyledDiv>
    );
  } else if (props.displayType === 'tabata') {
    return(
      <StyledDiv className="display-tabata-round">
        <div>Round: {props.currentRound} 
          <TabataRoundsDiv/>
        </div>
      </StyledDiv>
    );
  }
};

export default DisplayRounds;