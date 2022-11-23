-- create database db_pizza_time;

use db_pizza_time;

show tables;

-- create table tbl_produto(
-- 	id int not null auto_increment primary key,
--     preco float not null,
--     foto varchar(250) not null,
--     nome varchar(80) not null,
--     promocao float,
--     descricao text not null,
--     
--     id_pizzaria int not null,
--     constraint FK_pizzaria
-- 		foreign key (id_pizzaria)
--         references tbl_pizzaria (id)
-- );

select * from tbl_produto;

-- create table tbl_bebida(
-- 	id int not null auto_increment primary key,
--     tipo varchar(20) not null,
--     ml int,
--     
--     id_produto int not null,
--     constraint FK_produto
-- 		foreign key (id_produto)
--         references tbl_produto (id)
-- );

select * from tbl_bebida;

-- create table tbl_pizza(
-- 	id int not null auto_increment primary key,
--     
--     id_tipo_pizza int not null,
--     constraint FK_tipo_pizza
-- 		foreign key (id_tipo_pizza)
--         references tbl_tipo_pizza (id),
--         
--     id_tamanho_pizza int not null,
--     constraint FK_tamanho_pizza
-- 		foreign key (id_tamanho_pizza)
--         references tbl_tamanho_pizza (id),
--         
--         
--     id_produto int not null,
--     constraint FK_produto_pizza
-- 		foreign key (id_produto)
--         references tbl_produto (id)
-- );

select * from tbl_pizza;

-- create table tbl_tipo_pizza(
-- 	id int not null auto_increment primary key,
--     nome varchar(30) not null
-- );

select * from tbl_tipo_pizza;

-- create table tbl_tamanho_pizza(
-- 	id int not null auto_increment primary key,
--     tamanho varchar(30) not null
-- );

select * from tbl_tamanho_pizza;

-- create table tbl_endereco_pizzaria(
-- 	id int not null auto_increment primary key,
--     rua varchar(80) not null,
--     numero int not null,
--     cep varchar(15) not null,
--     uf varchar(6) not null,
--     cidade varchar(25) not null
-- );

select * from tbl_endereco_pizza;

-- create table tbl_pizzaria(
-- 	id int not null auto_increment primary key,
--     nome varchar(14) not null,
--     cnpj varchar(20) not null,
--     telefone varchar(15) not null,
--     celular varchar(15) not null,
--     
--     id_endereco_pizzaria int not null,
--     constraint FK_endereco_pizzaria
-- 		foreign key (id_endereco_pizzaria)
--         references tbl_endereco_pizzaria (id)
-- );

select * from tbl_pizzaria;

-- create table tbl_contato(
-- 	nome varchar(80),
--     mensagem text not null,
--     op_sugestao_critica int not null,
--     email varchar(256),
--     celular varchar(15),
--     
--     id_pizzaria int not null,
--     constraint FK_pizzaria_contato
-- 		foreign key (id_pizzaria)
--         references tbl_pizzaria (id)
-- );
select * from tbl_contato;

-- create table tbl_servico(
-- 	id int not null auto_increment primary key,
--     nome varchar(60) not null,
--     descricao text,
--     foto varchar(256),
--     
--     id_pizzaria int not null,
--     constraint FK_pizzaria_servico
-- 		foreign key (id_pizzaria)
--         references tbl_pizzaria (id)
-- );

select * from tbl_servico;

-- create table tbl_usuario(
-- 	id int not null auto_increment primary key,
--     nome varchar(80) not null,
--     email varchar(256) not null,
--     login varchar(10) not null,
--     senha varchar (10) not null,
--     
--     id_pizzaria int not null,
--     constraint FK_pizzaria_usuario
-- 		foreign key (id_pizzaria)
--         references tbl_pizzaria (id)
-- );