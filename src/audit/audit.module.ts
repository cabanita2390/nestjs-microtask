import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditService } from './audit.service';
import { Audit, AuditSchema } from './schemas/audit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Audit.name, schema: AuditSchema }]),
  ],
  providers: [AuditService],
  exports: [AuditService], // Exportar AuditService para que pueda ser usado en otros módulos
})
export class AuditModule {}
