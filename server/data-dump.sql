-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: localhost    Database: toxicchemicals
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `knex_migrations`
--

DROP TABLE IF EXISTS `knex_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations`
--

LOCK TABLES `knex_migrations` WRITE;
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;
INSERT INTO `knex_migrations` VALUES (1,'20200510012415_initial_migrations.js',1,'2020-07-06 10:55:15');
/*!40000 ALTER TABLE `knex_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations_lock`
--

DROP TABLE IF EXISTS `knex_migrations_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations_lock` (
  `index` int unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations_lock`
--

LOCK TABLES `knex_migrations_lock` WRITE;
/*!40000 ALTER TABLE `knex_migrations_lock` DISABLE KEYS */;
INSERT INTO `knex_migrations_lock` VALUES (1,0);
/*!40000 ALTER TABLE `knex_migrations_lock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tAudit`
--

DROP TABLE IF EXISTS `tAudit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tAudit` (
  `nID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nShipmentItemID` bigint unsigned NOT NULL,
  `nAmount` int unsigned NOT NULL,
  `nShipmentJobID` bigint unsigned NOT NULL,
  `nChemicalID` int unsigned NOT NULL,
  `nWarehouseID` int unsigned NOT NULL,
  `cShipmentJobType` varchar(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`nID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tAudit`
--

LOCK TABLES `tAudit` WRITE;
/*!40000 ALTER TABLE `tAudit` DISABLE KEYS */;
INSERT INTO `tAudit` VALUES (1,8,1,7,1,2,'O','2020-07-06 11:26:13','2020-07-06 11:26:13'),(2,7,1,7,1,5,'O','2020-07-06 11:26:13','2020-07-06 11:26:13'),(3,10,1,8,2,3,'O','2020-07-06 11:28:17','2020-07-06 11:28:17'),(4,9,2,8,2,1,'O','2020-07-06 11:28:17','2020-07-06 11:28:17'),(5,12,1,9,3,4,'O','2020-07-06 11:35:37','2020-07-06 11:35:37'),(6,11,1,9,3,1,'O','2020-07-06 11:35:37','2020-07-06 11:35:37'),(7,13,3,10,2,1,'I','2020-07-06 11:36:28','2020-07-06 11:36:28'),(8,16,1,11,1,2,'O','2020-07-06 11:38:31','2020-07-06 11:38:31'),(9,15,1,11,2,3,'O','2020-07-06 11:38:31','2020-07-06 11:38:31'),(10,14,2,11,2,1,'O','2020-07-06 11:38:31','2020-07-06 11:38:31');
/*!40000 ALTER TABLE `tAudit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tChemical`
--

DROP TABLE IF EXISTS `tChemical`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tChemical` (
  `nChemicalID` int unsigned NOT NULL AUTO_INCREMENT,
  `cChemicalName` varchar(1) NOT NULL,
  PRIMARY KEY (`nChemicalID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tChemical`
--

LOCK TABLES `tChemical` WRITE;
/*!40000 ALTER TABLE `tChemical` DISABLE KEYS */;
INSERT INTO `tChemical` VALUES (1,'A'),(2,'B'),(3,'C');
/*!40000 ALTER TABLE `tChemical` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tChemicalStock`
--

DROP TABLE IF EXISTS `tChemicalStock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tChemicalStock` (
  `nWarehouseID` int unsigned NOT NULL,
  `nChemicalID` int unsigned NOT NULL,
  `nStock` int unsigned DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`nWarehouseID`,`nChemicalID`),
  KEY `tchemicalstock_nchemicalid_foreign` (`nChemicalID`),
  CONSTRAINT `tchemicalstock_nchemicalid_foreign` FOREIGN KEY (`nChemicalID`) REFERENCES `tChemical` (`nChemicalID`),
  CONSTRAINT `tchemicalstock_nwarehouseid_foreign` FOREIGN KEY (`nWarehouseID`) REFERENCES `tWarehouse` (`nWarehouseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tChemicalStock`
--

LOCK TABLES `tChemicalStock` WRITE;
/*!40000 ALTER TABLE `tChemicalStock` DISABLE KEYS */;
INSERT INTO `tChemicalStock` VALUES (1,2,4,'2020-07-06 10:55:18','2020-07-06 10:55:18'),(1,3,4,'2020-07-06 10:55:18','2020-07-06 10:55:18'),(2,1,7,'2020-07-06 10:55:18','2020-07-06 10:55:18'),(3,2,0,'2020-07-06 10:55:18','2020-07-06 10:55:18'),(4,3,2,'2020-07-06 10:55:18','2020-07-06 10:55:18'),(5,1,8,'2020-07-06 10:55:18','2020-07-06 10:55:18'),(6,2,8,'2020-07-06 10:55:18','2020-07-06 10:55:18'),(7,1,9,'2020-07-06 10:55:18','2020-07-06 10:55:18'),(7,3,3,'2020-07-06 10:55:18','2020-07-06 10:55:18'),(8,3,5,'2020-07-06 10:55:18','2020-07-06 10:55:18'),(9,3,2,'2020-07-06 10:55:18','2020-07-06 10:55:18'),(10,2,1,'2020-07-06 10:55:18','2020-07-06 10:55:18');
/*!40000 ALTER TABLE `tChemicalStock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tShipmentItem`
--

DROP TABLE IF EXISTS `tShipmentItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tShipmentItem` (
  `nShipmentItemID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nAmount` int unsigned NOT NULL,
  `nShipmentJobID` bigint unsigned NOT NULL,
  `nChemicalID` int unsigned NOT NULL,
  `nWarehouseID` int unsigned NOT NULL,
  PRIMARY KEY (`nShipmentItemID`),
  KEY `tshipmentitem_nshipmentjobid_foreign` (`nShipmentJobID`),
  KEY `tshipmentitem_nchemicalid_foreign` (`nChemicalID`),
  KEY `tshipmentitem_nwarehouseid_foreign` (`nWarehouseID`),
  CONSTRAINT `tshipmentitem_nchemicalid_foreign` FOREIGN KEY (`nChemicalID`) REFERENCES `tChemical` (`nChemicalID`),
  CONSTRAINT `tshipmentitem_nshipmentjobid_foreign` FOREIGN KEY (`nShipmentJobID`) REFERENCES `tShipmentJob` (`nShipmentJobID`),
  CONSTRAINT `tshipmentitem_nwarehouseid_foreign` FOREIGN KEY (`nWarehouseID`) REFERENCES `tWarehouse` (`nWarehouseID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tShipmentItem`
--

LOCK TABLES `tShipmentItem` WRITE;
/*!40000 ALTER TABLE `tShipmentItem` DISABLE KEYS */;
INSERT INTO `tShipmentItem` VALUES (1,4,1,3,1),(2,8,2,2,10),(3,6,3,2,10),(4,7,4,1,7),(5,3,5,3,3),(6,3,6,1,3),(7,1,7,1,5),(8,1,7,1,2),(9,2,8,2,1),(10,1,8,2,3),(11,1,9,3,1),(12,1,9,3,4),(13,3,10,2,1),(14,2,11,2,1),(15,1,11,2,3),(16,1,11,1,2);
/*!40000 ALTER TABLE `tShipmentItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tShipmentJob`
--

DROP TABLE IF EXISTS `tShipmentJob`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tShipmentJob` (
  `nShipmentJobID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nTicketNo` int unsigned NOT NULL,
  `cShipmentJobType` varchar(1) NOT NULL,
  `dDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `nStatus` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`nShipmentJobID`),
  UNIQUE KEY `tshipmentjob_nticketno_unique` (`nTicketNo`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tShipmentJob`
--

LOCK TABLES `tShipmentJob` WRITE;
/*!40000 ALTER TABLE `tShipmentJob` DISABLE KEYS */;
INSERT INTO `tShipmentJob` VALUES (1,1,'O','2020-07-06 10:55:18',1),(2,2,'O','2020-07-06 10:55:18',1),(3,3,'I','2020-07-06 10:55:18',0),(4,4,'O','2020-07-06 10:55:18',1),(5,5,'I','2020-07-06 10:55:18',1),(6,6,'I','2020-07-06 10:55:18',1),(7,749,'O','2020-07-06 11:26:13',1),(8,717,'O','2020-07-06 11:28:17',1),(9,407,'O','2020-07-06 11:35:37',1),(10,380,'I','2020-07-06 11:36:28',1),(11,857,'O','2020-07-06 11:38:31',1);
/*!40000 ALTER TABLE `tShipmentJob` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tSite`
--

DROP TABLE IF EXISTS `tSite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tSite` (
  `nSiteID` int unsigned NOT NULL AUTO_INCREMENT,
  `cSiteName` varchar(2) NOT NULL,
  PRIMARY KEY (`nSiteID`),
  UNIQUE KEY `tsite_csitename_unique` (`cSiteName`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tSite`
--

LOCK TABLES `tSite` WRITE;
/*!40000 ALTER TABLE `tSite` DISABLE KEYS */;
INSERT INTO `tSite` VALUES (1,'S1'),(2,'S2');
/*!40000 ALTER TABLE `tSite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tUser`
--

DROP TABLE IF EXISTS `tUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tUser` (
  `nUserID` int unsigned NOT NULL AUTO_INCREMENT,
  `cEmail` varchar(255) NOT NULL,
  `cPassword` varchar(255) NOT NULL,
  `nWarehouseID` int unsigned NOT NULL,
  PRIMARY KEY (`nUserID`),
  UNIQUE KEY `tuser_cemail_unique` (`cEmail`),
  KEY `tuser_nwarehouseid_foreign` (`nWarehouseID`),
  CONSTRAINT `tuser_nwarehouseid_foreign` FOREIGN KEY (`nWarehouseID`) REFERENCES `tWarehouse` (`nWarehouseID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tUser`
--

LOCK TABLES `tUser` WRITE;
/*!40000 ALTER TABLE `tUser` DISABLE KEYS */;
INSERT INTO `tUser` VALUES (1,'admin@toxicchemical.com','$2a$10$vC9EN2MEoVNIYhGbsCBDuO0RsmXC8RpF3BpaJOrY3nVwM4p6n9XZe',1),(2,'warehouse1@toxicchemical.com','$2a$10$vC9EN2MEoVNIYhGbsCBDuO0RsmXC8RpF3BpaJOrY3nVwM4p6n9XZe',1),(3,'warehouse2@toxicchemical.com','$2a$10$vC9EN2MEoVNIYhGbsCBDuO0RsmXC8RpF3BpaJOrY3nVwM4p6n9XZe',2),(4,'warehouse3@toxicchemical.com','$2a$10$vC9EN2MEoVNIYhGbsCBDuO0RsmXC8RpF3BpaJOrY3nVwM4p6n9XZe',3),(5,'warehouse4@toxicchemical.com','$2a$10$vC9EN2MEoVNIYhGbsCBDuO0RsmXC8RpF3BpaJOrY3nVwM4p6n9XZe',4),(6,'warehouse5@toxicchemical.com','$2a$10$vC9EN2MEoVNIYhGbsCBDuO0RsmXC8RpF3BpaJOrY3nVwM4p6n9XZe',5),(7,'warehouse6@toxicchemical.com','$2a$10$vC9EN2MEoVNIYhGbsCBDuO0RsmXC8RpF3BpaJOrY3nVwM4p6n9XZe',6),(8,'warehouse7@toxicchemical.com','$2a$10$vC9EN2MEoVNIYhGbsCBDuO0RsmXC8RpF3BpaJOrY3nVwM4p6n9XZe',7),(9,'warehouse8@toxicchemical.com','$2a$10$vC9EN2MEoVNIYhGbsCBDuO0RsmXC8RpF3BpaJOrY3nVwM4p6n9XZe',8),(10,'warehouse9@toxicchemical.com','$2a$10$vC9EN2MEoVNIYhGbsCBDuO0RsmXC8RpF3BpaJOrY3nVwM4p6n9XZe',9),(11,'warehouse10@toxicchemical.com','$2a$10$vC9EN2MEoVNIYhGbsCBDuO0RsmXC8RpF3BpaJOrY3nVwM4p6n9XZe',10);
/*!40000 ALTER TABLE `tUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tWarehouse`
--

DROP TABLE IF EXISTS `tWarehouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tWarehouse` (
  `nWarehouseID` int unsigned NOT NULL AUTO_INCREMENT,
  `cWarehouseName` varchar(2) NOT NULL,
  `nCapacity` int unsigned DEFAULT NULL,
  `nCurrentStock` int unsigned DEFAULT NULL,
  `nSiteID` int unsigned NOT NULL,
  PRIMARY KEY (`nWarehouseID`),
  KEY `twarehouse_nsiteid_foreign` (`nSiteID`),
  CONSTRAINT `twarehouse_nsiteid_foreign` FOREIGN KEY (`nSiteID`) REFERENCES `tSite` (`nSiteID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tWarehouse`
--

LOCK TABLES `tWarehouse` WRITE;
/*!40000 ALTER TABLE `tWarehouse` DISABLE KEYS */;
INSERT INTO `tWarehouse` VALUES (1,'W1',10,8,1),(2,'W2',12,7,1),(3,'W3',5,0,1),(4,'W4',3,2,1),(5,'W5',9,8,1),(6,'W1',10,8,2),(7,'W2',12,12,2),(8,'W3',5,5,2),(9,'W4',3,2,2),(10,'W5',9,1,2);
/*!40000 ALTER TABLE `tWarehouse` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-06 14:48:58
