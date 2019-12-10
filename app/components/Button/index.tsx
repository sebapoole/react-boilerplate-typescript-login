
/**
 * Button (Component)
 */

import React, { Children, ReactNode } from 'react';
import PropTypes from 'prop-types';

import { StyledASolid, StyledAOutline } from './A';
import { ButtonSolid, ButtonOutline } from './StyledButton';
import Wrapper from './Wrapper';

export interface Props {
  handleRoute?(): void;
  href?: string;
  onClick?(): void;
  children?: ReactNode;
  color?: string;
  fill?: string;
  margin?: string;
  round?: string;
  size?: string;
  outline?: boolean;
  submit?: boolean;
}


function Button(props: Props) {
  let button;

  // Render an anchor tag
  if (props.outline) {
    props.href = props.href;
    props.onClick = props.onClick;

    button = (
      <StyledAOutline {...props}>
        {Children.toArray(props.children)}
      </StyledAOutline>
    );
  } else {
    button = (
      <StyledASolid {...props}>
        {Children.toArray(props.children)}
      </StyledASolid>
    );
  }

  // If the Button has a handleRoute prop, we want to render a button
  if (props.handleRoute) {
    if (props.outline) {
      button = (
        <ButtonOutline {...props}>
          {Children.toArray(props.children)}
        </ButtonOutline>
      );
    } else {
      button = (
        <ButtonSolid {...props}>
          {Children.toArray(props.children)}
        </ButtonSolid>
      );
    }
  }

  // If the Button has a submit prop, we want to render a input
  if (props.submit) {
    if (props.outline) {
      button = (
        <ButtonOutline type="submit" {...props}>
          {Children.toArray(props.children)}
        </ButtonOutline>
      );
    } else {
      button = (
        <ButtonSolid type="submit" {...props}>
          {Children.toArray(props.children)}
        </ButtonSolid>
      );
    }
  }

  return (
    <Wrapper size={props.size} margin={props.margin} fill={props.fill}>
      {button}
    </Wrapper>
  );
}

export default Button;
