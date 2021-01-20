import React, { useCallback, useRef } from 'react';

import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Select from '@/components/Select';
import IFormattedInspection from '@/interfaces/inspections/IFormattedInspection';
import { Status } from '@/interfaces/inspections/IInspection';
import getStatusFromInspections from '@/utils/getStatusFromInspections';

import ImageCard from './ImageCard';

interface IInspectionInfoModalProps {
  isOpen: boolean;
  inspection?: IFormattedInspection;
  onClose?: (
    event: React.MouseEvent | React.KeyboardEvent,
    reason?: 'pressedEscape' | 'clickedOverlay',
  ) => void;
}

interface IFormData {
  status: Status;
}

const InspectionInfoModal: React.FC<IInspectionInfoModalProps> = ({
  isOpen,
  inspection,
  onClose,
}) => {
  const formRef = useRef<FormHandles>(null);

  const toast = useToast();

  const handleChangeStatus = useCallback(async ({ status }: IFormData) => {
    const statusConfig = getStatusFromInspections(status);

    toast({
      duration: 3000,
      position: 'top',
      status: 'success',
      title: 'Vistoria atualizada com sucesso',
      description: `A situação da vistoria foi alterada para: ${statusConfig.label.toLowerCase()}.`,
    });
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent borderRadius="md">
        <ModalHeader>Vistoria</ModalHeader>
        <ModalCloseButton />

        <Form
          ref={formRef}
          initialData={{
            status: inspection?.status,
          }}
          onSubmit={handleChangeStatus}
        >
          <ModalBody paddingBottom={4}>
            <Stack spacing={2}>
              <Stack spacing={0}>
                <Heading size="sm">Nome:</Heading>
                <Text>{inspection?.name}</Text>
              </Stack>

              <Stack spacing={0}>
                <Heading size="sm">Data de envio:</Heading>
                <Text>{inspection?.send_date}</Text>
              </Stack>

              <Stack spacing={0}>
                <Heading size="sm">Data limite:</Heading>
                <Text>{inspection?.limit_date}</Text>
              </Stack>

              <SimpleGrid columns={2} spacing={6} mt={2}>
                <ImageCard
                  title="Dianteira"
                  image_url={inspection.original.images.forward_img_url}
                />

                <ImageCard
                  title="Traseira"
                  image_url={inspection.original.images.croup_img_url}
                />

                <ImageCard
                  title="Lateral esquerda"
                  image_url={inspection.original.images.left_side_img_url}
                />

                <ImageCard
                  title="Lateral direita"
                  image_url={inspection.original.images.right_side_img_url}
                />

                <ImageCard
                  title="Motor"
                  image_url={inspection.original.images.motor_img_url}
                />

                <ImageCard
                  title="Chassi"
                  image_url={inspection.original.images.chassi_img_url}
                />

                <ImageCard
                  title="Documento"
                  image_url={inspection.original.images.document_img_url}
                />

                <ImageCard
                  title="Painel"
                  image_url={inspection.original.images.panel_img_url}
                />
              </SimpleGrid>

              <Flex mt={4}>
                <Select
                  placeholder="Situação"
                  backgroundColor="#CBD5E0"
                  name="status"
                  containerProps={{
                    backgroundColor: '#CBD5E0',
                    width: 250,
                    border: '1px solid',
                    borderColor: '#A0AEC0',
                  }}
                >
                  <option value="pending">Pendente</option>
                  <option value="approved">Aprovado</option>
                  <option value="refused">Recusado</option>
                </Select>
              </Flex>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose} marginRight={4}>
              Cancelar
            </Button>

            <Button type="submit" variantColor="green">
              Salvar
            </Button>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export default InspectionInfoModal;
