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
  `Admin` varchar(50) DEFAULT 'user',
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table blueskysql.characters: ~1 rows (approximately)
INSERT IGNORE INTO `characters` (`_id`, `User`, `First`, `Last`, `Phone`, `Gender`, `Bio`, `DOB`, `LastPlayed`, `Job`, `Armor`, `HP`, `skin`, `Admin`) VALUES
	(54, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b', 'dddddddddd', 'ddddddddddd', '6284647432', '0', NULL, '1990-12-31T23:59:59.000Z', 1708120042000, '{"grade":{"level":0,"label":"Unemployed","id":0},"workplace":{"label":"Unemployed","id":0},"salary":10,"job":"unemployed","label":"Unemployed"}', 0, 175, '{"customization":{"components":{"shoes":{"componentId":6,"paletteId":0,"textureId":0,"drawableId":0},"bag":{"componentId":5,"paletteId":0,"textureId":0,"drawableId":0},"mask":{"componentId":1,"paletteId":0,"textureId":0,"drawableId":0},"kevlar":{"componentId":9,"paletteId":0,"textureId":0,"drawableId":0},"torso2":{"componentId":11,"paletteId":0,"textureId":0,"drawableId":0},"undershirt":{"componentId":8,"paletteId":0,"textureId":0,"drawableId":0},"leg":{"componentId":4,"paletteId":0,"textureId":0,"drawableId":0},"face":{"componentId":0,"paletteId":0,"textureId":0,"drawableId":0},"accessory":{"componentId":7,"paletteId":0,"textureId":0,"drawableId":0},"torso":{"componentId":3,"paletteId":0,"textureId":0,"drawableId":0},"hair":{"componentId":2,"paletteId":0,"textureId":0,"drawableId":0},"badge":{"componentId":10,"paletteId":0,"textureId":0,"drawableId":0}},"face":{"face1":{"index":0,"texture":0,"mix":50.0},"face2":{"index":0,"texture":0,"mix":50.0},"features":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"props":{"watch":{"componentId":6,"disabled":true,"textureId":0,"drawableId":0},"bracelet":{"componentId":7,"disabled":true,"textureId":0,"drawableId":0},"glass":{"componentId":1,"disabled":true,"textureId":0,"drawableId":0},"hat":{"componentId":0,"disabled":true,"textureId":0,"drawableId":0},"ear":{"componentId":2,"disabled":true,"textureId":0,"drawableId":0}},"overlay":{"eyebrows":{"id":2,"opacity":100.0,"index":0,"disabled":true},"freckles":{"id":9,"opacity":100.0,"index":0,"disabled":true},"blemish":{"id":0,"opacity":100.0,"index":0,"disabled":true},"complexion":{"id":6,"opacity":100.0,"index":0,"disabled":true},"bodyblemish":{"id":11,"opacity":100.0,"index":0,"disabled":true},"makeup":{"id":4,"opacity":100.0,"index":0,"disabled":true},"ageing":{"id":3,"opacity":100.0,"index":0,"disabled":true},"sundamage":{"id":7,"opacity":100.0,"index":0,"disabled":true},"facialhair":{"id":1,"opacity":100.0,"index":0,"disabled":true},"blush":{"id":5,"opacity":100.0,"index":0,"disabled":true},"lipstick":{"id":8,"opacity":100.0,"index":0,"disabled":true},"addbodyblemish":{"id":12,"opacity":100.0,"index":0,"disabled":true},"chesthair":{"id":10,"opacity":100.0,"index":0,"disabled":true}},"colors":{"facialhair":{"color2":{"rgb":"rgb(0, 0, 0)","index":0},"color1":{"rgb":"rgb(0, 0, 0)","index":0}},"chesthair":{"color2":{"rgb":"rgb(0, 0, 0)","index":0},"color1":{"rgb":"rgb(0, 0, 0)","index":0}},"hair":{"color2":{"rgb":"rgb(0, 0, 0)","index":0},"color1":{"rgb":"rgb(0, 0, 0)","index":0}}}},"model":""}', 'dev');

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table blueskysql.logs: ~0 rows (approximately)
INSERT IGNORE INTO `logs` (`id`, `level`, `log`, `date`, `server`, `component`, `extra`) VALUES
	(1, 0, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b attempted to use an admin command but failed Admin Validation.', 1708119952, NULL, 'Commands', NULL),
	(2, 0, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b attempted to use an admin command but failed Admin Validation.', 1708120000, NULL, 'Commands', NULL),
	(3, 0, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b attempted to use an admin command but failed Admin Validation.', 1708120000, NULL, 'Commands', NULL),
	(4, 0, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b attempted to use an admin command but failed Admin Validation.', 1708120001, NULL, 'Commands', NULL);

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
