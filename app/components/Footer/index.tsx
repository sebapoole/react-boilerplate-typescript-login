import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <Wrapper>
      <section>
        <LocaleToggle/>
      </section>
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            author: <A href="https://www.linkedin.com/in/seb-poole-38348566" target="_blank">Seb Poole</A>,
          }}
        />
      </section>
    </Wrapper>
  );
}

export default Footer;
