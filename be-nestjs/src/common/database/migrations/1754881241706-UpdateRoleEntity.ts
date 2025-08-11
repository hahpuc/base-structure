import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRoleEntity1754881241706 implements MigrationInterface {
  name = 'UpdateRoleEntity1754881241706';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`role\` ADD \`status\` tinyint NOT NULL DEFAULT '1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`status\``);
  }
}
