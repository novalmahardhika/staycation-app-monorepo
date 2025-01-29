import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1738152814152 implements MigrationInterface {
    name = 'Init1738152814152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "homestay_locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "city" character varying NOT NULL, "country" character varying NOT NULL, "zip_code" character varying NOT NULL, CONSTRAINT "PK_077f4469dbbcce1da20eff7de18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "homestay_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "owner" character varying, "images" text NOT NULL, "description" text, "bedroom" integer DEFAULT '0', "living_room" integer DEFAULT '0', "bathroom" integer DEFAULT '0', "kitchen" integer DEFAULT '0', "air_conditioner" integer DEFAULT '0', "refrigerator" integer DEFAULT '0', "television" integer DEFAULT '0', "wifi" integer DEFAULT '0', "swimming_pool" integer DEFAULT '0', CONSTRAINT "PK_8d76efd1dbd4f1dd524c14cbdc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "homestays" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "image" character varying NOT NULL, "price" integer NOT NULL, "discount" integer DEFAULT '0', "isPopular" boolean DEFAULT false, "addressId" uuid, "detailId" uuid, CONSTRAINT "REL_b375876a46838785f0b7ee226d" UNIQUE ("detailId"), CONSTRAINT "PK_45f294901ecbc4f0664e75d2eb4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_name" character varying`);
        await queryRunner.query(`ALTER TABLE "homestays" ADD CONSTRAINT "FK_a8e6aeb76a991968a03fcef65c3" FOREIGN KEY ("addressId") REFERENCES "homestay_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "homestays" ADD CONSTRAINT "FK_b375876a46838785f0b7ee226dd" FOREIGN KEY ("detailId") REFERENCES "homestay_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "homestays" DROP CONSTRAINT "FK_b375876a46838785f0b7ee226dd"`);
        await queryRunner.query(`ALTER TABLE "homestays" DROP CONSTRAINT "FK_a8e6aeb76a991968a03fcef65c3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_name" character varying(50)`);
        await queryRunner.query(`DROP TABLE "homestays"`);
        await queryRunner.query(`DROP TABLE "homestay_details"`);
        await queryRunner.query(`DROP TABLE "homestay_locations"`);
    }

}
