import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  SWAGGER_API_ROOT,
  SWAGGER_API_NAME,
  SWAGGER_API_DESCRIPTION,
  SWAGGER_API_CURRENT_VERSION,
  SWAGGER_API_AUTH_NAME,
  SWAGGER_API_AUTH_LOCATION,
  SWAGGER_API_SCHEMES,
} from './constants';

/**
 * Open api configuration to be used as a basis for web application
 */
export const configureOpenAPI = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .setSchemes(...SWAGGER_API_SCHEMES)
    .addBearerAuth(SWAGGER_API_AUTH_NAME, SWAGGER_API_AUTH_LOCATION)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);
};
