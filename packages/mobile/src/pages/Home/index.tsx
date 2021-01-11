import React, { useMemo } from 'react';
import { Dimensions } from 'react-native';

import Header from '../../components/Header';
import PhotoCard from '../../components/PhotoCard';
import {
  Container,
  Cards,
  Row,
  SendButtonContainer,
  SendButtonText,
} from './styles';

const Home: React.FC = () => {
  const photoCardProps = useMemo(() => {
    const screenWidth = Dimensions.get('screen').width;

    const width = `${screenWidth * 0.44}px`;
    const height = `${screenWidth * 0.34}px`;

    return {
      width,
      height,
    };
  }, []);

  return (
    <>
      <Header />

      <Container>
        <Cards>
          <Row>
            <PhotoCard title="Dianteira" {...photoCardProps} />
            <PhotoCard title="Traseira" {...photoCardProps} />
          </Row>

          <Row>
            <PhotoCard title="Lateral direita" {...photoCardProps} />
            <PhotoCard title="Lateral esquerda" {...photoCardProps} />
          </Row>

          <Row>
            <PhotoCard title="Motor" {...photoCardProps} />
            <PhotoCard title="Chassi" {...photoCardProps} />
          </Row>

          <Row>
            <PhotoCard title="Documento" {...photoCardProps} />
            <PhotoCard title="Painel" {...photoCardProps} />
          </Row>
        </Cards>

        <SendButtonContainer>
          <SendButtonText>Enviar</SendButtonText>
        </SendButtonContainer>
      </Container>
    </>
  );
};

export default Home;
