import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1737730879385 implements MigrationInterface {
    name = 'Init1737730879385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "address" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phone" SET NOT NULL`);
    }

}
