import { Module } from '@nestjs/common';
import { settingsRepository } from './settings.repository';

@Module({
  providers: [settingsRepository],
  exports: [settingsRepository],
})
export class settingsModule {}
