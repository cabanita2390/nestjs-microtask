import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestSchema } from './schemas/test.schema';
import { TestService } from './test.service';
import { TestController } from './test.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Test', schema: TestSchema }])],
  providers: [TestService],
  controllers: [TestController],
})
export class TestModule {}
