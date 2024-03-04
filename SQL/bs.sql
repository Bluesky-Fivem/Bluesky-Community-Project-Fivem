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
  `inventory` longtext DEFAULT NULL,
  `Cash` int(255) DEFAULT 500,
  `Bank` int(255) DEFAULT 5000,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table blueskysql.characters: ~4 rows (approximately)
INSERT IGNORE INTO `characters` (`_id`, `User`, `First`, `Last`, `Phone`, `Gender`, `Bio`, `DOB`, `LastPlayed`, `Job`, `Armor`, `HP`, `skin`, `Admin`, `inventory`, `Cash`, `Bank`) VALUES
	(54, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b', 'dddddddddd', 'ddddddddddd', '6284647432', '0', NULL, '1990-12-31T23:59:59.000Z', 1709589400000, '{"job":"police","workplace":{"label":"Los Santos Police Department","id":1},"salary":200,"grade":{"level":0,"label":"Cadet","id":"lspd_cadet"},"label":"Police"}', 0, 200, '{"customization":{"components":{"shoes":{"componentId":6,"paletteId":0,"textureId":0,"drawableId":0},"bag":{"componentId":5,"paletteId":0,"textureId":0,"drawableId":0},"mask":{"componentId":1,"paletteId":0,"textureId":0,"drawableId":0},"kevlar":{"componentId":9,"paletteId":0,"textureId":0,"drawableId":0},"torso2":{"componentId":11,"paletteId":0,"textureId":0,"drawableId":0},"undershirt":{"componentId":8,"paletteId":0,"textureId":0,"drawableId":0},"leg":{"componentId":4,"paletteId":0,"textureId":0,"drawableId":0},"face":{"componentId":0,"paletteId":0,"textureId":0,"drawableId":0},"accessory":{"componentId":7,"paletteId":0,"textureId":0,"drawableId":0},"torso":{"componentId":3,"paletteId":0,"textureId":0,"drawableId":0},"hair":{"componentId":2,"paletteId":0,"textureId":0,"drawableId":0},"badge":{"componentId":10,"paletteId":0,"textureId":0,"drawableId":0}},"face":{"face1":{"index":0,"texture":0,"mix":50.0},"face2":{"index":0,"texture":0,"mix":50.0},"features":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"props":{"watch":{"componentId":6,"disabled":true,"textureId":0,"drawableId":0},"bracelet":{"componentId":7,"disabled":true,"textureId":0,"drawableId":0},"glass":{"componentId":1,"disabled":true,"textureId":0,"drawableId":0},"hat":{"componentId":0,"disabled":true,"textureId":0,"drawableId":0},"ear":{"componentId":2,"disabled":true,"textureId":0,"drawableId":0}},"overlay":{"eyebrows":{"id":2,"opacity":100.0,"index":0,"disabled":true},"freckles":{"id":9,"opacity":100.0,"index":0,"disabled":true},"blemish":{"id":0,"opacity":100.0,"index":0,"disabled":true},"complexion":{"id":6,"opacity":100.0,"index":0,"disabled":true},"bodyblemish":{"id":11,"opacity":100.0,"index":0,"disabled":true},"makeup":{"id":4,"opacity":100.0,"index":0,"disabled":true},"ageing":{"id":3,"opacity":100.0,"index":0,"disabled":true},"sundamage":{"id":7,"opacity":100.0,"index":0,"disabled":true},"facialhair":{"id":1,"opacity":100.0,"index":0,"disabled":true},"blush":{"id":5,"opacity":100.0,"index":0,"disabled":true},"lipstick":{"id":8,"opacity":100.0,"index":0,"disabled":true},"addbodyblemish":{"id":12,"opacity":100.0,"index":0,"disabled":true},"chesthair":{"id":10,"opacity":100.0,"index":0,"disabled":true}},"colors":{"facialhair":{"color2":{"rgb":"rgb(0, 0, 0)","index":0},"color1":{"rgb":"rgb(0, 0, 0)","index":0}},"chesthair":{"color2":{"rgb":"rgb(0, 0, 0)","index":0},"color1":{"rgb":"rgb(0, 0, 0)","index":0}},"hair":{"color2":{"rgb":"rgb(0, 0, 0)","index":0},"color1":{"rgb":"rgb(0, 0, 0)","index":0}}}},"model":""}', 'dev', '[{"name":"money","count":99971,"slot":1},{"name":"phone","count":1,"slot":2}]', 10001718, 5000),
	(60, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b', 'sssssssssss', 'ssssssssssssssssssss', '6285682218', '0', NULL, '2000-01-01T00:00:00.000Z', 1708735647000, '{"grade":{"level":0,"id":0,"label":"Unemployed"},"label":"Unemployed","workplace":{"label":"Unemployed","id":0},"salary":10,"job":"unemployed"}', 0, 200, NULL, 'user', NULL, 5000, 5000),
	(61, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b', 'wwwwwwwwwwwww', 'wwwwwwwwwwwwwwwww', '4157392653', '0', NULL, '1990-12-31T23:59:59.000Z', 1708735647000, '{"salary":10,"label":"Unemployed","workplace":{"id":0,"label":"Unemployed"},"job":"unemployed","grade":{"id":0,"level":0,"label":"Unemployed"}}', 0, 200, NULL, 'user', NULL, 5000, 5000),
	(62, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b', 'Test', 'McTest', '4155395233', '0', NULL, '1990-12-31T23:59:59.000Z', -1, '{"salary":10,"grade":{"level":0,"id":0,"label":"Unemployed"},"workplace":{"id":0,"label":"Unemployed"},"job":"unemployed","label":"Unemployed"}', 100, 200, NULL, 'user', NULL, 5000, 5000);

-- Dumping structure for table blueskysql.character_emails
CREATE TABLE IF NOT EXISTS `character_emails` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `owner` int(11) DEFAULT NULL,
  `sender` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `body` text DEFAULT NULL,
  `unread` tinyint(1) DEFAULT NULL,
  `flags` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table blueskysql.character_emails: ~0 rows (approximately)

-- Dumping structure for table blueskysql.counters
CREATE TABLE IF NOT EXISTS `counters` (
  `type` varchar(255) NOT NULL,
  `next` int(11) NOT NULL,
  PRIMARY KEY (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table blueskysql.counters: ~0 rows (approximately)
INSERT IGNORE INTO `counters` (`type`, `next`) VALUES
	('doors', 1);

-- Dumping structure for table blueskysql.dealerships
CREATE TABLE IF NOT EXISTS `dealerships` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table blueskysql.dealerships: ~0 rows (approximately)

-- Dumping structure for table blueskysql.doors
CREATE TABLE IF NOT EXISTS `doors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `x` float NOT NULL,
  `y` float NOT NULL,
  `z` float NOT NULL,
  `h` float NOT NULL,
  `Pitch` float NOT NULL,
  `Yaw` float NOT NULL,
  `DrawDistance` float NOT NULL,
  `Public` tinyint(1) DEFAULT NULL,
  `Multi` int(11) NOT NULL,
  `DoorType` varchar(255) NOT NULL,
  `Model` varchar(255) NOT NULL,
  `Lock` tinyint(4) NOT NULL,
  `DefaultLock` tinyint(1) NOT NULL,
  `Auth` tinyint(1) DEFAULT NULL,
  `Static` tinyint(1) DEFAULT NULL,
  `Lockpickable` tinyint(1) DEFAULT NULL,
  `Lockdown` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table blueskysql.doors: ~0 rows (approximately)

-- Dumping structure for table blueskysql.inventory
CREATE TABLE IF NOT EXISTS `inventory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '0',
  `information` text DEFAULT NULL,
  `slot` int(11) NOT NULL,
  `dropped` tinyint(1) NOT NULL DEFAULT 0,
  `creationDate` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=420 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table blueskysql.inventory: ~0 rows (approximately)

-- Dumping structure for table blueskysql.locations
CREATE TABLE IF NOT EXISTS `locations` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `Type` varchar(255) DEFAULT NULL,
  `x` float DEFAULT NULL,
  `y` float DEFAULT NULL,
  `z` float DEFAULT NULL,
  `h` float DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table blueskysql.locations: ~1 rows (approximately)
INSERT IGNORE INTO `locations` (`_id`, `Name`, `Type`, `x`, `y`, `z`, `h`) VALUES
	(2, 'MRPD', 'spawn', 429.218, -982.734, 30.6952, 85.0394);

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table blueskysql.logs: ~12 rows (approximately)
INSERT IGNORE INTO `logs` (`id`, `level`, `log`, `date`, `server`, `component`, `extra`) VALUES
	(1, 0, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b attempted to use an admin command but failed Admin Validation.', 1708119952, NULL, 'Commands', NULL),
	(2, 0, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b attempted to use an admin command but failed Admin Validation.', 1708120000, NULL, 'Commands', NULL),
	(3, 0, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b attempted to use an admin command but failed Admin Validation.', 1708120000, NULL, 'Commands', NULL),
	(4, 0, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b attempted to use an admin command but failed Admin Validation.', 1708120001, NULL, 'Commands', NULL),
	(5, 0, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b attempted to use an admin command but failed Admin Validation.', 1708120793, NULL, 'Commands', NULL),
	(6, 0, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b attempted to use an admin command but failed Admin Validation.', 1708120795, NULL, 'Commands', NULL),
	(7, 0, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b attempted to use an admin command but failed Admin Validation.', 1708120796, NULL, 'Commands', NULL),
	(8, 0, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b attempted to use an admin command but failed Admin Validation.', 1708120796, NULL, 'Commands', NULL),
	(9, 0, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b attempted to use an admin command but failed Admin Validation.', 1708120796, NULL, 'Commands', NULL),
	(10, 0, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b attempted to use an admin command but failed Admin Validation.', 1708120858, NULL, 'Commands', NULL),
	(11, 0, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b attempted to use an admin command but failed Admin Validation.', 1708120858, NULL, 'Commands', NULL),
	(12, 0, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b attempted to use an admin command but failed Admin Validation.', 1708122334, NULL, 'Commands', NULL),
	(13, 0, 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b attempted to use an admin command but failed Admin Validation.', 1708122335, NULL, 'Commands', NULL);

-- Dumping structure for table blueskysql.ox_inventory
CREATE TABLE IF NOT EXISTS `ox_inventory` (
  `owner` varchar(60) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `data` longtext DEFAULT NULL,
  `lastupdated` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  UNIQUE KEY `owner` (`owner`,`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table blueskysql.ox_inventory: ~0 rows (approximately)
INSERT IGNORE INTO `ox_inventory` (`owner`, `name`, `data`, `lastupdated`) VALUES
	('54', '1', '[{"slot":1,"count":4,"name":"bandage"}]', '2024-02-21 16:30:05');

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

-- Dumping structure for table blueskysql.phone_contacts
CREATE TABLE IF NOT EXISTS `phone_contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `citizenid` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `citizenid` (`citizenid`(768)) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table blueskysql.phone_contacts: ~4 rows (approximately)
INSERT IGNORE INTO `phone_contacts` (`id`, `citizenid`, `name`, `phone`) VALUES
	(1, '54', 'l', '458587'),
	(2, '54', 'jjjjjjj', '41141414141'),
	(3, '54', 'jjjjj', '44444444'),
	(4, '54', 'hhhhhh', '41414414');

-- Dumping structure for table blueskysql.phone_documents
CREATE TABLE IF NOT EXISTS `phone_documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `citizenid` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '',
  `type` int(11) DEFAULT NULL,
  `title` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `signatures` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '[]',
  `sharees` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '[]',
  `finalized` int(11) DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `citizenid` (`citizenid`),
  KEY `sharees` (`sharees`(1024))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table blueskysql.phone_documents: ~1 rows (approximately)
INSERT IGNORE INTO `phone_documents` (`id`, `citizenid`, `type`, `title`, `content`, `signatures`, `sharees`, `finalized`) VALUES
	(1, '54', 0, '4', '4', '[]', '[]', 0),
	(3, '54', 0, 'ttttttttttttttttt', '<p>hhhhhhhhhhhhhhhhh</p>', '[]', '[]', 0);

-- Dumping structure for table blueskysql.player_inventory
CREATE TABLE IF NOT EXISTS `player_inventory` (
  `item_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '0',
  `information` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '0',
  `slot` int(11) NOT NULL,
  `dropped` tinyint(4) NOT NULL DEFAULT 0,
  `quality` int(11) NOT NULL DEFAULT 100,
  `creationDate` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table blueskysql.player_inventory: ~10 rows (approximately)
INSERT IGNORE INTO `player_inventory` (`item_id`, `id`, `name`, `information`, `slot`, `dropped`, `quality`, `creationDate`) VALUES
	('sandwich', 144, 'ply-54', '{}', 1, 0, 100, 1709588382626),
	('sandwich', 145, 'ply-54', '{}', 1, 0, 100, 1709588384151),
	('sandwich', 146, 'ply-54', '{}', 1, 0, 100, 1709588385467),
	('hamburger', 147, 'ply-54', '{}', 2, 0, 100, 1709588388313),
	('hamburger', 148, 'ply-54', '{}', 2, 0, 100, 1709588389526),
	('cola', 149, 'ply-54', '{}', 3, 0, 100, 1709588390789),
	('water', 150, 'ply-54', '{}', 4, 0, 100, 1709588392154),
	('vodka', 151, 'ply-54', '{}', 5, 0, 100, 1709588393568),
	('whiskey', 152, 'ply-54', '{}', 6, 0, 100, 1709588394941);

-- Dumping structure for table blueskysql.player_vehicles
CREATE TABLE IF NOT EXISTS `player_vehicles` (
  `id` int(11) DEFAULT NULL,
  `glovebox` longtext DEFAULT NULL,
  `trunk` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table blueskysql.player_vehicles: ~0 rows (approximately)

-- Dumping structure for table blueskysql.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `sid` varchar(255) DEFAULT NULL,
  `identifier` varchar(255) DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `roles` varchar(50) DEFAULT NULL,
  `group` varchar(50) DEFAULT 'user',
  `inventory` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table blueskysql.users: ~2 rows (approximately)
INSERT IGNORE INTO `users` (`id`, `name`, `sid`, `identifier`, `priority`, `roles`, `group`, `inventory`) VALUES
	(5, 'luke1', 'e:a7602f66b0a43e8efdc232765bbb0e2b63bab26b@blue.sky', 'license:a7602f66b0a43e8efdc232765bbb0e2b63bab26b', 0, 'dev', 'user', NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
