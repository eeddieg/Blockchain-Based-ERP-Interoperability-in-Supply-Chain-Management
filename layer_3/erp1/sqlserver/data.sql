-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: l3_erp1_backend
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AssignedBlockchainAddress`
--

LOCK TABLES `AssignedBlockchainAddress` WRITE;
/*!40000 ALTER TABLE `AssignedBlockchainAddress` DISABLE KEYS */;
INSERT INTO `AssignedBlockchainAddress` VALUES (1,'0x85f510A358795EEBc96443d062Edf903E466E51E','qwe1@qwe.qwe'),(2,'0x1E65CfF21E0eBeCF2BfEb52EFd7db37bC95fC131','asd1@asd.asd'),(3,'0xD237D435C040A15034c18b686cb3Ce1D6d6290C1','zxc1@zxc.zxc'),(4,'0xC98B18D1d37Afeb330e8f23D6467343A0FB6E4f0','l3ca_cust1@test.com'),(5,'0x174809b76D088fA147Eac72F9A602862884188bb','l3ca_cust2@test.com'),(6,'0xfC983A147eAA3986054DE6f70D497E93C5fEa6aE','l3ca_cust3@test.com');
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
INSERT INTO `AvailableBlockchainAddress` VALUES (5,'0x174809b76D088fA147Eac72F9A602862884188bb'),(2,'0x1E65CfF21E0eBeCF2BfEb52EFd7db37bC95fC131'),(1,'0x85f510A358795EEBc96443d062Edf903E466E51E'),(9,'0x879860E996E0Ad052E75446a8aa5c8D5E465ec36'),(7,'0xa16f7A8b44b3f4a2C316fE79bC0bd3cB206F932D'),(8,'0xb30FA4c2976327Eae2740A8A7041761EC1bdC079'),(10,'0xbA1e1136dC3e693688CA7f24f4000B79682965aF'),(4,'0xC98B18D1d37Afeb330e8f23D6467343A0FB6E4f0'),(3,'0xD237D435C040A15034c18b686cb3Ce1D6d6290C1'),(6,'0xfC983A147eAA3986054DE6f70D497E93C5fEa6aE');
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
) ENGINE=InnoDB AUTO_INCREMENT=3005 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer`
--

LOCK TABLES `Customer` WRITE;
/*!40000 ALTER TABLE `Customer` DISABLE KEYS */;
INSERT INTO `Customer` VALUES (3001,'L3CA_Customer 1','l3ca_cust1@test.com','0xC98B18D1d37Afeb330e8f23D6467343A0FB6E4f0'),(3002,'L3CA_Customer 2','l3ca_cust2@test.com','0x174809b76D088fA147Eac72F9A602862884188bb'),(3003,'L3CA_Customer 3','l3ca_cust3@test.com','0xfC983A147eAA3986054DE6f70D497E93C5fEa6aE'),(3004,'L2-Company_A','l2.compA@test.com','0x54978323C2595b0f9e1f7CAF565D5F768B84cB64');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Inventory`
--

LOCK TABLES `Inventory` WRITE;
/*!40000 ALTER TABLE `Inventory` DISABLE KEYS */;
INSERT INTO `Inventory` VALUES (1,3001),(2,3002),(3,3003),(4,3004);
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
  `traceToken` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Order_customerId_fkey` (`customerId`),
  CONSTRAINT `Order_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Order`
--

LOCK TABLES `Order` WRITE;
/*!40000 ALTER TABLE `Order` DISABLE KEYS */;
INSERT INTO `Order` VALUES (1,3001,'2024-09-18 13:17:56.242','2024-09-18 13:17:56.264','INCOMING','COMPLETED',NULL),(2,3002,'2024-09-18 13:17:56.327','2024-09-18 13:17:56.340','INCOMING','COMPLETED',NULL),(3,3003,'2024-09-18 13:17:56.381','2024-09-18 13:17:56.397','INCOMING','COMPLETED',NULL),(4,3004,'2024-09-18 13:18:47.400','2024-09-18 13:18:47.417','INCOMING','COMPLETED',NULL),(5,3004,'2024-09-18 13:19:22.804',NULL,'INCOMING','PLACED',NULL),(6,3004,'2024-09-18 13:19:22.804',NULL,'INCOMING','PLACED',NULL),(7,3004,'2024-09-18 13:20:00.689',NULL,'INCOMING','PLACED',NULL),(8,3004,'2024-09-18 13:20:00.689',NULL,'INCOMING','PLACED',NULL),(9,3004,'2024-09-18 13:25:31.266',NULL,'INCOMING','PLACED',NULL),(10,3004,'2024-09-18 13:25:31.266',NULL,'INCOMING','PLACED',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Receipt`
--

LOCK TABLES `Receipt` WRITE;
/*!40000 ALTER TABLE `Receipt` DISABLE KEYS */;
INSERT INTO `Receipt` VALUES (1,5,'0xa65685a06fa6774637a222BB86639042618cC4Ff','0x54978323C2595b0f9e1f7CAF565D5F768B84cB64','0xdc9eafa3aed721a775166f5762ce02a612dfbaa6a26594bf2421d1d732459c87',186,1,'0x5963888f083b28374e9377b71e4cb00d78e35cbead366c81b1cd743c6e172c26'),(2,7,'0xa65685a06fa6774637a222BB86639042618cC4Ff','0x54978323C2595b0f9e1f7CAF565D5F768B84cB64','0xc4278b0d46fbf31ec522ba2190662b101555c22da895bd246c64e347bd7d3972',196,1,'0xc98c160974b09132765ae8589a03cc8b77eed8471c780084e000695081f7f628'),(3,9,'0xa65685a06fa6774637a222BB86639042618cC4Ff','0x54978323C2595b0f9e1f7CAF565D5F768B84cB64','0xc277d098822defb4813509bd083fd2746960ab07595892ba7aba2c17c7bd59bd',277,1,'0x1841a59a719bfd0e6beb2b76fe0110a628c72167e2489fb28249473736b6f6df');
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
INSERT INTO `Resource` VALUES (1,1,1,'WHEAT_SACK',1000),(2,2,2,'WHEAT_SACK',1000),(3,3,3,'WHEAT_SACK',1000),(4,4,4,'WHEAT_SACK',0),(5,4,5,'WHEAT_SACK',823),(6,4,7,'WHEAT_SACK',642),(7,4,9,'WHEAT_SACK',783);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TraceabilityToken`
--

LOCK TABLES `TraceabilityToken` WRITE;
/*!40000 ALTER TABLE `TraceabilityToken` DISABLE KEYS */;
INSERT INTO `TraceabilityToken` VALUES (1,5,1,'L1-Company_A__orderId_8+L2-Company_A__orderId_6');
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
INSERT INTO `User` VALUES (1,'qwe1','qwe1','qwe1@qwe.qwe','$2b$10$gfYqphk8KZa8Mnhqzc3r0ubmbroTY3ls6r8B8CAz2spcen7zfQXfG','ADMIN','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoicXdlMUBxd2UucXdlIiwicm9sZSI6IkFETUlOIn0sImlhdCI6MTcyNjY2NTUwMSwiZXhwIjoxNzI2NzUxOTAxfQ.gV8JOA5PqAtdCPqNai-kyteNdEb612G8PUYjZRqsKBI',NULL,'0x85f510A358795EEBc96443d062Edf903E466E51E'),(2,'asd1','asd1','asd1@asd.asd','$2b$10$aypXCVGKou9N90vkQno.E.sUUZ2fdoGRwPfn/HhRix4GZTOWeUC7C','MODERATOR','',NULL,'0x1E65CfF21E0eBeCF2BfEb52EFd7db37bC95fC131'),(3,'zxc1','zxc1','zxc1@zxc.zxc','$2b$10$sT7VkvSi1s46jsHinLwk.uS3OgDPWA99gzdfFHFfeucpTavY3DsQm','USER','',NULL,'0xD237D435C040A15034c18b686cb3Ce1D6d6290C1');
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
INSERT INTO `_prisma_migrations` VALUES ('0043fe94-4af5-4245-a099-cb2d23534ca1','9aeff030e8c02fd00e1a6591bd0d065c3900bb1d6f9a2d526a8f73c9455d26b5','2024-09-18 13:17:52.545','20231006220439_init',NULL,NULL,'2024-09-18 13:17:52.176',1);
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

-- Dump completed on 2024-09-18 16:26:03
