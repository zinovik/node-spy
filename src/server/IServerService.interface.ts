export interface IServerService {
  createServer(
    requestListener: (request: Request, response: Response) => Promise<void>,
    port?: number,
  ): Promise<string>;
}
