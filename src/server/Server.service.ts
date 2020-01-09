import { createServer, ServerOptions, Server } from 'http';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ngrok = require('ngrok');

import { IServerService } from './IServerService.interface';

export class ServerService implements IServerService {
  private server: Server;

  async createServer(
    requestListener: (request: Request, response: Response) => Promise<void>,
    port = 9990,
  ): Promise<string> {
    this.server = createServer(requestListener as ServerOptions);
    this.server.listen(port);

    const url = await ngrok.connect(port);
    return url;
  }

  stopServer(): void {
    this.server.close();
  }
}
