create database if not exists forestry default character set utf8mb4;
use forestry;

-- 后台管理用户表
create table user ( 
  id int unsigned not null primary key auto_increment, 
  username varchar(255) not null unique key,
  password varchar(255) not null,
  phone varchar(20),
  salt varchar(40) not null
) engine = InnoDB default charset = utf8;

-- 后台管理角色表
create table role ( 
  id int unsigned not null primary key auto_increment,
  name varchar(255) not null,
  nameZh varchar(255) not null
) engine = InnoDB default charset = utf8;

-- 后台管理用户、角色关联表
create table user_role ( 
  id int unsigned not null primary key auto_increment,
  uid int not null,
  rid int not null
) engine = InnoDB default charset = utf8;

-- 后台管理权限表
create table permission ( 
  id int unsigned not null primary key auto_increment,
  module varchar(255) not null,
  description varchar(255) not null
) engine = InnoDB default charset = utf8;

-- 后台管理权限、角色关联表
create table permission_role ( 
  id int unsigned not null primary key auto_increment,
  pid int not null,
  rid int not null
) engine = InnoDB default charset = utf8;

-- create table test_c (
--   id int,
--   name varchar(20)
-- ) engine = InnoDB default charset = utf8;

-- 企业app用户表
create table user_c (
  id int unsigned not null primary key auto_increment,
  username varchar(20) not null unique key,
  password varchar(255) default "-@_",
  name varchar(20),
  code varchar(255),
  status tinyint(1) unsigned not null default 1,
  boss int unsigned,
  socialSecurityPic varchar(1000),
  cardFrontPic varchar(1000),
  cardOppositePic varchar(1000),
  last_modify_time timestamp not null default current_timestamp on update current_timestamp 
) engine = InnoDB default charset = utf8;

-- 企业app角色表
create table role_c (
  id int unsigned not null primary key auto_increment,
  name varchar(255) not null,
  nameZh varchar(255) not null
) engine = InnoDB default charset = utf8;

-- 企业app角色、用户关联表
create table user_role_c (
  id int unsigned not null primary key auto_increment,
  uid int unsigned not null,
  rid int unsigned not null
) engine = InnoDB default charset = utf8;

-- 企业app企业信息表
create table company_c (
  id int unsigned not null primary key auto_increment,
  name varchar(50) not null unique key,
  corporation varchar(20) not null,
  code varchar(50) not null unique key,
  phone varchar(20) not null,
  address varchar(100) not null,
  store varchar(200) not null,
  companyType varchar(20) not null,
  source varchar(50) not null,
  outCityCompany tinyint(1) unsigned not null default 1,
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
  commitPic varchar(1000) not null,
  status tinyint(1) unsigned not null default 1 comment '1-审核中，2-已注册，3-未通过，4-已注销',
  refuse_reason varchar(200),
  check_person int unsigned,
  approve_remark varchar(200),
  create_time timestamp not null default current_timestamp,
  last_modify_time timestamp not null default current_timestamp on update current_timestamp
) engine = InnoDB default charset = utf8;

-- 企业app企业信息、用户关联表
create table company_user_c (
  id int unsigned not null primary key auto_increment,
  uid int unsigned not null,
  cid int unsigned not null
) engine = InnoDB default charset = utf8;

-- 后台管理基本信息表
create table basic (
  id int unsigned not null primary key auto_increment,
  name varchar(50) not null,
  info varchar(300) not null
) engine = InnoDB default charset = utf8;

-- 后台管理文件管理表
create table file (
  id int unsigned not null primary key auto_increment,
  name varchar(100) not null,
  url varchar(1000) not null,
  size varchar(20) not null,
  type varchar(20) not null
) engine = InnoDB default charset = utf8;

-- 后台管理版本管理表
create table version (
  id int unsigned not null primary key auto_increment,
  title varchar(100) not null,
  description varchar(200) not null,
  version_id varchar(20) not null,
  version_name varchar(20) not null,
  force_update tinyint(1) unsigned not null default 0,
  type varchar(10) not null,
  url varchar(1000) 
) engine = InnoDB default charset = utf8;

-- 企业app原木类开证信息表
create table wood_cert (
  id int unsigned not null primary key auto_increment,
  amount varchar(20) not null,
  noticePic text not null,
  ladingPic text not null,
  declarationPic text not null,
  cid int not null,
  windows varchar(100),
  status tinyint(1) unsigned not null default 1 comment '1-待审核，2-已通过，3-未通过',
  refuse_reason varchar(200),
  check_person int unsigned,
  approve_remark varchar(200),
  create_time timestamp not null default current_timestamp
) engine = InnoDB default charset = utf8;

-- 企业app板材类开证信息表
create table board_cert (
  id int unsigned not null primary key auto_increment,
  amount varchar(20) not null,
  noticePic text not null,
  declarationPic text not null,
  contractPic text not null,
  cid int not null,
  windows varchar(100),
  status tinyint(1) unsigned not null default 1 comment '1-待审核，2-已通过，3-未通过',
  refuse_reason varchar(200),
  check_person int unsigned,
  approve_remark varchar(200),
  create_time timestamp not null default current_timestamp
) engine = InnoDB default charset = utf8;

-- 企业app木材运输证信息表
create table plant_cert (
  id int unsigned not null primary key auto_increment,
  producing_area varchar(100),
  processing_area varchar(100),
  plant_name varchar(30) not null,
  variety varchar(30) not null,
  car_amount varchar(20) not null,
  every_car_amount varchar(20) not null,
  packaging varchar(50),
  standard varchar(50),
  receive_person varchar(20) not null,
  receive_address_type tinyint(1) unsigned not null default 0 comment '0-省内，1-省外',
  receive_address varchar(100) not null,
  phone varchar(20) not null,
  person_id varchar(20) not null,
  date_time varchar(20) not null,
  apply_person varchar(10),
  transport_person varchar(10) not null,
  report_number varchar(30) not null,
  car_number varchar(300) not null,
  picture_url text,
  picture_location text,
  picture_time text,
  cid int not null,
  windows varchar(100),
  status tinyint(1) unsigned not null default 1 comment '1-待审核，2-已通过，3-未通过，4-待上传照片',
  refuse_reason varchar(200),
  check_person int unsigned,
  approve_remark varchar(200),
  create_time timestamp not null default current_timestamp
) engine = InnoDB default charset = utf8;

insert role_c (name, nameZh) values ('ROLE_admin', '管理员');
insert role_c (name, nameZh) values ('ROLE_employee', '员工');

-- DELIMITER //
-- create procedure delete_code_c()
-- begin
-- update user_c set code = null where TIME_TO_SEC(TIMEDIFF(NOW(), last_modify_time)) > 300 and code is not null;
-- end
-- //
-- DELIMITER ;

-- create event delete_code_event_c
-- on schedule every 30 second starts NOW() on completion preserve do call delete_code_c();