import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as crypto from 'crypto';
import type { Request } from 'express';

// const WEBHOOK_SECRET = 'secret';

@Injectable()
export class GithubGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Entro');

    const req = context.switchToHttp().getRequest() as Request;

    try {
      const signature = crypto
        .createHmac('sha256', '')
        .update(JSON.stringify(req.body))
        .digest('hex');

      const xHubSignature = req.header('x-hub-signature-256') ?? '';

      let trusted = Buffer.from(`sha256=${signature}`, 'ascii');
      let untrusted = Buffer.from(xHubSignature, 'ascii');

      console.log(crypto.timingSafeEqual(trusted, untrusted));

      return crypto.timingSafeEqual(trusted, untrusted);
    } catch (eerror) {
      return false;
    }
  }
}
