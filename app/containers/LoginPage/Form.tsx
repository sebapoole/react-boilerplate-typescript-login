/**
 * Form (Login/Signup)
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { Location } from './types';
import A from 'components/A';
import Button from 'components/Button';
import { Container, GridItem } from 'components/Grid';
import Form from 'components/Form';
import Input from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';
import { signUp, login} from '../App/actions';

interface Props {
  location: Location;
  currentlySending: boolean;
  btnText: string;
}

export default function AuthForm(props: Props) {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dispatch = useDispatch();

  const onSubmit = (e, pathname) => {
    e.preventDefault();
    const formData = {
      username: username,
      password: password,
    };

    if (pathname.indexOf('signup') > -1) {
      dispatch(signUp(formData));
    } else {
      dispatch(login(formData));
    }
  };


  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (name === 'password') {
      setPassword(value);
    } else {
      setUsername(value);
    }
  };

  return (
    <Form onSubmit={(e) => onSubmit(e, props.location.pathname)}>
      <Container columns="2">
        <GridItem row="1" col="1 / span 2">
          <ErrorMessage />
        </GridItem>
        <GridItem row="2" col="1 / span 2">
          <Input inputType="textOnly" labelColor="#000" name="username"
              placeholder="Username" onChange={(e) => handleInputChange(e)} required />
        </GridItem>
        <GridItem row="3" col="1 / span 2">
          <Input inputType="password" labelColor="#000" name="password"
              placeholder="Password" onChange={(e) => handleInputChange(e)} required />
        </GridItem>
        <GridItem row="4" col="1">
          {
            props.currentlySending ? (
              <Button submit fill="true" color="primary">Loading!</Button>
            ) : (
              <Button submit fill="true" color="primary">{props.btnText}</Button>
            )
          }
        </GridItem>
        <GridItem row="4" col="2" center>
          {
            (props.btnText === 'Signup') ? (
              <A href="/login">Existing User?</A>
            ) : (
              <A href="/signup">New User?</A>
            )
          }
        </GridItem>
      </Container>
    </Form>
  );
}
