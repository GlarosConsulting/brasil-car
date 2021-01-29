interface IReturn {
  label: 'Pendente' | 'Pago' | 'Em aberto' | 'Não informado';
  color: string;
}

export default function getStatusFromInspections(
  status: 'pending' | 'paid' | 'opened',
): IReturn | null {
  switch (status) {
    case 'pending':
      return {
        label: 'Pendente',
        color: '#F6E05E',
      };

    case 'paid':
      return {
        label: 'Pago',
        color: '#000',
      };

    case 'opened':
      return {
        label: 'Em aberto',
        color: '#E53E3E',
      };

    default:
      return {
        label: 'Não informado',
        color: '#888',
      };
  }
}
