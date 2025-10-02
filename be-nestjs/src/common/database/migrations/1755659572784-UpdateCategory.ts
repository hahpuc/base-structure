import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCategory1755659572784 implements MigrationInterface {
  name = 'UpdateCategory1755659572784';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_cb73208f151aa71cdd78f662d7\` ON \`category\``,
    );
    await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`status\``);
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`order_index\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`description\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`category\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`description\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` DROP COLUMN \`order_index\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`status\` tinyint NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_cb73208f151aa71cdd78f662d7\` ON \`category\` (\`slug\`)`,
    );
  }
}
