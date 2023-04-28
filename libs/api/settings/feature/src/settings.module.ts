import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { settingsService } from './settings.service';

@Module({
  imports: [CqrsModule],
  providers: [settingsService],
  exports: [settingsService],
})
export class settingsModule {}
