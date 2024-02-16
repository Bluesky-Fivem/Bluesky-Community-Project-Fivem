-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.2.0-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for blueskysql
CREATE DATABASE IF NOT EXISTS `blueskysql` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `blueskysql`;

-- Dumping structure for table blueskysql.changelogs
CREATE TABLE IF NOT EXISTS `changelogs` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NULL DEFAULT current_timestamp(),
  `log` text DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table blueskysql.changelogs: ~0 rows (approximately)

-- Dumping structure for table blueskysql.characters
CREATE TABLE IF NOT EXISTS `characters` (
  `_id` int(255) NOT NULL AUTO_INCREMENT,
  `User` varchar(50) DEFAULT NULL,
  `First` varchar(255) DEFAULT NULL,
  `Last` varchar(255) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Gender` varchar(50) DEFAULT NULL,
  `Bio` varchar(50) DEFAULT NULL,
  `DOB` varchar(50) DEFAULT NULL,
  `LastPlayed` bigint(20) DEFAULT NULL,
  `Job` longtext DEFAULT NULL,
  `Armor` int(11) DEFAULT NULL,
  `HP` int(11) DEFAULT NULL,
  `skin` longtext DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table blueskysql.characters: ~6 rows (approximately)
INSERT IGNORE INTO `characters` (`_id`, `User`, `First`, `Last`, `Phone`, `Gender`, `Bio`, `DOB`, `LastPlayed`, `Job`, `Armor`, `HP`, `skin`) VALUES
	(22, '5', 'saaaaaaaaa', 'aesads', '4155662556', '0', NULL, '1990-12-31T23:59:59.000Z', -1, '{"salary":10,"grade":{"label":"Unemployed","id":0,"level":0},"job":"unemployed","label":"Unemployed","workplace":{"id":0,"label":"Unemployed"}}', 100, 200, NULL),
	(23, '5', 'ssssssssssssssssss', 'ssssssssssssssss', '4156491944', '0', NULL, '1990-12-31T23:59:59.000Z', -1, '{"job":"unemployed","label":"Unemployed","grade":{"level":0,"id":0,"label":"Unemployed"},"workplace":{"label":"Unemployed","id":0},"salary":10}', 100, 200, NULL),
	(24, '5', 'ssssssssssssssss', 'sssssssssssssssssss', '4154813568', '0', NULL, '1990-12-31T23:59:59.000Z', -1, '{"workplace":{"label":"Unemployed","id":0},"grade":{"id":0,"label":"Unemployed","level":0},"label":"Unemployed","job":"unemployed","salary":10}', 100, 200, NULL),
	(25, '5', 'aaaaaaaaaaaaaaa', 'aaaaaaaaa', '6286799073', '0', NULL, '1990-12-31T23:59:59.000Z', -1, '{"workplace":{"label":"Unemployed","id":0},"grade":{"id":0,"label":"Unemployed","level":0},"job":"unemployed","label":"Unemployed","salary":10}', 100, 200, NULL),
	(26, '5', 'ssssssssssssssssssss', 'qqqqqqqqqqqqqqqq', '4155147551', '0', NULL, '1990-12-31T23:59:59.000Z', -1, '{"job":"unemployed","grade":{"label":"Unemployed","id":0,"level":0},"workplace":{"id":0,"label":"Unemployed"},"salary":10,"label":"Unemployed"}', 100, 200, NULL),
	(27, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b', 'aaaaaaaaaaaa', 'ddddddddddddddd', '4158406820', '0', NULL, '1990-12-31T23:59:59.000Z', -1, '{"grade":{"label":"Unemployed","level":0,"id":0},"salary":10,"job":"unemployed","workplace":{"label":"Unemployed","id":0},"label":"Unemployed"}', 100, 200, NULL);

-- Dumping structure for table blueskysql.dealerships
CREATE TABLE IF NOT EXISTS `dealerships` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table blueskysql.dealerships: ~0 rows (approximately)

-- Dumping structure for table blueskysql.locations
CREATE TABLE IF NOT EXISTS `locations` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `Type` varchar(255) DEFAULT NULL,
  `Coords` varchar(255) DEFAULT NULL,
  `x` float DEFAULT NULL,
  `y` float DEFAULT NULL,
  `z` float DEFAULT NULL,
  `h` float DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table blueskysql.locations: ~1 rows (approximately)
INSERT IGNORE INTO `locations` (`_id`, `Name`, `Type`, `Coords`, `x`, `y`, `z`, `h`) VALUES
	(1, 'mrpd', 'spawn', '1', 1000, 1000, 1000, 1000);

-- Dumping structure for table blueskysql.logs
CREATE TABLE IF NOT EXISTS `logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level` int(11) DEFAULT NULL,
  `log` text DEFAULT NULL,
  `date` int(11) DEFAULT NULL,
  `server` int(11) DEFAULT NULL,
  `component` varchar(255) DEFAULT NULL,
  `extra` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table blueskysql.logs: ~0 rows (approximately)

-- Dumping structure for table blueskysql.peds
CREATE TABLE IF NOT EXISTS `peds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `char_id` int(11) DEFAULT NULL,
  `ped` longtext DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `char_id` (`char_id`),
  CONSTRAINT `peds_ibfk_1` FOREIGN KEY (`char_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table blueskysql.peds: ~0 rows (approximately)

-- Dumping structure for table blueskysql.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `sid` varchar(255) DEFAULT NULL,
  `identifier` varchar(255) DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `roles` varchar(50) DEFAULT NULL,
  `group` varchar(50) DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table blueskysql.users: ~2 rows (approximately)
INSERT IGNORE INTO `users` (`id`, `name`, `sid`, `identifier`, `priority`, `roles`, `group`) VALUES
	(5, 'luke1', 'e:a7602f66b0a43e8efdc232765bbb0e2b63bab26b@blue.sky', 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b', 0, 'user', 'user');

-- Dumping structure for table blueskysql.wallets
CREATE TABLE IF NOT EXISTS `wallets` (
  `Char` varchar(50) NOT NULL,
  `Cash` int(11) NOT NULL DEFAULT 5000,
  PRIMARY KEY (`Char`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table blueskysql.wallets: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
