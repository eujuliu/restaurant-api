-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "address" VARCHAR(50) NOT NULL,
    "address2" VARCHAR(40) NOT NULL,
    "city" VARCHAR(35) NOT NULL,
    "country" VARCHAR(50) NOT NULL,
    "postalCode" VARCHAR(10) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
