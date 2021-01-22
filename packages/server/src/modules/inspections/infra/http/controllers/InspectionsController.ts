import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateInspectionService from '@modules/inspections/services/CreateInspectionService';
import ListInspectionsService from '@modules/inspections/services/ListInspectionsService';

export default class InspectionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { start_date, end_date, status } = request.query;

    const listInspections = container.resolve(ListInspectionsService);

    const inspections = await listInspections.execute({
      start_date,
      end_date,
      status,
    } as any);

    return response.json(classToClass(inspections));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;
    const files = request.files as {
      [fieldName: string]: Express.Multer.File[];
    };

    const createInspection = container.resolve(CreateInspectionService);

    const isFilled = (file: Express.Multer.File[]) =>
      file ? file[0].filename : undefined;

    const inspection = await createInspection.execute({
      user_id,
      filenames: {
        forward: isFilled(files.forward),
        croup: isFilled(files.croup),
        left_side: isFilled(files.left_side),
        right_side: isFilled(files.right_side),
        motor: isFilled(files.motor),
        chassi: isFilled(files.chassi),
        document: isFilled(files.document),
        panel: isFilled(files.panel),
        forward_left: isFilled(files.forward_left),
        forward_right: isFilled(files.forward_right),
        rear_left: isFilled(files.rear_left),
        rear_right: isFilled(files.rear_right),
        forward_right_with_opened_hood: isFilled(
          files.forward_right_with_opened_hood,
        ),
        forward_left_with_opened_hood: isFilled(
          files.forward_left_with_opened_hood,
        ),
        forward_with_opened_hood: isFilled(files.forward_with_opened_hood),
        rear_plate: isFilled(files.rear_plate),
        opened_trunk: isFilled(files.opened_trunk),
        seal_plate: isFilled(files.seal_plate),
        spare_tire: isFilled(files.spare_tire),
        key: isFilled(files.key),
        forward_right_wheel: isFilled(files.forward_right_wheel),
        forward_left_wheel: isFilled(files.forward_left_wheel),
        rear_left_wheel: isFilled(files.rear_left_wheel),
        rear_right_wheel: isFilled(files.rear_right_wheel),
        left_column: isFilled(files.left_column),
        right_column: isFilled(files.right_column),
        pedometer: isFilled(files.pedometer),
        forward_right_tire: isFilled(files.forward_right_tire),
        forward_left_tire: isFilled(files.forward_left_tire),
        rear_right_tire: isFilled(files.rear_right_tire),
        rear_left_tire: isFilled(files.rear_left_tire),
        console: isFilled(files.console),
        engine_number: isFilled(files.engine_number),
        forward_right_buffer: isFilled(files.forward_right_buffer),
        forward_left_buffer: isFilled(files.forward_left_buffer),
        rear_right_buffer: isFilled(files.rear_right_buffer),
        rear_left_buffer: isFilled(files.rear_left_buffer),
      },
    });

    return response.json(classToClass(inspection));
  }
}
