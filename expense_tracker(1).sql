-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 02, 2017 at 11:54 AM
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=235 ;

--
-- Dumping data for table `expense`
--

INSERT INTO `expense` (`expense_id`, `empid`, `date`, `category`, `amount`, `bill`) VALUES
(99, 512, '2016-12-26', 'Health', 500.00, 'images45.jpeg'),
(111, 497, '2016-11-01', 'Accomodation', 800.00, '1484744756168image1.jpeg'),
(112, 501, '2016-12-27', 'Others', 8000.00, '1484744789807Picture 078.jpg'),
(114, 497, '2017-01-04', 'Others', 800.00, '1484806259659radiology-bill-paid.jpg'),
(116, 501, '2017-01-03', 'Food', 500.00, ''),
(117, 501, '2017-01-16', 'Travel', 600.00, ''),
(134, 555, '2017-01-03', 'Fuel', 200.00, ''),
(135, 497, '2017-01-10', 'Fuel', 2500.00, '1485165005288bpbill45l.jpg'),
(137, 501, '2017-01-05', 'Health', 2000.00, '1485165561267hospbill.jpeg'),
(138, 503, '2017-01-03', 'Others', 200.00, ''),
(143, 503, '2017-01-03', 'Accomodation', 400.00, '1485233351164zimbabwe-2dcrisis-2d20.jpg'),
(147, 503, '2017-01-03', 'Fuel', 2000.00, '1485240501697bpbill45l.jpg'),
(149, 512, '2017-01-31', 'Food', 1000.00, '1485243500660facebook-icon-preview-400x400.png'),
(158, 503, '2017-01-02', 'Food', 200.00, '1485255590720images.jpeg'),
(187, 497, '2016-12-27', 'Travel', 1800.00, '1485325780581thumb.php.jpeg'),
(190, 555, '2017-01-02', 'Food', 150.00, '1485327604279images123.jpeg'),
(191, 512, '2017-01-09', 'Fuel', 1000.00, '1485327780030receipt.jpg'),
(192, 900, '2017-01-02', 'Health', 7000.00, '1485330449142radiology-bill-paid.jpg'),
(217, 503, '2017-01-06', 'Travel', 1800.00, '1485859622110thumb.php.jpeg'),
(222, 875, '2017-02-14', 'Food', 5000000.00, ''),
(223, 875, '2017-02-15', 'Accomodation', 20000.00, ''),
(227, 503, '2017-02-01', 'Accomodation', 500.00, ''),
(228, 503, '2017-01-31', 'Others', 300.00, ''),
(232, 503, '2017-02-01', 'Accomodation', 44.00, '1485938436148radiology-bill-paid.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `empid` int(11) NOT NULL,
  `empname` varchar(20) NOT NULL,
  `password` varchar(32) NOT NULL,
  `email` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`empid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`empid`, `empname`, `password`, `email`, `status`) VALUES
(497, 'Aliya', 'e3cb970693574ea75d091a6049f8a3ff', 'aliya.azad@experionglobal.com', 0),
(500, 'Arjun', 'acb6b3965c65597d59b2bcc8c36d35f9', 'arjun.sreedhar@experionglobal.com', 0),
(501, 'Arya', '5882985c8b1e2dce2763072d56a1d6e5', 'arya.vijayan@experionglobal.com', 0),
(503, 'Athira', 'be8cdf6fad692d1d344a633e5ff14e7a', 'athira.s@experionglobal.com', 0),
(506, 'Harish', '2dd7981a842618a9c1cb352c4ce78219', 'harish.jose@experionglobal.com', 0),
(509, 'Jomy', 'ba9353a54092bfcbe591300994fb671a', 'jomy.jose@experionglobal.com', 0),
(510, 'Neena', '2f396b17887979bfc8b90d2a53811b0f', 'neena.augustine@experionglobal.com', 1),
(512, 'Osheen', 'd1d12f32caebdcafc14501cfeb7c6111', 'osheen.varghese@experionglobal.com', 0),
(555, 'Nivia', 'c5acb30423c1b0654e66cc475b9e2b7f', 'neenaaugustine22@gmail.com', 0),
(666, 'xxxx', '724f478a48bb9f806880946c5fa4b5d4', 'neena.augustine@experionglobal.com', 0),
(779, 'Neena', '2f396b17887979bfc8b90d2a53811b0f', 'neena.augustine@experionglobal.com', 0),
(875, 'Neena', '', 'neena.augustine@experionglobal.com', 0),
(900, 'me', 'ab86a1e1ef70dff97959067b723c5c24', 'neenaaugustine22@gmail.com', 0),
(11111, 'rty', 'cdab410d76808d7cd0a7067118082dc0', 'neena.augustine@experionglobal.com', 0),
(1111111111, 'rty', 'cdab410d76808d7cd0a7067118082dc0', 'gt@gmail.com', 0);

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
