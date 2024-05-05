-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'FULLFILLED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDING';
