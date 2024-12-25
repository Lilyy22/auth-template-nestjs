import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Auth Mulit-role Template')
    .setDescription('API documentation for Auth Mulit-role Template on github')
    .setVersion('1.0')
    .addTag('Endpoints') // Optional: Tags for grouping endpoints
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Serve Swagger UI at /docs
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
