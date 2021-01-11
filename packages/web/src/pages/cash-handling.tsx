import React from 'react';
import { Column } from 'react-table';

import { Box, Flex, DrawerHeader } from '@chakra-ui/core';

import Header from '@/components/Header';
import SEO from '@/components/SEO';
import Sidebar from '@/components/Sidebar';
import Table from '@/components/Table';

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

const CashHandling: React.FC = () => (
  <>
    <SEO title="Brasil Car" image="boost.png" shouldExcludeTitleSuffix />

    <Box as="main" height="100vh" position="relative" width="100vw">
      <Header />
      <Flex height="calc(100vh - 130px)">
        <Sidebar />
        <Flex direction="column" width="100%" height="100%">
          <DrawerHeader>Oi</DrawerHeader>
          <Table
            data={[]}
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

export default CashHandling;
