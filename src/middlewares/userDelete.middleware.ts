import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction } from 'express';

export class deleteMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['apikey'];
    if (!apiKey) {
      throw new UnauthorizedException('API Key is required ');
    }
    next();
  }
}
