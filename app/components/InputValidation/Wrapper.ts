/**
 * LoadingWrapper (Styled Component)
 */

import styled from 'styled-components';

interface ToProps {
  label?: string;
}

const LoadingWrapper = styled.div<ToProps>`
  position: absolute;
  right: 15px;
  top: ${(props) => props.label === '' ? '23px' : '44px'};
`;

export default LoadingWrapper;
