import React, { useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Column } from 'react-table';

import { Box, Flex, Text, Button, Tooltip } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import DatePicker from '@/components/DatePicker';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import Sidebar from '@/components/Sidebar';
import Table from '@/components/Table';
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
              onSubmit={data => {
                console.log(data);
              }}
              css={{ display: 'flex', marginBottom: 16 }}
            >
              <DatePicker
                containerProps={{ color: '#000', background: '#CBD5E0' }}
                placeholderText="Data Inicial"
                name="initial-date"
              />
              <DatePicker
                containerProps={{
                  color: '#000',
                  background: '#CBD5E0',
                  marginLeft: 6,
                }}
                name="final-date"
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
              data={[
                {
                  date: 'SALDO ANTERIOR',
                  bank: formatRealValue(8715.0),
                  return: (
                    <Text color="blue.400">{formatRealValue(500.32)}</Text>
                  ),
                  bank_tariff: (
                    <Text color="red.600">{formatRealValue(-7.55)}</Text>
                  ),
                },
                {
                  date: '02/12/2020',
                  bank: formatRealValue(10704.1),
                  return: (
                    <Text color="blue.400">{formatRealValue(2014.32)}</Text>
                  ),
                  bank_tariff: (
                    <Text color="red.600">{formatRealValue(-7.55)}</Text>
                  ),
                },
                {
                  date: '03/12/2020',
                  bank: formatRealValue(11704.1),
                  return: (
                    <Text color="blue.400">{formatRealValue(1014.32)}</Text>
                  ),
                  bank_tariff: (
                    <Text color="red.600">{formatRealValue(-7.55)}</Text>
                  ),
                },
              ]}
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
