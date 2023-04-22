-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(15) NOT NULL,
    "address" VARCHAR(50) NOT NULL,
    "address2" VARCHAR(45),
    "district" VARCHAR(50),
    "state" VARCHAR(2),
    "created_at" VARCHAR(25) NOT NULL,
    "updated_at" VARCHAR(25) NOT NULL,
    "city" VARCHAR(35) NOT NULL,
    "postalCode" VARCHAR(15) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
