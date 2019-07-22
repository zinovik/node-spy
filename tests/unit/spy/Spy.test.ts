import { IMock, Mock, It, Times } from 'typemoq';

import { Spy } from '../../../src/spy/Spy';
import { IServerService } from '../../../src/server/IServerService.interface';
import { IWebcamService } from '../../../src/webcam/IWebcamService.interface';
import { ITelegramService } from '../../../src/telegram/ITelegramService.interface';
import { IFileSystemService } from '../../../src/file-system/IFileSystemService.interface';

describe('Spy', () => {
  let serverServiceMock: IMock<IServerService>;
  let webcamServiceMock: IMock<IWebcamService>;
  let telegramServiceMock: IMock<ITelegramService>;
  let fileSystemServiceMock: IMock<IFileSystemService>;

  let spy: Spy;

  beforeEach(() => {
    serverServiceMock = Mock.ofType<IServerService>();
    webcamServiceMock = Mock.ofType<IWebcamService>();
    telegramServiceMock = Mock.ofType<ITelegramService>();
    fileSystemServiceMock = Mock.ofType<IFileSystemService>();

    const configuration = {
      currentPath: 'test-path',
      password: 'test-pass',
    };

    spy = new Spy(
      configuration,
      serverServiceMock.object,
      webcamServiceMock.object,
      telegramServiceMock.object,
      fileSystemServiceMock.object,
    );
  });

  afterEach(() => {
    serverServiceMock.verifyAll();
    webcamServiceMock.verifyAll();
    telegramServiceMock.verifyAll();
    fileSystemServiceMock.verifyAll();
  });

  it('Should work', async () => {
    // Arrange

    // Act
    await spy.start();

    // Assert
    expect(true).toBeTruthy();
  });
});
