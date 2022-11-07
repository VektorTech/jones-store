/*
  Warnings:

  - You are about to drop the `Announcement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `newsletter_recipient` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;

-- DropTable
DROP TABLE "Announcement";

-- DropTable
DROP TABLE "newsletter_recipient";

-- CreateTable
CREATE TABLE "announcements" (
    "id" SERIAL NOT NULL,
    "headline" VARCHAR(255) NOT NULL DEFAULT '',
    "details" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "announcements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletter_recipients" (
    "email" TEXT NOT NULL,
    "subscribed" BOOLEAN NOT NULL DEFAULT true,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newsletter_recipients_pkey" PRIMARY KEY ("email")
);
