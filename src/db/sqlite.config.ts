import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const sqliteConfig: SequelizeModuleOptions = {
  dialect: 'sqlite',
  storage: '.db/data.sqlite3',
  autoLoadModels: true,
};
