import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  font-size: 2rem;
  height: 3rem;
  text-align: center;
`;

const DisplayTime = (props) => {
  const minutes = <span className="digits minutes">{("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:</span>;
  const seconds = <span className="digits seconds">{("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}</span>;
  //const milliseconds = <span className="digits mili-sec">.{("0" + ((props.time / 10) % 100)).slice(-2)}</span>;
  
  return(
    <StyledDiv className="display-time">
      {minutes}
      {seconds}
    </StyledDiv>
  );
};

export default DisplayTime;