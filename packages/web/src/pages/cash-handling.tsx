import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { FiPlus, FiSearch, FiX } from 'react-icons/fi';
import { Column } from 'react-table';

import { Box, Flex, Text, Button, Tooltip } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { format } from 'date-fns';

import DatePicker from '@/components/DatePicker';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import Sidebar from '@/components/Sidebar';
import Table from '@/components/Table';
import api from '@/services/api';
import formatRealValue from '@/utils/formatRealValue';

interface IDataTable {
  date: string;
  bank: string;
  return: JSX.Element;
  bank_tariff: JSX.Element;
}

interface ICashHandling {
  date: Date;
  bank_value: number;
  return_value: number;
  bank_tariff_value: number;
  is_previous_balance: boolean;
}

const CASH_HANDLING_TABLE_COLUMNS = [
  {
    Header: 'Data',
    accessor: 'date',
  },
  {
    Header: 'Banco',
    accessor: 'bank',
  },
  {
    Header: 'Retorno',
    accessor: 'return',
  },
  {
    Header: 'Tarifa Banco',
    accessor: 'bank_tariff',
  },
] as Column[];

const CashHandling: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const router = useRouter();

  const [dataTable, setDataTable] = useState<IDataTable[]>([] as IDataTable[]);
  const [initialData, setInitialDate] = useState<{
    lastDate: Date;
    firstDate: Date;
  }>({ lastDate: new Date(), firstDate: new Date() });

  const [minAndMaxValue, setMinAndMaxValue] = useState<{
    minDate: Date;
    maxDate: Date;
  }>({ minDate: new Date(), maxDate: new Date() });

  useEffect(() => {
    api.get('/cash-handling').then(response => {
      const cashHandling: Array<ICashHandling> = response.data;

      setInitialDate({
        firstDate: cashHandling[0].date,
        lastDate: cashHandling[cashHandling.length - 1].date,
      });

      setMinAndMaxValue({
        minDate: cashHandling[0].date,
        maxDate: cashHandling[cashHandling.length - 1].date,
      });

      setDataTable(
        cashHandling.map(row =>
          row.is_previous_balance === true
            ? {
                date: 'SALDO ANTERIOR',
                bank: formatRealValue(row.bank_value),
                return: (
                  <Text color="blue.400">
                    {formatRealValue(row.return_value)}
                  </Text>
                ),
                bank_tariff: (
                  <Text color="red.600">
                    {formatRealValue(row.bank_tariff_value)}
                  </Text>
                ),
              }
            : {
                date: format(new Date(row.date), 'dd/MM/yyyy'),
                bank: formatRealValue(row.bank_value),
                return: (
                  <Text color="blue.400">
                    {formatRealValue(row.return_value)}
                  </Text>
                ),
                bank_tariff: (
                  <Text color="red.600">
                    {formatRealValue(row.bank_tariff_value)}
                  </Text>
                ),
              },
        ),
      );
    });
  }, []);

  const handleSearchCashHandling = useCallback(data => {
    api
      .get('cash-handling', {
        params: { initialDate: data.initialDate, finalDate: data.finalDate },
      })
      .then(response => {
        const cashHandling = response.data;

        setInitialDate({
          lastDate: data.finalDate,
          firstDate: data.initialDate,
        });

        setDataTable(
          cashHandling.map(row =>
            row.is_previous_balance === true
              ? {
                  date: 'SALDO ANTERIOR',
                  bank: formatRealValue(row.bank_value),
                  return: (
                    <Text color="blue.400">
                      {formatRealValue(row.return_value)}
                    </Text>
                  ),
                  bank_tariff: (
                    <Text color="red.600">
                      {formatRealValue(row.bank_tariff_value)}
                    </Text>
                  ),
                }
              : {
                  date: format(new Date(row.date), 'dd/MM/yyyy'),
                  bank: formatRealValue(row.bank_value),
                  return: (
                    <Text color="blue.400">
                      {formatRealValue(row.return_value)}
                    </Text>
                  ),
                  bank_tariff: (
                    <Text color="red.600">
                      {formatRealValue(row.bank_tariff_value)}
                    </Text>
                  ),
                },
          ),
        );
      });
  }, []);

  const handleCleanFilters = useCallback(() => {
    api.get('/cash-handling').then(response => {
      const cashHandling: Array<ICashHandling> = response.data;

      setDataTable(
        cashHandling.map(row =>
          row.is_previous_balance === true
            ? {
                date: 'SALDO ANTERIOR',
                bank: formatRealValue(row.bank_value),
                return: (
                  <Text color="blue.400">
                    {formatRealValue(row.return_value)}
                  </Text>
                ),
                bank_tariff: (
                  <Text color="red.600">
                    {formatRealValue(row.bank_tariff_value)}
                  </Text>
                ),
              }
            : {
                date: format(new Date(row.date), 'dd/MM/yyyy'),
                bank: formatRealValue(row.bank_value),
                return: (
                  <Text color="blue.400">
                    {formatRealValue(row.return_value)}
                  </Text>
                ),
                bank_tariff: (
                  <Text color="red.600">
                    {formatRealValue(row.bank_tariff_value)}
                  </Text>
                ),
              },
        ),
      );

      formRef.current.setData({
        initialDate: initialData.firstDate,
        finalDate: initialData.lastDate,
      });
    });
  }, []);

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
              onSubmit={handleSearchCashHandling}
              css={{ display: 'flex', marginBottom: 16 }}
            >
              <Tooltip
                label="Inserir arquivos de retorno"
                aria-label="Inserir arquivos de retorno"
              >
                <Button
                  onClick={() => router.replace('insert-return-files')}
                  height="48px"
                  backgroundColor="gray.300"
                  marginRight={4}
                >
                  <FiPlus size={22} color="#C53030" />
                </Button>
              </Tooltip>

              <DatePicker
                initialDate={initialData && new Date(initialData.firstDate)}
                minDate={minAndMaxValue && new Date(minAndMaxValue.minDate)}
                maxDate={minAndMaxValue && new Date(minAndMaxValue.maxDate)}
                containerProps={{ color: '#000', background: '#CBD5E0' }}
                placeholderText="Data Inicial"
                name="initialDate"
                className="initialDate"
              />
              <DatePicker
                initialDate={initialData && new Date(initialData.lastDate)}
                minDate={minAndMaxValue && new Date(minAndMaxValue.minDate)}
                maxDate={minAndMaxValue && new Date(minAndMaxValue.maxDate)}
                containerProps={{
                  color: '#000',
                  background: '#CBD5E0',
                  marginLeft: 6,
                }}
                placeholderText="Data Final"
                name="finalDate"
                className="finalDate"
              />

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
                  onClick={handleCleanFilters}
                  height="48px"
                  backgroundColor="gray.300"
                  marginLeft={4}
                >
                  <FiX />
                </Button>
              </Tooltip>
            </Form>

            <Table
              flex={1}
              data={dataTable}
              width="100%"
              maxHeight={{
                xs: '20vh',
                sm: '40vh',
                md: '50vh',
                lg: '55vh',
                xl: '65vh',
              }}
              columns={CASH_HANDLING_TABLE_COLUMNS}
            ></Table>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default CashHandling;
