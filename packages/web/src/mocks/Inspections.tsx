interface IInspectionsData {
  name: string;
  send_date: Date;
  limit_date: Date;
  status: 'pending' | 'approved' | 'refused';
}

const data: IInspectionsData[] = [
  {
    name: 'Helena Gomes de Carvalho',
    send_date: new Date(2020, 7, 5),
    limit_date: new Date(2020, 8, 12),
    status: 'pending',
  },
  {
    name: 'Helena Gomes de Carvalho',
    send_date: new Date(2020, 7, 10),
    limit_date: new Date(2020, 8, 12),
    status: 'approved',
  },
  {
    name: 'Helena Gomes de Carvalho',
    send_date: new Date(2020, 7, 15),
    limit_date: new Date(2020, 8, 12),
    status: 'refused',
  },
];

export default data;
