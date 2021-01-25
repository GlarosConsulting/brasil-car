import { addDays, endOfDay } from 'date-fns';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import FakeBreakdownsRepository from '@modules/inspections/repositories/fakes/FakeBreakdownsRepository';
import FakeInspectionGlassRepository from '@modules/inspections/repositories/fakes/FakeInspectionGlassRepository';
import FakeInspectionsRepository from '@modules/inspections/repositories/fakes/FakeInspectionsRepository';

import CreateInspectionService from './CreateInspectionService';

let fakeInspectionsRepository: FakeInspectionsRepository;
let fakeInspectionGlassRepository: FakeInspectionGlassRepository;
let fakeBreakdownsRepository: FakeBreakdownsRepository;
let fakeStorageProvider: FakeStorageProvider;
let createInspection: CreateInspectionService;

describe('CreateInspection', () => {
  beforeEach(() => {
    fakeInspectionsRepository = new FakeInspectionsRepository();
    fakeStorageProvider = new FakeStorageProvider();
    fakeBreakdownsRepository = new FakeBreakdownsRepository();

    createInspection = new CreateInspectionService(
      fakeInspectionsRepository,
      fakeBreakdownsRepository,
      fakeInspectionGlassRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new inspection', async () => {
    const inspection = await createInspection.execute({
      user_id: '123456',
      isDetailed: false,
      filenames: {
        forward: '',
        croup: '',
        left_side: '',
        right_side: '',
        motor: '',
        chassi: '',
        document: '',
        panel: '',
      },
    });

    const limitDate = addDays(endOfDay(Date.now()), 3);

    expect(inspection).toEqual(
      expect.objectContaining({
        limit_date: limitDate,
        forward_img: '',
        croup_img: '',
        left_side_img: '',
        right_side_img: '',
        motor_img: '',
        chassi_img: '',
        document_img: '',
        panel_img: '',
      }),
    );
  });
});
