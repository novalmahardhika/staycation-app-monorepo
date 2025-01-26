import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1737881803277 implements MigrationInterface {
    name = 'Init1737881803277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "address" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "address" SET NOT NULL`);
    }

}
