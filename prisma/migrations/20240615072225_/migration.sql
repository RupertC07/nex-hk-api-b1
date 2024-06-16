-- CreateTable
CREATE TABLE "admin" (
    "id" BIGSERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "birthdate" TEXT,
    "email" TEXT NOT NULL,
    "contact_number" TEXT,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" BIGSERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "admin_id" BIGINT,
    "coordinator_id" BIGINT,
    "scholar_id" BIGINT,
    "is_logged_in" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trusted_device" (
    "id" SERIAL NOT NULL,
    "account_id" BIGINT NOT NULL,
    "name" TEXT,
    "code" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "trusted_device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campus" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "code" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "campus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coordinator" (
    "id" BIGSERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "campus_id" BIGINT NOT NULL,
    "role" TEXT DEFAULT 'coordinator',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "coordinator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scholar" (
    "id" BIGSERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT,
    "student_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "role" TEXT DEFAULT 'scholar',

    CONSTRAINT "scholar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hk_info" (
    "id" BIGSERIAL NOT NULL,
    "hk_number" TEXT,
    "hk_type" TEXT NOT NULL,
    "year_starter" INTEGER NOT NULL,
    "scholar_id" BIGINT NOT NULL,
    "campus_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "hk_info_pkey" PRIMARY KEY ("id")
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
