/**
 * ErrorMessage (Component)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectErrorMessage } from 'containers/App/selectors';

import Wrapper from './Wrapper';

const stateSelector = createStructuredSelector({
  error: makeSelectErrorMessage(),
});

function ErrorMessage(props) {
  const { error } = useSelector(stateSelector);
  return (
    <div>
      {
        props.errorMessage &&
        <Wrapper>
          <p>{props.errorMessage}</p>
        </Wrapper>
      }
    </div>
  );
}

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string,
};

export default (ErrorMessage);
