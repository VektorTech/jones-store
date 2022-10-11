/*
  Warnings:

  - You are about to alter the column `sku` on the `products` table. The data in that column could be lost. The data in that column will be cast from `VarChar(25)` to `VarChar(10)`.
  - A unique constraint covering the columns `[sku]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "sku" SET DATA TYPE VARCHAR(10);

-- CreateIndex
CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");
