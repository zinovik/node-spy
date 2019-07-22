export interface ITelegramService {
  sendPhoto(chatId: number | string, photoPath: string): Promise<void>;
  setWebhook(url: string): Promise<void>;
}
