import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import InspectionsController from '../controllers/InspectionsController';

const inspectionsRouter = Router();
const inspectionsController = new InspectionsController();

const upload = multer(uploadConfig.multer);

inspectionsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      start_date: Joi.date(),
      end_date: Joi.date(),
      status: Joi.string().valid('pending', 'approved', 'refused'),
    },
  }),
  inspectionsController.index,
);

inspectionsRouter.post(
  '/',
  upload.fields([
    { name: 'forward', maxCount: 1 },
    { name: 'croup', maxCount: 1 },
    { name: 'left_side', maxCount: 1 },
    { name: 'right_side', maxCount: 1 },
    { name: 'motor', maxCount: 1 },
    { name: 'chassi', maxCount: 1 },
    { name: 'document', maxCount: 1 },
    { name: 'panel', maxCount: 1 },
  ]),
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
    },
  }),
  inspectionsController.create,
);

export default inspectionsRouter;
