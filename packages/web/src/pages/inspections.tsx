import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { Column } from 'react-table';

import { Box, Button, Flex, Text, Tooltip } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { format, isWithinInterval } from 'date-fns';

import DatePicker from '@/components/DatePicker';
import Header from '@/components/Header';
import Select from '@/components/Select';
import SEO from '@/components/SEO';
import Sidebar from '@/components/Sidebar';
import Table from '@/components/Table';
import inspectionsData from '@/mocks/Inspections';
import api from '@/services/api';
import getStatusFromInspections from '@/utils/getStatusFromInspections';

interface IFormattedInspection {
  name: string;
  send_date: string;
  limit_date: string;
  status: JSX.Element;
}

interface IInspection {
  user_id: string;
  created_at: Date;
  limit_date: Date;
  status: 'pending' | 'approved' | 'refused';
}

interface IFormData {
  initialDate: Date;
  finalDate: Date;
  status: 'pending' | 'approved' | 'refused';
}

interface IFirebaseUser {
  displayName: string;
}

const INSPECTIONS_TABLE_COLUMNS = [
  {
    Header: 'Nome',
    accessor: 'name',
  },
  {
    Header: 'Data envio',
    accessor: 'send_date',
  },
  {
    Header: 'Data limite',
    accessor: 'limit_date',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
] as Column[];

const Inspections: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [tableData, setDataTable] = useState<IInspection[]>([]);

  const formattedTableData: Promise<{
    name: string;
    send_date: string;
    limit_date: string;
    status: JSX.Element;
  }>[] = useMemo(
    () =>
      tableData &&
      tableData.map(async row => {
        const status = getStatusFromInspections(row.status);

        const response = await api.get<IFirebaseUser>('firebase-users', {
          params: { uid: row.user_id },
        });

        return {
          name: response.data.displayName,
          send_date: format(new Date(row.created_at), 'dd/MM/yyyy'),
          limit_date: format(new Date(row.limit_date), 'dd/MM/yyyy'),
          status: status && <Text color={status.color}>{status.status}</Text>,
        };
      }),
    [tableData],
  );

  useEffect(() => {
    api.get<IInspection[]>('inspections').then(response => {
      setDataTable(response.data);
    });
  }, []);

  const handleSearch = useCallback(
    ({ initialDate, finalDate, status }: IFormData) => {
      let filteredData = [];

      if (initialDate && finalDate && status) {
        filteredData = inspectionsData.filter(inspection => {
          if (
            isWithinInterval(inspection.send_date, {
              start: initialDate,
              end: finalDate,
            }) &&
            inspection.status === status
          ) {
            return true;
          }

          return false;
        });
      } else if (!initialDate && !finalDate && status) {
        filteredData = inspectionsData.filter(inspection => {
          if (inspection.status === status) {
            return true;
          }

          return false;
        });
      } else if (initialDate && finalDate && !status) {
        filteredData = inspectionsData.filter(inspection => {
          if (
            isWithinInterval(inspection.send_date, {
              start: initialDate,
              end: finalDate,
            })
          ) {
            return true;
          }

          return false;
        });
      }

      setDataTable(filteredData);
    },
    [],
  );

  const handleCleanFilters = useCallback(() => {
    // setDataTable(inspectionsData);

    formRef.current.reset();
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
              onSubmit={handleSearch}
              ref={formRef}
              css={{ display: 'flex', marginBottom: 16 }}
            >
              <DatePicker
                // initialDate={initialData && new Date(initialData.firstDate)}
                // minDate={minAndMaxValue && new Date(minAndMaxValue.minDate)}
                // maxDate={minAndMaxValue && new Date(minAndMaxValue.maxDate)}
                containerProps={{ color: '#000', background: '#CBD5E0' }}
                placeholderText="Data Inicial"
                name="initialDate"
                className="initialDate"
              />
              <DatePicker
                // initialDate={initialData && new Date(initialData.lastDate)}
                // minDate={minAndMaxValue && new Date(minAndMaxValue.minDate)}
                // maxDate={minAndMaxValue && new Date(minAndMaxValue.maxDate)}
                containerProps={{
                  background: '#CBD5E0',
                  marginLeft: 6,
                }}
                placeholderText="Data Final"
                name="finalDate"
                className="finalDate"
              />

              <Select
                placeholder="Status"
                backgroundColor="#CBD5E0"
                name="status"
                containerProps={{
                  backgroundColor: '#CBD5E0',
                  width: 250,
                  marginLeft: 6,
                  border: '1px solid',
                  borderColor: '#A0AEC0',
                }}
              >
                <option value="pending">Pendente</option>
                <option value="approved">Aprovado</option>
                <option value="refused">Recusado</option>
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
              data={formattedTableData}
              width="100%"
              maxHeight={{
                xs: '20vh',
                sm: '40vh',
                md: '50vh',
                lg: '55vh',
                xl: '65vh',
              }}
              columns={INSPECTIONS_TABLE_COLUMNS}
            ></Table>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Inspections;
