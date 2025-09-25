import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLocalseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const locale = (req.headers['locale'] as string) || 'en'; // fallback
    req['locale'] = locale;
    next();
  }
}
