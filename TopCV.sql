-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: topcv
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `__efmigrationshistory`
--

DROP TABLE IF EXISTS `__efmigrationshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProductVersion` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__efmigrationshistory`
--

LOCK TABLES `__efmigrationshistory` WRITE;
/*!40000 ALTER TABLE `__efmigrationshistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `__efmigrationshistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adminusers`
--

DROP TABLE IF EXISTS `adminusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminusers` (
  `UserName` varchar(50) NOT NULL,
  PRIMARY KEY (`UserName`),
  CONSTRAINT `admin` FOREIGN KEY (`UserName`) REFERENCES `users` (`UserName`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminusers`
--

LOCK TABLES `adminusers` WRITE;
/*!40000 ALTER TABLE `adminusers` DISABLE KEYS */;
INSERT INTO `adminusers` VALUES ('admin');
/*!40000 ALTER TABLE `adminusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `application`
--

DROP TABLE IF EXISTS `application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `application` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `JobPostID` int DEFAULT NULL,
  `UserJobseeker` varchar(50) DEFAULT NULL,
  `ApplicationDate` date DEFAULT NULL,
  `CVFile` varchar(255) DEFAULT NULL,
  `Status` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `JobPostID` (`JobPostID`),
  KEY `UserJobseeker` (`UserJobseeker`),
  KEY `Status` (`Status`),
  CONSTRAINT `application_ibfk_1` FOREIGN KEY (`JobPostID`) REFERENCES `jobpost` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `application_ibfk_2` FOREIGN KEY (`UserJobseeker`) REFERENCES `userjobseeker` (`UserName`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `application_ibfk_3` FOREIGN KEY (`Status`) REFERENCES `applicationstatus` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application`
--

LOCK TABLES `application` WRITE;
/*!40000 ALTER TABLE `application` DISABLE KEYS */;
/*!40000 ALTER TABLE `application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applicationstatus`
--

DROP TABLE IF EXISTS `applicationstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applicationstatus` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `StatusName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applicationstatus`
--

LOCK TABLES `applicationstatus` WRITE;
/*!40000 ALTER TABLE `applicationstatus` DISABLE KEYS */;
/*!40000 ALTER TABLE `applicationstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employmenttype`
--

DROP TABLE IF EXISTS `employmenttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employmenttype` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `EmploymentTypeName` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employmenttype`
--

LOCK TABLES `employmenttype` WRITE;
/*!40000 ALTER TABLE `employmenttype` DISABLE KEYS */;
INSERT INTO `employmenttype` VALUES (1,'Toàn thời gian'),(2,'Bán thời gian'),(3,'Hợp đồng'),(4,'Thực tập sinh'),(5,'Tạm thời');
/*!40000 ALTER TABLE `employmenttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobfield`
--

DROP TABLE IF EXISTS `jobfield`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobfield` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `JobField` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobfield`
--

LOCK TABLES `jobfield` WRITE;
/*!40000 ALTER TABLE `jobfield` DISABLE KEYS */;
INSERT INTO `jobfield` VALUES (1,'Công nghệ thông tin'),(2,'Kinh doanh'),(3,'Thiết kế'),(4,'Marketing'),(5,'Giáo dục');
/*!40000 ALTER TABLE `jobfield` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobpost`
--

DROP TABLE IF EXISTS `jobpost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobpost` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(100) DEFAULT NULL,
  `JobDescription` text,
  `Requirements` text,
  `SalaryRange` varchar(50) DEFAULT NULL,
  `Location` varchar(100) DEFAULT NULL,
  `PostDate` date DEFAULT NULL,
  `Status` int DEFAULT NULL,
  `UserEmployer` varchar(50) NOT NULL,
  `Interest` text,
  PRIMARY KEY (`ID`),
  KEY `UserEmploy_idx` (`UserEmployer`),
  KEY `jobpost_ibfk_1` (`Status`),
  CONSTRAINT `jobpost_ibfk_1` FOREIGN KEY (`Status`) REFERENCES `jobpoststatus` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserEmploy` FOREIGN KEY (`UserEmployer`) REFERENCES `useremployer` (`UserName`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobpost`
--

LOCK TABLES `jobpost` WRITE;
/*!40000 ALTER TABLE `jobpost` DISABLE KEYS */;
INSERT INTO `jobpost` VALUES (3,'Thiết kế đồ họa','<div><p>Mô tả công việc</p><script>alert(\'XSS Attack!\')</script></div>','<p>Yêu cầu C</p>','12-20 triệu','TP.HCM','2024-10-03',1,'employer3','');
/*!40000 ALTER TABLE `jobpost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobpostemployment`
--

DROP TABLE IF EXISTS `jobpostemployment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobpostemployment` (
  `IDEmploymentType` int NOT NULL,
  `IDJobPost` int NOT NULL,
  PRIMARY KEY (`IDEmploymentType`,`IDJobPost`),
  KEY `JobPost_idx` (`IDJobPost`),
  CONSTRAINT `employment` FOREIGN KEY (`IDEmploymentType`) REFERENCES `employmenttype` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `JobPost` FOREIGN KEY (`IDJobPost`) REFERENCES `jobpost` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobpostemployment`
--

LOCK TABLES `jobpostemployment` WRITE;
/*!40000 ALTER TABLE `jobpostemployment` DISABLE KEYS */;
INSERT INTO `jobpostemployment` VALUES (3,3);
/*!40000 ALTER TABLE `jobpostemployment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobpostfield`
--

DROP TABLE IF EXISTS `jobpostfield`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobpostfield` (
  `IDJobPost` int NOT NULL,
  `IDJobField` int NOT NULL,
  PRIMARY KEY (`IDJobPost`,`IDJobField`),
  KEY `jobfield` (`IDJobField`),
  CONSTRAINT `jobfield` FOREIGN KEY (`IDJobField`) REFERENCES `jobfield` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `jobpost_fk` FOREIGN KEY (`IDJobPost`) REFERENCES `jobpost` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobpostfield`
--

LOCK TABLES `jobpostfield` WRITE;
/*!40000 ALTER TABLE `jobpostfield` DISABLE KEYS */;
INSERT INTO `jobpostfield` VALUES (3,3);
/*!40000 ALTER TABLE `jobpostfield` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobpoststatus`
--

DROP TABLE IF EXISTS `jobpoststatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobpoststatus` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `StatusName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobpoststatus`
--

LOCK TABLES `jobpoststatus` WRITE;
/*!40000 ALTER TABLE `jobpoststatus` DISABLE KEYS */;
INSERT INTO `jobpoststatus` VALUES (1,'Active'),(2,'Inactive'),(3,'Unapproved');
/*!40000 ALTER TABLE `jobpoststatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useremployer`
--

DROP TABLE IF EXISTS `useremployer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `useremployer` (
  `UserName` varchar(50) NOT NULL,
  `CompanyName` varchar(100) DEFAULT NULL,
  `CompanyInfo` text,
  `Address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`UserName`),
  CONSTRAINT `useremployer_ibfk_1` FOREIGN KEY (`UserName`) REFERENCES `users` (`UserName`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useremployer`
--

LOCK TABLES `useremployer` WRITE;
/*!40000 ALTER TABLE `useremployer` DISABLE KEYS */;
INSERT INTO `useremployer` VALUES ('employer1','Công ty A','Thông tin về công ty A','123 Đường ABC, Quận 1, TP.HCM'),('employer3','Công ty C','Thông tin về công ty C','789 Đường GHI, Quận 3, TP.HCM');
/*!40000 ALTER TABLE `useremployer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userjobseeker`
--

DROP TABLE IF EXISTS `userjobseeker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userjobseeker` (
  `UserName` varchar(50) NOT NULL,
  `FullName` varchar(100) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `EducationLevel` varchar(50) DEFAULT NULL,
  `ExperienceYears` int DEFAULT NULL,
  `Skills` text,
  `Address` varchar(255) DEFAULT NULL,
  `CVFile` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`UserName`),
  CONSTRAINT `userjobseeker_ibfk_1` FOREIGN KEY (`UserName`) REFERENCES `users` (`UserName`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userjobseeker`
--

LOCK TABLES `userjobseeker` WRITE;
/*!40000 ALTER TABLE `userjobseeker` DISABLE KEYS */;
INSERT INTO `userjobseeker` VALUES ('anna_smith','Anna Smith','1990-03-22','Master',7,'Python, Django','456 Elm St, Metropolis','cv_anna_smith.pdf'),('john_doe','John Doe','1985-07-15','Bachelor',5,'JavaScript, React','123 Main St, Springfield','cv_john_doe.pdf'),('michael_jones','Michael Jones','1988-11-12','Bachelor',3,'C++, Java','789 Pine St, Rivertown','cv_michael_jones.pdf'),('robert_wilson','Robert Wilson','1987-05-05','PhD',10,'Machine Learning, AI','202 Birch St, Hilltop','cv_robert_wilson.pdf'),('susan_lee','Susan Lee','1992-09-30','Master',4,'SQL, Node.js','101 Oak St, Lakeview','cv_susan_lee.pdf');
/*!40000 ALTER TABLE `userjobseeker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `UserName` varchar(50) NOT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`UserName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('admin','admin123','trongtruyen04@gmail.com',NULL),('anna_smith','hashed_password_2','anna.smith@example.com',''),('employer1','password1','employer1@example.com',''),('employer3','password3','employer3@example.com',''),('john_doe','hashed_password_1','john.doe@example.com',''),('michael_jones','hashed_password_3','michael.jones@example.com',''),('robert_wilson','hashed_password_5','robert.wilson@example.com',''),('susan_lee','hashed_password_4','susan.lee@example.com','');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-20 19:19:32
