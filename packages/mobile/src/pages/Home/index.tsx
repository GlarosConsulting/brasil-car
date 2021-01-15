import React from 'react';
import { Text } from 'react-native';

import Header from '../../components/Header';

import { Container } from './styles';

const Home: React.FC = () => (
  <>
    <Header />

    <Container>
      <Text>Home</Text>
    </Container>
  </>
);

export default Home;
