/*
  Warnings:

  - You are about to drop the column `ratings` on the `products` table. All the data in the column will be lost.
  - Made the column `discount` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `salesCount` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "ratings",
ALTER COLUMN "discount" SET NOT NULL,
ALTER COLUMN "discount" SET DEFAULT 0.0,
ALTER COLUMN "salesCount" SET NOT NULL,
ALTER COLUMN "salesCount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "rating" SET DEFAULT 5;
