import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscordService {
  // private readonly discordURL =
  //   'https://discord.com/api/webhooks/1253390833290317856/EZZFHOTtABoz7ZvlHrpMyjpq9a58C4p_KgkNeNzg0005qyvkNbg80zlr2W4Rsaqx0Bzg';

  private readonly discordURL = '';

  async notify(message: string) {
    const body = {
      content: message,
    };

    const resp = await fetch(this.discordURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      console.log('Error al enviar mensaje a discord');
      return false;
    }

    return true;
  }
}
