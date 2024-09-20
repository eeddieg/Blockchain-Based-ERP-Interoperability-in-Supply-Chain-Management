-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: l1_erp1_backend
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AssignedBlockchainAddress`
--

DROP TABLE IF EXISTS `AssignedBlockchainAddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AssignedBlockchainAddress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AssignedBlockchainAddress_address_key` (`address`),
  UNIQUE KEY `AssignedBlockchainAddress_email_key` (`email`),
  CONSTRAINT `AssignedBlockchainAddress_address_fkey` FOREIGN KEY (`address`) REFERENCES `AvailableBlockchainAddress` (`address`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AssignedBlockchainAddress`
--

LOCK TABLES `AssignedBlockchainAddress` WRITE;
/*!40000 ALTER TABLE `AssignedBlockchainAddress` DISABLE KEYS */;
INSERT INTO `AssignedBlockchainAddress` VALUES (1,'0x1Fd644b3b7f98be0D608525AA08e58020AD84DfE','qwe1@qwe.qwe'),(2,'0x427e73BB23d854d0c72BE7d15C88672F01a2AFC5','asd1@asd.asd'),(3,'0x40Eea89B7BF223e209Ac3bf2a88912572bF05628','zxc1@zxc.zxc'),(4,'0x729E74af70a66FE03e29E5b53E934A3f9C2C7C55','ca_cust1@test.com'),(5,'0xD8510A526aD43d88AB880E820b0E1cB217F69AdD','ca_cust2@test.com'),(6,'0x48e2f1cCB8A38F3c127047635b8917e2cC44aeA0','ca_cust3@test.com'),(7,'0xBBBa8aC633290460D7a46091b77e911492D4111B','ca_cust4@test.com'),(8,'0x11A631A19c878dA1aD969E64af48A68caDa46BAC','ca_cust5@test.com');
/*!40000 ALTER TABLE `AssignedBlockchainAddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AvailableBlockchainAddress`
--

DROP TABLE IF EXISTS `AvailableBlockchainAddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AvailableBlockchainAddress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AvailableBlockchainAddress_address_key` (`address`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AvailableBlockchainAddress`
--

LOCK TABLES `AvailableBlockchainAddress` WRITE;
/*!40000 ALTER TABLE `AvailableBlockchainAddress` DISABLE KEYS */;
INSERT INTO `AvailableBlockchainAddress` VALUES (8,'0x11A631A19c878dA1aD969E64af48A68caDa46BAC'),(1,'0x1Fd644b3b7f98be0D608525AA08e58020AD84DfE'),(3,'0x40Eea89B7BF223e209Ac3bf2a88912572bF05628'),(2,'0x427e73BB23d854d0c72BE7d15C88672F01a2AFC5'),(6,'0x48e2f1cCB8A38F3c127047635b8917e2cC44aeA0'),(4,'0x729E74af70a66FE03e29E5b53E934A3f9C2C7C55'),(7,'0xBBBa8aC633290460D7a46091b77e911492D4111B'),(10,'0xC2B4e8957688Dd7010ea3831a34C6cC1D299f811'),(5,'0xD8510A526aD43d88AB880E820b0E1cB217F69AdD'),(9,'0xeDcBf69f2c3b4ddaF0Fb4788DCD65ee309cc1b23');
/*!40000 ALTER TABLE `AvailableBlockchainAddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Customer`
--

DROP TABLE IF EXISTS `Customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Customer_email_key` (`email`),
  UNIQUE KEY `Customer_address_key` (`address`)
) ENGINE=InnoDB AUTO_INCREMENT=1006 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer`
--

LOCK TABLES `Customer` WRITE;
/*!40000 ALTER TABLE `Customer` DISABLE KEYS */;
INSERT INTO `Customer` VALUES (1001,'CA_Customer 1','ca_cust1@test.com','0x729E74af70a66FE03e29E5b53E934A3f9C2C7C55'),(1002,'CA_Customer 2','ca_cust2@test.com','0xD8510A526aD43d88AB880E820b0E1cB217F69AdD'),(1003,'CA_Customer 3','ca_cust3@test.com','0x48e2f1cCB8A38F3c127047635b8917e2cC44aeA0'),(1004,'CA_Customer 4','ca_cust4@test.com','0xBBBa8aC633290460D7a46091b77e911492D4111B'),(1005,'CA_Customer 5','ca_cust5@test.com','0x11A631A19c878dA1aD969E64af48A68caDa46BAC');
/*!40000 ALTER TABLE `Customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Inventory`
--

DROP TABLE IF EXISTS `Inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Inventory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customerId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Inventory_customerId_key` (`customerId`),
  CONSTRAINT `Inventory_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Inventory`
--

LOCK TABLES `Inventory` WRITE;
/*!40000 ALTER TABLE `Inventory` DISABLE KEYS */;
INSERT INTO `Inventory` VALUES (1,1001),(2,1002),(3,1003),(4,1004),(5,1005);
/*!40000 ALTER TABLE `Inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MFA`
--

DROP TABLE IF EXISTS `MFA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MFA` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `status` tinyint(1) NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `ascii` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hex` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `base32` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `otpAuthUrl` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qr` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `MFA_userId_key` (`userId`),
  CONSTRAINT `MFA_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MFA`
--

LOCK TABLES `MFA` WRITE;
/*!40000 ALTER TABLE `MFA` DISABLE KEYS */;
/*!40000 ALTER TABLE `MFA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Order`
--

DROP TABLE IF EXISTS `Order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customerId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `deliveredAt` datetime(3) DEFAULT NULL,
  `type` enum('INCOMING','OUTCOMING') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('PLACED','PROCESS','COMPLETED','CANCELED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PLACED',
  PRIMARY KEY (`id`),
  KEY `Order_customerId_fkey` (`customerId`),
  CONSTRAINT `Order_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Order`
--

LOCK TABLES `Order` WRITE;
/*!40000 ALTER TABLE `Order` DISABLE KEYS */;
INSERT INTO `Order` VALUES (1,1001,'2024-09-18 12:00:13.519','2024-09-18 12:00:13.547','INCOMING','COMPLETED'),(2,1002,'2024-09-18 12:00:13.607','2024-09-18 12:00:13.620','INCOMING','COMPLETED'),(3,1003,'2024-09-18 12:00:13.677','2024-09-18 12:00:13.695','INCOMING','COMPLETED'),(4,1004,'2024-09-18 12:00:13.750','2024-09-18 12:00:13.765','INCOMING','COMPLETED'),(5,1005,'2024-09-18 12:00:13.815','2024-09-18 12:00:13.830','INCOMING','COMPLETED'),(6,1001,'2024-09-18 12:00:13.860','2024-09-18 12:00:13.876','INCOMING','COMPLETED'),(7,1001,'2024-09-18 12:00:13.887','2024-09-18 12:00:13.900','OUTCOMING','COMPLETED');
/*!40000 ALTER TABLE `Order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Receipt`
--

DROP TABLE IF EXISTS `Receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Receipt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `to` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `from` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `blockHash` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `blockNumber` int NOT NULL,
  `status` int NOT NULL,
  `hash` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Receipt_orderId_key` (`orderId`),
  UNIQUE KEY `Receipt_hash_key` (`hash`),
  CONSTRAINT `Receipt_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Receipt`
--

LOCK TABLES `Receipt` WRITE;
/*!40000 ALTER TABLE `Receipt` DISABLE KEYS */;
/*!40000 ALTER TABLE `Receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Resource`
--

DROP TABLE IF EXISTS `Resource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Resource` (
  `id` int NOT NULL AUTO_INCREMENT,
  `inventoryId` int NOT NULL,
  `orderId` int NOT NULL,
  `title` enum('WHEAT_SEED','WHEAT','WHEAT_SACK','WHEAT_SACK_PALLETE_PRE','WHEAT_SACK_PALLETE_POST','FLOUR','BREAD_PRODUCT','DISTRIBUTED_BREAD_PRODUCT','BREAD_PRODUCT_CONSUMER') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'WHEAT',
  `amount` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Resource_inventoryId_fkey` (`inventoryId`),
  KEY `Resource_orderId_fkey` (`orderId`),
  CONSTRAINT `Resource_inventoryId_fkey` FOREIGN KEY (`inventoryId`) REFERENCES `Inventory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Resource_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Resource`
--

LOCK TABLES `Resource` WRITE;
/*!40000 ALTER TABLE `Resource` DISABLE KEYS */;
INSERT INTO `Resource` VALUES (1,1,1,'WHEAT_SEED',1000),(2,2,2,'WHEAT_SEED',1000),(3,3,3,'WHEAT_SEED',1000),(4,4,4,'WHEAT_SEED',1000),(5,5,5,'WHEAT_SEED',1000),(6,1,6,'WHEAT_SEED',500),(7,1,7,'WHEAT_SEED',250);
/*!40000 ALTER TABLE `Resource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TraceabilityToken`
--

DROP TABLE IF EXISTS `TraceabilityToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TraceabilityToken` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `bcTokenId` int NOT NULL,
  `token` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `TraceabilityToken_orderId_key` (`orderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TraceabilityToken`
--

LOCK TABLES `TraceabilityToken` WRITE;
/*!40000 ALTER TABLE `TraceabilityToken` DISABLE KEYS */;
/*!40000 ALTER TABLE `TraceabilityToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('ADMIN','MODERATOR','USER') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  `refreshToken` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mfaId` int DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'qwe1','qwe1','qwe1@qwe.qwe','$2b$10$/96oW.p8/5EvgbheyyAdI.77ZpTR3vsVxblyD7MSojWAessrcQIWC','ADMIN','',NULL,'0x1Fd644b3b7f98be0D608525AA08e58020AD84DfE'),(2,'asd1','asd1','asd1@asd.asd','$2b$10$xeLxrsFHqRPGF7k4Byo2zOLdgQLzLosctJ66X8nTJt5oQ1ZeGn8T.','MODERATOR','',NULL,'0x427e73BB23d854d0c72BE7d15C88672F01a2AFC5'),(3,'zxc1','zxc1','zxc1@zxc.zxc','$2b$10$NhXBNsFrNcQfJQAuidRi1eoSqDpqqxP8RKB8XzUqWL/d9zYQNgC0m','USER','',NULL,'0x40Eea89B7BF223e209Ac3bf2a88912572bF05628');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('1049f0f0-7e87-4764-9af5-a16eac3bf668','ee816c6c4d1bd39161fe8c7426c555d74a4b75b65f0d8ef46df68383b48e0c33','2024-09-18 12:00:10.235','20240827094553_init',NULL,NULL,'2024-09-18 12:00:09.316',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-18 15:32:54
