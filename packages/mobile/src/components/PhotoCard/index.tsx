import React, { useCallback, useEffect, useState } from 'react';
import { ViewProps } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import OptionsMenu from 'react-native-option-menu';

import { Container, Photo, TitleContainer, Title } from './styles';

interface IPhotoCardProps extends ViewProps {
  title: string;
  uri?: string | null;
  width: string | number;
  height: string | number;
  onPhotoUriChange?(uri?: string): void;
}

const PhotoCard: React.FC<IPhotoCardProps> = ({
  title,
  uri,
  width,
  height,
  onPhotoUriChange,
  ...rest
}) => {
  const [photoUri, setPhotoUri] = useState<string | null>();

  useEffect(() => {
    setPhotoUri(uri);
  }, [uri]);

  const handleLaunchCamera = useCallback(() => {
    launchCamera({ mediaType: 'photo' }, ({ uri: newUri }) => {
      setPhotoUri(uri);

      if (onPhotoUriChange) {
        onPhotoUriChange(newUri);
      }
    });
  }, [onPhotoUriChange]);

  const handleLaunchLibrary = useCallback(() => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      ({ uri: newUri }) => {
        setPhotoUri(uri);

        if (onPhotoUriChange) {
          onPhotoUriChange(newUri);
        }
      },
    );
  }, [onPhotoUriChange]);

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
      options={['Camera', 'Galeria', 'Cancelar']}
      actions={[handleLaunchCamera, handleLaunchLibrary]}
    />
  );
};

export default PhotoCard;
