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
    price integer,
    primary key(idMenu)
);


# Pizza table
create table pizza(
    idPizza integer not null auto_increment,
    name varchar(50) not null,
    description varchar(200),
    price integer,
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
    price integer, 
    primary key(idDessert)
);

# Drink table
create table drink(
    idDrink integer not null auto_increment,
    name varchar(50) not null,
    price integer,
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
    add constraint FK_idPizza_pizzaIngredient foreign key(idPizza) references pizza(idPizza);


# Pizza in Menu
create table menuPizza(
    idPizza integer not null,
    idMenu integer not null,
    primary key(idPizza, idMenu)
);

alter table menuPizza
    add constraint FK_idMenu_menuPizza foreign key(idMenu) references menu(idMenu),
    add constraint FK_idPizza_menuPizza foreign key(idPizza) references pizza(idPizza);

# Dessert in Menu
create table menuDessert(
    idDessert integer not null,
    idMenu integer not null,
    primary key(idMenu, idDessert)
);

alter table menuDessert
    add constraint FK_idMenu_menuDessert foreign key(idMenu) references menu(idMenu),
    add constraint FK_idDessert_menuDessert foreign key(idDessert) references dessert(idDessert);

# Drink in Menu
create table menuDrink(
    idDrink integer not null,
    idMenu integer not null,
    primary key(idMenu, idDrink)
);

alter table menuDrink
    add constraint FK_idMenu_menuDrink foreign key(idMenu) references menu(idMenu),
    add constraint FK_idDessert_menuDrink foreign key(idDrink) references drink(idDrink);

