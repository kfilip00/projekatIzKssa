-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 23, 2021 at 11:16 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `evidencija_satnica`
--

-- --------------------------------------------------------

--
-- Table structure for table `korisnici`
--

CREATE TABLE `korisnici` (
  `ime` varchar(20) NOT NULL,
  `prezime` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `lozinka` varchar(20) NOT NULL,
  `rola` varchar(20) NOT NULL,
  `ime_firme` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `korisnici`
--

INSERT INTO `korisnici` (`ime`, `prezime`, `email`, `lozinka`, `rola`, `ime_firme`) VALUES
('Admin', 'Admin', 'admin', 'admin', 'admin', '');

-- --------------------------------------------------------

--
-- Table structure for table `poslodavac_informacije`
--

CREATE TABLE `poslodavac_informacije` (
  `ime_firme` varchar(20) NOT NULL,
  `pretplacen_do` varchar(10) NOT NULL,
  `moze_da_koristi` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `korisnici`
--
ALTER TABLE `korisnici`
  ADD PRIMARY KEY (`ime_firme`);

--
-- Indexes for table `poslodavac_informacije`
--
ALTER TABLE `poslodavac_informacije`
  ADD KEY `poslodavac_korisnici` (`ime_firme`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `poslodavac_informacije`
--
ALTER TABLE `poslodavac_informacije`
  ADD CONSTRAINT `poslodavac_korisnici` FOREIGN KEY (`ime_firme`) REFERENCES `korisnici` (`ime_firme`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
