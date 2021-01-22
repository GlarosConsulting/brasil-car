import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Inspection from '@modules/inspections/infra/typeorm/entities/Inspection';

@Entity('breakdowns')
export default class Breakdown {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  img_filename: string;

  @Column()
  inspection_id: string;

  @ManyToOne(() => Inspection, inspection => inspection.breakdowns)
  @JoinColumn({ name: 'inspection_id' })
  inspection: Inspection;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
