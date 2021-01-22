import { addDays, endOfDay } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import Inspection from '@modules/inspections/infra/typeorm/entities/Inspection';
import IInspectionsRepository from '@modules/inspections/repositories/IInspectionsRepository';

interface IRequest {
  user_id: string;
  filenames: {
    forward?: string;
    croup?: string;
    left_side?: string;
    right_side?: string;
    motor?: string;
    chassi?: string;
    document?: string;
    panel?: string;
    forward_left?: string;
    forward_right?: string;
    rear_left?: string;
    rear_right?: string;
    forward_right_with_opened_hood?: string;
    forward_left_with_opened_hood?: string;
    forward_with_opened_hood?: string;
    rear_plate?: string;
    opened_trunk?: string;
    seal_plate?: string;
    spare_tire?: string;
    key?: string;
    forward_right_wheel?: string;
    forward_left_wheel?: string;
    rear_left_wheel?: string;
    rear_right_wheel?: string;
    left_column?: string;
    right_column?: string;
    pedometer?: string;
    forward_right_tire?: string;
    forward_left_tire?: string;
    rear_right_tire?: string;
    rear_left_tire?: string;
    console?: string;
    engine_number?: string;
    forward_right_buffer?: string;
    forward_left_buffer?: string;
    rear_right_buffer?: string;
    rear_left_buffer?: string;
  };
}
@injectable()
class CreateInspectionService {
  constructor(
    @inject('InspectionsRepository')
    private inspectionsRepository: IInspectionsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, filenames }: IRequest): Promise<Inspection> {
    const allFilenames: Array<keyof typeof filenames> = [
      'forward',
      'croup',
      'left_side',
      'right_side',
      'motor',
      'chassi',
      'document',
      'panel',
      'forward_left',
      'forward_right',
      'rear_left',
      'rear_right',
      'forward_right_with_opened_hood',
      'forward_left_with_opened_hood',
      'forward_with_opened_hood',
      'rear_plate',
      'opened_trunk',
      'seal_plate',
      'spare_tire',
      'key',
      'forward_right_wheel',
      'forward_left_wheel',
      'rear_left_wheel',
      'rear_right_wheel',
      'left_column',
      'right_column',
      'pedometer',
      'forward_right_tire',
      'forward_left_tire',
      'rear_right_tire',
      'rear_left_tire',
      'console',
      'engine_number',
      'forward_right_buffer',
      'forward_left_buffer',
      'rear_right_buffer',
      'rear_left_buffer',
    ];

    const filledFiles = allFilenames.filter(
      file => filenames[file] !== undefined,
    );

    const filledFilenames = filledFiles.map(file =>
      this.storageProvider.saveFile(filenames[file] as string),
    );

    const [
      forwardFilename,
      croupFilename,
      leftSideFilename,
      rightSideFilename,
      motorFilename,
      chassiFilename,
      documentFilename,
      panelFilename,
    ] = await Promise.all(filledFilenames);

    const limitDate = addDays(endOfDay(Date.now()), 3);

    const inspection = await this.inspectionsRepository.create({
      user_id,
      limit_date: limitDate,
      forward_img: forwardFilename,
      croup_img: croupFilename,
      left_side_img: leftSideFilename,
      right_side_img: rightSideFilename,
      motor_img: motorFilename,
      chassi_img: chassiFilename,
      document_img: documentFilename,
      panel_img: panelFilename,
    });

    return inspection;
  }
}

export default CreateInspectionService;
