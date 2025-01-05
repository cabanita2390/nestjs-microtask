import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuditDocument = Audit & Document;

@Schema()
export class Audit {
  @Prop({ required: true })
  action: string;

  @Prop({ required: true })
  entity: string;

  @Prop({ required: true })
  entityId: string;

  @Prop({ required: true })
  timestamp: Date;

  @Prop()
  userId: string;

  @Prop({ type: Object })
  changes: Record<string, any>;
}

export const AuditSchema = SchemaFactory.createForClass(Audit);
