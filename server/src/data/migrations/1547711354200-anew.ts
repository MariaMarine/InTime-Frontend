import {MigrationInterface, QueryRunner} from "typeorm";

export class anew1547711354200 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `chart_reports` DROP FOREIGN KEY `FK_a3f88a9fcfb779ed8c855ec7b4c`");
        await queryRunner.query("ALTER TABLE `start_dates` CHANGE `dateInMilliseconds` `dateInMilliseconds` bigint NULL");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_738b377b4eed6fc1e1c3792cdb0`");
        await queryRunner.query("ALTER TABLE `users` CHANGE `adminUserId` `adminUserId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `table_reports` DROP FOREIGN KEY `FK_6ff2f80f2548e495ac26587dbee`");
        await queryRunner.query("ALTER TABLE `table_reports` CHANGE `userId` `userId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `chart_reports` CHANGE `tableReportId` `tableReportId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_738b377b4eed6fc1e1c3792cdb0` FOREIGN KEY (`adminUserId`) REFERENCES `users`(`id`)");
        await queryRunner.query("ALTER TABLE `table_reports` ADD CONSTRAINT `FK_6ff2f80f2548e495ac26587dbee` FOREIGN KEY (`userId`) REFERENCES `users`(`id`)");
        await queryRunner.query("ALTER TABLE `chart_reports` ADD CONSTRAINT `FK_a3f88a9fcfb779ed8c855ec7b4c` FOREIGN KEY (`tableReportId`) REFERENCES `table_reports`(`id`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `chart_reports` DROP FOREIGN KEY `FK_a3f88a9fcfb779ed8c855ec7b4c`");
        await queryRunner.query("ALTER TABLE `table_reports` DROP FOREIGN KEY `FK_6ff2f80f2548e495ac26587dbee`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_738b377b4eed6fc1e1c3792cdb0`");
        await queryRunner.query("ALTER TABLE `chart_reports` CHANGE `tableReportId` `tableReportId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `table_reports` CHANGE `userId` `userId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `table_reports` ADD CONSTRAINT `FK_6ff2f80f2548e495ac26587dbee` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `users` CHANGE `adminUserId` `adminUserId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_738b377b4eed6fc1e1c3792cdb0` FOREIGN KEY (`adminUserId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `start_dates` CHANGE `dateInMilliseconds` `dateInMilliseconds` bigint NOT NULL");
        await queryRunner.query("ALTER TABLE `chart_reports` ADD CONSTRAINT `FK_a3f88a9fcfb779ed8c855ec7b4c` FOREIGN KEY (`tableReportId`) REFERENCES `table_reports`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
    }

}
