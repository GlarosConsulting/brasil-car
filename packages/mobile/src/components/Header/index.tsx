import React from 'react';
import { View } from 'react-native';

import { Container, UserLabel } from './styles';

const Header: React.FC = () => (
  <Container>
    <View />
    <UserLabel>Bem vindo, Fulano Ciclano</UserLabel>
  </Container>
);

export default Header;
