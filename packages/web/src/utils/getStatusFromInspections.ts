interface IReturn {
  status: 'Pendente' | 'Aprovado' | 'Recusado';
  color: string;
}

export default function getStatusFromInspections(
  status: 'pending' | 'approved' | 'refused',
): IReturn | null {
  if (status === 'pending') {
    return { status: 'Pendente', color: '#F6E05E' };
  }
  if (status === 'approved') {
    return { status: 'Aprovado', color: '#68D391' };
  }
  if (status === 'refused') {
    return { status: 'Recusado', color: '#E53E3E' };
  }

  return null;
}
