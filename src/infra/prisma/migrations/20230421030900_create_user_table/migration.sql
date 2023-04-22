-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" VARCHAR(25) NOT NULL,
    "updated_at" VARCHAR(25) NOT NULL,
    "password" TEXT NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "emailIsVerified" BOOLEAN NOT NULL DEFAULT false,
    "permissions" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
