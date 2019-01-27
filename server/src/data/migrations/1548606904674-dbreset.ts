import {MigrationInterface, QueryRunner} from "typeorm";

export class dbreset1548606904674 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `start_dates` (`id` varchar(255) NOT NULL, `dateInMilliseconds` bigint NOT NULL, `chartReportId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `table_reports` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `startDateInMilliseconds` bigint NOT NULL, `endDateInMilliseconds` bigint NOT NULL, `period` int NOT NULL, `userId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `devices` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `longitude` varchar(255) NOT NULL, `latitude` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `isAdmin` tinyint NOT NULL DEFAULT 0, `adminUserId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `chart_reports` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `origin` varchar(255) NOT NULL, `destination` varchar(255) NOT NULL, `periodInMilliseconds` bigint NULL, `userId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `devices_table_reports` (`devicesId` varchar(255) NOT NULL, `tableReportsId` varchar(255) NOT NULL, PRIMARY KEY (`devicesId`, `tableReportsId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users_devices` (`usersId` varchar(255) NOT NULL, `devicesId` varchar(255) NOT NULL, PRIMARY KEY (`usersId`, `devicesId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `start_dates` ADD CONSTRAINT `FK_3a6ed7aebd1f5f2f74cc44811e9` FOREIGN KEY (`chartReportId`) REFERENCES `chart_reports`(`id`)");
        await queryRunner.query("ALTER TABLE `table_reports` ADD CONSTRAINT `FK_6ff2f80f2548e495ac26587dbee` FOREIGN KEY (`userId`) REFERENCES `users`(`id`)");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_738b377b4eed6fc1e1c3792cdb0` FOREIGN KEY (`adminUserId`) REFERENCES `users`(`id`)");
        await queryRunner.query("ALTER TABLE `chart_reports` ADD CONSTRAINT `FK_e2c923acc5ca366dc9b81a278b3` FOREIGN KEY (`userId`) REFERENCES `users`(`id`)");
        await queryRunner.query("ALTER TABLE `devices_table_reports` ADD CONSTRAINT `FK_8fbaa135353808e26585fdfcfdb` FOREIGN KEY (`devicesId`) REFERENCES `devices`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `devices_table_reports` ADD CONSTRAINT `FK_be87a83ddf4cf4b6821b0d077a7` FOREIGN KEY (`tableReportsId`) REFERENCES `table_reports`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `users_devices` ADD CONSTRAINT `FK_7a00ea6385295ffd17e8461fae7` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `users_devices` ADD CONSTRAINT `FK_55225fc56695862ca9608829d17` FOREIGN KEY (`devicesId`) REFERENCES `devices`(`id`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users_devices` DROP FOREIGN KEY `FK_55225fc56695862ca9608829d17`");
        await queryRunner.query("ALTER TABLE `users_devices` DROP FOREIGN KEY `FK_7a00ea6385295ffd17e8461fae7`");
        await queryRunner.query("ALTER TABLE `devices_table_reports` DROP FOREIGN KEY `FK_be87a83ddf4cf4b6821b0d077a7`");
        await queryRunner.query("ALTER TABLE `devices_table_reports` DROP FOREIGN KEY `FK_8fbaa135353808e26585fdfcfdb`");
        await queryRunner.query("ALTER TABLE `chart_reports` DROP FOREIGN KEY `FK_e2c923acc5ca366dc9b81a278b3`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_738b377b4eed6fc1e1c3792cdb0`");
        await queryRunner.query("ALTER TABLE `table_reports` DROP FOREIGN KEY `FK_6ff2f80f2548e495ac26587dbee`");
        await queryRunner.query("ALTER TABLE `start_dates` DROP FOREIGN KEY `FK_3a6ed7aebd1f5f2f74cc44811e9`");
        await queryRunner.query("DROP TABLE `users_devices`");
        await queryRunner.query("DROP TABLE `devices_table_reports`");
        await queryRunner.query("DROP TABLE `chart_reports`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `devices`");
        await queryRunner.query("DROP TABLE `table_reports`");
        await queryRunner.query("DROP TABLE `start_dates`");
    }

}
