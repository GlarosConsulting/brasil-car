import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { FiTrash2, FiPlus, FiSearch, FiX } from 'react-icons/fi';
import { Column } from 'react-table';

import {
  Box,
  Flex,
  Text,
  Button,
  Tooltip,
  useToast,
  useDisclosure,
} from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { format } from 'date-fns';
import * as Yup from 'yup';

import DatePicker from '@/components/DatePicker';
import Header from '@/components/Header';
import Input from '@/components/Input';
import CreateNewMonthlyPayment from '@/components/Modals/CreateNewMonthlyPayment';
import Select from '@/components/Select';
import SEO from '@/components/SEO';
import Sidebar from '@/components/Sidebar';
import Table from '@/components/Table';
import { Status } from '@/interfaces/inspections/IMonthlyPayments';
import api from '@/services/api';
import formatRealValue from '@/utils/formatRealValue';
import getStatusFromMonthlyPayments from '@/utils/getStatusFromMonthlyPayment';
import getValidationErrors from '@/utils/getValidationErrors';

interface IFormattedMonthlyPayment {
  name: string;
  title_number: string;
  created_at: string;
  due_date: string;
  value: string;
  status: JSX.Element;
  button: JSX.Element;
}

interface IMonthlyPayment {
  id: string;
  name: string;
  title_number: string;
  due_date: string;
  value: number;
  status: Status;
  created_at: string;
}

interface ISearchFormData {
  select_filter: 'due' | 'created_at';
  start_date: Date;
  end_date: Date;
  name: string;
  status: Status;
}

const MONTHLY_PAYMENTS_TABLE_COLUMNS = [
  {
    Header: 'Nome',
    accessor: 'name',
  },
  {
    Header: 'N° título',
    accessor: 'title_number',
  },
  {
    Header: 'Data de emissão',
    accessor: 'created_at',
  },
  {
    Header: 'Data de vencimento',
    accessor: 'due_date',
  },
  {
    Header: 'Valor',
    accessor: 'value',
  },
  {
    Header: 'Situação',
    accessor: 'status',
  },
  {
    Header: '',
    accessor: 'button',
  },
] as Column[];

const CashHandling: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const {
    isOpen: isCreateMonthlyPaymentgOpen,
    onOpen: onOpenCreateCashHandling,
    onClose: onCloseMonthlyPayment,
  } = useDisclosure();
  const toast = useToast();

  const [monthlyPayments, setMonthlyPayments] = useState<IMonthlyPayment[]>([]);

  const getMonthlyPayments = useCallback(async () => {
    const { data: newMonthlyPayment } = await api.get<IMonthlyPayment[]>(
      '/monthly-payments',
    );

    setMonthlyPayments(newMonthlyPayment);
  }, []);

  useEffect(() => {
    async function loadMonthlyPayments() {
      const { data: newMonthlyPayment } = await api.get<IMonthlyPayment[]>(
        '/monthly-payments',
      );

      setMonthlyPayments(newMonthlyPayment);
    }

    loadMonthlyPayments();
  }, []);

  const handleSearch = useCallback(
    async ({
      select_filter,
      start_date,
      end_date,
      name,
      status,
    }: ISearchFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          select_filter:
            start_date && end_date
              ? Yup.string().required('Data inicial é necessária.')
              : Yup.string(),
          start_date:
            select_filter && Yup.date().required('Data inicial é necessária.'),
          end_date:
            select_filter && Yup.date().required('Data final é necessária.'),
        });

        await schema.validate(
          {
            select_filter,
            start_date,
            end_date,
            name,
            status,
          },
          { abortEarly: false },
        );

        let paramsData;

        if (name && status) {
          paramsData = {
            name: name && name,
            status: status && status,
          };
        }

        if (name && !status) {
          paramsData = {
            name: name && name,
          };
        }

        if (status && !name) {
          paramsData = {
            status: status && status,
          };
        }

        if (select_filter) {
          if (select_filter === 'created_at') {
            paramsData = {
              ...paramsData,
              created_at_start_date: start_date,
              created_at_end_date: end_date,
            };
          } else {
            paramsData = {
              ...paramsData,
              due_start_date: start_date,
              due_end_date: end_date,
            };
          }
        }

        const { data: newMonthlyPayments } = await api.get('monthly-payments', {
          params: paramsData,
        });

        setMonthlyPayments(newMonthlyPayments);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        toast({
          status: 'error',
          title: 'Erro ao filtrar mensalidades',
          description: 'Ocorreu um erro ao filtrar mensalidades.',
          position: 'top',
          duration: 5000,
        });
      }
    },
    [],
  );

  const handleClearFilters = useCallback(async () => {
    formRef.current.reset();

    const { data: newMonthlyPayment } = await api.get<IMonthlyPayment[]>(
      '/monthly-payments',
    );

    setMonthlyPayments(newMonthlyPayment);
  }, []);

  const handleDeleteMonthlyPayment = useCallback(async (id: string) => {
    console.log(id);
  }, []);

  const formattedMonthlyPayments: IFormattedMonthlyPayment[] = useMemo(
    () =>
      monthlyPayments.map(monthlyPayment => {
        const status = getStatusFromMonthlyPayments(monthlyPayment.status);

        return {
          name: monthlyPayment.name,
          title_number: monthlyPayment.title_number,
          created_at: format(new Date(monthlyPayment.created_at), 'dd/MM/yyyy'),
          due_date: format(new Date(monthlyPayment.due_date), 'dd/MM/yyyy'),
          value: formatRealValue(monthlyPayment.value),
          status: status && <Text color={status.color}>{status.label}</Text>,
          button: (
            <Button
              onClick={() => handleDeleteMonthlyPayment(monthlyPayment.id)}
            >
              <FiTrash2 />
            </Button>
          ),
        };
      }),
    [monthlyPayments],
  );

  return (
    <>
      <SEO title="Brasil Car" image="boost.png" shouldExcludeTitleSuffix />

      <Box as="main" height="100vh" position="relative" width="100vw">
        <Header />
        <Flex height="calc(100vh - 130px)">
          <Sidebar />
          <Flex
            paddingY={4}
            paddingX={12}
            direction="column"
            width="100%"
            height="100%"
          >
            <Form
              ref={formRef}
              onSubmit={handleSearch}
              css={{
                maxWidth: 'calc(90vw - 270px)',
                display: 'flex',
                marginBottom: 16,
              }}
            >
              <Select
                placeholder="Selecionar filtro"
                backgroundColor="#CBD5E0"
                name="select_filter"
                containerProps={{
                  backgroundColor: '#CBD5E0',
                  width: 170,
                  border: '1px solid',
                  borderColor: '#A0AEC0',
                }}
              >
                <option value="due">Filtro por data de vencimento</option>
                <option value="created_at">Filtro por data de emissão</option>
              </Select>

              <DatePicker
                placeholderText="Data de início"
                name="start_date"
                containerProps={{
                  width: 150,
                  background: '#CBD5E0',
                  marginLeft: 6,
                }}
              />

              <DatePicker
                placeholderText="Data de fim"
                name="end_date"
                containerProps={{
                  width: 150,
                  background: '#CBD5E0',
                  marginLeft: 6,
                }}
              />

              <Input
                name="name"
                placeholder="Nome"
                color="#718096"
                containerProps={{
                  background: '#CBD5E0',
                  marginLeft: 6,
                  border: '1px solid',
                  borderColor: '#A0AEC0',
                  width: 150,
                  color: '#718096',
                }}
              ></Input>

              <Select
                placeholder="Status"
                backgroundColor="#CBD5E0"
                name="status"
                containerProps={{
                  backgroundColor: '#CBD5E0',
                  width: 170,
                  marginLeft: 6,
                  border: '1px solid',
                  borderColor: '#A0AEC0',
                }}
              >
                <option value="paid">Pago</option>
                <option value="opened">Em aberto</option>
                <option value="pending">Pendente</option>
              </Select>

              <Tooltip label="Pesquisar período" aria-label="Pesquisar período">
                <Button
                  height="48px"
                  backgroundColor="gray.300"
                  marginLeft={4}
                  type="submit"
                >
                  <FiSearch />
                </Button>
              </Tooltip>

              <Tooltip label="Limpar Filtros" aria-label="Limpar Filtros">
                <Button
                  onClick={handleClearFilters}
                  height="48px"
                  backgroundColor="gray.300"
                  marginLeft={4}
                >
                  <FiX />
                </Button>
              </Tooltip>

              <Tooltip
                label="Adicionar movimentação de caixa"
                aria-label="Adicionar movimentação de caixa"
              >
                <Button
                  onClick={onOpenCreateCashHandling}
                  height="48px"
                  backgroundColor="gray.300"
                  marginLeft={4}
                >
                  <FiPlus />
                </Button>
              </Tooltip>
            </Form>

            <Table
              flex={1}
              data={formattedMonthlyPayments}
              width="100%"
              maxWidth="calc(90vw - 270px)"
              maxHeight={{
                xs: '20vh',
                sm: '40vh',
                md: '50vh',
                lg: '55vh',
                xl: '65vh',
              }}
              columns={MONTHLY_PAYMENTS_TABLE_COLUMNS}
            />
            <CreateNewMonthlyPayment
              isOpen={isCreateMonthlyPaymentgOpen}
              onClose={onCloseMonthlyPayment}
              onSave={getMonthlyPayments}
            />
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default CashHandling;
