-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2023 at 08:33 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sukhandb`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `desc` varchar(235) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `userid` int(11) NOT NULL,
  `postid` int(11) NOT NULL,
  `memberid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `desc`, `createdAt`, `userid`, `postid`, `memberid`) VALUES
(11, 'asdfasdf', '2023-05-06 17:27:40', 11, 52, NULL),
(12, 'like check', '2023-05-06 17:58:30', 11, 45, NULL),
(14, 'this is a comment also', '2023-05-27 14:04:29', 11, 139, NULL),
(15, 'kasdfj', '2023-05-31 21:27:29', 11, 143, NULL),
(16, '', '2023-05-31 21:31:56', 11, 143, NULL),
(17, 'asd', '2023-05-31 21:38:09', 11, 143, NULL),
(18, 'sdf', '2023-05-31 21:38:57', 11, 44, NULL),
(19, 'afasdf', '2023-05-31 21:42:59', 11, 143, NULL),
(20, 'this is the newest comment', '2023-06-06 10:00:01', 23, 159, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `favourates`
--

CREATE TABLE `favourates` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `memberid` int(11) DEFAULT NULL,
  `postid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favourates`
--

INSERT INTO `favourates` (`id`, `userid`, `memberid`, `postid`) VALUES
(48, 11, NULL, 44),
(56, 11, NULL, 53),
(57, 11, NULL, 52),
(67, 11, NULL, 159),
(68, 18, NULL, 159),
(69, 18, NULL, 52),
(78, 8, NULL, 159),
(79, 21, NULL, 159),
(80, 21, NULL, 158),
(81, 21, NULL, 52),
(82, 21, NULL, 49),
(83, 21, NULL, 48),
(84, 21, NULL, 156),
(85, 21, NULL, 143),
(86, 21, NULL, 139),
(87, 23, NULL, 159),
(88, 25, NULL, 156);

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` int(11) NOT NULL,
  `membername` varchar(45) DEFAULT NULL,
  `memberemail` varchar(45) NOT NULL,
  `memberpassword` varchar(45) NOT NULL,
  `memberprofilepic` varchar(555) DEFAULT NULL,
  `membercoverpic` varchar(555) DEFAULT NULL,
  `memberfavpost` varchar(555) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `membername`, `memberemail`, `memberpassword`, `memberprofilepic`, `membercoverpic`, `memberfavpost`) VALUES
(2, '', '', '', NULL, NULL, NULL),
(3, 'member3', 'member3@gmail.com', '$2a$10$wxfdnP8gwCfE099mujpswuwmdkIUjfdjuaiq5f', NULL, NULL, NULL),
(4, 'member4', 'member4@gmail.com', '$2a$10$Wdvfmo.0sUe1Q6qaJKAnMuthcejcH8yhvSrB9t', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `poet`
--

CREATE TABLE `poet` (
  `id` int(11) NOT NULL,
  `poetname` varchar(45) DEFAULT NULL,
  `poetlanguage` varchar(45) DEFAULT NULL,
  `poetregion` varchar(45) DEFAULT NULL,
  `poetbio` varchar(245) DEFAULT NULL,
  `poetid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `userid` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `pdf` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `desc`, `img`, `userid`, `createdAt`, `pdf`) VALUES
(42, 'id 1', '16826888638118b3bca2140de0afd6d1072806ffddead-removebg-preview.png', 7, '2023-04-28 18:34:23', NULL),
(43, 'id 1', '1682688877635pngtree-bismillah-calligraphy-1-bw-png-image_4018267.jpg', 7, '2023-04-28 18:34:37', NULL),
(44, 'tesrasdf', '1682688914738download.png', 8, '2023-04-28 18:35:14', NULL),
(45, 'id 2', '1682688925198img.png', 8, '2023-04-28 18:35:25', NULL),
(46, 'id 3', '1682688958287mermaid-diagram-2023-04-11-212958.png', 9, '2023-04-28 18:35:58', NULL),
(47, 'id 3', '1682688967948Never Lose Rope of Hope (1).png', 9, '2023-04-28 18:36:07', NULL),
(48, 'id 3', '1682689010031670a28910d7634519cab7cd27ab281eb.jpg', 9, '2023-04-28 18:36:50', NULL),
(49, 'id 3', '1682689021289WhatsApp Image 2023-02-18 at 8.13.18 PM.jpeg', 9, '2023-04-28 18:37:01', NULL),
(50, '', '16827712669758b3bca2140de0afd6d1072806ffddead-removebg-preview.png', 8, '2023-04-29 17:27:47', NULL),
(52, '', '1683295530123345067480_780131873437368_881002518394041168_n.jpg', 11, '2023-05-05 19:05:30', NULL),
(53, 'asddfffff', '1683554206403345049808_771502941149542_6923826239364156602_n.jpg', 11, '2023-05-08 18:56:46', NULL),
(137, 'pdf hyy', NULL, 11, '2023-05-26 18:56:19', '1685109379566Document 23.pdf'),
(139, 'newPDF', NULL, 11, '2023-05-26 19:39:50', '16851119900231685109379566Document 23.pdf'),
(140, 'newBook', NULL, 11, '2023-05-27 20:29:32', '1685201372403Release of Leave Encashment.pdf'),
(142, 'test', '1685378555191Never Lose the Rope of Hope (2).png', 11, '2023-05-29 21:42:35', NULL),
(143, 'piages', '1685537967169images (4).jfif', 11, '2023-05-31 17:59:27', NULL),
(156, NULL, NULL, 11, '2023-06-02 09:24:31', '1685679871794Assignment1.pdf'),
(157, NULL, '1685681463145320494177_472640048331538_2197518505650859295_n.jpg', 11, '2023-06-02 09:51:03', NULL),
(158, NULL, '1685692512041320942094_707430614093942_4955990567474600180_n.jpg', 11, '2023-06-02 12:55:12', NULL),
(159, 'اردو', '1685695843512320494155_843450466762940_2081275422845558606_n.jpg', 11, '2023-06-02 13:50:43', NULL),
(160, 'tests', '1685696186070322489156_853388972665944_6068529815397246299_n.jpg', 13, '2023-06-02 13:56:26', NULL),
(161, NULL, NULL, 13, '2023-06-02 13:56:39', '1685696199028Scan.pdf'),
(162, NULL, '1685714227448326184102_689011992727264_7937973671059518670_n.jpg', 12, '2023-06-02 18:57:07', NULL),
(163, NULL, NULL, 12, '2023-06-02 18:57:45', '1685714265122Sup.pdf'),
(164, 'share', '1685944801303ice_screenshot_20230101-155134.png', 22, '2023-06-05 11:00:01', NULL),
(165, 'my new book', NULL, 23, '2023-06-06 10:04:53', '1686027893765New Doc 05-16-2023 11.23.pdf'),
(166, 'image', '1686027937115WhatsApp Image 2023-06-05 at 8.28.14 PM.jpeg', 23, '2023-06-06 10:05:37', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `postid` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`id`, `userid`, `postid`, `rating`) VALUES
(1, 23, 42, 4),
(2, 8, 162, 5),
(3, 11, 159, 5),
(4, 8, 159, 3),
(5, 11, 143, 5),
(6, 11, 53, 2),
(7, 11, 52, 4),
(8, 8, 50, 5),
(9, 8, 45, 1),
(10, 11, 157, 5),
(11, 8, 44, 1),
(12, 11, 142, 3),
(13, 11, 158, 4),
(14, 9, 49, 5),
(15, 9, 48, 5),
(16, 12, 162, 4),
(17, 13, 160, 2);

-- --------------------------------------------------------

--
-- Table structure for table `relationships`
--

CREATE TABLE `relationships` (
  `id` int(11) NOT NULL,
  `followeruserid` int(11) NOT NULL,
  `followeduserid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `relationships`
--

INSERT INTO `relationships` (`id`, `followeruserid`, `followeduserid`) VALUES
(1, 11, 8),
(7, 8, 11),
(97, 11, 11),
(98, 11, 11),
(99, 11, 11),
(100, 11, 11),
(101, 11, 11),
(102, 11, 11),
(103, 11, 11),
(104, 11, 11),
(105, 11, 12),
(106, 18, 11),
(107, 17, 11),
(110, 11, 13),
(111, 21, 10),
(112, 21, 11),
(113, 21, 9),
(115, 22, 13),
(116, 22, 12),
(117, 22, 11),
(118, 23, 11),
(119, 23, 13),
(120, 24, 13),
(121, 25, 11);

-- --------------------------------------------------------

--
-- Table structure for table `stories`
--

CREATE TABLE `stories` (
  `id` int(11) NOT NULL,
  `img` varchar(245) NOT NULL,
  `userid` int(11) NOT NULL,
  `memberid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `sample` varchar(555) DEFAULT NULL,
  `coverpic` varchar(555) DEFAULT NULL,
  `profilepic` varchar(555) DEFAULT NULL,
  `language` varchar(45) DEFAULT NULL,
  `nickname` varchar(45) DEFAULT NULL,
  `bio` varchar(45) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `usertype` varchar(234) DEFAULT NULL,
  `ranking` int(10) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `sample`, `coverpic`, `profilepic`, `language`, `nickname`, `bio`, `name`, `usertype`, `ranking`) VALUES
(7, 'asdf1', 'asdf1@asd.com', '1q2w3e4r', '', NULL, NULL, NULL, NULL, NULL, NULL, '1', 6),
(8, 'asdf2', 'asdf2@asd.com', '1q2w3e4r', '', NULL, NULL, NULL, NULL, NULL, NULL, '1', 12),
(9, 'asdf3', 'asdf3@asd.com', '1q2w3e4r', '', NULL, NULL, NULL, NULL, NULL, NULL, '1', 10),
(10, 'asdf4', 'asdf4@asd.com', '1q2w3e4r', '', NULL, NULL, NULL, NULL, NULL, NULL, '1', 28),
(11, 'FSL', 'fsl29nov@gmail.com', '1q2w3e4r', 'http://localhost:5173/images/pic6.png', '1685541516836images (4).jfif', '1685949630935images.jfif', 'Language', 'NickName', 'My Detailed Bio Will be Displayed Here', NULL, '1', 31),
(12, 'user', 'abc@asd.com', '1q2w3e4r', 'C:\\fakepath\\320494155_843450466762940_2081275422845558606_n.jpg', '1685714169978images (1).jfif', '1685714169995download.jfif', 'saqlain', 'saqlain', 'saqlain', NULL, '1', 2),
(13, '2019-uobs-502', 'abc@gmail.com', '1q2w3e4r', 'C:\\fakepath\\320494155_843450466762940_2081275422845558606_n.jpg', '1685696152379320539040_6025352527484102_2340679410022326120_n.jpg', '1685696152393329768650_1366896367456515_6325658128819404770_n.png', 'saqlain', 'saqlain', 'saqlain', NULL, '1', 22),
(17, 'Lorem', 'user@asd.com', '1q2w3e4r', NULL, '1685777571612Anchan Technologies Logo - White with Black Background - 5000x5000.png', '1685777571690Smart LSO Logo - Original - 5000x5000.png', 'asasasasaas', 'asasasasaas', 'asasasasaas', NULL, '0', 0),
(18, 'poet', 'poet@ps.com', '1q2w3e4r', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0', 0),
(21, 'newReg', 'newReg@asd.com', '11221122', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0', 0),
(22, 'UserName', 'faraz@email.com', '11221122', NULL, NULL, '1685948576004321381629_900880991071458_3643130880431649158_n.jpg', 'Language', 'NickName', 'My Detailed Bio Will be Displayed Here', NULL, '1', 0),
(23, 'userrrr', 'shayar@asd.com', '11221122', NULL, NULL, NULL, 'Language', 'NickName', 'My Detailed Bio Will be Displayed Here', NULL, '1', 0),
(24, 'UserNamedvgfd', 'bas@gmail.com', '12341234', NULL, NULL, NULL, 'Language', 'Nick', 'My Detailed Bio Will be Displayed Here', NULL, '0', 0),
(25, 'Waz', 'w@w.com', '11221122', NULL, NULL, NULL, 'Language', 'NickName', 'My Detailed Bio Will be Displayed Here', NULL, '0', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `postid_idx` (`postid`),
  ADD KEY `commentuserid_idx` (`userid`),
  ADD KEY `commentmemberid_idx` (`memberid`);

--
-- Indexes for table `favourates`
--
ALTER TABLE `favourates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `favpostid_idx` (`postid`),
  ADD KEY `favuserid_idx` (`userid`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `poet`
--
ALTER TABLE `poet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `poetid_idx` (`poetid`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `postuserid_idx` (`userid`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `relationships`
--
ALTER TABLE `relationships`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `userfollowedid_idx` (`followeduserid`),
  ADD KEY `userfollowerid_idx` (`followeruserid`);

--
-- Indexes for table `stories`
--
ALTER TABLE `stories`
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `storymemberid_idx` (`memberid`),
  ADD KEY `storyuserid_idx` (`userid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `favourates`
--
ALTER TABLE `favourates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `poet`
--
ALTER TABLE `poet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=167;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `relationships`
--
ALTER TABLE `relationships`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT for table `stories`
--
ALTER TABLE `stories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `commentmemberid` FOREIGN KEY (`memberid`) REFERENCES `member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `commentpostid` FOREIGN KEY (`postid`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `commentuserid` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `favourates`
--
ALTER TABLE `favourates`
  ADD CONSTRAINT `favpostid` FOREIGN KEY (`postid`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favuserid` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `poet`
--
ALTER TABLE `poet`
  ADD CONSTRAINT `profilepoetid` FOREIGN KEY (`poetid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `postuserid` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `relationships`
--
ALTER TABLE `relationships`
  ADD CONSTRAINT `userfollowedid` FOREIGN KEY (`followeduserid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userfollowerid` FOREIGN KEY (`followeruserid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `stories`
--
ALTER TABLE `stories`
  ADD CONSTRAINT `storymemberid` FOREIGN KEY (`memberid`) REFERENCES `member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `storyuserid` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
