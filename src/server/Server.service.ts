import { createServer, ServerOptions } from 'http';
const ngrok = require('ngrok');

import { IServerService } from './IServerService.interface';

export class ServerService implements IServerService {
  async createServer(
    requestListener: (request: Request, response: Response) => Promise<void>,
    port: number = 9990,
  ): Promise<string> {
    createServer(requestListener as ServerOptions).listen(port);

    const url = await ngrok.connect(port);
    return url;
  }
}
