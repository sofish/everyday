/*
Navicat MySQL Data Transfer

Source Server         : bragi
Source Server Version : 50550
Source Host           : 192.168.4.20:3306
Source Database       : bragi

Target Server Type    : MYSQL
Target Server Version : 50550
File Encoding         : 65001

Date: 2017-01-12 17:20:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `tb_menu`
-- ----------------------------
DROP TABLE IF EXISTS `tb_menu`;
CREATE TABLE `tb_menu` (
  `menu_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `menu_name` varchar(20) DEFAULT NULL COMMENT '菜单名称',
  `menu_url` varchar(100) DEFAULT NULL COMMENT '菜单地址',
  `menu_icon` varchar(20) DEFAULT 'fa-list' COMMENT '图标名称',
  `parent_id` int(10) DEFAULT NULL COMMENT '父菜单ID',
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_menu
-- ----------------------------
INSERT INTO `tb_menu` VALUES ('1', '系统管理', '', 'fa-cogs', null);
INSERT INTO `tb_menu` VALUES ('2', '全局分析', '', 'fa-cloud', null);
INSERT INTO `tb_menu` VALUES ('5', '用户管理', 'user.html', 'fa-user', '1');
INSERT INTO `tb_menu` VALUES ('6', '角色管理', 'role.html', 'fa-male', '1');
INSERT INTO `tb_menu` VALUES ('7', '菜单管理', 'menu.html', 'fa-th', '1');
INSERT INTO `tb_menu` VALUES ('14', '操作日志', 'log.html', 'fa-list', '1');
INSERT INTO `tb_menu` VALUES ('35', '战略指标跟踪', 'strategyReq.html', 'fa-laptop', '2');
INSERT INTO `tb_menu` VALUES ('37', '数据资产统计', 'assetsReq.html', 'fa-table', '2');
INSERT INTO `tb_menu` VALUES ('44', '数据源展示', 'sourceReq.html', 'fa-comment', '2');
INSERT INTO `tb_menu` VALUES ('45', '探测数据概览', 'detectReq.html', ' fa-star', '2');
INSERT INTO `tb_menu` VALUES ('46', '认证数据概览', 'authenticationReq.html', 'fa-home', '2');
INSERT INTO `tb_menu` VALUES ('47', '协议数据概览', 'protocolReq.html', 'fa-rocket', '2');
INSERT INTO `tb_menu` VALUES ('48', '数据监测', '', 'fa-bar-chart-o', null);
INSERT INTO `tb_menu` VALUES ('49', '数据接入监测', 'inputReq.html', 'fa-file', '48');
INSERT INTO `tb_menu` VALUES ('50', '数据输出监测', 'outputReq.html', 'fa-rss', '48');
INSERT INTO `tb_menu` VALUES ('52', '系统设置', 'setting.html', 'fa-cogs', '1');
