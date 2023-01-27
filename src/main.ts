import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { initDoc } from './doc';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces'; // 静态资源类型支持
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { TransfromInterceptor } from './common/interceptor/transfrom.interceptor';
import * as cors from 'cors';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/avatar',
  });
  // http://localhost:3000/avatar/1673187306359.jpg (访问静态资源图片的路径，/avatar 是自定义路径)

  app.useStaticAssets(join(__dirname, 'images/articles'), {
    prefix: '/articleimg',
  });

  // 初始化 doc
  initDoc(app);
  // 版本控制
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  app.use(cors());

  app.useGlobalPipes(new ValidationPipe());

  // 全局前缀
  app.setGlobalPrefix('/api');

  // 全局过滤器
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransfromInterceptor());

  await app.listen(3000);
}
bootstrap();
// http://localhost:3000/api/v1/
