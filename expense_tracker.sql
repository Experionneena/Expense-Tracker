-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 12, 2017 at 04:40 PM
-- Server version: 5.5.53-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `expense_tracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `expense`
--

CREATE TABLE IF NOT EXISTS `expense` (
  `expense_id` int(11) NOT NULL AUTO_INCREMENT,
  `empid` int(11) NOT NULL,
  `date` date NOT NULL,
  `category` varchar(30) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `bill` varchar(100) NOT NULL,
  PRIMARY KEY (`expense_id`),
  KEY `empid` (`empid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=30 ;

--
-- Dumping data for table `expense`
--

INSERT INTO `expense` (`expense_id`, `empid`, `date`, `category`, `amount`, `bill`) VALUES
(26, 512, '2017-01-12', 'Food', 1000.00, 'desktop.jpg'),
(27, 503, '2017-01-18', 'Health', 500.00, 'images.jpeg'),
(28, 503, '2017-01-10', 'Health', 500.00, 'mobile.jpg'),
(29, 512, '2017-01-03', 'Food', 1000.00, '20170103_160828.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `empid` int(11) NOT NULL,
  `empname` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`empid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`empid`, `empname`, `password`, `email`, `status`) VALUES
(503, 'Athira', 'athira', 'athira.s@experionglobal.com', 0),
(510, 'Neena', 'neena', 'neena.augustine@experionglobal.com', 1),
(512, 'Osheen', 'osheen', 'osheen.varghese@experionglobal.com', 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `expense`
--
ALTER TABLE `expense`
  ADD CONSTRAINT `expense_ibfk_1` FOREIGN KEY (`empid`) REFERENCES `user` (`empid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
