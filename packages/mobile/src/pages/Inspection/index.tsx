import React, { useCallback, useMemo, useState } from 'react';
import { Dimensions, Alert } from 'react-native';
import { CircleSnail } from 'react-native-progress';

import Header from '../../components/Header';
import PhotoCard from '../../components/PhotoCard';
import api from '../../services/api';

import {
  Container,
  Cards,
  Row,
  SendButtonContainer,
  SendButtonText,
} from './styles';

const Home: React.FC = () => {
  const [forwardPhotoUri, setForwardPhotoUri] = useState<string | null>();
  const [croupPhotoUri, setCroupPhotoUri] = useState<string | null>();
  const [leftSidePhotoUri, setLeftSidePhotoUri] = useState<string | null>();
  const [rightSidePhotoUri, setRightSidePhotoUri] = useState<string | null>();
  const [motorPhotoUri, setMotorPhotoUri] = useState<string | null>();
  const [chassiPhotoUri, setChassiPhotoUri] = useState<string | null>();
  const [documentPhotoUri, setDocumentPhotoUri] = useState<string | null>();
  const [panelPhotoUri, setPanelPhotoUri] = useState<string | null>();

  const [isSending, setIsSending] = useState(false);

  const photoCardProps = useMemo(() => {
    const screenWidth = Dimensions.get('screen').width;

    const width = `${screenWidth * 0.44}px`;
    const height = `${screenWidth * 0.34}px`;

    return {
      width,
      height,
    };
  }, []);

  const handleSend = useCallback(async () => {
    try {
      if (
        !forwardPhotoUri ||
        !croupPhotoUri ||
        !leftSidePhotoUri ||
        !rightSidePhotoUri ||
        !motorPhotoUri ||
        !chassiPhotoUri ||
        !documentPhotoUri ||
        !panelPhotoUri
      ) {
        Alert.alert(
          'Alerta',
          'Por favor, preencha todas as fotos antes de enviar.',
        );

        return;
      }

      const userId = '123456';

      const appendImageToFormData = (
        formData: FormData,
        key: string,
        imageUri?: string | null,
      ) => {
        if (!imageUri) {
          return;
        }

        formData.append(key, {
          type: 'image/jpeg',
          name: `${key}-${userId}.jpg`,
          uri: imageUri,
        } as any);
      };

      const data = new FormData();

      data.append('user_id', userId);

      appendImageToFormData(data, 'forward', forwardPhotoUri);
      appendImageToFormData(data, 'croup', croupPhotoUri);
      appendImageToFormData(data, 'left_side', leftSidePhotoUri);
      appendImageToFormData(data, 'right_side', rightSidePhotoUri);
      appendImageToFormData(data, 'motor', motorPhotoUri);
      appendImageToFormData(data, 'chassi', chassiPhotoUri);
      appendImageToFormData(data, 'document', documentPhotoUri);
      appendImageToFormData(data, 'panel', panelPhotoUri);

      setIsSending(true);

      await api.post('/inspections', data);

      setForwardPhotoUri(null);
      setCroupPhotoUri(null);
      setLeftSidePhotoUri(null);
      setRightSidePhotoUri(null);
      setMotorPhotoUri(null);
      setChassiPhotoUri(null);
      setDocumentPhotoUri(null);
      setPanelPhotoUri(null);

      setIsSending(false);

      Alert.alert(
        'Enviado com sucesso',
        'Todas as fotos foram enviadas com sucesso!',
      );
    } catch (err) {
      Alert.alert('Ocorreu um erro', String(err));
    }
  }, [
    forwardPhotoUri,
    croupPhotoUri,
    leftSidePhotoUri,
    rightSidePhotoUri,
    motorPhotoUri,
    chassiPhotoUri,
    documentPhotoUri,
    panelPhotoUri,
  ]);

  return (
    <>
      <Header />

      <Container>
        <Cards>
          <Row>
            <PhotoCard
              {...photoCardProps}
              title="Dianteira"
              uri={forwardPhotoUri}
              onPhotoUriChange={setForwardPhotoUri}
            />
            <PhotoCard
              {...photoCardProps}
              title="Traseira"
              uri={croupPhotoUri}
              onPhotoUriChange={setCroupPhotoUri}
            />
          </Row>

          <Row>
            <PhotoCard
              {...photoCardProps}
              title="Lateral esquerda"
              uri={leftSidePhotoUri}
              onPhotoUriChange={setLeftSidePhotoUri}
            />
            <PhotoCard
              {...photoCardProps}
              title="Lateral direita"
              uri={rightSidePhotoUri}
              onPhotoUriChange={setRightSidePhotoUri}
            />
          </Row>

          <Row>
            <PhotoCard
              {...photoCardProps}
              title="Motor"
              uri={motorPhotoUri}
              onPhotoUriChange={setMotorPhotoUri}
            />
            <PhotoCard
              {...photoCardProps}
              title="Chassi"
              uri={chassiPhotoUri}
              onPhotoUriChange={setChassiPhotoUri}
            />
          </Row>

          <Row>
            <PhotoCard
              {...photoCardProps}
              title="Documento"
              uri={documentPhotoUri}
              onPhotoUriChange={setDocumentPhotoUri}
            />
            <PhotoCard
              {...photoCardProps}
              title="Painel"
              uri={panelPhotoUri}
              onPhotoUriChange={setPanelPhotoUri}
            />
          </Row>
        </Cards>

        <SendButtonContainer activeOpacity={0.6} onPress={handleSend}>
          <SendButtonText>Enviar</SendButtonText>
        </SendButtonContainer>
      </Container>

      {isSending && (
        <CircleSnail
          indeterminate
          size={80}
          thickness={6}
          style={{
            position: 'absolute',
            top: '45%',
            left: '40%',
          }}
        />
      )}
    </>
  );
};

export default Home;
