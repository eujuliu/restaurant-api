-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "emailIsVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
