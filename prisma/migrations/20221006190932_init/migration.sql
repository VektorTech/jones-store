-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MEN', 'WOMEN', 'KIDS', 'BABY', 'UNISEX');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'AWAITING_PAYMENT', 'PAYMENT_RECEIVED', 'COMPLETED', 'SHIPPED', 'CANCELLED', 'DECLINED', 'REFUNDED', 'DISPUTED');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('PAYPAL', 'STRIPE', 'WEPAY', 'SKRILL', 'AMAZON_APS', 'COINBASE');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('HIGH', 'MID', 'LOW');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(40) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "firstName" VARCHAR(50),
    "lastName" VARCHAR(50),
    "phoneNumber" VARCHAR(15),
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "avatar" BYTEA,
    "deactivated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_orders" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "paymentMethod" "PaymentType" NOT NULL,
    "shippingAddressId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DOUBLE PRECISION NOT NULL,
    "additionalInfo" VARCHAR(255),

    CONSTRAINT "user_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishlist" (
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "wishlist_pkey" PRIMARY KEY ("userId","productId")
);

-- CreateTable
CREATE TABLE "users_addresses" (
    "userId" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_addresses_pkey" PRIMARY KEY ("userId","addressId")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "unitNumber" INTEGER,
    "addressLine1" VARCHAR(100) NOT NULL,
    "addressLine2" VARCHAR(100),
    "city" VARCHAR(50) NOT NULL,
    "region" VARCHAR(100) NOT NULL,
    "postalCode" VARCHAR(10) NOT NULL,
    "country" VARCHAR(60) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_cart" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "users_cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_items" (
    "cartId" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "cart_items_pkey" PRIMARY KEY ("cartId","productId")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mediaURLs" TEXT[],
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION,
    "shippingCost" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "details" TEXT NOT NULL,
    "salesCount" INTEGER,
    "ratings" INTEGER,
    "color" VARCHAR(25) NOT NULL DEFAULT '',
    "sizes" DOUBLE PRECISION[],
    "year" INTEGER,
    "sku" VARCHAR(25) NOT NULL,
    "stockQty" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'MEN',
    "type" "Category" NOT NULL
);

-- CreateTable
CREATE TABLE "reviews" (
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "comment" TEXT,
    "rating" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "orderLineId" INTEGER,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("userId","productId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phoneNumber_key" ON "users"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "users_firstName_lastName_key" ON "users"("firstName", "lastName");

-- CreateIndex
CREATE UNIQUE INDEX "user_orders_userId_key" ON "user_orders"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_cart_userId_key" ON "users_cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "products_id_key" ON "products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "products_title_key" ON "products"("title");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_orderLineId_key" ON "reviews"("orderLineId");

-- AddForeignKey
ALTER TABLE "user_orders" ADD CONSTRAINT "user_orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_orders" ADD CONSTRAINT "user_orders_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "user_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_addresses" ADD CONSTRAINT "users_addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_addresses" ADD CONSTRAINT "users_addresses_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_cart" ADD CONSTRAINT "users_cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_orderLineId_fkey" FOREIGN KEY ("orderLineId") REFERENCES "order_item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Keep ratings value between 0 and 5
ALTER TABLE "reviews" ADD CONSTRAINT "ratings_range" CHECK ("rating" BETWEEN 0 AND 5);

CREATE OR REPLACE FUNCTION add_cart_total()
	RETURNS TRIGGER AS
	'
	BEGIN
		UPDATE users_cart
			SET total = users_cart.total + (NEW.quantity * NEW.total)
			WHERE id = NEW.cartId;
		RETURN NEW;
	END;
	'
	LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION subtract_cart_total()
	RETURNS TRIGGER AS
	'
	BEGIN
		UPDATE users_cart
			SET total = users_cart.total - (OLD.quantity * OLD.total)
			WHERE id = OLD.cartId;
		RETURN NEW;
	END;
	'
	LANGUAGE 'plpgsql';

CREATE TRIGGER watch_cart_items_add
	AFTER INSERT ON cart_items
	FOR EACH ROW
	EXECUTE PROCEDURE add_cart_total();

CREATE TRIGGER watch_cart_items_remove
	BEFORE DELETE ON cart_items
	FOR EACH ROW
	EXECUTE PROCEDURE subtract_cart_total();