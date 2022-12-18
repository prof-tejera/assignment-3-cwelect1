import React from "react";
import styled from "styled-components";

const StyledTextBox = styled.input`
  width: ${props => props.width || 'auto'};
  height: 1.25rem;
  margin-left: ${props => props.marginLeft || null};
`;

const TextBox = (props) => {
  return (
    <StyledTextBox 
      type="text"
      value={props.value}
      onChange={props.onChange}
      maxLength="50"
      name={props.name}
      width={props.width}>
    </StyledTextBox>
  )
};

export default TextBox;