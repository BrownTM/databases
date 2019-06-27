DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS `users`;
		
CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'rooms'
-- 
-- ---

DROP TABLE IF EXISTS `rooms`;
		
CREATE TABLE `rooms` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `roomname` VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'messages'
-- 
-- ---

DROP TABLE IF EXISTS `messages`;
		
CREATE TABLE `messages` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL,
  `room_id` INTEGER NOT NULL,
  `text` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `messages` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `messages` ADD FOREIGN KEY (room_id) REFERENCES `rooms` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `rooms` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `messages` (`id`,`user_id`,`room_id`,`text`) VALUES
-- ('','','','');