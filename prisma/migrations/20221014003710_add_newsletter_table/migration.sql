-- CreateTable
CREATE TABLE "newsletter_recipient" (
    "email" TEXT NOT NULL,
    "subscribed" BOOLEAN NOT NULL DEFAULT true,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newsletter_recipient_pkey" PRIMARY KEY ("email")
);
