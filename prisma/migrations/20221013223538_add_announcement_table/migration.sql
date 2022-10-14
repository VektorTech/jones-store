-- CreateTable
CREATE TABLE "Announcement" (
    "id" SERIAL NOT NULL,
    "headline" VARCHAR(255) NOT NULL DEFAULT '',
    "details" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);
