import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';
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

  const [tableData, setDataTable] = useState<IDataTable[]>([] as IDataTable[]);

  useEffect(() => {
    api.get('/cash-handling').then(response => {
      const cashHandling: Array<ICashHandling> = response.data;

      console.log(cashHandling);

      const dataTable = cashHandling.map(
        row =>
          row !== undefined && {
            date: format(new Date(row.date), 'dd/MM/yyyy'),
            bank: formatRealValue(row.bank_value),
            return: (
              <Text color="blue.400">{formatRealValue(row.return_value)}</Text>
            ),
            bank_tariff: (
              <Text color="red.600">
                {formatRealValue(row.bank_tariff_value)}
              </Text>
            ),
          },
      );

      setDataTable(dataTable);
    });
  }, [setDataTable]);

  const handleSearchCashHandling = useCallback(({ initialDate, finalDate }) => {
    api
      .get('cash-handling', { params: { initialDate, finalDate } })
      .then(response => {
        const cashHandling = response.data;

        setDataTable(
          cashHandling.map(
            row =>
              row !== undefined && {
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
              <DatePicker
                containerProps={{ color: '#000', background: '#CBD5E0' }}
                placeholderText="Data Inicial"
                name="initialDate"
              />
              <DatePicker
                containerProps={{
                  color: '#000',
                  background: '#CBD5E0',
                  marginLeft: 6,
                }}
                name="finalDate"
                placeholderText="Data Final"
              />

              <Tooltip
                label="Pesquisar vendas por dia"
                aria-label="Pesquisar vendas por dia"
              >
                <Button
                  height="48px"
                  backgroundColor="gray.300"
                  marginLeft={4}
                  type="submit"
                >
                  <FiSearch />
                </Button>
              </Tooltip>
            </Form>

            <Table
              data={tableData}
              width="100%"
              height="100%"
              maxHeight={800}
              columns={CASH_HANDLING_TABLE_COLUMNS}
            ></Table>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default CashHandling;
