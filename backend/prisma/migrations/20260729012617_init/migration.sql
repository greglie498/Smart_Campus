-- CreateTable
CREATE TABLE "Building" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "hours" TEXT NOT NULL,
    "accessibility" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "features" TEXT[],
    "nearby" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" SERIAL NOT NULL,
    "buildingId" INTEGER NOT NULL,
    "deviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Building_slug_key" ON "Building"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_buildingId_deviceId_key" ON "Favorite"("buildingId", "deviceId");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
