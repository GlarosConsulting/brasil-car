import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import FindUserByIdService from '@modules/firebase_users/services/FindUserByIdService';

export default class ReturnFilesControler {
  public async index(request: Request, response: Response): Promise<Response> {
    const { uid } = request.query;

    if (!uid) {
      throw new AppError('Uid is required.');
    }

    const findUsersById = container.resolve(FindUserByIdService);

    const user = await findUsersById.execute(uid.toString());

    return response.json(user);
  }
}
