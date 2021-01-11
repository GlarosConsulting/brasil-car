import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import Inspection from '@modules/inspections/infra/typeorm/entities/Inspection';
import IInspectionsRepository from '@modules/inspections/repositories/IInspectionsRepository';

interface IRequest {
  user_id: string;
  filenames: {
    forward: string;
    croup: string;
    left_side: string;
    right_side: string;
    motor: string;
    chassi: string;
    document: string;
    panel: string;
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
    const [
      forwardFilename,
      croupFilename,
      leftSideFilename,
      rightSideFilename,
      motorFilename,
      chassiFilename,
      documentFilename,
      panelFilename,
    ] = await Promise.all([
      this.storageProvider.saveFile(filenames.forward),
      this.storageProvider.saveFile(filenames.croup),
      this.storageProvider.saveFile(filenames.left_side),
      this.storageProvider.saveFile(filenames.right_side),
      this.storageProvider.saveFile(filenames.motor),
      this.storageProvider.saveFile(filenames.chassi),
      this.storageProvider.saveFile(filenames.document),
      this.storageProvider.saveFile(filenames.panel),
    ]);

    const inspection = await this.inspectionsRepository.create({
      user_id,
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
