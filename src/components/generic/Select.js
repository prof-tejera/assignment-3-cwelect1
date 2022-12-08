import React from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  width: ${props => props.width || 'auto'};
  height: 1.25rem;
  margin-left: ${props => props.marginLeft || null};
`;

const Select = (props) => {
  return (
    <StyledSelect 
      value={props.value}
      onChange={props.onChange}
      name={props.name}
      width={props.width}>
      {props.dd_items.map((item) => (
        <option key={item} value={item}>{item}</option>
        )
      )}
    </StyledSelect>
  )
};

export default Select;