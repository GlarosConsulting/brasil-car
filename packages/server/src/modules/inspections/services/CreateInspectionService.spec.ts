import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import FakeInspectionsRepository from '@modules/inspections/repositories/fakes/FakeInspectionsRepository';

import CreateInspectionService from './CreateInspectionService';

let fakeInspectionsRepository: FakeInspectionsRepository;
let fakeStorageProvider: FakeStorageProvider;
let createInspection: CreateInspectionService;

describe('CreateInspection', () => {
  beforeEach(() => {
    fakeInspectionsRepository = new FakeInspectionsRepository();
    fakeStorageProvider = new FakeStorageProvider();

    createInspection = new CreateInspectionService(
      fakeInspectionsRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new inspection', async () => {
    const inspection = await createInspection.execute({
      user_id: '123456',
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

    expect(inspection).toEqual(
      expect.objectContaining({
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
