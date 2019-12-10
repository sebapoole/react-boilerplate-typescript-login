/**
 * Input
 */

import React, { Component } from 'react';

import Loading from './Loading';
import Icon from './Icon';
import Wrapper from './Wrapper';

interface ToProps {
  visible: boolean;
  loading: boolean;
  valid: boolean;
  label?: string;
}

class InputValidation extends Component<ToProps, {}> { // eslint-disable-line react/prefer-stateless-function
  public render() {
    let validation;

    if (this.props.visible) {
      if (this.props.loading) {
        validation = (
          <Loading label={this.props.label} />
        );
      } else {
        if (this.props.valid) { // eslint-disable-line no-lonely-if
          validation = (
            <Wrapper label={this.props.label}>
              <Icon className="fa fa-med fa-check" style={{ lineHeight: '24px' }} color="secondary" />
            </Wrapper>
          );
        } else {
          validation = (
            <Wrapper label={this.props.label}>
              <Icon className="fa fa-med fa-exclamation-circle" style={{ lineHeight: '24px' }} color="gray" />
            </Wrapper>
          );
        }
      }
    }

    return (
      <div>
        {validation}
      </div>
    );
  }
}

export default InputValidation;
