import { IMock, Mock } from 'typemoq';

import { Spy } from '../../../src/spy/Spy';
import { IWebcamService } from '../../../src/webcam/IWebcamService.interface';
import { ITelegramService } from '../../../src/telegram/ITelegramService.interface';
import { IFileSystemService } from '../../../src/file-system/IFileSystemService.interface';

describe('Spy', () => {
  let webcamServiceMock: IMock<IWebcamService>;
  let telegramServiceMock: IMock<ITelegramService>;
  let fileSystemServiceMock: IMock<IFileSystemService>;

  let spy: Spy;

  beforeEach(() => {
    webcamServiceMock = Mock.ofType<IWebcamService>();
    telegramServiceMock = Mock.ofType<ITelegramService>();
    fileSystemServiceMock = Mock.ofType<IFileSystemService>();

    const configuration = {
      currentPath: 'test-path',
      password: 'test-pass',
    };

    spy = new Spy(configuration, webcamServiceMock.object, telegramServiceMock.object, fileSystemServiceMock.object);
  });

  afterEach(() => {
    webcamServiceMock.verifyAll();
    telegramServiceMock.verifyAll();
    fileSystemServiceMock.verifyAll();
  });

  it('Should work', async () => {
    // Arrange

    // Act
    await spy.stop();
    await spy.start();

    // Assert
    expect(true).toBeTruthy();
  });
});
