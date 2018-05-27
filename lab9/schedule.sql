//  <lab10>디렉토리 안에서 command창 생성
//  (prompt)> mysql -u root -p
//  Enter password: (your password)
//  mysql> source schedule.sql;

show databases;
CREATE DATABASE  IF NOT EXISTS `myinfo`;
use myinfo;
DROP TABLE IF EXISTS `schedule`;
create table schedule (
id int not null auto_increment primary key,
value varchar(100) not null,
date varchar(15) not null,
hour varchar(10) not null,
location varchar(100) not null,
phone varchar(20) not null
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
describe schedule;
INSERT INTO `schedule` (`id`,`value`,`date`,`hour`,`location`,`phone`) VALUES (1,'코스모 구로디지털단지', '2018/02/24', '09시', '서울특별시 구로구 23-1', '02-325-3255');
INSERT INTO `schedule` (`id`,`value`,`date`,`hour`,`location`,`phone`) VALUES (2,'건강보험공단 원주', '2018/02/28', '18시', '경기도 원주시 997', '031-5231-8743');
INSERT INTO `schedule` (`id`,`value`,`date`,`hour`,`location`,`phone`) VALUES (3,'넥스트코어 송파', '2018/03/11', '14시', '서울특별시 송파구 26-5', '02-235-7344');
INSERT INTO `schedule` (`id`,`value`,`date`,`hour`,`location`,`phone`) VALUES (4,'예스앤드 역삼동', '2018/03/20', '10시', '서울특별시 서초구 35-7', '02-324-8654');
INSERT INTO `schedule` (`id`,`value`,`date`,`hour`,`location`,`phone`) VALUES (5,'농어촌진흥재단 구로', '2018/04/15', '17시', '서울특별시 구로구 125', '02-6574-5432');
INSERT INTO `schedule` (`id`,`value`,`date`,`hour`,`location`,`phone`) VALUES (6,'기술정보진흥원 대전', '2018/05/4', '13시', '대전광역시 유성구 565', '010-3244-3632');
INSERT INTO `schedule` (`id`,`value`,`date`,`hour`,`location`,`phone`) VALUES (7,'위즈코어 가산디지털단지', '2018/05/6', '12시', '서울특별시 금천구 654', '02-2512-6532');
INSERT INTO `schedule` (`id`,`value`,`date`,`hour`,`location`,`phone`) VALUES (8,'LH공사 오리', '2018/05/9', '22시', '경기도 광주시 99', '031-987-3241');
INSERT INTO `schedule` (`id`,`value`,`date`,`hour`,`location`,`phone`) VALUES (9,'정보화진흥원 무교', '2018/05/12', '15시', '서울특별시 중구 752', '02-3251-5321');
INSERT INTO `schedule` (`id`,`value`,`date`,`hour`,`location`,`phone`) VALUES (10,'비컴솔루션 강남 도곡로', '2018/05/16', '11시', '서울특별시 강남구 151', '02-5643-3453');
INSERT INTO `schedule` (`id`,`value`,`date`,`hour`,`location`,`phone`) VALUES (11,'국립중앙도서관 서초', '2018/05/20', '07시', '서울특별시 서초구 171', '02-3241-5123');
INSERT INTO `schedule` (`id`,`value`,`date`,`hour`,`location`,`phone`) VALUES (12,'(주)서브 서초 가든파이브웍스', '2018/05/24', '21시', '서울특별시 서초구 102', '02-879-9878');
INSERT INTO `schedule` (`id`,`value`,`date`,`hour`,`location`,`phone`) VALUES (13,'큐브위즈 서교동', '2018/05/29', '14시', '서울특별시 마포구 559', '02-456-4363');
INSERT INTO `schedule` (`id`,`value`,`date`,`hour`,`location`,`phone`) VALUES (14,'과학기술위원회 서초', '2018/06/5', '16시', '서울특별시 서초구 78-2', '02-698-3252');
select * from schedule;
