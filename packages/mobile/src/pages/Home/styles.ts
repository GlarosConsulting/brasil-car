import { Grid, Row as GridRow } from 'react-native-easy-grid';

import styled from 'styled-components/native';

export const Container = styled(Grid)`
  flex-direction: column;
`;

export const Cards = styled(Grid)`
  flex-direction: column;

  padding: 20px 16px 8px;
`;

export const Row = styled(GridRow)`
  justify-content: space-between;
`;

export const SendButtonContainer = styled.View`
  background: #7b84db;
  width: 100%;
  height: 56px;

  justify-content: center;
  align-items: center;
`;

export const SendButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
`;
