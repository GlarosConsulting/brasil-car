import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import InspectionsController from '../controllers/InspectionsController';
import InspectionsStatusController from '../controllers/InspectionsStatusController';

const inspectionsRouter = Router();
const inspectionsController = new InspectionsController();
const inspectionsStatusController = new InspectionsStatusController();

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
    { name: 'forward_left', maxCount: 1 },
    { name: 'forward_right', maxCount: 1 },
    { name: 'rear_left', maxCount: 1 },
    { name: 'rear_right', maxCount: 1 },
    { name: 'forward_right_with_opened_hood', maxCount: 1 },
    { name: 'forward_left_with_opened_hood', maxCount: 1 },
    { name: 'forward_with_opened_hood', maxCount: 1 },
    { name: 'rear_plate', maxCount: 1 },
    { name: 'opened_trunk', maxCount: 1 },
    { name: 'seal_plate', maxCount: 1 },
    { name: 'spare_tire', maxCount: 1 },
    { name: 'key', maxCount: 1 },
    { name: 'forward_right_wheel', maxCount: 1 },
    { name: 'forward_left_wheel', maxCount: 1 },
    { name: 'rear_left_wheel', maxCount: 1 },
    { name: 'rear_right_wheel', maxCount: 1 },
    { name: 'left_column', maxCount: 1 },
    { name: 'right_column', maxCount: 1 },
    { name: 'pedometer', maxCount: 1 },
    { name: 'forward_right_tire', maxCount: 1 },
    { name: 'forward_left_tire', maxCount: 1 },
    { name: 'rear_right_tire', maxCount: 1 },
    { name: 'rear_left_tire', maxCount: 1 },
    { name: 'console', maxCount: 1 },
    { name: 'engine_number', maxCount: 1 },
    { name: 'forward_right_buffer', maxCount: 1 },
    { name: 'forward_left_buffer', maxCount: 1 },
    { name: 'rear_right_buffer', maxCount: 1 },
    { name: 'rear_left_buffer', maxCount: 1 },
  ]),
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
    },
  }),
  inspectionsController.create,
);

inspectionsRouter.patch(
  '/status/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      status: Joi.string().required().valid('pending', 'approved', 'refused'),
    },
  }),
  inspectionsStatusController.update,
);

export default inspectionsRouter;
