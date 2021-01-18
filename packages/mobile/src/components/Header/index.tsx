import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

import { DrawerActions, useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import { Container, UserLabel } from './styles';

const Header: React.FC = () => {
  const { user } = useAuth();

  const { dispatch } = useNavigation();

  return (
    <Container>
      <TouchableOpacity onPress={() => dispatch(DrawerActions.toggleDrawer())}>
        <Icon name="menu" size={32} color="#fff" />
      </TouchableOpacity>

      <UserLabel>Bem vindo, {user?.displayName}</UserLabel>
    </Container>
  );
};

export default Header;
