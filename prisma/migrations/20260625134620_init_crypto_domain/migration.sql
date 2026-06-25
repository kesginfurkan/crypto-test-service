-- CreateEnum
CREATE TYPE "BlockchainNetwork" AS ENUM ('ETHEREUM_SEPOLIA');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('WITHDRAW', 'DEPOSIT');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('CREATED', 'PENDING', 'BROADCASTED', 'CONFIRMED', 'FAILED');

-- CreateTable
CREATE TABLE "wallets" (
    "id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "network" "BlockchainNetwork" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whitelist_addresses" (
    "id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "network" "BlockchainNetwork" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "whitelist_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "status" "TransactionStatus" NOT NULL,
    "from_address" TEXT NOT NULL,
    "to_address" TEXT NOT NULL,
    "amount" DECIMAL(36,18) NOT NULL,
    "network" "BlockchainNetwork" NOT NULL,
    "tx_hash" TEXT,
    "failure_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "wallets_user_id_idx" ON "wallets"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_user_id_network_key" ON "wallets"("user_id", "network");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_address_network_key" ON "wallets"("address", "network");

-- CreateIndex
CREATE INDEX "whitelist_addresses_user_id_idx" ON "whitelist_addresses"("user_id");

-- CreateIndex
CREATE INDEX "whitelist_addresses_address_idx" ON "whitelist_addresses"("address");

-- CreateIndex
CREATE UNIQUE INDEX "whitelist_addresses_user_id_address_network_key" ON "whitelist_addresses"("user_id", "address", "network");

-- CreateIndex
CREATE INDEX "transactions_user_id_idx" ON "transactions"("user_id");

-- CreateIndex
CREATE INDEX "transactions_tx_hash_idx" ON "transactions"("tx_hash");

-- CreateIndex
CREATE INDEX "transactions_type_idx" ON "transactions"("type");

-- CreateIndex
CREATE INDEX "transactions_status_idx" ON "transactions"("status");
