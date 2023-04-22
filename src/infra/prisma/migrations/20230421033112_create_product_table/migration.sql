-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION,
    "description" VARCHAR(600) NOT NULL,
    "created_at" VARCHAR(25) NOT NULL,
    "updated_at" VARCHAR(25) NOT NULL,
    "images" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
