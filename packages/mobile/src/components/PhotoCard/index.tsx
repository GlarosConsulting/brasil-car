import React, { useCallback, useState } from 'react';
import { ViewProps } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import OptionsMenu from 'react-native-option-menu';

import { Container, Photo, TitleContainer, Title } from './styles';

interface IPhotoCardProps extends ViewProps {
  title: string;
  width: string | number;
  height: string | number;
}

const PhotoCard: React.FC<IPhotoCardProps> = ({
  title,
  width,
  height,
  ...rest
}) => {
  const [photoUri, setPhotoUri] = useState<string>();

  const handleLaunchCamera = useCallback(() => {
    launchCamera({ mediaType: 'photo' }, ({ uri }) => {
      setPhotoUri(uri);
    });
  }, []);

  const handleLaunchLibrary = useCallback(() => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      ({ uri }) => {
        setPhotoUri(uri);
      },
    );
  }, []);

  return (
    <OptionsMenu
      customButton={
        <Container width={width} height={height} {...rest}>
          <Photo source={{ uri: photoUri }} />

          <TitleContainer>
            <Title>{title}</Title>
          </TitleContainer>
        </Container>
      }
      destructiveIndex={1}
      options={['Camera', 'Galeria', 'Cancel']}
      actions={[handleLaunchCamera, handleLaunchLibrary]}
    />
  );
};

export default PhotoCard;
