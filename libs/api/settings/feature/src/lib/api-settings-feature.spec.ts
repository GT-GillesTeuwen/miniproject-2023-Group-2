import { UpdateThemeSettings, UpdatePrivacySettings } from '../commands';
import { UpdateThemeSettingsCommand, UpdatePrivacySettingsCommand } from '@mp/api/settings/util';

import { NotImplementedException } from '@nestjs/common';


describe('SettingsFeature', () => {
  let updateThemeSettings: UpdateThemeSettings;
  let updateThemeSettingsCommand : UpdateThemeSettingsCommand
  let updatePrivacySettings: UpdatePrivacySettings;
  let updatePrivacySettingsCommand : UpdatePrivacySettingsCommand

  beforeEach(() => {
    updateThemeSettings = new UpdateThemeSettings();
    updateThemeSettingsCommand = new UpdateThemeSettingsCommand();
    updatePrivacySettings = new UpdatePrivacySettings();
    updatePrivacySettingsCommand = new UpdatePrivacySettingsCommand();
  });

  describe('UpdateTheme', () => {
    it('should work', async () => {
      expect(await updateThemeSettings.execute(updateThemeSettingsCommand)).toEqual(new NotImplementedException);
    });
  });

  describe('UpdatePrivacy', () => {
    it('should work', async () => {
      expect(await updatePrivacySettings.execute(updatePrivacySettingsCommand)).toEqual(new NotImplementedException);
    });
  });
});