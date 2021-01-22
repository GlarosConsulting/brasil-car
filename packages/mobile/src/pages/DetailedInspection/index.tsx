import React, { useCallback, useMemo, useState } from 'react';
import { Dimensions, Alert } from 'react-native';
import { CircleSnail } from 'react-native-progress';

import Button from '../../components/Button';
import Header from '../../components/Header';
import PhotoCard from '../../components/PhotoCard';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { Cards } from './styles';

interface IListPhotoUri {
  id: number;
  uri?: string;
}

interface IListActions {
  list: IListPhotoUri[];
  setList: React.Dispatch<React.SetStateAction<IListPhotoUri[]>>;
}

const Home: React.FC = () => {
  const { user } = useAuth();

  const [forwardPhotoUri, setForwardPhotoUri] = useState<string | null>();
  const [croupPhotoUri, setCroupPhotoUri] = useState<string | null>();
  const [leftSidePhotoUri, setLeftSidePhotoUri] = useState<string | null>();
  const [rightSidePhotoUri, setRightSidePhotoUri] = useState<string | null>();
  const [motorPhotoUri, setMotorPhotoUri] = useState<string | null>();
  const [chassiPhotoUri, setChassiPhotoUri] = useState<string | null>();
  const [documentPhotoUri, setDocumentPhotoUri] = useState<string | null>();
  const [panelPhotoUri, setPanelPhotoUri] = useState<string | null>();

  const [breakdownsPhotoUri, setBreakdownsPhotoUri] = useState<IListPhotoUri[]>(
    [],
  );
  const [glassesPhotoUri, setGlassesPhotoUri] = useState<IListPhotoUri[]>([]);

  const [isSending, setIsSending] = useState(false);

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
          name: `${key}-${user?.uid}.jpg`,
          uri: imageUri,
        } as any);
      };

      const data = new FormData();

      data.append('user_id', user?.uid || 'not_found');

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

  const handleAddItemToListPhotoUri = useCallback(
    ({ list, setList }: IListActions) => {
      const id = list.length + 1;

      setList([...list, { id, uri: undefined }]);
    },
    [breakdownsPhotoUri],
  );

  const handleChangeListPhotoUri = useCallback(
    (id: number, uri: string | undefined, { list, setList }: IListActions) => {
      const newListPhotosUri = list.map(item =>
        item.id === id ? { ...item, uri } : item,
      );

      setList(newListPhotosUri);
    },
    [],
  );

  const photoCardProps = useMemo(() => {
    const screenWidth = Dimensions.get('screen').width;

    const width = `${screenWidth * 0.44}px`;
    const height = '164px';

    return {
      width,
      height,
      style: {
        marginBottom: 16,
      },
    };
  }, []);

  return (
    <>
      <Header />

      <Cards
        contentContainerStyle={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          paddingBottom: 32,
        }}
      >
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

        <PhotoCard
          {...photoCardProps}
          title="Painel"
          uri={panelPhotoUri}
          onPhotoUriChange={setPanelPhotoUri}
        />

        <PhotoCard
          {...photoCardProps}
          title="Painel"
          uri={panelPhotoUri}
          onPhotoUriChange={setPanelPhotoUri}
        />

        <PhotoCard
          {...photoCardProps}
          title="Painel"
          uri={panelPhotoUri}
          onPhotoUriChange={setPanelPhotoUri}
        />

        <PhotoCard
          {...photoCardProps}
          title="Painel"
          uri={panelPhotoUri}
          onPhotoUriChange={setPanelPhotoUri}
        />

        <PhotoCard
          {...photoCardProps}
          title="Painel"
          uri={panelPhotoUri}
          onPhotoUriChange={setPanelPhotoUri}
        />

        <Button
          onPress={() =>
            handleAddItemToListPhotoUri({
              list: glassesPhotoUri,
              setList: setGlassesPhotoUri,
            })
          }
          style={{ marginTop: 24, marginBottom: 24 }}
        >
          Adicionar vidro
        </Button>

        {glassesPhotoUri.map(glass => (
          <PhotoCard
            key={glass.id}
            {...photoCardProps}
            title={`Vidro ${glass.id}`}
            uri={glass.uri}
            onPhotoUriChange={uri =>
              handleChangeListPhotoUri(glass.id, uri, {
                list: glassesPhotoUri,
                setList: setGlassesPhotoUri,
              })
            }
          />
        ))}

        <Button
          onPress={() =>
            handleAddItemToListPhotoUri({
              list: breakdownsPhotoUri,
              setList: setBreakdownsPhotoUri,
            })
          }
          style={{ marginTop: 24, marginBottom: 24 }}
        >
          Adicionar avaria
        </Button>

        {breakdownsPhotoUri.map(breakdown => (
          <PhotoCard
            key={breakdown.id}
            {...photoCardProps}
            title={`Avaria ${breakdown.id}`}
            uri={breakdown.uri}
            onPhotoUriChange={uri =>
              handleChangeListPhotoUri(breakdown.id, uri, {
                list: breakdownsPhotoUri,
                setList: setBreakdownsPhotoUri,
              })
            }
          />
        ))}

        <Button
          onPress={handleSend}
          background="#344c66"
          style={{ marginTop: 24, marginBottom: 24 }}
        >
          Enviar
        </Button>
      </Cards>

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
