import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const initDoc = (app) => {
  const option = new DocumentBuilder()
    .setTitle('项目接口文档')
    .setDescription('文章，评论，登录，记录，展示')
    .setVersion('1')
    .build();

  const document = SwaggerModule.createDocument(app, option);

  SwaggerModule.setup('/api-docs', app, document); // 进入接口文档
};
