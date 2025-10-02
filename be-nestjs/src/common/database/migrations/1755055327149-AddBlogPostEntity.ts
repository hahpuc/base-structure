import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBlogPostEntity1755055327149 implements MigrationInterface {
  name = 'AddBlogPostEntity1755055327149';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`blog_post\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`order_index\` int NULL, \`description\` text NOT NULL, \`content\` mediumtext NOT NULL, \`thumbnail\` varchar(255) NOT NULL, \`published_at\` datetime NULL, \`status\` tinyint NOT NULL DEFAULT '1', \`category_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`blog_post\` ADD CONSTRAINT \`FK_543439d139e604f9553a07dfa3f\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`blog_post\` DROP FOREIGN KEY \`FK_543439d139e604f9553a07dfa3f\``,
    );
    await queryRunner.query(`DROP TABLE \`blog_post\``);
  }
}
