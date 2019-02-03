drop database forestry;
create database forestry default character set utf8;
use forestry;

create table user ( 
  id int unsigned not null primary key auto_increment, 
  username varchar(255) not null unique key,
  password varchar(255) not null,
  phone varchar(20)
) engine = InnoDB default charset = utf8;

create table role ( 
  id int unsigned not null primary key auto_increment,
  name varchar(255) not null,
  nameZh varchar(255) not null
) engine = InnoDB default charset = utf8;

create table user_role ( 
  id int unsigned not null primary key auto_increment,
  uid int not null,
  rid int not null
) engine = InnoDB default charset = utf8;

create table menu ( 
  id int unsigned not null primary key auto_increment,
  path varchar(64),
  component varchar(64),
  name varchar(64),
  icon varchar(64),
  parentId int(11)
) engine = InnoDB default charset = utf8;

create table menu_role ( 
  id int unsigned not null primary key auto_increment,
  mid int not null,
  rid int not null
) engine = InnoDB default charset = utf8;

create table permission ( 
  id int unsigned not null primary key auto_increment,
  module varchar(255) not null
) engine = InnoDB default charset = utf8;

create table permission_role ( 
  id int unsigned not null primary key auto_increment,
  pid int not null,
  rid int not null
) engine = InnoDB default charset = utf8;

insert user (username, password) values ('srj', 'bxd8LtRmI2Bf5TyrBrO65ns1FjTWODwtn5V6FfubSiQ=');
insert role (name, nameZh) values ('root', '根管理员');
insert role (name, nameZh) values ('admin', '管理员');
insert role (name, nameZh) values ('associator', '会员');
insert role (name, nameZh) values ('member', '成员');
insert user_role (uid, rid) values (1, 2);
insert user_role (uid, rid) values (1, 3);
insert permission (module) values ('home');
insert permission (module) values ('docs');
insert permission_role (pid, rid) values (1, 2);
insert permission_role (pid, rid) values (2, 4);
