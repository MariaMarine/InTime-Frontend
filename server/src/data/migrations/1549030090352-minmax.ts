import {MigrationInterface, QueryRunner} from "typeorm";

export class minmax1549030090352 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `table_reports` ADD `minMaxValues` json NULL");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_738b377b4eed6fc1e1c3792cdb0`");
        await queryRunner.query("ALTER TABLE `users` CHANGE `adminUserId` `adminUserId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `table_reports` DROP FOREIGN KEY `FK_6ff2f80f2548e495ac26587dbee`");
        await queryRunner.query("ALTER TABLE `table_reports` CHANGE `userId` `userId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `start_dates` DROP FOREIGN KEY `FK_3a6ed7aebd1f5f2f74cc44811e9`");
        await queryRunner.query("ALTER TABLE `start_dates` CHANGE `chartReportId` `chartReportId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `chart_reports` DROP FOREIGN KEY `FK_80426bf71637c78dc6b1fb622cc`");
        await queryRunner.query("ALTER TABLE `chart_reports` DROP FOREIGN KEY `FK_a678fcdd597ef10262756e47c7e`");
        await queryRunner.query("ALTER TABLE `chart_reports` DROP FOREIGN KEY `FK_e2c923acc5ca366dc9b81a278b3`");
        await queryRunner.query("ALTER TABLE `chart_reports` CHANGE `originId` `originId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `chart_reports` CHANGE `destinationId` `destinationId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `chart_reports` CHANGE `userId` `userId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_738b377b4eed6fc1e1c3792cdb0` FOREIGN KEY (`adminUserId`) REFERENCES `users`(`id`)");
        await queryRunner.query("ALTER TABLE `table_reports` ADD CONSTRAINT `FK_6ff2f80f2548e495ac26587dbee` FOREIGN KEY (`userId`) REFERENCES `users`(`id`)");
        await queryRunner.query("ALTER TABLE `start_dates` ADD CONSTRAINT `FK_3a6ed7aebd1f5f2f74cc44811e9` FOREIGN KEY (`chartReportId`) REFERENCES `chart_reports`(`id`)");
        await queryRunner.query("ALTER TABLE `chart_reports` ADD CONSTRAINT `FK_80426bf71637c78dc6b1fb622cc` FOREIGN KEY (`originId`) REFERENCES `devices`(`id`)");
        await queryRunner.query("ALTER TABLE `chart_reports` ADD CONSTRAINT `FK_a678fcdd597ef10262756e47c7e` FOREIGN KEY (`destinationId`) REFERENCES `devices`(`id`)");
        await queryRunner.query("ALTER TABLE `chart_reports` ADD CONSTRAINT `FK_e2c923acc5ca366dc9b81a278b3` FOREIGN KEY (`userId`) REFERENCES `users`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `chart_reports` DROP FOREIGN KEY `FK_e2c923acc5ca366dc9b81a278b3`");
        await queryRunner.query("ALTER TABLE `chart_reports` DROP FOREIGN KEY `FK_a678fcdd597ef10262756e47c7e`");
        await queryRunner.query("ALTER TABLE `chart_reports` DROP FOREIGN KEY `FK_80426bf71637c78dc6b1fb622cc`");
        await queryRunner.query("ALTER TABLE `start_dates` DROP FOREIGN KEY `FK_3a6ed7aebd1f5f2f74cc44811e9`");
        await queryRunner.query("ALTER TABLE `table_reports` DROP FOREIGN KEY `FK_6ff2f80f2548e495ac26587dbee`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_738b377b4eed6fc1e1c3792cdb0`");
        await queryRunner.query("ALTER TABLE `chart_reports` CHANGE `userId` `userId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `chart_reports` CHANGE `destinationId` `destinationId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `chart_reports` CHANGE `originId` `originId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `chart_reports` ADD CONSTRAINT `FK_e2c923acc5ca366dc9b81a278b3` FOREIGN KEY (`userId`, `userId`) REFERENCES `users`(`id`,`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `chart_reports` ADD CONSTRAINT `FK_a678fcdd597ef10262756e47c7e` FOREIGN KEY (`destinationId`, `destinationId`) REFERENCES `devices`(`id`,`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `chart_reports` ADD CONSTRAINT `FK_80426bf71637c78dc6b1fb622cc` FOREIGN KEY (`originId`, `originId`) REFERENCES `devices`(`id`,`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `start_dates` CHANGE `chartReportId` `chartReportId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `start_dates` ADD CONSTRAINT `FK_3a6ed7aebd1f5f2f74cc44811e9` FOREIGN KEY (`chartReportId`, `chartReportId`) REFERENCES `chart_reports`(`id`,`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `table_reports` CHANGE `userId` `userId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `table_reports` ADD CONSTRAINT `FK_6ff2f80f2548e495ac26587dbee` FOREIGN KEY (`userId`, `userId`) REFERENCES `users`(`id`,`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `users` CHANGE `adminUserId` `adminUserId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_738b377b4eed6fc1e1c3792cdb0` FOREIGN KEY (`adminUserId`, `adminUserId`) REFERENCES `users`(`id`,`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `table_reports` DROP COLUMN `minMaxValues`");
    }

}
