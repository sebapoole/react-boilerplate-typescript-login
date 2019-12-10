/**
 * Input
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';


import Validation from 'components/InputValidation';
import Label from 'components/Label';
import Input from './StyledInput';

interface IsProps {
  border?: string;
  defaultValue?: string;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  onKeyDown?: () => void;
  inputType?: string;
  id?: string;
  label?: string;
  labelColor: string;
  maxChars?: string;
  name?: string;
  pattern?: string;
  placeholder?: string;
  required?: boolean;
}

interface IState {
  loading: boolean;
  valid: boolean;
  visible: boolean;
}


class SmartInput extends Component<IsProps, IState> {
  constructor(props: IsProps) {
    super(props);

    this.state = {
      loading: false,
      valid: false,
      visible: false,
    };
  }

  public handleKeyDown(e, type, max?) {
    this.setState({ visible: true, loading: true });

    const inputLength = e.target.value.length;
    const maxIndex = parseInt(max, 10);

    const keyCode = e.which;
    const numeric = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
    const codes = [8, 9, 13, 32];

    if (maxIndex > 0 && inputLength === maxIndex) {
      if (codes.indexOf(keyCode) < 0) {
        e.preventDefault();
      }
    }

    if (type === 'numeric' || type === 'card') {
      if (numeric.indexOf(keyCode) < 0 && codes.indexOf(keyCode) < 0) {
        e.preventDefault();
      }
    }

    if (type === 'text') {
      if (numeric.indexOf(keyCode) > -1) {
        e.preventDefault();
      }
    }
  }

  public handleBlur(e, type) {
    const value = e.target.value;
    this.setState({ loading: false });

    if (type === 'email') {
      if (this.validateEmail(value)) {
        this.setState({ valid: true });
      } else {
        this.setState({ valid: false });
      }
    } else {
      const pattern = e.target.getAttribute('pattern');
      const regex = new RegExp(pattern);

      if (pattern !== null) {
        if (this.validateInputPattern(value, regex)) {
          this.setState({ valid: true });
        } else {
          this.setState({ valid: false });
        }
      } else if ((value.length > 0)) {
        this.setState({ valid: true });
      } else {
        this.setState({ valid: false });
      }
    }
  }

  public validateInputPattern(value, pattern) {
    return pattern.test(value);
  }

  public validateEmail(email) {
    // tslint:disable-next-line:max-line-length
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  public handleCardKeyUp(e, max) {
    const inputLength = e.target.value.length;
    const maxIndex = parseInt(max, 10);
    // tslint:disable-next-line
    const luhnValidate = (function(arr) {
      return ((ccNum) => {
        let len = ccNum.length;
        let bit = 1;
        let sum = 0;
        let val;

        while (len) {
          // tslint:disable-next-line
          val = parseInt(ccNum.charAt(--len), 10);
          // tslint:disable-next-line
          sum += (bit ^= 1) ? arr[val] : val;
        }

        return sum && sum % 10 === 0;
      });
    }([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));

    if (inputLength === maxIndex) { // test for luhn once card input has been completed
      const cardString = String(e.target.value);

      if (luhnValidate(cardString)) {
        e.target.setCustomValidity('');
      } else {
        e.target.setCustomValidity('Not valid');
      }
    }
  }

  public handleCharKeyDown(e, max) {
    const maxIndex = parseInt(max, 10) - 1;
    const inputLength = e.target.value.length;

    if (parseInt(max, 10) > 0 && inputLength === maxIndex) {
      e.preventDefault();
    }

    const numeric = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
    const keyCode = e.which;
    if (numeric.indexOf(keyCode) > -1) {
      e.preventDefault();
    }
  }

  public render() {
    const props = {
      border: this.props.border,
      defaultValue: this.props.defaultValue,
      id: this.props.id,
      inputType: this.props.inputType,
      name: this.props.name,
      onBlur: (e) => this.handleBlur(e, this.props.inputType),
      onChange: this.props.onChange,
      placeholder: this.props.placeholder,
      pattern: this.props.pattern,
      required: this.props.required,
    };

    if (this.props.inputType === 'textOnly') {
      // text only
      const type = 'text';
      const onKeyDown = (e) => this.handleKeyDown(e, 'text', this.props.maxChars);
    } else if (this.props.inputType === 'numeric') {
      // numeric
      const type = 'text';
      const onKeyDown = (e) => this.handleKeyDown(e, 'numeric', this.props.maxChars);
    } else if (this.props.inputType === 'email') {
      // email
      const type = 'email';
      const onKeyDown = (e) => this.handleKeyDown(e, 'email');
    } else if (this.props.inputType === 'card') {
      // card
      const type = 'text';
      const onKeyDown = (e) => this.handleKeyDown(e, 'card', 16);
      const onKeyUp = (e) => this.handleCardKeyUp(e, 16);
    } else if (this.props.inputType === 'password') {
      // password
      const type = 'password';
    } else {
      const type = 'text';
    }

    const smartInput = <Input {...props} />;

    return (
      <Label color={this.props.labelColor}>
        {this.props.label}
        {smartInput}
        <Validation visible={this.state.visible} loading={this.state.loading} valid={this.state.valid} />
      </Label>
    );
  }

  public static defaultProps = {
    label: '',
    maxChars: '0',
  };
}

export default SmartInput;
