import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export class randomMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const randomNumber = Math.random() * 10;
    if (randomNumber < 5) {
      next();
    } else {
      throw new BadRequestException('UNLUCKY! Try again');
    }
  }
}
