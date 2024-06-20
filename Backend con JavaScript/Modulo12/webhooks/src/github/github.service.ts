import { Injectable } from '@nestjs/common';
import {
  GithubEvent,
  GithubIssue,
  GithubPayload,
  GithubStar,
} from './interfaces/github.interfaces';
import { DiscordService } from 'src/services/discord.service';

@Injectable()
export class GithubService {
  constructor(private readonly discordService: DiscordService) {}

  public async handlePayload(event: GithubEvent, payload: GithubPayload) {
    let message = '';

    switch (event) {
      case 'ping':
        message = 'Pong!';
        break;

      case 'star':
        message = this.handleStar(payload as GithubStar);
        break;

      case 'issues':
        message = this.handleIssue(payload as GithubIssue);
        break;

      default:
        message = `Unknown event: ${event}`;
        break;
    }

    console.log(message);
    await this.discordService.notify(message);
  }

  private handleStar(payload: GithubPayload) {
    const { action, sender, repository } = payload;

    return `User ${sender.login} ${action} star on ${repository.full_name}`;
  }

  private handleIssue(payload: GithubIssue) {
    const { action, issue, repository, sender } = payload;

    switch (action) {
      case 'opened':
        return `An issue was opened with this title ${issue.title} by ${sender.login}`;

      case 'closed':
        return `An issue was closed with this title ${issue.title} by ${sender.login}`;

      case 'reopened':
        return `An issue was reopened by ${sender.login}`;

      default:
        return `Unknown issue action: ${action}`;
    }
  }
}
