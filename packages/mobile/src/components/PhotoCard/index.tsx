import React, { useCallback, useState } from 'react';
import { ViewProps } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import OptionsMenu from 'react-native-option-menu';

import { Container, Photo, TitleContainer, Title } from './styles';

interface IPhotoCardProps extends ViewProps {
  title: string;
  width: string | number;
  height: string | number;
  onPhotoUriChange?(uri?: string): void;
}

const PhotoCard: React.FC<IPhotoCardProps> = ({
  title,
  width,
  height,
  onPhotoUriChange,
  ...rest
}) => {
  const [photoUri, setPhotoUri] = useState<string>();

  const handleLaunchCamera = useCallback(() => {
    launchCamera({ mediaType: 'photo' }, ({ uri }) => {
      setPhotoUri(uri);

      if (onPhotoUriChange) {
        onPhotoUriChange(uri);
      }
    });
  }, [onPhotoUriChange]);

  const handleLaunchLibrary = useCallback(() => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      ({ uri }) => {
        setPhotoUri(uri);

        if (onPhotoUriChange) {
          onPhotoUriChange(uri);
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
      options={['Camera', 'Galeria', 'Cancel']}
      actions={[handleLaunchCamera, handleLaunchLibrary]}
    />
  );
};

export default PhotoCard;
