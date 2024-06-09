-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-06-2024 a las 00:00:36
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `zyphy_room`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `id_comment` int(11) NOT NULL,
  `comentario` varchar(250) NOT NULL,
  `id_post` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`id_comment`, `comentario`, `id_post`, `id_usuario`) VALUES
(76, 'Hermosa Familia', 47, 28),
(77, 'Los quiero!', 47, 28),
(78, 'Que bien!', 47, 23);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `id_like` int(11) NOT NULL,
  `id_post` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE `perfil` (
  `id_perfil` int(11) NOT NULL,
  `bio` varchar(20) DEFAULT NULL,
  `ocupacion` varchar(20) DEFAULT NULL,
  `ubicacion` varchar(20) DEFAULT NULL,
  `hobbies` varchar(20) DEFAULT NULL,
  `foto_perfil` varchar(200) DEFAULT NULL,
  `foto_portada` varchar(200) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfil`
--

INSERT INTO `perfil` (`id_perfil`, `bio`, `ocupacion`, `ubicacion`, `hobbies`, `foto_perfil`, `foto_portada`, `id_usuario`) VALUES
(1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'El señor de la noche', 'Estudiante', 'Pantoja', 'Tocar Violin', '2c7a576e7f5495ae55a012f8b8bf1b89.jpg', '80e7d7d11e91d0c0a7346730e82581bb.webp', 22),
(9, 'Queen', 'Guitarrista', NULL, NULL, '84c5cb39de8aa168890fe3aab4698e41.jpeg', '628dfa84e7648cc7ca18870a6b46479e.jpg', 23),
(10, 'Queen', 'Estudiante', 'Mi Casa', 'Guitarrista', '84c5cb39de8aa168890fe3aab4698e41.jpeg', '628dfa84e7648cc7ca18870a6b46479e.jpg', 23),
(11, '????', 'System Engineer', 'Santo Domingo Oeste', 'Basketball', NULL, 'd1a694d62c05287ff5689cdf3d18a6e6.jpg', 24),
(12, 'System Engineer', 'Teacher', 'Santo Domingo Oeste', 'Basketball', NULL, 'd1a694d62c05287ff5689cdf3d18a6e6.jpg', 24),
(13, 'El señor de la noche', 'Estudiante', 'Pantoja', 'Tocar Violin', '0a4ff7a15b8b99a4fb73052da9beadd5.jpeg', '80e7d7d11e91d0c0a7346730e82581bb.webp', 22),
(14, 'El señor de la noche', 'Estudiante', 'Pantoja', 'Tocar Violin', '4e3f2acb4be30af1aa4d50c147a40417.jpg', '80e7d7d11e91d0c0a7346730e82581bb.webp', 22),
(15, 'System Engineer', 'Teacher', 'Santo Domingo Oeste', 'Basketball', 'a495c2255100257ba5d9ed1ba770430f.jpeg', 'd1a694d62c05287ff5689cdf3d18a6e6.jpg', 24),
(16, 'Bailarina', 'Doctora', 'Santiago, Republica ', 'Cocinar', '13f049ea215fc9e666892d7a691221a3.jpg', 'f544c5ef125bd902d6880014bf0ec518.jpg', 26),
(17, 'Bailarina', 'Doctora', 'Santiago, Republica ', 'Cocinar', '13f049ea215fc9e666892d7a691221a3.jpg', 'f544c5ef125bd902d6880014bf0ec518.jpg', 26),
(18, 'Bailarina', 'Doctora', 'Santiago. Rep. Dom', 'Cocinar', '13f049ea215fc9e666892d7a691221a3.jpg', 'f544c5ef125bd902d6880014bf0ec518.jpg', 26),
(19, 'Fitness Coach ', 'Estudiante', 'Santo Domingo Este', 'Gym', '897d3bab3cf6b0f55ee02b520ec93559.jpg', '6bdc0906e387c0f7359c8767685e34ab.jpg', 27),
(20, 'Marie', 'Veterinaria', 'Rep. Dom', 'Maquillista', '7b6a499ccca026b7ecf4c56d5b002a39.jpg', '62465dba9b79ad6a2de55c0919a1bba0.jpg', 28);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `release`
--

CREATE TABLE `release` (
  `id_post` int(11) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `release`
--

INSERT INTO `release` (`id_post`, `descripcion`, `cover`, `id_usuario`) VALUES
(47, 'Mi familia <3', '1c1a1a79269d86e2ca450904788b6f67.jpg', 26),
(49, 'Oufit de la noche #Queen #Doctor #LaModa', '66d1ee9f2f2102945bd14503235b664e.jpg', 26),
(50, 'Amo la pizza, lo siento. HAHHAHAH #PizzaLover ', '08a80ad7b9bb32e131753b39bde3e962.jpg', 26),
(52, '#GymLover', '821b119aa62e968ff67520131642e5ee.jpg', 27),
(55, '', '832819588be99655a6dbc911e8c4f17f.jpg', 27),
(57, 'Graciass <3', 'a02e7ccfa640a96e7e206cd072303953.jpg', 28),
(58, 'Tarde de cafe #AmoElCafe  #Starbucks', 'ea1a39ca5a191b8b4222ede99f6ca911.jpg', 28);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(15) NOT NULL,
  `username` varchar(20) NOT NULL,
  `id_perfil` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellido`, `email`, `password`, `username`, `id_perfil`) VALUES
(22, 'Pedro', 'Lantigua', 'pedrojuliolantigua1@gmail.com', '1111', 'LantiguaPedro', 14),
(23, 'Carmini', 'Hidalgo', 'ashleycarmini@gmail.com', 'sofia123', 'Ashleyhidal.g0529', 10),
(24, 'Andersson', 'Angustia', 'AnderssonAngusti@gmail.com', 'Andy02011', 'Andy_storman', 15),
(26, 'Karla ', 'Baez', 'KBaez@gmail.com', 'karlabaez1', 'Karla_Baez', 18),
(27, 'Mateo', 'Quiroz', 'Mateo000@gmail.com', 'mateo000', 'MateoQuiroz.t', 19),
(28, 'Marie', 'De Los Santos', 'Marie123@gmail.com', 'Marie123', 'MarieS', 20);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `fk_com` (`id_usuario`),
  ADD KEY `fk_cam` (`id_post`);

--
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id_like`),
  ADD UNIQUE KEY `unique_like` (`id_post`,`id_usuario`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`id_perfil`),
  ADD KEY `fk_per` (`id_usuario`);

--
-- Indices de la tabla `release`
--
ALTER TABLE `release`
  ADD PRIMARY KEY (`id_post`),
  ADD KEY `fk_pos` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `fk_user` (`id_perfil`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT de la tabla `likes`
--
ALTER TABLE `likes`
  MODIFY `id_like` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `perfil`
--
ALTER TABLE `perfil`
  MODIFY `id_perfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `release`
--
ALTER TABLE `release`
  MODIFY `id_post` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_cam` FOREIGN KEY (`id_post`) REFERENCES `release` (`id_post`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_com` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`id_post`) REFERENCES `release` (`id_post`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD CONSTRAINT `fk_per` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `release`
--
ALTER TABLE `release`
  ADD CONSTRAINT `fk_pos` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`id_perfil`) REFERENCES `perfil` (`id_perfil`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
