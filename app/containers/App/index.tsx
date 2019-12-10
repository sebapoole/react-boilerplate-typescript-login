/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styles/styled-components';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './privateRoute';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import SignUpPage from 'containers/SignUpPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: 100%;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export default function App() {

  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Kooee"
        defaultTitle="Kooee Platform"
      >
        <meta name="description" content="Customer Videos for Brands" />
      </Helmet>
      <Switch>
        <Route exact path="/signin" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <PrivateRoute path="/" component={HomePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}
