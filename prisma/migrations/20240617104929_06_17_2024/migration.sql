/*
  Warnings:

  - The primary key for the `account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `account` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `admin_id` on the `account` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `coordinator_id` on the `account` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `scholar_id` on the `account` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `campus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `campus` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `coordinator` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `coordinator` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `campus_id` on the `coordinator` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `hk_info` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `hk_info` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `scholar_id` on the `hk_info` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `campus_id` on the `hk_info` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `scholar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `scholar` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `account_id` on the `trusted_device` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_coordinator_id_fkey";

-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_scholar_id_fkey";

-- DropForeignKey
ALTER TABLE "coordinator" DROP CONSTRAINT "coordinator_campus_id_fkey";

-- DropForeignKey
ALTER TABLE "hk_info" DROP CONSTRAINT "hk_info_campus_id_fkey";

-- DropForeignKey
ALTER TABLE "hk_info" DROP CONSTRAINT "hk_info_scholar_id_fkey";

-- DropForeignKey
ALTER TABLE "trusted_device" DROP CONSTRAINT "trusted_device_account_id_fkey";

-- AlterTable
ALTER TABLE "account" DROP CONSTRAINT "account_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "admin_id" SET DATA TYPE INTEGER,
ALTER COLUMN "coordinator_id" SET DATA TYPE INTEGER,
ALTER COLUMN "scholar_id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "account_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "admin" DROP CONSTRAINT "admin_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ADD CONSTRAINT "admin_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "campus" DROP CONSTRAINT "campus_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ADD CONSTRAINT "campus_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "coordinator" DROP CONSTRAINT "coordinator_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "campus_id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "coordinator_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "hk_info" DROP CONSTRAINT "hk_info_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "scholar_id" SET DATA TYPE INTEGER,
ALTER COLUMN "campus_id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "hk_info_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "scholar" DROP CONSTRAINT "scholar_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ADD CONSTRAINT "scholar_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "trusted_device" ALTER COLUMN "account_id" SET DATA TYPE INTEGER;

-- CreateTable
CREATE TABLE "semester" (
    "id" SERIAL NOT NULL,
    "term" TEXT NOT NULL,
    "sy" TEXT NOT NULL,
    "status" TEXT DEFAULT 'active',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "semester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scholar_guardian" (
    "id" SERIAL NOT NULL,
    "guardian_fname" TEXT NOT NULL,
    "guardian_lname" TEXT NOT NULL,
    "contact_num" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "scholar_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "scholar_guardian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_info" (
    "id" SERIAL NOT NULL,
    "scholar_id" INTEGER NOT NULL,
    "course" TEXT NOT NULL,
    "year_level" INTEGER NOT NULL,
    "section" TEXT,
    "is_regular" BOOLEAN NOT NULL,
    "is_enrolled" BOOLEAN NOT NULL,
    "semester_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "academic_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_info_duplicate" (
    "id" SERIAL NOT NULL,
    "course" TEXT NOT NULL,
    "year_level" INTEGER NOT NULL,
    "section" TEXT,
    "is_regular" BOOLEAN NOT NULL,
    "is_enrolled" BOOLEAN NOT NULL,
    "scholar_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "academic_info_duplicate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "duty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "acronym" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "required_hours" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "duty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qr_holder" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "role" TEXT DEFAULT 'qr_holder',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "qr_holder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qr_code" (
    "id" SERIAL NOT NULL,
    "qr_holder_id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "expiration_date" TIMESTAMP(3),
    "type" TEXT DEFAULT 'regular',
    "hours" INTEGER,
    "minutes" INTEGER,
    "purpose" TEXT,
    "location" TEXT,
    "date_time" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "qr_code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "duty_schedule" (
    "id" SERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "time_start" TEXT NOT NULL,
    "time_end" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "class_subject" TEXT,
    "class_type" TEXT,
    "class_level" TEXT,
    "department" TEXT,
    "max_slot" TEXT,
    "duty_id" INTEGER NOT NULL,
    "campus_id" INTEGER NOT NULL,
    "semester_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "is_visible_to_scholar" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "duty_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "duty_assignment" (
    "id" SERIAL NOT NULL,
    "scholar_id" INTEGER NOT NULL,
    "duty_id" INTEGER NOT NULL,
    "semester_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "duty_assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "duty_schedule_assignment" (
    "id" SERIAL NOT NULL,
    "schedule_id" INTEGER NOT NULL,
    "scholar_id" INTEGER NOT NULL,
    "semester_id" INTEGER NOT NULL,
    "assignment_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "duty_schedule_assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "duty_record" (
    "id" SERIAL NOT NULL,
    "scholar_id" INTEGER NOT NULL,
    "schedule_id" INTEGER,
    "semester_id" INTEGER NOT NULL,
    "computed_hours" INTEGER NOT NULL,
    "hours" TEXT NOT NULL,
    "minutes" TEXT NOT NULL,
    "type" TEXT DEFAULT 'regular',
    "qr_code_id" INTEGER NOT NULL,
    "status" TEXT DEFAULT 'pending',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "duty_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_logs" (
    "id" SERIAL NOT NULL,
    "admin_id" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Success',
    "oldData" JSONB,
    "newData" JSONB,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "admin_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coordinator_logs" (
    "id" SERIAL NOT NULL,
    "coordinator_id" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Success',
    "oldData" JSONB,
    "newData" JSONB,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "coordinator_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scholar_logs" (
    "id" SERIAL NOT NULL,
    "scholar_id" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Success',
    "oldData" JSONB,
    "newData" JSONB,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "scholar_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qr_holder_logs" (
    "id" SERIAL NOT NULL,
    "qr_holder_id" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Success',
    "oldData" JSONB,
    "newData" JSONB,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "qr_holder_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_coordinator_id_fkey" FOREIGN KEY ("coordinator_id") REFERENCES "coordinator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_scholar_id_fkey" FOREIGN KEY ("scholar_id") REFERENCES "scholar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trusted_device" ADD CONSTRAINT "trusted_device_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coordinator" ADD CONSTRAINT "coordinator_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "campus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hk_info" ADD CONSTRAINT "hk_info_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "campus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hk_info" ADD CONSTRAINT "hk_info_scholar_id_fkey" FOREIGN KEY ("scholar_id") REFERENCES "scholar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scholar_guardian" ADD CONSTRAINT "scholar_guardian_scholar_id_fkey" FOREIGN KEY ("scholar_id") REFERENCES "scholar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_info" ADD CONSTRAINT "academic_info_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_info" ADD CONSTRAINT "academic_info_scholar_id_fkey" FOREIGN KEY ("scholar_id") REFERENCES "scholar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_info_duplicate" ADD CONSTRAINT "academic_info_duplicate_scholar_id_fkey" FOREIGN KEY ("scholar_id") REFERENCES "scholar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qr_code" ADD CONSTRAINT "qr_code_qr_holder_id_fkey" FOREIGN KEY ("qr_holder_id") REFERENCES "qr_holder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "duty_schedule" ADD CONSTRAINT "duty_schedule_duty_id_fkey" FOREIGN KEY ("duty_id") REFERENCES "duty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "duty_schedule" ADD CONSTRAINT "duty_schedule_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "campus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "duty_schedule" ADD CONSTRAINT "duty_schedule_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "duty_schedule_assignment" ADD CONSTRAINT "duty_schedule_assignment_scholar_id_fkey" FOREIGN KEY ("scholar_id") REFERENCES "scholar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "duty_schedule_assignment" ADD CONSTRAINT "duty_schedule_assignment_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "duty_schedule_assignment" ADD CONSTRAINT "duty_schedule_assignment_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "duty_schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "duty_record" ADD CONSTRAINT "duty_record_scholar_id_fkey" FOREIGN KEY ("scholar_id") REFERENCES "scholar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "duty_record" ADD CONSTRAINT "duty_record_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "duty_schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "duty_record" ADD CONSTRAINT "duty_record_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "duty_record" ADD CONSTRAINT "duty_record_qr_code_id_fkey" FOREIGN KEY ("qr_code_id") REFERENCES "qr_code"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_logs" ADD CONSTRAINT "admin_logs_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coordinator_logs" ADD CONSTRAINT "coordinator_logs_coordinator_id_fkey" FOREIGN KEY ("coordinator_id") REFERENCES "coordinator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scholar_logs" ADD CONSTRAINT "scholar_logs_scholar_id_fkey" FOREIGN KEY ("scholar_id") REFERENCES "scholar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qr_holder_logs" ADD CONSTRAINT "qr_holder_logs_qr_holder_id_fkey" FOREIGN KEY ("qr_holder_id") REFERENCES "qr_holder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
