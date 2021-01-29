import React, { useCallback, useRef } from 'react';
import { FiDollarSign } from 'react-icons/fi';

import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import DatePicker from '@/components/DatePicker';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { Status } from '@/interfaces/inspections/IMonthlyPayments';
import api from '@/services/api';
import getValidationErrors from '@/utils/getValidationErrors';
import { currencyMasker } from '@/utils/masks';

interface IFormData {
  name: string;
  title_number: string;
  due_date: Date;
  value: number;
  status: Status;
}

interface ICrateNewMonthlyPaymentProps {
  isOpen: boolean;
  onClose?: (
    event: React.MouseEvent | React.KeyboardEvent,
    reason?: 'pressedEscape' | 'clickedOverlay',
  ) => void;
  onSave: () => void;
}

const CrateNewMonthlyPayment: React.FC<ICrateNewMonthlyPaymentProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const formRef = useRef<FormHandles>(null);

  const toast = useToast();

  const handleKeyUp = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      event.preventDefault();
      currencyMasker(event);
    },
    [],
  );

  const handleSubmit = useCallback(async (data: IFormData, event) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório.'),
        title_number: Yup.string().required('Número de título obrigatório.'),
        due_date: Yup.date().required('Data de vencimento obrigatória.'),
        value: Yup.number().required('Valor obrigatório.'),
        status: Yup.string().required('Status obrigatório.'),
      });

      await schema.validate(data, { abortEarly: false });

      await api.post('monthly-payments', data);

      toast({
        status: 'success',
        title: 'Mensalidade criada com sucesso',
        position: 'top',
        duration: 3000,
      });

      onClose(event);
      onSave();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      toast({
        status: 'error',
        title: 'Erro ao registrar Mensalidade',
        description:
          'Ocorreu um erro ao registrar a Mensalidade, tente novamente.',
        position: 'top',
        duration: 5000,
      });
    }
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth={900} borderRadius="md">
          <ModalHeader>Registrar mensalidade</ModalHeader>
          <ModalCloseButton />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <ModalBody paddingBottom={4}>
              <Flex direction="column">
                <Input
                  name="name"
                  placeholder="Nome"
                  color="#718096"
                  containerProps={{
                    background: '#CBD5E0',
                    marginBottom: 6,
                    border: '1px solid',
                    borderColor: '#A0AEC0',
                    color: '#718096',
                  }}
                />
                <Input
                  name="title_number"
                  placeholder="N° de título"
                  color="#718096"
                  containerProps={{
                    background: '#CBD5E0',
                    marginBottom: 6,
                    border: '1px solid',
                    borderColor: '#A0AEC0',
                    color: '#718096',
                  }}
                />
                <Input
                  onKeyUp={handleKeyUp}
                  name="value"
                  placeholder="Valor"
                  icon={FiDollarSign}
                  containerProps={{
                    background: '#CBD5E0',
                    marginBottom: 6,
                  }}
                />
                <DatePicker
                  name="due_date"
                  placeholderText="Data de vencimento"
                  containerProps={{
                    marginBottom: 6,
                    color: '#000',
                    background: '#CBD5E0',
                  }}
                />

                <Select
                  placeholder="Status"
                  backgroundColor="#CBD5E0"
                  name="status"
                  containerProps={{
                    backgroundColor: '#CBD5E0',
                    marginBottom: 6,
                    border: '1px solid',
                    borderColor: '#A0AEC0',
                  }}
                >
                  <option value="paid">Pago</option>
                  <option value="opened">Em aberto</option>
                  <option value="pending">Pendente</option>
                </Select>
              </Flex>
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
    </>
  );
};

export default CrateNewMonthlyPayment;
