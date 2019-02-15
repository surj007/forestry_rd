create database if not exists forestry default character set utf8;
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

create table permission ( 
  id int unsigned not null primary key auto_increment,
  module varchar(255) not null
) engine = InnoDB default charset = utf8;

create table permission_role ( 
  id int unsigned not null primary key auto_increment,
  pid int not null,
  rid int not null
) engine = InnoDB default charset = utf8;

create table test_c (
  id int,
  name varchar(20)
) engine = InnoDB default charset = utf8;

create table user_c (
  id int unsigned not null primary key auto_increment,
  username varchar(20) not null unique key,
  password varchar(255) not null,
  name varchar(20),
  code varchar(255),
  status tinyint(1) unsigned not null default 1,
  last_modify_time timestamp not null default current_timestamp
) engine = InnoDB default charset = utf8;

create table role_c (
  id int unsigned not null primary key auto_increment,
  name varchar(255) not null,
  nameZh varchar(255) not null
) engine = InnoDB default charset = utf8;

create table user_role_c (
  id int unsigned not null primary key auto_increment,
  uid int unsigned not null,
  rid int unsigned not null
) engine = InnoDB default charset = utf8;

create table company_c (
  id int unsigned not null primary key auto_increment,
  name varchar(50) not null unique key,
  corporation varchar(20) not null,
  phone varchar(20) not null,
  address varchar(100) not null,
  store varchar(200) not null,
  companyType varchar(20) not null,
  source varchar(50) not null,
  outCityCompany tinyint(1) unsigned,
  outCityCompanyName varchar(200),
  kind varchar(200) not null,
  saw varchar(20),
  sawOutput varchar(20),
  other varchar(20),
  otherOutput varchar(20),
  product varchar(100),
  saleArea varchar(100),
  saleMount varchar(20),
  remark varchar(200),
  licencePic varchar(1000) not null,
  cardFrontPic varchar(1000) not null,
  cardOppositePic varchar(1000) not null,
  notificationPic varchar(1000) not null,
  commitPic varchar(1000) not null
) engine = InnoDB default charset = utf8;

create table company_user_c (
  id int unsigned not null primary key auto_increment,
  uid int unsigned not null,
  cid int unsigned not null
) engine = InnoDB default charset = utf8;

create table basic (
  id int unsigned not null primary key auto_increment,
  name varchar(50) not null,
  info varchar(300) not null
) engine = InnoDB default charset = utf8;

create table file (
  id int unsigned not null primary key auto_increment,
  name varchar(50) not null,
  url varchar(1000) not null
) engine = InnoDB default charset = utf8;


insert role_c (name, nameZh) values ('ROLE_admin', '管理员');
insert role_c (name, nameZh) values ('ROLE_employee', '员工');


-- 未在阿里云上执行
DELIMITER //
create procedure delete_code_c()
begin
update user_c set code = null where TIME_TO_SEC(TIMEDIFF(NOW(), last_modify_time)) > 300 and code is not null;
end
//
DELIMITER ;

create event delete_code_event_c
on schedule every 30 second starts NOW() on completion preserve do call delete_code_c();