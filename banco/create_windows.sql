create database db_pizza_time;

use db_pizza_time;

show tables;

create table tbl_endereco_pizzaria(
	id int not null auto_increment primary key,
    rua varchar(80) not null,
    numero int not null,
    cep varchar(15) not null,
    uf varchar(6) not null,
    cidade varchar(25) not null
);

create table tbl_pizzaria(
	id int not null auto_increment primary key,
    nome varchar(60) not null,
    cnpj varchar(20) not null,
    telefone varchar(15) not null,
    celular varchar(15) not null,
    
    id_endereco_pizzaria int not null,
    constraint FK_endereco_pizzaria
    foreign key (id_endereco_pizzaria)
    references tbl_endereco_pizzaria (id)
);

create table tbl_produto(
	id int not null auto_increment primary key,
    preco double not null,
    foto varchar(250) not null,
    nome varchar(80) not null,
    promocao double,
    descricao text not null,
    
    id_pizzaria int not null,
    constraint FK_pizzaria
    foreign key (id_pizzaria)
    references tbl_pizzaria (id)
);

create table tbl_pizza(
	id int not null auto_increment primary key,
    favorito int,
    
    id_tipo_pizza int not null,
    constraint FK_tipo_pizza
    foreign key (id_tipo_pizza)
    references tbl_tipo_pizza (id),
    
    id_tamanho_pizza int not null,
    constraint FK_tamanho_pizza
    foreign key (id_tamanho_pizza)
    references tbl_tamanho_pizza (id),
    
    id_produto int not null,
    constraint FK_produto_pizza
    foreign key (id_produto)
    references tbl_produto (id)
);

create table tbl_tamanho_pizza(
	id int not null auto_increment primary key,
    tamanho varchar(30) not null
);

create table tbl_tipo_pizza(
	id int not null auto_increment primary key,
    tipo varchar(30) not null
);

create table tbl_bebida(
	id int not null auto_increment primary key,
    ml int not null,
    
    id_tipo_bebida int not null,
    constraint FK_tipo_bebida
    foreign key (id_tipo_bebida)
    references tbl_tipo_bebida (id),
    
    id_tamanho_bebida int not null,
    constraint FK_tamanho_bebida
    foreign key (id_tamanho_bebida)
    references tbl_tamanho_bebida (id),
    
    id_produto int not null,
    constraint FK_produto_bebida
    foreign key (id_produto)
    references tbl_produto (id)
);

create table tbl_tamanho_bebida(
	id int not null auto_increment primary key,
    tamanho varchar(30) not null
);

create table tbl_tipo_bebida(
	id int not null auto_increment primary key,
    tipo varchar(30) not null
);

create table tbl_contato(
	id int not null auto_increment primary key,
    nome varchar(80),
    mensagem text not null,
    op_sugestao_critica int not null,
    email varchar(256),
    
    id_pizzaria int not null,
    constraint FK_pizzaria_contato
    foreign key (id_pizzaria)
    references tbl_pizzaria (id)
);

create table tbl_usuario(
	id int not null auto_increment primary key,
    nome varchar(80) not null,
    senha varchar(64) not null,
    login varchar(64) not null,
    nivel_permissao int not null,
    
    id_pizzaria int not null,
    constraint FK_pizzaria_usuario
    foreign key (id_pizzaria)
    references tbl_pizzaria (id)
);

select * from tbl_usuario where id = 1;
