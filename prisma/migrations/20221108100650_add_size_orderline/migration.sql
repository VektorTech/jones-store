/*
  Warnings:

  - Added the required column `size` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "size" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "user_payments" ADD COLUMN     "updatedAt" TIMESTAMP(3);
