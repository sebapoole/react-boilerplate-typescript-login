/**
 * Button / Wrapper (Styled Component)
 */

import styled from 'styled-components';

interface ToProps {
  margin?: string;
  fill?: string;
  size?: string;
}

const Wrapper = styled.div<ToProps>`
  display: inline-block;
  margin: ${(props) => props.margin ? props.margin : '1em 0'};
  width: ${(props) => props.fill === 'true' ? '100%' : 'auto'};
`;

export default Wrapper;
