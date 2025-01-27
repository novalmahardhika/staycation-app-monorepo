import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1737936253806 implements MigrationInterface {
    name = 'Init1737936253806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "first_name" character varying(50) NOT NULL, "last_name" character varying(50), "email" character varying NOT NULL, "password" character varying NOT NULL, "image" character varying, "role" character varying DEFAULT 'USER', "phone" character varying, "address" text, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "detail_destinations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "owner" character varying, "images" text NOT NULL, "description" text, "bedroom" integer DEFAULT '0', "living_room" integer DEFAULT '0', "bathroom" integer DEFAULT '0', "kitchen" integer DEFAULT '0', "air_conditioner" integer DEFAULT '0', "refrigerator" integer DEFAULT '0', "television" integer DEFAULT '0', "wifi" integer DEFAULT '0', "swimming_pool" integer DEFAULT '0', CONSTRAINT "PK_f31dbfabc78c0d32292f318f8ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "destination_locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "city" character varying NOT NULL, "country" character varying NOT NULL, "zip_code" character varying NOT NULL, CONSTRAINT "PK_c79a6d02e4ec08eb17a025c46ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "destinations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "image" character varying NOT NULL, "price" integer NOT NULL, "discount" integer DEFAULT '0', "isPopular" boolean DEFAULT false, "addressId" uuid, "detailId" uuid, CONSTRAINT "REL_d4dcd8ffda2151bbfff40a99e3" UNIQUE ("detailId"), CONSTRAINT "PK_69c5e8db964dcb83d3a0640f3c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "destinations" ADD CONSTRAINT "FK_7b058405f66453f1147bd280078" FOREIGN KEY ("addressId") REFERENCES "destination_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "destinations" ADD CONSTRAINT "FK_d4dcd8ffda2151bbfff40a99e3c" FOREIGN KEY ("detailId") REFERENCES "detail_destinations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "destinations" DROP CONSTRAINT "FK_d4dcd8ffda2151bbfff40a99e3c"`);
        await queryRunner.query(`ALTER TABLE "destinations" DROP CONSTRAINT "FK_7b058405f66453f1147bd280078"`);
        await queryRunner.query(`DROP TABLE "destinations"`);
        await queryRunner.query(`DROP TABLE "destination_locations"`);
        await queryRunner.query(`DROP TABLE "detail_destinations"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
