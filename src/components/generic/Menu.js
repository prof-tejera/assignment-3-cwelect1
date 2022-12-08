import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledUL = styled.ul`
  list-style-type: none;
  margin: 0;
  width: 100%;
`;

const NavLi = styled.li`
  float: left;
  &:hover {
    background-color: ${props => props.color || "lightblue"};
  }
`;

const NavA = styled(Link)`
  display: block;
  color: ${props => props.color || "green"};
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
`;

function CreateLinkItem (props) {
  if(props.isActive === true) {
    return <NavLi className="active"><NavA href={props.href}>{props.displayText}</NavA></NavLi>;
  }
  else {
    return <NavLi><NavA to={props.href}>{props.displayText}</NavA></NavLi>;
  }
}

const Menu = (props) => {
  return (
    <StyledUL>
      {props.menu_items.map((item) => (
        <CreateLinkItem key={item.displayText} isActive={item.isActive} href={item.href} displayText={item.displayText}/>
        )
      )}
    </StyledUL>
  )
};

export default Menu;