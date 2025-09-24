import { MigrationInterface, QueryRunner } from 'typeorm';

export class Addi18nentities1758710712239 implements MigrationInterface {
  name = 'Addi18nentities1758710712239';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`languages\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(10) NOT NULL, \`name\` varchar(100) NOT NULL, \`native_name\` varchar(100) NOT NULL, \`flag_code\` varchar(10) NULL, \`flag_icon\` varchar(255) NULL, \`is_rtl\` tinyint NOT NULL DEFAULT 0, \`status\` tinyint NOT NULL DEFAULT '1', UNIQUE INDEX \`IDX_7397752718d1c9eb873722ec9b\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`translations\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`key\` varchar(255) NOT NULL, \`value\` text NOT NULL, \`description\` text NULL, \`status\` tinyint NOT NULL DEFAULT '1', \`version\` int NOT NULL DEFAULT '1', \`namespace_id\` int NOT NULL, \`language_id\` int NOT NULL, INDEX \`IDX_53f09a1414bace37a1b821bf1b\` (\`key\`), INDEX \`IDX_9ba0ea2f1ee1fba6f6f67307a5\` (\`language_id\`, \`namespace_id\`), UNIQUE INDEX \`IDX_1f46aa87795d312cff09f5c9a8\` (\`namespace_id\`, \`key\`, \`language_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`translation_namespaces\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`description\` varchar(255) NULL, \`status\` tinyint NOT NULL DEFAULT '1', UNIQUE INDEX \`IDX_69d7521905307a8c68bd465280\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`translations\` ADD CONSTRAINT \`FK_f531ade6f56a5fa6fe4285aba10\` FOREIGN KEY (\`namespace_id\`) REFERENCES \`translation_namespaces\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`translations\` ADD CONSTRAINT \`FK_914fcf1be64606618e76b06e821\` FOREIGN KEY (\`language_id\`) REFERENCES \`languages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`translations\` DROP FOREIGN KEY \`FK_914fcf1be64606618e76b06e821\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`translations\` DROP FOREIGN KEY \`FK_f531ade6f56a5fa6fe4285aba10\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_69d7521905307a8c68bd465280\` ON \`translation_namespaces\``,
    );
    await queryRunner.query(`DROP TABLE \`translation_namespaces\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_1f46aa87795d312cff09f5c9a8\` ON \`translations\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_9ba0ea2f1ee1fba6f6f67307a5\` ON \`translations\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_53f09a1414bace37a1b821bf1b\` ON \`translations\``,
    );
    await queryRunner.query(`DROP TABLE \`translations\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_7397752718d1c9eb873722ec9b\` ON \`languages\``,
    );
    await queryRunner.query(`DROP TABLE \`languages\``);
  }
}
