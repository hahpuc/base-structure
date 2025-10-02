import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSampleCategoryEntity1754984932929
  implements MigrationInterface
{
  name = 'AddSampleCategoryEntity1754984932929';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`category\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`description\` text NULL, \`status\` tinyint NOT NULL DEFAULT '1', UNIQUE INDEX \`IDX_cb73208f151aa71cdd78f662d7\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sample\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`image\` varchar(255) NULL, \`start_time\` datetime NOT NULL, \`end_time\` datetime NOT NULL, \`type\` tinyint NOT NULL, \`color\` varchar(255) NULL, \`tags\` json NULL, \`status\` tinyint NOT NULL DEFAULT '1', \`creator_id\` varchar(255) NULL, \`ward_id\` int NULL, \`category_id\` int NULL, UNIQUE INDEX \`IDX_2d94e2d544b3e9b7c70fe070e8\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sample\` ADD CONSTRAINT \`FK_2a2cfacb2eb931df90d3657bd41\` FOREIGN KEY (\`ward_id\`) REFERENCES \`ward\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sample\` ADD CONSTRAINT \`FK_dc0fc7163114c1b12e3cd38efff\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sample\` ADD CONSTRAINT \`FK_9a2faba8dc734af50bb6e3e9213\` FOREIGN KEY (\`creator_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sample\` DROP FOREIGN KEY \`FK_9a2faba8dc734af50bb6e3e9213\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sample\` DROP FOREIGN KEY \`FK_dc0fc7163114c1b12e3cd38efff\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sample\` DROP FOREIGN KEY \`FK_2a2cfacb2eb931df90d3657bd41\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_2d94e2d544b3e9b7c70fe070e8\` ON \`sample\``,
    );
    await queryRunner.query(`DROP TABLE \`sample\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_cb73208f151aa71cdd78f662d7\` ON \`category\``,
    );
    await queryRunner.query(`DROP TABLE \`category\``);
  }
}
