import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateInspectionService from '@modules/inspections/services/CreateInspectionService';

export default class InspectionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;
    const files = request.files as {
      [fieldName: string]: Express.Multer.File[];
    };

    const createInspection = container.resolve(CreateInspectionService);

    const user = await createInspection.execute({
      user_id,
      filenames: {
        forward: files.forward[0].filename,
        croup: files.croup[0].filename,
        left_side: files.left_side[0].filename,
        right_side: files.right_side[0].filename,
        motor: files.motor[0].filename,
        chassi: files.chassi[0].filename,
        document: files.document[0].filename,
        panel: files.panel[0].filename,
      },
    });

    return response.json(classToClass(user));
  }
}
