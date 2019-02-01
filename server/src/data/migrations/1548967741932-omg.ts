import {MigrationInterface, QueryRunner} from "typeorm";

export class omg1548967741932 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `FK_738b377b4eed6fc1e1c3792cdb0` ON `users`");
        await queryRunner.query("DROP INDEX `FK_6ff2f80f2548e495ac26587dbee` ON `table_reports`");
        await queryRunner.query("DROP INDEX `FK_3a6ed7aebd1f5f2f74cc44811e9` ON `start_dates`");
        await queryRunner.query("DROP INDEX `FK_80426bf71637c78dc6b1fb622cc` ON `chart_reports`");
        await queryRunner.query("DROP INDEX `FK_a678fcdd597ef10262756e47c7e` ON `chart_reports`");
        await queryRunner.query("DROP INDEX `FK_e2c923acc5ca366dc9b81a278b3` ON `chart_reports`");
        await queryRunner.query("CREATE TABLE `devices_table_reports` (`devicesId` varchar(255) NOT NULL, `tableReportsId` varchar(255) NOT NULL, PRIMARY KEY (`devicesId`, `tableReportsId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `users` CHANGE `adminUserId` `adminUserId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `table_reports` DROP COLUMN `minMaxValues`");
        await queryRunner.query("ALTER TABLE `table_reports` ADD `minMaxValues` json NULL");
        await queryRunner.query("ALTER TABLE `table_reports` CHANGE `userId` `userId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `start_dates` CHANGE `chartReportId` `chartReportId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `chart_reports` CHANGE `originId` `originId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `chart_reports` CHANGE `destinationId` `destinationId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `chart_reports` CHANGE `userId` `userId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_738b377b4eed6fc1e1c3792cdb0` FOREIGN KEY (`adminUserId`) REFERENCES `users`(`id`)");
        await queryRunner.query("ALTER TABLE `table_reports` ADD CONSTRAINT `FK_6ff2f80f2548e495ac26587dbee` FOREIGN KEY (`userId`) REFERENCES `users`(`id`)");
        await queryRunner.query("ALTER TABLE `start_dates` ADD CONSTRAINT `FK_3a6ed7aebd1f5f2f74cc44811e9` FOREIGN KEY (`chartReportId`) REFERENCES `chart_reports`(`id`)");
        await queryRunner.query("ALTER TABLE `chart_reports` ADD CONSTRAINT `FK_80426bf71637c78dc6b1fb622cc` FOREIGN KEY (`originId`) REFERENCES `devices`(`id`)");
        await queryRunner.query("ALTER TABLE `chart_reports` ADD CONSTRAINT `FK_a678fcdd597ef10262756e47c7e` FOREIGN KEY (`destinationId`) REFERENCES `devices`(`id`)");
        await queryRunner.query("ALTER TABLE `chart_reports` ADD CONSTRAINT `FK_e2c923acc5ca366dc9b81a278b3` FOREIGN KEY (`userId`) REFERENCES `users`(`id`)");
        await queryRunner.query("ALTER TABLE `devices_table_reports` ADD CONSTRAINT `FK_8fbaa135353808e26585fdfcfdb` FOREIGN KEY (`devicesId`) REFERENCES `devices`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `devices_table_reports` ADD CONSTRAINT `FK_be87a83ddf4cf4b6821b0d077a7` FOREIGN KEY (`tableReportsId`) REFERENCES `table_reports`(`id`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `devices_table_reports` DROP FOREIGN KEY `FK_be87a83ddf4cf4b6821b0d077a7`");
        await queryRunner.query("ALTER TABLE `devices_table_reports` DROP FOREIGN KEY `FK_8fbaa135353808e26585fdfcfdb`");
        await queryRunner.query("ALTER TABLE `chart_reports` DROP FOREIGN KEY `FK_e2c923acc5ca366dc9b81a278b3`");
        await queryRunner.query("ALTER TABLE `chart_reports` DROP FOREIGN KEY `FK_a678fcdd597ef10262756e47c7e`");
        await queryRunner.query("ALTER TABLE `chart_reports` DROP FOREIGN KEY `FK_80426bf71637c78dc6b1fb622cc`");
        await queryRunner.query("ALTER TABLE `start_dates` DROP FOREIGN KEY `FK_3a6ed7aebd1f5f2f74cc44811e9`");
        await queryRunner.query("ALTER TABLE `table_reports` DROP FOREIGN KEY `FK_6ff2f80f2548e495ac26587dbee`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_738b377b4eed6fc1e1c3792cdb0`");
        await queryRunner.query("ALTER TABLE `chart_reports` CHANGE `userId` `userId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `chart_reports` CHANGE `destinationId` `destinationId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `chart_reports` CHANGE `originId` `originId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `start_dates` CHANGE `chartReportId` `chartReportId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `table_reports` CHANGE `userId` `userId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `table_reports` DROP COLUMN `minMaxValues`");
        await queryRunner.query("ALTER TABLE `table_reports` ADD `minMaxValues` longtext CHARACTER SET \"utf8mb4\" COLLATE \"utf8mb4_bin\" NOT NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `adminUserId` `adminUserId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("DROP TABLE `devices_table_reports`");
        await queryRunner.query("CREATE INDEX `FK_e2c923acc5ca366dc9b81a278b3` ON `chart_reports`(`userId`)");
        await queryRunner.query("CREATE INDEX `FK_a678fcdd597ef10262756e47c7e` ON `chart_reports`(`destinationId`)");
        await queryRunner.query("CREATE INDEX `FK_80426bf71637c78dc6b1fb622cc` ON `chart_reports`(`originId`)");
        await queryRunner.query("CREATE INDEX `FK_3a6ed7aebd1f5f2f74cc44811e9` ON `start_dates`(`chartReportId`)");
        await queryRunner.query("CREATE INDEX `FK_6ff2f80f2548e495ac26587dbee` ON `table_reports`(`userId`)");
        await queryRunner.query("CREATE INDEX `FK_738b377b4eed6fc1e1c3792cdb0` ON `users`(`adminUserId`)");
    }

}
