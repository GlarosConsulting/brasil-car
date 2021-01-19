import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import formatFileToUrl from '@shared/utils/formatFileToUrl';

export type Status = 'pending' | 'approved' | 'refused';
@Entity('inspections')
export default class Inspection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column({ type: 'enum' })
  status: Status;

  @Column('timestamp with time zone')
  limit_date: Date;

  @Column()
  @Exclude()
  forward_img: string;

  @Column()
  @Exclude()
  croup_img: string;

  @Column()
  @Exclude()
  left_side_img: string;

  @Column()
  @Exclude()
  right_side_img: string;

  @Column()
  @Exclude()
  motor_img: string;

  @Column()
  @Exclude()
  chassi_img: string;

  @Column()
  @Exclude()
  document_img: string;

  @Column()
  @Exclude()
  panel_img: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  forward_img_url: string | null;

  croup_img_url: string | null;

  left_side_img_url: string | null;

  right_side_img_url: string | null;

  motor_img_url: string | null;

  chassi_img_url: string | null;

  document_img_url: string | null;

  panel_img_url: string | null;

  @Expose({ name: 'images' })
  getImages(): object {
    return {
      forward_img_url: formatFileToUrl(this.forward_img),
      croup_img_url: formatFileToUrl(this.croup_img),
      left_side_img_url: formatFileToUrl(this.left_side_img),
      right_side_img_url: formatFileToUrl(this.right_side_img),
      motor_img_url: formatFileToUrl(this.motor_img),
      chassi_img_url: formatFileToUrl(this.chassi_img),
      document_img_url: formatFileToUrl(this.document_img),
      panel_img_url: formatFileToUrl(this.panel_img),
    };
  }
}
