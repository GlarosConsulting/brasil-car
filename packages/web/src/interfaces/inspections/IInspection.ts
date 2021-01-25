export type Status = 'pending' | 'approved' | 'refused';

interface IBreakdown {
  id: string;
  breakdown_url: string;
}

interface IGlass {
  id: string;
  glass_url: string;
  name: string;
}

export default interface IInspection {
  id: string;
  user_id: string;
  status: Status;
  limit_date: string;
  created_at: string;
  updated_at: string;
  images: {
    forward_img_url: string;
    croup_img_url: string;
    left_side_img_url: string;
    right_side_img_url: string;
    motor_img_url: string;
    chassi_img_url: string;
    document_img_url: string;
    panel_img_url: string;
    breakdowns: IBreakdown[];
    glass: IGlass[];
  };
}
