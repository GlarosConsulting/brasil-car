import React, { useCallback, useRef } from 'react';
import { FiUpload } from 'react-icons/fi';

import { Box, useToast, Button, Text, Flex, Tooltip } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Dropzone from '@/components/Dropzone';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import Sidebar from '@/components/Sidebar';
import getValidationErrors from '@/utils/getValidationErrors';

const SUPPORTED_FORMATS = ['text/richtext'];
const InsertReturnFiles: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const toast = useToast();

  const handleSubmit = useCallback(async data => {
    try {
      formRef.current?.setErrors({});

      const schemaFile = Yup.object().shape({
        file: Yup.mixed().test(
          'fileType',
          'O formato do arquivo deve ser uma imagem.',
          value => SUPPORTED_FORMATS.includes(value.type),
        ),
      });

      await schemaFile.validate(data, { abortEarly: false });

      console.log('enviado com sucesso.');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        console.log(errors);

        if (errors.file === 'O arquivo deve ser uma imagem.') {
          toast({
            position: 'top-right',
            status: 'error',
            title: 'Arquivo inválido.',
            description: 'O arquivo selecionado deve ser uma imagem.',
          });
        }

        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  return (
    <>
      <SEO title="Brasil Car" image="boost.png" shouldExcludeTitleSuffix />

      <Box as="main" height="100vh" position="relative" width="100vw">
        <Header />
        <Box width="100vw" height="calc(100vh - 130px)">
          <Flex height="calc(100vh - 130px)">
            <Sidebar />
            <Flex
              width="100vw"
              paddingY={4}
              paddingX={12}
              direction="column"
              height="100%"
            >
              <Form
                ref={formRef}
                onSubmit={handleSubmit}
                css={{
                  display: 'flex',
                  width: '100%',
                  marginBottom: 16,
                }}
              >
                <Flex
                  height={{ md: '60vh', lg: '65vh', xl: '70vh' }}
                  width="100%"
                  marginY={4}
                  direction="column"
                >
                  <Tooltip
                    label="Inserir arquivos de retorno"
                    aria-label="Inserir arquivos de retorno"
                  >
                    <Button
                      type="submit"
                      height="48px"
                      backgroundColor="gray.300"
                      width={40}
                      marginBottom={6}
                    >
                      <FiUpload size={22} />
                      <Text marginLeft={4}>Importar</Text>
                    </Button>
                  </Tooltip>

                  <Dropzone
                    placeholeder="Arraste para esta área o arquivo de retorno ou clique aqui para localizá-lo em seu computador."
                    name="file"
                  />
                </Flex>
              </Form>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default InsertReturnFiles;
