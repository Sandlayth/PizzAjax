###########################################
# PizzAjax database initialization script #
# Author: Yassine H. a.k.a. Sandlayth     #
# Creation date: 2017-04-06               #
# Version: 0.1                            #
###########################################

# Database cleaning
drop database if exists pizzajax;

# Database creation
create database pizzajax;
use pizzajax;

# Menu table
create table menu(
    idMenu integer not null auto_increment,
    name varchar(50) not null,
    description varchar(300),
    price float,
	pizzaNumber integer not null,
	drinkNumber integer not null,
	dessertNumber integer not null,
    primary key(idMenu)
);


# Pizza table
create table pizza(
    idPizza integer not null auto_increment,
    name varchar(50) not null,
    description varchar(200),
    price float,
    primary key(idPizza)
);

# Ingredients table
create table ingredient(
    idIngredient integer not null auto_increment,
    name varchar(50) not null,
    primary key(idIngredient)
);

# Dessert table
create table dessert(
    idDessert integer not null auto_increment,
    name varchar(50) not null,
    price float, 
    primary key(idDessert)
);

# Drink table
create table drink(
    idDrink integer not null auto_increment,
    name varchar(50) not null,
    price float,
    primary key(idDrink)
);

# Ingredient in Pizza table
create table pizzaIngredient(
    idPizza integer not null,
    idIngredient integer not null,
    primary key(idPizza, idIngredient)
);

alter table pizzaIngredient
    add constraint FK_idIngredient_pizzaIngredient foreign key(idIngredient) references ingredient(idIngredient),
    add constraint FK_idPizza_pizzaIngredient foreign key(idPizza) references pizza(idPizza)
