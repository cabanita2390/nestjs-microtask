import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Audit, AuditDocument } from './schemas/audit.schema';

@Injectable()
export class AuditService {
  constructor(
    @InjectModel(Audit.name) private auditModel: Model<AuditDocument>,
  ) {}

  async createAudit(
    action: string,
    entity: string,
    entityId: string,
    userId?: string,
    changes?: Record<string, any>,
  ): Promise<Audit> {
    const audit = new this.auditModel({
      action,
      entity,
      entityId,
      timestamp: new Date(),
      userId,
      changes,
    });
    return audit.save();
  }
}
