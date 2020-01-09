#!/usr/bin/env node

import { Spy } from './spy/Spy';
import { ServerService } from './server/Server.service';
import { WebcamService } from './webcam/Webcam.service';
import { TelegramService } from './telegram/Telegram.service';
import { FileSystemService } from './file-system/FileSystemService.service';

import { ConfigParameterNotDefinedError } from './error/ConfigParameterNotDefinedError';

if (process.argv[2] === undefined) {
  throw new ConfigParameterNotDefinedError('TOKEN');
}
if (process.argv[3] === undefined) {
  throw new ConfigParameterNotDefinedError('PASSWORD');
}

const serverService = new ServerService();
const webcamService = new WebcamService();
const telegramService = new TelegramService(process.argv[2]);
const fileSystemService = new FileSystemService();

const configuration = {
  currentPath: process.cwd(),
  password: process.argv[3],
};

const spy = new Spy(configuration, serverService, webcamService, telegramService, fileSystemService);

const signals: NodeJS.Signals[] = ['SIGTERM', 'SIGINT'];
signals.forEach(signal => {
  process.on(signal, async () => {
    await spy.stop();

    process.exit(0);
  });
});

(async (): Promise<void> => {
  await spy.start();
})();
