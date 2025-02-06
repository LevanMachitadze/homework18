import { BadRequestException, NestMiddleware, Next } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class userTime implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const time = new Date();
    const Hour = time.getHours();
    console.log(Hour);
    if (Hour >= 10 && Hour < 18) {
      next();
    } else {
      throw new BadRequestException('request only allowed from 10 to 18');
    }
  }
}
