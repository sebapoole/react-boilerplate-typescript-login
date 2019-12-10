/**
 * Grid (Components)
 */

import styled, { createGlobalStyle } from 'styled-components';
import * as style from 'components/Variables';

interface ContainerProps {
  gap?: string;
  columns?: string;
  keepColumns?: boolean;
  custom?: boolean;
  margin?: string;
}

interface GridItemProps {
  textAlign?: string;
  padding?: number;
  center?: boolean;
  row?: string;
  col?: string;
  keep?: boolean;
}

function colWidth(columns, gap) {
  let margin = gap;

  if (margin === undefined) {
    margin = 2;
  }

  const totalMargin = (margin * columns) - margin;
  return `${(100 - totalMargin) / columns}% `;
}

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-gap: ${(props) => (props.gap) ? `${props.gap}%` : '2%'};
  ${(props) => props.columns && 'grid-template-columns: 1fr;'};
  ${(props) => {
    if (props.keepColumns) {
      if (props.custom) {
        return `grid-template-columns: ${props.custom};`;
      }
      return `grid-template-columns: repeat(${props.columns}, [col] ${colWidth(props.columns, props.gap)})`;
    }
    return 'grid-template-columns: 1fr;';
  }};
  margin: ${(props) => (props.margin) ? `${props.margin}%` : '0'};
  width: 100%;
  @media (min-width: ${style.breakpoint.small}) {
    ${(props) => props.columns && `grid-template-columns: repeat(${props.columns},
          [col] ${colWidth(props.columns, props.gap)});`};
    ${(props) => props.custom && `grid-template-columns: ${props.custom};`};
  }
`;

export const GridItem = styled.div<GridItemProps>`
  ${(props) => props.textAlign && `text-align: ${props.textAlign};`};
  ${(props) => props.padding && `padding: ${props.padding};`};
  ${(props) => props.center && `
    display: flex;
    flex-direction: column;
    justify-content: center;
  `};
  ${(props) => (props.keep) && `
    ${props.row && `grid-row: row ${props.row};`};
    ${props.col && `grid-column: col ${props.col};`};
  `};
  @media (min-width: ${style.breakpoint.small}) {
    ${(props) => props.row && `grid-row: row ${props.row};`};
    ${(props) => props.col && `grid-column: col ${props.col};`};
  }
`;
