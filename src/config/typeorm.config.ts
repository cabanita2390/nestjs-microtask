// src/config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const typeOrmConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    url: configService.get<string>('DATABASE_URL'), // Usar la URL desde el archivo .env
    autoLoadEntities: true,
    synchronize: true, // Solo para desarrollo
    logging: true,
    ssl: {
      rejectUnauthorized: false, // Necesario para Render
    },
  }),
};
