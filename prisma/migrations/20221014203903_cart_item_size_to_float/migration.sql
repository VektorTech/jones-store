/*
  Warnings:

  - Changed the type of `size` on the `cart_items` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "cart_items" DROP COLUMN "size",
ADD COLUMN     "size" DOUBLE PRECISION NOT NULL;
