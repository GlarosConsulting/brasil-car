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

  @Expose({ name: 'forward_img_url' })
  getForwardImageUrl(): string | null {
    return formatFileToUrl(this.forward_img);
  }

  @Expose({ name: 'croup_img_url' })
  getCroupImageUrl(): string | null {
    return formatFileToUrl(this.croup_img);
  }

  @Expose({ name: 'left_side_img_url' })
  getLeftSideImageUrl(): string | null {
    return formatFileToUrl(this.left_side_img);
  }

  @Expose({ name: 'right_side_img_url' })
  getRightSideImageUrl(): string | null {
    return formatFileToUrl(this.right_side_img);
  }

  @Expose({ name: 'motor_img_url' })
  getMotorImageUrl(): string | null {
    return formatFileToUrl(this.motor_img);
  }

  @Expose({ name: 'chassi_img_url' })
  getChassiImageUrl(): string | null {
    return formatFileToUrl(this.chassi_img);
  }

  @Expose({ name: 'document_img_url' })
  getDocumentImageUrl(): string | null {
    return formatFileToUrl(this.document_img);
  }

  @Expose({ name: 'panel_img_url' })
  getPanelImageUrl(): string | null {
    return formatFileToUrl(this.panel_img);
  }
}
