/*
 * LoginPage
 */

import * as React from 'react';
import Form from './Form';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Wrapper from './Wrapper';
import { makeSelectCurrentlySending } from 'containers/App/selectors';
import Img from './Img';
import Logo from 'images/paypal-logo.svg';

const stateSelector = createStructuredSelector({
  currentlySending: makeSelectCurrentlySending(),
});

export default function LoginPage() {
  const { currentlySending } = useSelector(stateSelector);

  return (
    <Wrapper>
      <Img src={Logo} />
      <Form
        location={location}
        currentlySending={currentlySending}
        btnText="Submit"
      />
    </Wrapper>
  );
}

LoginPage.propTypes = {
  dispatch: PropTypes.func,
  formState: PropTypes.object,
  history: PropTypes.object,
};
