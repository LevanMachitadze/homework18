import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { userTime } from './middlewares/userTime.middleware';
import { ProductsController } from './products/products.controller';
import { randomMiddleWare } from './middlewares/userRandom.middleware';
import { deleteMiddleWare } from './middlewares/userDelete.middleware';
@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(userTime)
      .forRoutes({ path: '*', method: RequestMethod.GET });
    consumer
      .apply(randomMiddleWare)
      .forRoutes({ path: '*', method: RequestMethod.GET });
    consumer
      .apply(deleteMiddleWare)
      .forRoutes({ path: '*', method: RequestMethod.DELETE });
  }
}
