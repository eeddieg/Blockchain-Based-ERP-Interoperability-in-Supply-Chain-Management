-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: l2_erp1_backend
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
INSERT INTO `AssignedBlockchainAddress` VALUES (1,'0x54978323C2595b0f9e1f7CAF565D5F768B84cB64','qwe1@qwe.qwe'),(2,'0x87E229A2312947E15F03A8D5B40363c77f38531b','asd1@asd.asd'),(3,'0x163B4aF81021D9623426D76bA3089574a8C0d6f9','zxc1@zxc.zxc'),(4,'0x8868FCcA50AA15F9C86ED9A099B9E2936b2cf2aE','l2ca_cust1@test.com'),(5,'0xC3CE00f3B2728fd6736c71aA80a320D798D36078','l2ca_cust2@test.com'),(6,'0xB8EcE305955C4909485E58360e9C5A3749f33A68','l2ca_cust3@test.com');
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
INSERT INTO `AvailableBlockchainAddress` VALUES (3,'0x163B4aF81021D9623426D76bA3089574a8C0d6f9'),(1,'0x54978323C2595b0f9e1f7CAF565D5F768B84cB64'),(7,'0x5FDE800A97F5d620093599292a24b14620BBE2FD'),(8,'0x7C21664e49dC4d7c8Fd5092729b58dd90260527f'),(2,'0x87E229A2312947E15F03A8D5B40363c77f38531b'),(4,'0x8868FCcA50AA15F9C86ED9A099B9E2936b2cf2aE'),(10,'0xA5F23dC315D316807eb4ADAA4DC7Dd5276673CfD'),(6,'0xB8EcE305955C4909485E58360e9C5A3749f33A68'),(5,'0xC3CE00f3B2728fd6736c71aA80a320D798D36078'),(9,'0xE94Ff3fA0b3Bdd3bd524eC143c78C11F37E268Ee');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer`
--

LOCK TABLES `Customer` WRITE;
/*!40000 ALTER TABLE `Customer` DISABLE KEYS */;
INSERT INTO `Customer` VALUES (1,'L2CA_Customer 1','l2ca_cust1@test.com','0x8868FCcA50AA15F9C86ED9A099B9E2936b2cf2aE'),(2,'L2CA_Customer 2','l2ca_cust2@test.com','0xC3CE00f3B2728fd6736c71aA80a320D798D36078'),(3,'L2CA_Customer 3','l2ca_cust3@test.com','0xB8EcE305955C4909485E58360e9C5A3749f33A68'),(4,'L1-Company_A','l1.compA@test.com','0x1Fd644b3b7f98be0D608525AA08e58020AD84DfE'),(5,'L1-Company_B','l1.compB@test.com','0x8fa8392be7651Ac0819865c5cc4d6ea268c85F89');
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
INSERT INTO `Inventory` VALUES (1,1),(2,2),(3,3),(4,4),(5,5);
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
INSERT INTO `Order` VALUES (1,1,'2024-09-18 13:00:42.358','2024-09-18 13:00:42.369','INCOMING','COMPLETED'),(2,2,'2024-09-18 13:00:42.443','2024-09-18 13:00:42.462','INCOMING','COMPLETED'),(3,3,'2024-09-18 13:00:42.527','2024-09-18 13:00:42.553','INCOMING','COMPLETED'),(4,4,'2024-09-18 13:09:48.194','2024-09-18 13:09:48.207','INCOMING','COMPLETED'),(5,5,'2024-09-18 13:09:48.255','2024-09-18 13:09:48.268','INCOMING','COMPLETED'),(6,5,'2024-09-18 13:11:02.611',NULL,'INCOMING','PLACED'),(7,5,'2024-09-18 13:11:02.611',NULL,'INCOMING','PLACED');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Receipt`
--

LOCK TABLES `Receipt` WRITE;
/*!40000 ALTER TABLE `Receipt` DISABLE KEYS */;
INSERT INTO `Receipt` VALUES (1,6,'0xa65685a06fa6774637a222BB86639042618cC4Ff','0x8fa8392be7651Ac0819865c5cc4d6ea268c85F89','0x13ee910fd5b8739bdccafc78193713ad0966331486fa47cc078cf9fb14092071',131,1,'0x57d0bbe4ab957cd0c89bec42dae286bbfe71ab87f7736f7370e5b2d4035efc7c');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Resource`
--

LOCK TABLES `Resource` WRITE;
/*!40000 ALTER TABLE `Resource` DISABLE KEYS */;
INSERT INTO `Resource` VALUES (1,1,1,'WHEAT',1000),(2,2,2,'WHEAT',1000),(3,3,3,'WHEAT',1000),(4,4,4,'WHEAT',250),(5,5,5,'WHEAT',0),(6,5,6,'WHEAT',501);
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
  UNIQUE KEY `TraceabilityToken_orderId_key` (`orderId`),
  UNIQUE KEY `TraceabilityToken_bcTokenId_key` (`bcTokenId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TraceabilityToken`
--

LOCK TABLES `TraceabilityToken` WRITE;
/*!40000 ALTER TABLE `TraceabilityToken` DISABLE KEYS */;
INSERT INTO `TraceabilityToken` VALUES (1,6,1,'L1-Company_A__orderId_8');
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
INSERT INTO `User` VALUES (1,'qwe1','qwe1','qwe1@qwe.qwe','$2b$10$IqhE5vgi/EPadMOs5KiFkeVuGU2VXmKzChb7/GEs9kmjfCeRqtsnq','ADMIN','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoicXdlMUBxd2UucXdlIiwicm9sZSI6IkFETUlOIn0sImlhdCI6MTcyNjY2NDk2NywiZXhwIjoxNzI2NzUxMzY3fQ.NvlATkht7tmYpujejDkAMDLi9785vJLesZET2LInuyQ',NULL,'0x54978323C2595b0f9e1f7CAF565D5F768B84cB64'),(2,'asd1','asd1','asd1@asd.asd','$2b$10$DXZU/dgJFKXd9X0EbWgomuBheOJUoetJnOoH.JbYhuv8YGcUsWnaS','MODERATOR','',NULL,'0x87E229A2312947E15F03A8D5B40363c77f38531b'),(3,'zxc1','zxc1','zxc1@zxc.zxc','$2b$10$gilgMc9v28H/DRLvZEdk1uR2wSwlVGBolD4L7NFckI.R3NRmVI24S','USER','',NULL,'0x163B4aF81021D9623426D76bA3089574a8C0d6f9');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-18 16:22:53
