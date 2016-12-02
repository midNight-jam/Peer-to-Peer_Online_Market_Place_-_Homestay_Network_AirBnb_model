-- MySQL dump 10.13  Distrib 5.7.12, for osx10.9 (x86_64)
--
-- Host: 127.0.0.1    Database: airbnb
-- ------------------------------------------------------
-- Server version	5.7.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `trips`
--

DROP TABLE IF EXISTS `trips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trips` (
  `tripId` varchar(255) NOT NULL,
  `tripsequence` int(11) NOT NULL AUTO_INCREMENT,
  `userEmail` varchar(255) DEFAULT NULL,
  `hostEmail` varchar(255) DEFAULT NULL,
  `listId` varchar(255) DEFAULT NULL,
  `fixedPrice` int(11) DEFAULT NULL,
  `totalPrice` int(11) DEFAULT NULL,
  `checkInDate` date DEFAULT NULL,
  `checkOutDate` date DEFAULT NULL,
  `tripStatus` varchar(255) DEFAULT NULL,
  `paymentStatus` varchar(255) DEFAULT NULL,
  `billId` varchar(255) DEFAULT NULL,
  `userComments` varchar(255) DEFAULT NULL,
  `guestsSelected` varchar(255) DEFAULT NULL,
  `hostName` varchar(255) DEFAULT NULL,
  `listingTitle` varchar(255) DEFAULT NULL,
  `listingCity` varchar(255) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `zipCode` varchar(255) DEFAULT NULL,
  `streetAddress` varchar(255) DEFAULT NULL,
  `suiteNum` varchar(255) DEFAULT NULL,
  `userReview` varchar(255) DEFAULT 'false',
  `hostReview` varchar(255) DEFAULT 'false',
  PRIMARY KEY (`tripsequence`,`tripId`),
  UNIQUE KEY `tripsequence_UNIQUE` (`tripsequence`),
  UNIQUE KEY `tripId_UNIQUE` (`tripId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trips`
--

LOCK TABLES `trips` WRITE;
/*!40000 ALTER TABLE `trips` DISABLE KEYS */;
INSERT INTO `trips` (`tripId`, `tripsequence`, `userEmail`,`hostEmail`, `listId`,`fixedPrice`,`totalPrice`, `checkInDate`, `checkOutDate`,`tripStatus`,`paymentStatus`, `billId`,`userComments`, `guestsSelected`, `hostName`,  `listingTitle`,`listingCity`, `userName`,`zipCode`,`streetAddress`,`suiteNum`) VALUES ('679-07-4177',1,'brad@gmail.com','brad@gmail.com','518-04-1423',245,245,'2016-11-30','2016-12-01','pendingHostApproval','pending','679-07-4177','Book This','2',NULL,'London Palace','London','brad@gmail.com','','91 peterborough road','255'),('423-48-1382',2,'brad@gmail.com','brad@gmail.com','518-04-1423',245,245,'2016-12-15','2016-12-16','pendingHostApproval','pending','423-48-1382','bddrftgyhunjimk','2',NULL,'London Palace','London','brad@gmail.com','','91 peterborough road','255'),('606-63-3162',3,'brad@gmail.com','brad@gmail.com','217-79-2400',211,211,'2016-12-02','2016-12-03','pendingHostApproval','pending','606-63-3162','','2','Brad','Home Place','Santa Clara','brad@gmail.com','85112','1060 Benton Street','1415'),('353-56-6881',4,'brad@gmail.com','brad@gmail.com','750-14-1670',413,413,'2016-11-28','2016-11-29','pendingHostApproval','pending','353-56-6881','Please book this','4','Brad','Sunshine Villa','Santa Clara','brad@gmail.com','95114','1055 Benton St','1315');
/*!40000 ALTER TABLE `trips` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-25 23:34:54
