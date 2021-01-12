import React, { useMemo, useRef } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Column } from 'react-table';

import { Box, Flex, Text, Button, Tooltip } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { format, isWithinInterval } from 'date-fns';

import DatePicker from '@/components/DatePicker';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import Sidebar from '@/components/Sidebar';
import Table from '@/components/Table';
import cashHandlingData from '@/mocks/CashHandling';
import formatRealValue from '@/utils/formatRealValue';

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

  const [tableData, setDataTable] = useState(cashHandlingData);

  const formattedTableData = useMemo(
    () =>
      tableData.map(
        row =>
          row !== undefined && {
            date:
              row.date !== 'SALDO ANTERIOR'
                ? format(new Date(row.date), 'dd/MM/yyyy')
                : row.date,
            bank: formatRealValue(row.bank),
            return: <Text color="blue.400">{formatRealValue(row.return)}</Text>,
            bank_tariff: (
              <Text color="red.600">{formatRealValue(row.bank_tariff)}</Text>
            ),
          },
      ),
    [tableData],
  );

  const handleSearchCashHandling = useCallback(({ initialDate, finalDate }) => {
    const filtered = cashHandlingData.filter(row => {
      if (row.date === 'SALDO ANTERIOR') {
        return true;
      }

      if (
        isWithinInterval(new Date(row.date), {
          start: initialDate,
          end: finalDate,
        })
      ) {
        return true;
      }

      return false;
    });

    setDataTable(filtered);
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
              data={formattedTableData}
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
