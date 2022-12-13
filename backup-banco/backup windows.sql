-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: db_pizza_time
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_bebida`
--

DROP TABLE IF EXISTS `tbl_bebida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_bebida` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ml` int NOT NULL,
  `id_tipo_bebida` int NOT NULL,
  `id_tamanho_bebida` int NOT NULL,
  `id_produto` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_tipo_bebida` (`id_tipo_bebida`),
  KEY `FK_tamanho_bebida` (`id_tamanho_bebida`),
  KEY `FK_produto_bebida` (`id_produto`),
  CONSTRAINT `FK_produto_bebida` FOREIGN KEY (`id_produto`) REFERENCES `tbl_produto` (`id`),
  CONSTRAINT `FK_tamanho_bebida` FOREIGN KEY (`id_tamanho_bebida`) REFERENCES `tbl_tamanho_bebida` (`id`),
  CONSTRAINT `FK_tipo_bebida` FOREIGN KEY (`id_tipo_bebida`) REFERENCES `tbl_tipo_bebida` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_bebida`
--

LOCK TABLES `tbl_bebida` WRITE;
/*!40000 ALTER TABLE `tbl_bebida` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_bebida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_contato`
--

DROP TABLE IF EXISTS `tbl_contato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_contato` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(80) DEFAULT NULL,
  `mensagem` text NOT NULL,
  `op_sugestao_critica` int NOT NULL,
  `email` varchar(256) DEFAULT NULL,
  `id_pizzaria` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_pizzaria_contato` (`id_pizzaria`),
  CONSTRAINT `FK_pizzaria_contato` FOREIGN KEY (`id_pizzaria`) REFERENCES `tbl_pizzaria` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_contato`
--

LOCK TABLES `tbl_contato` WRITE;
/*!40000 ALTER TABLE `tbl_contato` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_contato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_endereco_pizzaria`
--

DROP TABLE IF EXISTS `tbl_endereco_pizzaria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_endereco_pizzaria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rua` varchar(80) NOT NULL,
  `numero` int NOT NULL,
  `cep` varchar(15) NOT NULL,
  `uf` varchar(6) NOT NULL,
  `cidade` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_endereco_pizzaria`
--

LOCK TABLES `tbl_endereco_pizzaria` WRITE;
/*!40000 ALTER TABLE `tbl_endereco_pizzaria` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_endereco_pizzaria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_pizza`
--

DROP TABLE IF EXISTS `tbl_pizza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_pizza` (
  `id` int NOT NULL AUTO_INCREMENT,
  `favorito` int DEFAULT NULL,
  `id_tipo_pizza` int NOT NULL,
  `id_tamanho_pizza` int NOT NULL,
  `id_produto` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_tipo_pizza` (`id_tipo_pizza`),
  KEY `FK_tamanho_pizza` (`id_tamanho_pizza`),
  KEY `FK_produto_pizza` (`id_produto`),
  CONSTRAINT `FK_produto_pizza` FOREIGN KEY (`id_produto`) REFERENCES `tbl_produto` (`id`),
  CONSTRAINT `FK_tamanho_pizza` FOREIGN KEY (`id_tamanho_pizza`) REFERENCES `tbl_tamanho_pizza` (`id`),
  CONSTRAINT `FK_tipo_pizza` FOREIGN KEY (`id_tipo_pizza`) REFERENCES `tbl_tipo_pizza` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_pizza`
--

LOCK TABLES `tbl_pizza` WRITE;
/*!40000 ALTER TABLE `tbl_pizza` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_pizza` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_pizzaria`
--

DROP TABLE IF EXISTS `tbl_pizzaria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_pizzaria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(60) NOT NULL,
  `cnpj` varchar(20) NOT NULL,
  `telefone` varchar(15) NOT NULL,
  `celular` varchar(15) NOT NULL,
  `id_endereco_pizzaria` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_endereco_pizzaria` (`id_endereco_pizzaria`),
  CONSTRAINT `FK_endereco_pizzaria` FOREIGN KEY (`id_endereco_pizzaria`) REFERENCES `tbl_endereco_pizzaria` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_pizzaria`
--

LOCK TABLES `tbl_pizzaria` WRITE;
/*!40000 ALTER TABLE `tbl_pizzaria` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_pizzaria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_produto`
--

DROP TABLE IF EXISTS `tbl_produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_produto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `preco` double NOT NULL,
  `foto` varchar(250) NOT NULL,
  `nome` varchar(80) NOT NULL,
  `promocao` double DEFAULT NULL,
  `descricao` text NOT NULL,
  `id_pizzaria` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_pizzaria` (`id_pizzaria`),
  CONSTRAINT `FK_pizzaria` FOREIGN KEY (`id_pizzaria`) REFERENCES `tbl_pizzaria` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_produto`
--

LOCK TABLES `tbl_produto` WRITE;
/*!40000 ALTER TABLE `tbl_produto` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tamanho_bebida`
--

DROP TABLE IF EXISTS `tbl_tamanho_bebida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tamanho_bebida` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tamanho` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tamanho_bebida`
--

LOCK TABLES `tbl_tamanho_bebida` WRITE;
/*!40000 ALTER TABLE `tbl_tamanho_bebida` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_tamanho_bebida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tamanho_pizza`
--

DROP TABLE IF EXISTS `tbl_tamanho_pizza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tamanho_pizza` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tamanho` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tamanho_pizza`
--

LOCK TABLES `tbl_tamanho_pizza` WRITE;
/*!40000 ALTER TABLE `tbl_tamanho_pizza` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_tamanho_pizza` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tipo_bebida`
--

DROP TABLE IF EXISTS `tbl_tipo_bebida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tipo_bebida` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tipo_bebida`
--

LOCK TABLES `tbl_tipo_bebida` WRITE;
/*!40000 ALTER TABLE `tbl_tipo_bebida` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_tipo_bebida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tipo_pizza`
--

DROP TABLE IF EXISTS `tbl_tipo_pizza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tipo_pizza` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tipo_pizza`
--

LOCK TABLES `tbl_tipo_pizza` WRITE;
/*!40000 ALTER TABLE `tbl_tipo_pizza` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_tipo_pizza` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_usuario`
--

DROP TABLE IF EXISTS `tbl_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(80) NOT NULL,
  `senha` varchar(64) NOT NULL,
  `login` varchar(64) NOT NULL,
  `nivel_permissao` int NOT NULL,
  `id_pizzaria` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_pizzaria_usuario` (`id_pizzaria`),
  CONSTRAINT `FK_pizzaria_usuario` FOREIGN KEY (`id_pizzaria`) REFERENCES `tbl_pizzaria` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_usuario`
--

LOCK TABLES `tbl_usuario` WRITE;
/*!40000 ALTER TABLE `tbl_usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-12 19:13:16
