CREATE DATABASE IF NOT EXISTS `vaccination_booking_system` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vaccination_booking_system`;

CREATE TABLE `booking` (
    `id` int NOT NULL AUTO_INCREMENT,
    `vaccine` VARCHAR(255) NOT NULL,
    `venue` VARCHAR(255) NOT NULL,
    `date` date NOT NULL,
    `timeslot` VARCHAR(255) NOT NULL,
    `zhName` VARCHAR(256) NOT NULL,
    `zhNameIv` BLOB NOT NULL,
    `enName` VARCHAR(256) NOT NULL,
    `enNameIv` BLOB NOT NULL,
    `gender` VARCHAR(1) NOT NULL,
    `dob` VARCHAR(256) NOT NULL,
    `dobIv` BLOB NOT NULL,
    `phoneNo` VARCHAR(256) NOT NULL,
    `phoneNoIv` BLOB NOT NULL,
    `hkid` VARCHAR(256) NOT NULL,
    `hkidIv` BLOB NOT NULL,
    `address` VARCHAR(256) NOT NULL,
    `addressIv` BLOB NOT NULL,
    `placeOfBirth` VARCHAR(256) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `venues` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `vaccine` VARCHAR(255) NOt NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;