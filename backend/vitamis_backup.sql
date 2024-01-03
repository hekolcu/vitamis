-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: vitamis_db
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

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
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `UserId` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Password` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `UserType` int NOT NULL,
  `Email` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Gender` int DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `VitaminReferenceGroups`
--

DROP TABLE IF EXISTS `VitaminReferenceGroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VitaminReferenceGroups` (
  `GroupID` int NOT NULL AUTO_INCREMENT,
  `GroupName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`GroupID`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VitaminReferenceGroups`
--

LOCK TABLES `VitaminReferenceGroups` WRITE;
/*!40000 ALTER TABLE `VitaminReferenceGroups` DISABLE KEYS */;
INSERT INTO `VitaminReferenceGroups` VALUES (1,'Çocuk 2'),(2,'Çocuk 3'),(3,'Çocuk 4'),(4,'Erkek 5'),(5,'Erkek 6'),(6,'Erkek 7'),(7,'Erkek 8'),(8,'Erkek 9'),(9,'Erkek 10'),(10,'Erkek 11'),(11,'Erkek 12'),(12,'Erkek 13'),(13,'Erkek 14'),(14,'Erkek 15'),(15,'Erkek 16'),(16,'Erkek 17'),(17,'Erkek 18'),(18,'Erkek 19-50'),(19,'Erkek 51-64'),(20,'Erkek 65-70'),(21,'Erkek ≥70'),(22,'Kadın 5'),(23,'Kadın 6'),(24,'Kadın 7'),(25,'Kadın 8'),(26,'Kadın 9'),(27,'Kadın 10'),(28,'Kadın 11'),(29,'Kadın 12'),(30,'Kadın 13'),(31,'Kadın 14'),(32,'Kadın 15'),(33,'Kadın 16'),(34,'Kadın 17'),(35,'Kadın 18'),(36,'Kadın 19-50'),(37,'Kadın 51-64'),(38,'Kadın 65-70'),(39,'Kadın ≥70'),(40,'Gebe'),(41,'Emzikli');
/*!40000 ALTER TABLE `VitaminReferenceGroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VitaminReferenceValues`
--

DROP TABLE IF EXISTS `VitaminReferenceValues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VitaminReferenceValues` (
  `ValueID` int NOT NULL AUTO_INCREMENT,
  `VitaminID` int NOT NULL,
  `GroupID` int NOT NULL,
  `Amount` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Unit` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`ValueID`),
  KEY `IX_VitaminReferenceValues_GroupID` (`GroupID`),
  KEY `IX_VitaminReferenceValues_VitaminID` (`VitaminID`),
  CONSTRAINT `FK_VitaminReferenceValues_VitaminReferenceGroups_GroupID` FOREIGN KEY (`GroupID`) REFERENCES `VitaminReferenceGroups` (`GroupID`) ON DELETE CASCADE,
  CONSTRAINT `FK_VitaminReferenceValues_Vitamins_VitaminID` FOREIGN KEY (`VitaminID`) REFERENCES `Vitamins` (`VitaminID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=534 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VitaminReferenceValues`
--

LOCK TABLES `VitaminReferenceValues` WRITE;
/*!40000 ALTER TABLE `VitaminReferenceValues` DISABLE KEYS */;
INSERT INTO `VitaminReferenceValues` VALUES (1,1,1,'250','mcg'),(2,3,1,'1.5','mcg'),(3,2,1,'0.6','mg'),(4,12,1,'20','mcg'),(5,4,1,'20','mg'),(6,5,1,'15','mcg'),(7,6,1,'6','mg'),(8,8,1,'120','mcg'),(9,7,1,'12','mcg'),(10,9,1,'6.6','mg/1000kkal'),(11,13,1,'4','mg'),(12,11,1,'0.6','mg'),(13,10,1,'0.4','mg/1000kkal'),(14,1,2,'250','mcg'),(15,3,2,'1.5','mcg'),(16,2,2,'0.6','mg'),(17,12,2,'20','mcg'),(18,4,2,'20','mg'),(19,5,2,'15','mcg'),(20,6,2,'9','mg'),(21,8,2,'120','mcg'),(22,7,2,'12','mcg'),(23,9,2,'6.6','mg/1000kkal'),(24,13,2,'4','mg'),(25,11,2,'0.6','mg'),(26,10,2,'0.4','mg/1000kkal'),(27,1,3,'300','mcg'),(28,3,3,'1.5','mcg'),(29,2,3,'0.7','mg'),(30,12,3,'25','mcg'),(31,4,3,'30','mg'),(32,5,3,'15','mcg'),(33,6,3,'9','mg'),(34,8,3,'140','mcg'),(35,7,3,'20','mcg'),(36,9,3,'6.6','mg/1000kkal'),(37,13,3,'4','mg'),(38,11,3,'0.7','mg'),(39,10,3,'0.4','mg/1000kkal'),(40,1,4,'300','mcg'),(41,3,4,'1.5','mcg'),(42,2,4,'0.7','mg'),(43,12,4,'25','mcg'),(44,4,4,'30','mg'),(45,5,4,'15','mcg'),(46,6,4,'9','mg'),(47,8,4,'140','mcg'),(48,7,4,'20','mcg'),(49,9,4,'6.6','mg/1000kkal'),(50,13,4,'4','mg'),(51,11,4,'0.7','mg'),(52,10,4,'0.4','mg/1000kkal'),(53,1,5,'300','mcg'),(54,3,5,'1.5','mcg'),(55,2,5,'0.7','mg'),(56,12,5,'25','mcg'),(57,4,5,'30','mg'),(58,5,5,'15','mcg'),(59,6,5,'9','mg'),(60,8,5,'140','mcg'),(61,7,5,'20','mcg'),(62,9,5,'6.6','mg/1000kkal'),(63,13,5,'4','mg'),(64,11,5,'0.7','mg'),(65,10,5,'0.4','mg/1000kkal'),(66,1,6,'400','mcg'),(67,3,6,'2.5','mcg'),(68,2,6,'1','mg'),(69,12,6,'25','mcg'),(70,4,6,'45','mg'),(71,5,6,'15','mcg'),(72,6,6,'9','mg'),(73,8,6,'200','mcg'),(74,7,6,'30','mcg'),(75,9,6,'6.6','mg/1000kkal'),(76,13,6,'4','mg'),(77,11,6,'1','mg'),(78,10,6,'0.4','mg/1000kkal'),(79,1,7,'400','mcg'),(80,3,7,'2.5','mcg'),(81,2,7,'1','mg'),(82,12,7,'25','mcg'),(83,4,7,'45','mg'),(84,5,7,'15','mcg'),(85,6,7,'9','mg'),(86,8,7,'200','mcg'),(87,7,7,'30','mcg'),(88,9,7,'6.6','mg/1000kkal'),(89,13,7,'4','mg'),(90,11,7,'1','mg'),(91,10,7,'0.4','mg/1000kkal'),(92,1,8,'400','mcg'),(93,3,8,'2.5','mcg'),(94,2,8,'1','mg'),(95,12,8,'25','mcg'),(96,4,8,'45','mg'),(97,5,8,'15','mcg'),(98,6,8,'9','mg'),(99,8,8,'200','mcg'),(100,7,8,'30','mcg'),(101,9,8,'6.6','mg/1000kkal'),(102,13,8,'4','mg'),(103,11,8,'1','mg'),(104,10,8,'0.4','mg/1000kkal'),(105,1,9,'400','mcg'),(106,3,9,'2.5','mcg'),(107,2,9,'1','mg'),(108,12,9,'25','mcg'),(109,4,9,'45','mg'),(110,5,9,'15','mcg'),(111,6,9,'13','mg'),(112,8,9,'200','mcg'),(113,7,9,'30','mcg'),(114,9,9,'6.6','mg/1000kkal'),(115,13,9,'4','mg'),(116,11,9,'1','mg'),(117,10,9,'0.4','mg/1000kkal'),(118,1,10,'600','mcg'),(119,3,10,'3.5','mcg'),(120,2,10,'1.4','mg'),(121,12,10,'35','mcg'),(122,4,10,'70','mg'),(123,5,10,'15','mcg'),(124,6,10,'13','mg'),(125,8,10,'270','mcg'),(126,7,10,'45','mcg'),(127,9,10,'6.6','mg/1000kkal'),(128,13,10,'5','mg'),(129,11,10,'1.4','mg'),(130,10,10,'0.4','mg/1000kkal'),(131,1,11,'600','mcg'),(132,3,11,'3.5','mcg'),(133,2,11,'1.4','mg'),(134,12,11,'35','mcg'),(135,4,11,'70','mg'),(136,5,11,'15','mcg'),(137,6,11,'13','mg'),(138,8,11,'270','mcg'),(139,7,11,'45','mcg'),(140,9,11,'6.6','mg/1000kkal'),(141,13,11,'5','mg'),(142,11,11,'1.4','mg'),(143,10,11,'0.4','mg/1000kkal'),(144,1,12,'600','mcg'),(145,3,12,'3.5','mcg'),(146,2,12,'1.4','mg'),(147,12,12,'35','mcg'),(148,4,12,'70','mg'),(149,5,12,'15','mcg'),(150,6,12,'13','mg'),(151,8,12,'270','mcg'),(152,7,12,'45','mcg'),(153,9,12,'6.6','mg/1000kkal'),(154,13,12,'5','mg'),(155,11,12,'1.4','mg'),(156,10,12,'0.4','mg/1000kkal'),(157,1,13,'600','mcg'),(158,3,13,'3.5','mcg'),(159,2,13,'1.4','mg'),(160,12,13,'35','mcg'),(161,4,13,'70','mg'),(162,5,13,'15','mcg'),(163,6,13,'13','mg'),(164,8,13,'270','mcg'),(165,7,13,'45','mcg'),(166,9,13,'6.6','mg/1000kkal'),(167,13,13,'5','mg'),(168,11,13,'1.4','mg'),(169,10,13,'0.4','mg/1000kkal'),(170,1,14,'750','mcg'),(171,3,14,'4','mcg'),(172,2,14,'1.7','mg'),(173,12,14,'35','mcg'),(174,4,14,'100','mg'),(175,5,14,'15','mcg'),(176,6,14,'13','mg'),(177,8,14,'330','mcg'),(178,7,14,'65','mcg'),(179,9,14,'6.6','mg/1000kkal'),(180,13,14,'5','mg'),(181,11,14,'1.6','mg'),(182,10,14,'0.4','mg/1000kkal'),(183,1,15,'750','mcg'),(184,3,15,'4','mcg'),(185,2,15,'1.7','mg'),(186,12,15,'35','mcg'),(187,4,15,'100','mg'),(188,5,15,'15','mcg'),(189,6,15,'13','mg'),(190,8,15,'330','mcg'),(191,7,15,'65','mcg'),(192,9,15,'6.6','mg/1000kkal'),(193,13,15,'5','mg'),(194,11,15,'1.6','mg'),(195,10,15,'0.4','mg/1000kkal'),(196,1,16,'750','mcg'),(197,3,16,'4','mcg'),(198,2,16,'1.7','mg'),(199,12,16,'35','mcg'),(200,4,16,'100','mg'),(201,5,16,'15','mcg'),(202,6,16,'13','mg'),(203,8,16,'330','mcg'),(204,7,16,'65','mcg'),(205,9,16,'6.6','mg/1000kkal'),(206,13,16,'5','mg'),(207,11,16,'1.6','mg'),(208,10,16,'0.4','mg/1000kkal'),(209,1,17,'750','mcg'),(210,3,17,'4','mcg'),(211,2,17,'1.7','mg'),(212,12,17,'40','mcg'),(213,4,17,'110','mg'),(214,5,17,'15','mcg'),(215,6,17,'13','mg'),(216,8,17,'330','mcg'),(217,7,17,'70','mcg'),(218,9,17,'6.6','mg/1000kkal'),(219,13,17,'5','mg'),(220,11,17,'1.6','mg'),(221,10,17,'0.4','mg/1000kkal'),(222,1,18,'750','mcg'),(223,3,18,'4','mcg'),(224,2,18,'1.7','mg'),(225,12,18,'40','mcg'),(226,4,18,'110','mg'),(227,5,18,'15','mcg'),(228,6,18,'13','mg'),(229,8,18,'330','mcg'),(230,7,18,'70','mcg'),(231,9,18,'6.6','mg/1000kkal'),(232,13,18,'5','mg'),(233,11,18,'1.6','mg'),(234,10,18,'0.4','mg/1000kkal'),(235,1,19,'750','mcg'),(236,3,19,'4','mcg'),(237,2,19,'1.7','mg'),(238,12,19,'40','mcg'),(239,4,19,'110','mg'),(240,5,19,'15','mcg'),(241,6,19,'13','mg'),(242,8,19,'330','mcg'),(243,7,19,'70','mcg'),(244,9,19,'6.6','mg/1000kkal'),(245,13,19,'5','mg'),(246,11,19,'1.6','mg'),(247,10,19,'0.4','mg/1000kkal'),(248,1,20,'750','mcg'),(249,3,20,'4','mcg'),(250,2,20,'1.7','mg'),(251,12,20,'40','mcg'),(252,4,20,'110','mg'),(253,5,20,'15','mcg'),(254,6,20,'13','mg'),(255,8,20,'330','mcg'),(256,7,20,'70','mcg'),(257,9,20,'6.6','mg/1000kkal'),(258,13,20,'5','mg'),(259,11,20,'1.6','mg'),(260,10,20,'0.4','mg/1000kkal'),(261,1,21,'750','mcg'),(262,3,21,'4','mcg'),(263,2,21,'1.7','mg'),(264,12,21,'40','mcg'),(265,4,21,'110','mg'),(266,5,21,'20','mcg'),(267,6,21,'13','mg'),(268,8,21,'330','mcg'),(269,7,21,'70','mcg'),(270,9,21,'6.6','mg/1000kkal'),(271,13,21,'5','mg'),(272,11,21,'1.6','mg'),(273,10,21,'0.4','mg/1000kkal'),(274,1,22,'300','mcg'),(275,3,22,'1.5','mcg'),(276,2,22,'0.7','mg'),(277,12,22,'25','mcg'),(278,4,22,'30','mg'),(279,5,22,'15','mcg'),(280,6,22,'9','mg'),(281,8,22,'140','mcg'),(282,7,22,'20','mcg'),(283,9,22,'6.6','mg/1000kkal'),(284,13,22,'4','mg'),(285,11,22,'0.7','mg'),(286,10,22,'0.4','mg/1000kkal'),(287,1,23,'300','mcg'),(288,3,23,'1.5','mcg'),(289,2,23,'0.7','mg'),(290,12,23,'25','mcg'),(291,4,23,'30','mg'),(292,5,23,'15','mcg'),(293,6,23,'9','mg'),(294,8,23,'140','mcg'),(295,7,23,'20','mcg'),(296,9,23,'6.6','mg/1000kkal'),(297,13,23,'4','mg'),(298,11,23,'0.7','mg'),(299,10,23,'0.4','mg/1000kkal'),(300,1,24,'400','mcg'),(301,3,24,'2.5','mcg'),(302,2,24,'1','mg'),(303,12,24,'25','mcg'),(304,4,24,'45','mg'),(305,5,24,'15','mcg'),(306,6,24,'9','mg'),(307,8,24,'200','mcg'),(308,7,24,'30','mcg'),(309,9,24,'6.6','mg/1000kkal'),(310,13,24,'4','mg'),(311,11,24,'1','mg'),(312,10,24,'0.4','mg/1000kkal'),(313,1,25,'400','mcg'),(314,3,25,'2.5','mcg'),(315,2,25,'1','mg'),(316,12,25,'25','mcg'),(317,4,25,'45','mg'),(318,5,25,'15','mcg'),(319,6,25,'9','mg'),(320,8,25,'200','mcg'),(321,7,25,'30','mcg'),(322,9,25,'6.6','mg/1000kkal'),(323,13,25,'4','mg'),(324,11,25,'1','mg'),(325,10,25,'0.4','mg/1000kkal'),(326,1,26,'400','mcg'),(327,3,26,'2.5','mcg'),(328,2,26,'1','mg'),(329,12,26,'25','mcg'),(330,4,26,'45','mg'),(331,5,26,'15','mcg'),(332,6,26,'9','mg'),(333,8,26,'200','mcg'),(334,7,26,'30','mcg'),(335,9,26,'6.6','mg/1000kkal'),(336,13,26,'4','mg'),(337,11,26,'1','mg'),(338,10,26,'0.4','mg/1000kkal'),(339,1,27,'400','mcg'),(340,3,27,'2.5','mcg'),(341,2,27,'1','mg'),(342,12,27,'25','mcg'),(343,4,27,'45','mg'),(344,5,27,'15','mcg'),(345,6,27,'11','mg'),(346,8,27,'200','mcg'),(347,7,27,'30','mcg'),(348,9,27,'6.6','mg/1000kkal'),(349,13,27,'4','mg'),(350,11,27,'1','mg'),(351,10,27,'0.4','mg/1000kkal'),(352,1,28,'600','mcg'),(353,3,28,'3.5','mcg'),(354,2,28,'1.4','mg'),(355,12,28,'35','mcg'),(356,4,28,'70','mg'),(357,5,28,'15','mcg'),(358,6,28,'11','mg'),(359,8,28,'270','mcg'),(360,7,28,'45','mcg'),(361,9,28,'6.6','mg/1000kkal'),(362,13,28,'5','mg'),(363,11,28,'1.4','mg'),(364,10,28,'0.4','mg/1000kkal'),(365,1,29,'600','mcg'),(366,3,29,'3.5','mcg'),(367,2,29,'1.4','mg'),(368,12,29,'35','mcg'),(369,4,29,'70','mg'),(370,5,29,'15','mcg'),(371,6,29,'11','mg'),(372,8,29,'270','mcg'),(373,7,29,'45','mcg'),(374,9,29,'6.6','mg/1000kkal'),(375,13,29,'5','mg'),(376,11,29,'1.4','mg'),(377,10,29,'0.4','mg/1000kkal'),(378,1,30,'600','mcg'),(379,3,30,'3.5','mcg'),(380,2,30,'1.4','mg'),(381,12,30,'35','mcg'),(382,4,30,'70','mg'),(383,5,30,'15','mcg'),(384,6,30,'11','mg'),(385,8,30,'270','mcg'),(386,7,30,'45','mcg'),(387,9,30,'6.6','mg/1000kkal'),(388,13,30,'5','mg'),(389,11,30,'1.4','mg'),(390,10,30,'0.4','mg/1000kkal'),(391,1,31,'600','mcg'),(392,3,31,'3.5','mcg'),(393,2,31,'1.4','mg'),(394,12,31,'35','mcg'),(395,4,31,'70','mg'),(396,5,31,'15','mcg'),(397,6,31,'11','mg'),(398,8,31,'270','mcg'),(399,7,31,'45','mcg'),(400,9,31,'6.6','mg/1000kkal'),(401,13,31,'5','mg'),(402,11,31,'1.4','mg'),(403,10,31,'0.4','mg/1000kkal'),(404,1,32,'650','mcg'),(405,3,32,'4','mcg'),(406,2,32,'1.6','mg'),(407,12,32,'35','mcg'),(408,4,32,'90','mg'),(409,5,32,'15','mcg'),(410,6,32,'11','mg'),(411,8,32,'330','mcg'),(412,7,32,'65','mcg'),(413,9,32,'6.6','mg/1000kkal'),(414,13,32,'5','mg'),(415,11,32,'1.6','mg'),(416,10,32,'0.4','mg/1000kkal'),(417,1,33,'650','mcg'),(418,3,33,'4','mcg'),(419,2,33,'1.6','mg'),(420,12,33,'35','mcg'),(421,4,33,'90','mg'),(422,5,33,'15','mcg'),(423,6,33,'11','mg'),(424,8,33,'330','mcg'),(425,7,33,'65','mcg'),(426,9,33,'6.6','mg/1000kkal'),(427,13,33,'5','mg'),(428,11,33,'1.6','mg'),(429,10,33,'0.4','mg/1000kkal'),(430,1,34,'650','mcg'),(431,3,34,'4','mcg'),(432,2,34,'1.6','mg'),(433,12,34,'35','mcg'),(434,4,34,'90','mg'),(435,5,34,'15','mcg'),(436,6,34,'11','mg'),(437,8,34,'330','mcg'),(438,7,34,'65','mcg'),(439,9,34,'6.6','mg/1000kkal'),(440,13,34,'5','mg'),(441,11,34,'1.6','mg'),(442,10,34,'0.4','mg/1000kkal'),(443,1,35,'650','mcg'),(444,3,35,'4','mcg'),(445,2,35,'1.6','mg'),(446,12,35,'40','mcg'),(447,4,35,'95','mg'),(448,5,35,'15','mcg'),(449,6,35,'11','mg'),(450,8,35,'330','mcg'),(451,7,35,'70','mcg'),(452,9,35,'6.6','mg/1000kkal'),(453,13,35,'5','mg'),(454,11,35,'1.6','mg'),(455,10,35,'0.4','mg/1000kkal'),(456,1,36,'650','mcg'),(457,3,36,'4','mcg'),(458,2,36,'1.6','mg'),(459,12,36,'40','mcg'),(460,4,36,'95','mg'),(461,5,36,'15','mcg'),(462,6,36,'11','mg'),(463,8,36,'330','mcg'),(464,7,36,'70','mcg'),(465,9,36,'6.6','mg/1000kkal'),(466,13,36,'5','mg'),(467,11,36,'1.6','mg'),(468,10,36,'0.4','mg/1000kkal'),(469,1,37,'650','mcg'),(470,3,37,'4','mcg'),(471,2,37,'1.6','mg'),(472,12,37,'40','mcg'),(473,4,37,'95','mg'),(474,5,37,'15','mcg'),(475,6,37,'11','mg'),(476,8,37,'330','mcg'),(477,7,37,'70','mcg'),(478,9,37,'6.6','mg/1000kkal'),(479,13,37,'5','mg'),(480,11,37,'1.6','mg'),(481,10,37,'0.4','mg/1000kkal'),(482,1,38,'650','mcg'),(483,3,38,'4','mcg'),(484,2,38,'1.6','mg'),(485,12,38,'40','mcg'),(486,4,38,'95','mg'),(487,5,38,'15','mcg'),(488,6,38,'11','mg'),(489,8,38,'330','mcg'),(490,7,38,'70','mcg'),(491,9,38,'6.6','mg/1000kkal'),(492,13,38,'5','mg'),(493,11,38,'1.6','mg'),(494,10,38,'0.4','mg/1000kkal'),(495,1,39,'650','mcg'),(496,3,39,'4','mcg'),(497,2,39,'1.6','mg'),(498,12,39,'40','mcg'),(499,4,39,'95','mg'),(500,5,39,'20','mcg'),(501,6,39,'11','mg'),(502,8,39,'330','mcg'),(503,7,39,'70','mcg'),(504,9,39,'6.6','mg/1000kkal'),(505,13,39,'5','mg'),(506,11,39,'1.6','mg'),(507,10,39,'0.4','mg/1000kkal'),(508,1,40,'700','mcg'),(509,3,40,'4.5','mcg'),(510,2,40,'1.8','mg'),(511,12,40,'40','mcg'),(512,4,40,'+106','mg'),(513,5,40,'15','mcg'),(514,6,40,'11','mg'),(515,8,40,'600','mcg'),(516,7,40,'70','mcg'),(517,9,40,'6.6','mg/1000kkal'),(518,13,40,'5','mg'),(519,11,40,'1.9','mg'),(520,10,40,'0.4','mg/1000kkal'),(521,1,41,'1300','mcg'),(522,3,41,'5','mcg'),(523,2,41,'1.7','mg'),(524,12,41,'45','mcg'),(525,4,41,'+606','mg'),(526,5,41,'15','mcg'),(527,6,41,'11','mg'),(528,8,41,'500','mcg'),(529,7,41,'70','mcg'),(530,9,41,'6.6','mg/1000kkal'),(531,13,41,'7','mg'),(532,11,41,'2','mg'),(533,10,41,'0.4','mg/1000kkal');
/*!40000 ALTER TABLE `VitaminReferenceValues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vitamins`
--

DROP TABLE IF EXISTS `Vitamins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Vitamins` (
  `VitaminID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`VitaminID`),
  UNIQUE KEY `IX_Vitamins_Name` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vitamins`
--

LOCK TABLES `Vitamins` WRITE;
/*!40000 ALTER TABLE `Vitamins` DISABLE KEYS */;
INSERT INTO `Vitamins` VALUES (1,'A vitamini'),(3,'B12 vitamini'),(2,'B6 vitamini'),(12,'Biotin'),(4,'C vitamini'),(5,'D vitamini'),(6,'E vitamini'),(8,'Folat'),(7,'K vitamini'),(9,'Niasin'),(13,'Pantotenik asit'),(11,'Riboflavin'),(10,'Tiamin');
/*!40000 ALTER TABLE `Vitamins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `__EFMigrationsHistory`
--

DROP TABLE IF EXISTS `__EFMigrationsHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__EFMigrationsHistory` (
  `MigrationId` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProductVersion` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__EFMigrationsHistory`
--

LOCK TABLES `__EFMigrationsHistory` WRITE;
/*!40000 ALTER TABLE `__EFMigrationsHistory` DISABLE KEYS */;
INSERT INTO `__EFMigrationsHistory` VALUES ('20240102181454_InitialUser','8.0.0'),('20240103094926_UpdatedUser','8.0.0'),('20240103105627_UserPasswordAndEmailSizeChange','8.0.0'),('20240103125702_VitaminReferenceTables','8.0.0'),('20240103161211_UniqueVitamins','8.0.0'),('20240103163240_ReferenceValueAmountString','8.0.0'),('20240103163419_ReferenceValueAmountStringLen','8.0.0');
/*!40000 ALTER TABLE `__EFMigrationsHistory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-03 19:51:53
