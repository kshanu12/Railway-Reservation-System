-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 02, 2022 at 08:50 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rail`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `no_of_passengers` (IN `bid` INT(10))  NO SQL
BEGIN
UPDATE bookings
SET bookings.passenger_no=(SELECT COUNT(*)
FROM passengers p WHERE p.b_id=bid)
WHERE bookings.b_id=bid;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `b_id` int(10) NOT NULL,
  `t_no` int(10) NOT NULL,
  `id` int(10) NOT NULL,
  `passenger_no` int(10) NOT NULL,
  `pay_status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`b_id`, `t_no`, `id`, `passenger_no`, `pay_status`) VALUES
(1, 1024, 1, 1, ''),
(2, 1024, 1, 2, ''),
(4, 1024, 1, 1, ''),
(5, 1024, 1, 1, ''),
(6, 3421, 1, 1, ''),
(7, 3421, 1, 1, ''),
(8, 1024, 1, 0, ''),
(9, 3421, 1, 0, ''),
(10, 1024, 1, 2, ''),
(12, 1024, 1, 2, ''),
(13, 3421, 1, 2, ''),
(14, 3421, 1, 2, '');

-- --------------------------------------------------------

--
-- Table structure for table `passengers`
--

CREATE TABLE `passengers` (
  `p_id` int(10) NOT NULL,
  `b_id` int(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `age` int(3) NOT NULL,
  `gender` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `passengers`
--

INSERT INTO `passengers` (`p_id`, `b_id`, `name`, `age`, `gender`) VALUES
(1, 2, 'Shanu', 21, 'Male'),
(2, 2, 'Avnish', 20, 'Male'),
(5, 4, 'shanu', 21, 'Male'),
(7, 5, 'shanu', 21, 'Male'),
(9, 6, 'ksh', 20, 'Male'),
(10, 7, 'aa', 20, 'Male'),
(12, 8, 'Kumar', 21, 'Male'),
(13, 8, 'Shanu', 20, 'Male'),
(14, 9, 'sh', 15, 'Male'),
(15, 9, 'su', 20, 'Male'),
(16, 10, 'Kumar', 21, 'Male'),
(17, 10, 'sakshi', 23, 'Female'),
(18, 11, 'sakshi', 32, 'Female'),
(19, 11, 'shanu', 21, 'Male'),
(20, 12, 'shanu', 1, 'Male'),
(21, 12, 'kumar', 2, 'Male'),
(22, 13, 'ktrk', 30, 'Male'),
(23, 13, 'Nikhil', 20, 'Male'),
(24, 14, 'kor', 45, 'Male'),
(25, 14, 'rin', 67, 'Male');

-- --------------------------------------------------------

--
-- Table structure for table `trains`
--

CREATE TABLE `trains` (
  `t_no` int(4) NOT NULL,
  `t_name` varchar(30) NOT NULL,
  `fromstn` varchar(30) NOT NULL,
  `tostn` varchar(30) NOT NULL,
  `arrival` varchar(10) NOT NULL,
  `departure` varchar(10) NOT NULL,
  `seat_avail` int(3) NOT NULL,
  `cost` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trains`
--

INSERT INTO `trains` (`t_no`, `t_name`, `fromstn`, `tostn`, `arrival`, `departure`, `seat_avail`, `cost`) VALUES
(1024, 'GareebRath', 'RNC', 'BNC', '05:19', '19:50', 69, 824),
(3421, 'Express', 'RNC', 'BNC', '02:30', '16:20', 19, 792);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(4) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `age` int(3) NOT NULL,
  `mobile` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `gender`, `age`, `mobile`) VALUES
(1, 'Kumar Shanu', 'kumarshanu38370@gmail.com', 'a', 'Male', 21, '8088038370'),
(2, 'Divya', 'divya@gmail.com', 'as', 'Female', 21, '1234567890');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`b_id`);

--
-- Indexes for table `passengers`
--
ALTER TABLE `passengers`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `trains`
--
ALTER TABLE `trains`
  ADD PRIMARY KEY (`t_no`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `b_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `passengers`
--
ALTER TABLE `passengers`
  MODIFY `p_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
