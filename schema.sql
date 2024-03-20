CREATE DATABASE bookstore;
USE bookstore;

CREATE TABLE user (
	id int NOT NULL auto_increment,
    tg_id int NOT NULL,
    tg_name varChar(80),
	tg_username varChar(80),
    primary key (`id`)
);

CREATE TABLE book (
	id int NOT NULL auto_increment,
    book_name varChar(100) NOT NULL,
    price DECIMAL(13,2),
	category varChar(100),
    primary key(`id`)
);

CREATE TABLE orders (
    id int NOT NULL auto_increment,
    userId int NOT NULL,
    book_name varChar(100),
     primary key(`id`)
);

CREATE TABLE order_item (
    id int NOT NULL auto_increment,
    order_id int NOT NULL,
    book_id int NOT NULL,
    quantity int NOT NULL,
     primary key(`id`)
);
CREATE TABLE category (
    id int NOT NULL auto_increment,
    category_name varChar(100),
    primary key(`id`)
);

CREATE TABLE admins (
    id int,
    admin_name varChar(100) NOT NULL  ,
    primary key(`admin_name`)
);