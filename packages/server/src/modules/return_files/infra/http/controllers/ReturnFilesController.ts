import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateReturnFile from '@modules/return_files/services/CreateReturnFile';

export default class ReturnFilesControler {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;
    const file = request.file.filename;

    const createReturnFile = container.resolve(CreateReturnFile);

    const createdFile = await createReturnFile.execute({ user_id, file });

    return response.json(createdFile);
  }
}
