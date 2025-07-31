import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitBaseEntity1722846225321 implements MigrationInterface {
  name = 'InitBaseEntity1722846225321';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`email_token\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`token\` varchar(255) NOT NULL, \`token_expires_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`verified_at\` datetime NULL, \`status\` tinyint NOT NULL DEFAULT '1', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`profile\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, \`zalo_id\` varchar(255) NULL, \`zalo_follow_oa_id\` varchar(255) NULL, \`zalo_follow_at\` datetime NULL, \`full_name\` varchar(255) NULL, \`avatar\` varchar(255) NULL, \`code\` varchar(255) NULL, PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`permission\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`module\` varchar(255) NOT NULL, \`position\` int NOT NULL, UNIQUE INDEX \`IDX_3379e3b123dac5ec10734b8cc8\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`permission_role\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`role_id\` int NULL, \`permission_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_35c9b140caaf6da09cfabb0d67\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_role\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` varchar(36) NULL, \`role_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`deleted_at\` datetime(6) NULL, \`email\` varchar(255) NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT '1', \`change_password_at\` datetime NULL, \`login_failed\` smallint NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`token\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` varchar(255) NOT NULL, \`scope\` varchar(255) NOT NULL, \`access_token\` varchar(1000) NOT NULL, \`access_token_expires_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`refresh_token\` varchar(1000) NOT NULL, \`refresh_token_expires_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, INDEX \`IDX_e50ca89d635960fda2ffeb1763\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`system\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`key\` varchar(255) NOT NULL, \`value\` text NOT NULL, \`unit\` tinyint NOT NULL DEFAULT '0', \`group\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT '1', \`is_public\` tinyint NOT NULL DEFAULT '1', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`profile\` ADD CONSTRAINT \`FK_d752442f45f258a8bdefeebb2f2\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`permission_role\` ADD CONSTRAINT \`FK_693f65986d1bd7b5bc973e30d76\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`permission_role\` ADD CONSTRAINT \`FK_ea144050277434b1ec4a3070614\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permission\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_role\` ADD CONSTRAINT \`FK_d0e5815877f7395a198a4cb0a46\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_role\` ADD CONSTRAINT \`FK_32a6fc2fcb019d8e3a8ace0f55f\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_32a6fc2fcb019d8e3a8ace0f55f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_d0e5815877f7395a198a4cb0a46\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`permission_role\` DROP FOREIGN KEY \`FK_ea144050277434b1ec4a3070614\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`permission_role\` DROP FOREIGN KEY \`FK_693f65986d1bd7b5bc973e30d76\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_d752442f45f258a8bdefeebb2f2\``,
    );
    await queryRunner.query(`DROP TABLE \`system\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e50ca89d635960fda2ffeb1763\` ON \`token\``,
    );
    await queryRunner.query(`DROP TABLE \`token\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`user_role\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_35c9b140caaf6da09cfabb0d67\` ON \`role\``,
    );
    await queryRunner.query(`DROP TABLE \`role\``);
    await queryRunner.query(`DROP TABLE \`permission_role\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_3379e3b123dac5ec10734b8cc8\` ON \`permission\``,
    );
    await queryRunner.query(`DROP TABLE \`permission\``);
    await queryRunner.query(`DROP TABLE \`profile\``);
    await queryRunner.query(`DROP TABLE \`email_token\``);
  }
}
