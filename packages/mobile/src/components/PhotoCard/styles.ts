import { transparentize } from 'polished';
import styled, { css } from 'styled-components/native';

interface IContainerProps {
  width: string | number;
  height: string | number;
}

export const Container = styled.View<IContainerProps>`
  position: relative;

  background: #eee;
  border-radius: 8px;

  overflow: hidden;

  ${({ width, height }) => css`
    width: ${width || '50px'};
    height: ${height || '50px'};
  `};
`;

export const Photo = styled.Image`
  width: 100%;
  height: 100%;
`;

export const TitleContainer = styled.View`
  position: absolute;
  bottom: 0;

  width: 100%;
  height: 32px;

  background: ${transparentize(0.3, '#ddd')};

  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: #1b1b1b;
`;
