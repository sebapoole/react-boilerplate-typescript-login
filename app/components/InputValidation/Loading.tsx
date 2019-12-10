/**
 * Logo (Component)
 */

import React from 'react';
import PropTypes from 'prop-types';

import LoadingDots from './LoadingDots';
import Wrapper from './Wrapper';

function Loading(props) {
  return (
    <Wrapper label={props.label}>
      <LoadingDots className="one"><i className="fa fa-circle"/></LoadingDots>
      <LoadingDots className="two"><i className="fa fa-circle"/></LoadingDots>
      <LoadingDots className="three"><i className="fa fa-circle"/></LoadingDots>
    </Wrapper>
  );
}

Loading.propTypes = {
  label: PropTypes.string,
};

export default Loading;
