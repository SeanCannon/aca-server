SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "America/Los_Angeles";
SET FOREIGN_KEY_CHECKS = 0;

--
-- Database: `*_aca_server_core`
--
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `__CORE_DB_NAME__`.`galleries` (
  `id`           INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title`        VARCHAR(100)     NOT NULL,
  `strategy_key` VARCHAR(20)      NOT NULL,
  `created`      TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `strategy_key` (`strategy_key`)
)
  ENGINE          = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE         = utf8_unicode_ci
  AUTO_INCREMENT  = 1;

-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `__CORE_DB_NAME__`.`renders` (
  `id`                   INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `image`                VARCHAR(100)     NOT NULL,
  `gallery_strategy_key` VARCHAR(20)      NOT NULL,
  `gallery_item_id`      INT(10) UNSIGNED NOT NULL,
  `author_ip`            VARCHAR(46)               DEFAULT NULL,
  `created`              TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),

  CONSTRAINT `FK_render_gallery` FOREIGN KEY (`gallery_strategy_key`)  REFERENCES `__CORE_DB_NAME__`.`galleries`  (`strategy_key`)
    ON DELETE CASCADE
)
  ENGINE          = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE         = utf8_unicode_ci
  AUTO_INCREMENT  = 1;

-- --------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 1;
