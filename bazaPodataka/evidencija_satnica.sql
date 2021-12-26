-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 26, 2021 at 04:56 PM
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
  `id` int(11) NOT NULL,
  `ime` varchar(20) NOT NULL,
  `prezime` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `lozinka` varchar(20) NOT NULL,
  `rola` varchar(20) NOT NULL,
  `ime_firme` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `korisnici`
--

INSERT INTO `korisnici` (`id`, `ime`, `prezime`, `email`, `lozinka`, `rola`, `ime_firme`) VALUES
(1, 'admin', 'admin', 'admin', 'admin', 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `poslodavac_informacije`
--

CREATE TABLE `poslodavac_informacije` (
  `ime_firme` varchar(20) NOT NULL,
  `moze_da_koristi` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `poslodavac_informacije`
--

INSERT INTO `poslodavac_informacije` (`ime_firme`, `moze_da_koristi`) VALUES
('admin', 1);

-- --------------------------------------------------------

--
-- Table structure for table `radnik_informacije`
--

CREATE TABLE `radnik_informacije` (
  `id` int(11) NOT NULL,
  `id_korisnika` int(11) NOT NULL,
  `broj_telefona` varchar(10) NOT NULL,
  `ime_firme` varchar(20) NOT NULL,
  `satnica` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `satnice`
--

CREATE TABLE `satnice` (
  `id` int(11) NOT NULL,
  `korisnik_id_radnik` int(11) NOT NULL,
  `korisnik_id_poslodavac` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `datum` varchar(50) NOT NULL,
  `sati_od_do` varchar(50) NOT NULL,
  `satnica` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `korisnici`
--
ALTER TABLE `korisnici`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `korisnici_poslodavac` (`ime_firme`);

--
-- Indexes for table `poslodavac_informacije`
--
ALTER TABLE `poslodavac_informacije`
  ADD PRIMARY KEY (`ime_firme`);

--
-- Indexes for table `radnik_informacije`
--
ALTER TABLE `radnik_informacije`
  ADD PRIMARY KEY (`id`),
  ADD KEY `radnik_poslodavac` (`ime_firme`),
  ADD KEY `radnik_korisnik` (`id_korisnika`);

--
-- Indexes for table `satnice`
--
ALTER TABLE `satnice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `satnice_korisnik_poslodavac` (`korisnik_id_poslodavac`),
  ADD KEY `satnice_korisnik_radnik` (`korisnik_id_radnik`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `korisnici`
--
ALTER TABLE `korisnici`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `radnik_informacije`
--
ALTER TABLE `radnik_informacije`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `satnice`
--
ALTER TABLE `satnice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `korisnici`
--
ALTER TABLE `korisnici`
  ADD CONSTRAINT `korisnici_poslodavac` FOREIGN KEY (`ime_firme`) REFERENCES `poslodavac_informacije` (`ime_firme`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `radnik_informacije`
--
ALTER TABLE `radnik_informacije`
  ADD CONSTRAINT `radnik_korisnik` FOREIGN KEY (`id_korisnika`) REFERENCES `korisnici` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `radnik_poslodavac` FOREIGN KEY (`ime_firme`) REFERENCES `poslodavac_informacije` (`ime_firme`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `satnice`
--
ALTER TABLE `satnice`
  ADD CONSTRAINT `satnice_korisnik_poslodavac` FOREIGN KEY (`korisnik_id_poslodavac`) REFERENCES `korisnici` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `satnice_korisnik_radnik` FOREIGN KEY (`korisnik_id_radnik`) REFERENCES `korisnici` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
