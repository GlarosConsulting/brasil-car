import React, { useCallback } from 'react';

import { Box, Flex, Image, useTheme } from '@chakra-ui/core';
import { transparentize } from 'polished';

interface IImageCardProps {
  id?: string;
  title: string;
  image_url: string | null;
}

const ImageCard: React.FC<IImageCardProps> = ({ id, title, image_url }) => {
  const theme = useTheme();

  const handleOpenImage = useCallback(() => {
    window.open(image_url, '__blank');
  }, []);

  return (
    <>
      {image_url && (
        <Box
          width="100%"
          maxWidth={600}
          id={id || ''}
          position="relative"
          borderRadius="md"
          overflow="hidden"
          cursor="pointer"
          onClick={handleOpenImage}
        >
          <Image src={image_url} />

          <Flex
            position="absolute"
            bottom={0}
            justifyContent="center"
            alignItems="center"
            bg={transparentize(0.25, theme.colors.white)}
            width="100%"
          >
            {title}
          </Flex>
        </Box>
      )}
    </>
  );
};

export default ImageCard;
