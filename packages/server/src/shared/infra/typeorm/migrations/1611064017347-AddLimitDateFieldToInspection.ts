import { addDays, endOfDay } from 'date-fns';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

import Inspection from '@modules/inspections/infra/typeorm/entities/Inspection';

export default class AddLimitDateFieldToInspection1611064017347
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'inspections',
      new TableColumn({
        name: 'limit_date',
        type: 'timestamp with time zone',
        isNullable: true,
      }),
    );

    const repository = queryRunner.manager.getRepository(Inspection);

    const inspections = await repository.find();

    for (const inspection of inspections) {
      inspection.limit_date = addDays(endOfDay(inspection.created_at), 3);

      await repository.save(inspection);
    }

    await queryRunner.changeColumn(
      'inspections',
      'limit_date',
      new TableColumn({
        name: 'limit_date',
        type: 'timestamp with time zone',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('inspections', 'limit_date');
  }
}
