-- CreateTable
CREATE TABLE "currency-rates" (
    "symbol" CHAR(3) NOT NULL DEFAULT 'USD',
    "rate" DOUBLE PRECISION NOT NULL DEFAULT 1,

    CONSTRAINT "currency-rates_pkey" PRIMARY KEY ("symbol")
);
