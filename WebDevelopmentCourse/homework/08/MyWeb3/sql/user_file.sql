/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50151
Source Host           : localhost:3366
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2023-10-27 21:36:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user_file
-- ----------------------------
DROP TABLE IF EXISTS `user_file`;
CREATE TABLE `user_file` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_login_id` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL COMMENT '积分小类，哪种操作获得的积分',
  `creator` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_file
-- ----------------------------
INSERT INTO `user_file` VALUES ('1', '2018010100000366', '1', '超级管理员', '2017-09-09 12:00:00');
INSERT INTO `user_file` VALUES ('3', '2018010100000067', '1', '学生', '2017-09-09 12:00:00');
INSERT INTO `user_file` VALUES ('4', '2018010100000071', '1', '学生', '2017-09-09 12:00:00');
INSERT INTO `user_file` VALUES ('5', '2018010100000079', '12345678', '学生', '2017-09-09 12:00:00');
INSERT INTO `user_file` VALUES ('6', '2018010100000127', '1', '学生', '2017-09-09 12:00:00');
INSERT INTO `user_file` VALUES ('7', '2018010100000301', '1', '学生', '2017-09-09 12:00:00');
INSERT INTO `user_file` VALUES ('8', 'cdzhyc', '12345678', '超级管理员', '2018-01-07 18:08:36');
INSERT INTO `user_file` VALUES ('10', '2018032400001125', '1', '学生', '2018-01-07 18:08:36');
INSERT INTO `user_file` VALUES ('11', '2018010100000384', '1', '学生', '2018-01-07 18:08:36');
INSERT INTO `user_file` VALUES ('12', '2018051700001126', '12345678', '超级管理员', '2018-05-27 17:00:00');
INSERT INTO `user_file` VALUES ('13', '2018093000001134', '1', '交通管理员', '2018-09-30 11:30:00');
