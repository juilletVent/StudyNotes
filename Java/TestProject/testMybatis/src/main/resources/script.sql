# 创建数据库
CREATE DATABASE mydb;
USE mydb;

# 创建数据表
DROP TABLE users;
CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY COMMENT '用户编号',
	username VARCHAR(50) NOT NULL COMMENT '登录账号',
	userpass VARCHAR(50) NOT NULL COMMENT '登录密码',
	nickname VARCHAR(50) COMMENT '用户昵称',
	age INT COMMENT '用户年龄',
	gender VARCHAR(5) COMMENT '用户性别',
	phone VARCHAR(13) COMMENT '联系方式',
	email VARCHAR(20) COMMENT '用户邮箱',
	createTime DATETIME COMMENT '创建时间',
	updateTime DATETIME COMMENT '最后修改时间',
	lastLogin DATETIME COMMENT '最后登录时间',
	userStatus INT COMMENT '用户状态 0 正常 1 锁定 2 删除',
	remark TEXT COMMENT '备注'
) DEFAULT CHARSET "utf8";

INSERT INTO users(username, userpass,nickname,createTime,userStatus)
	VALUES("damu", "damu", "大慕", "2017-05-16", 0);
INSERT INTO users(username, userpass,nickname,createTime,userStatus)
	VALUES("xiaomu", "xiaomu", "小牧", "2017-05-16", 0);
INSERT INTO users(username, userpass,nickname,createTime,userStatus)
	VALUES("houjuzhang", "123456", "侯亮平", "2017-05-16", 1);
INSERT INTO users(username, userpass,nickname,createTime,userStatus)
	VALUES("jichangping", "111111", "季昌平", "2017-05-16", 1);
INSERT INTO users(username, userpass,nickname,createTime,userStatus)
	VALUES("chenhai", "222222", "陈海", "2017-05-16", 2);
	
SELECT * FROM users;


#创建地址表
DROP TABLE address;
CREATE TABLE address(
	id 			INT AUTO_INCREMENT PRIMARY KEY 	COMMENT '主键',
	userid 		INT 							COMMENT '外键：关联用户表主键',
	defaultAddr	BOOLEAN							COMMENT '是否默认地址',
	nation 		VARCHAR(20) 					COMMENT '国家',
	province 	VARCHAR(20) 					COMMENT '省区',
	city 		VARCHAR(20) 					COMMENT '市区',
	country 	VARCHAR(20) 					COMMENT '县区',
	street 		VARCHAR(100)					COMMENT '街道',
	remark		TEXT							COMMENT '备注'
) CHARSET "UTF8";
# 增加外键约束
ALTER TABLE address ADD FOREIGN KEY (userid) REFERENCES users(id);
# 增加测试数据
INSERT INTO address(userid, defaultAddr, nation, province, city, country, street, remark)
	VALUES	(1, TRUE, "中国", "河南", "郑州", "金水区", "二环路", "瑞隆城7号楼601"),
			(1, FALSE, "中国", "陕西", "西安", "北城区", "开元路", "文景小区1号楼202"),
			(1, FALSE, "中国", "云南", "昆明", "盘龙区", "小康大道", "银河星辰3号楼402");