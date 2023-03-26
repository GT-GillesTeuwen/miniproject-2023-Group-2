import { UpdatePrivacyDetailsHandler } from './src/commands/index';
import { SettingsService } from './src/settings.service';
import { SettingsRepository } from '../data-access/src/index';

describe('PrivacyController', () => {
  let settingsService: SettingsService;
  let updatePrivacyDetailsHandler: UpdatePrivacyDetailsHandler;
  let settingsRepository: SettingsRepository;

  beforeEach(() => {
    settingsService = new SettingsService();
    settingsRepository = new SettingsRepository();
    updatePrivacyDetailsHandler = new UpdatePrivacyDetailsHandler(settingsRepository);
  });

  describe('updatePrivacyDetails', () => {
    it('should return privacy settings', async () => {
      const result = async () => ({ success: false, message: 'error message' });
      jest.spyOn(settingsService, 'updatePrivacyDetails');

      expect(await updatePrivacyDetailsHandler.execute()).toBe(result);
    });
  });
});