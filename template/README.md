This boilerplate is made to quickly prototype backend applications. It comes with database, logging, security, and authentication features out of the box.

---

### 🛠️ Prerequisites

#### Non Docker

- Please make sure to have MYSQL locally by utilizing a web server stack [XAMPP](https://www.apachefriends.org/). The control panel can start with MYSQL on localhost.

#### Docker 🐳

- Please make sure to have docker desktop on the local machine of choice to quickly compose both mariadb and nginx. Then follow the docker procedure outlined below.

**Note** Docker Desktop comes free on both Mac and Windows, but it only works with Windows 10 Pro. A work around is to get [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/) which will run through a VM.

---

### 🚀 Setup

#### Manually Deploying without Docker

- Create a .env file using the `cp .env.example .env` command and replace the existing env variables with the correct variables (username and password database)
- Install dependencies using `npm i` or `yarn`
- Start the app for pre-production using `npm run start` or for development using `npm run start:dev` (the app will be exposed on the port 9000; not to conflict with React)

#### Deploying with Docker 🐳

- Execute the following command in app directory:

```bash
# creates and loads the docker container with required configuration
$ docker-compose up -d
```

- The following command will setup the project for you (building the Docker images, starting docker-compose stack). The Web application and mongo will exposed on http://localhost:9000 and http://localhost:80 respectively

### 🔒 Environment Configuration

By default the application comes with a config module that can inject the ConfigService and read every environment variable from the .env. file.

**APP_ENV** - the application environment it will be executing as, either in development or production.

**APP_URL** - the base url for application.

**WEBTOKEN_SECRET_KEY** - the secret key to decrypt web tokens with. Make sure to generate a random alphanumeric string for this.

**WEBTOKEN_EXPIRATION_TIME** - the time in seconds on when the web token will expire; by default it's 1800 seconds which is 30 mins.

**DB_TYPE** - the type of [database connection to use](https://github.com/typeorm/typeorm/blob/master/docs/connection-options.md).

**DB_USERNAME** - username for authenticating against database.

**DB_PASSWORD** - password for authenticating against database, can be empty.

**DB_HOST** - the endpoint where this database sits (usually localhost but can be a static address).

**DB_PORT** - default ports for different types of database connections.

**DB_DATABASE** - the actual database to mutate.

---

### 🏗 Choosing a Web Framework

By default this boilerplate comes with [Fastify](https://github.com/fastify/fastify) as it offers [performance benefits](https://github.com/nestjs/nest/blob/master/benchmarks/all_output.txt) over Express. But can be changed to use [Express](https://expressjs.com/) instead. Please follow the steps below to change the web app from Fastify to Express.

- Replace the following lines of code in the [main.ts file](https://github.com/msanvarov/nest-rest-typeorm-boilerplate/blob/master/src/main.ts)

```ts
// from (fastify):
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as headers from 'fastify-helmet';
import * as fastifyRateLimiter from 'fastify-rate-limit';
const app = await NestFactory.create<NestFastifyApplication>(
  AppModule,
  new FastifyAdapter({ logger: console }),
);
app.register(headers);
app.register(fastifyRateLimiter, {
  max: 100,
  timeWindow: '1 minute',
});

// to (express):
import * as headers from 'helmet';
import * as rateLimiter from 'express-rate-limit';
const app = await NestFactory.create(AppModule, {
  logger: console,
});
app.use(headers());
app.use(
  rateLimiter({
    windowMs: 60, // 1 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
);
```

**Note** If you decided to use Fastify or Express over the other, please remove the extra Express/Fastify dependencies not used.

If you choose to **use Fastify**, this command will **purge the project of all Express dependencies**:

```bash
# removing Express dependencies
$ npm rm @nestjs/platform-express express-rate-limit helmet swagger-ui-express @types/express --save
```

If you choose to **use Express**, this command will **purge the project of all Fastify dependencies**:

```bash
# removing Fastify dependencies
$ npm rm @nestjs/platform-fastify fastify-helmet fastify-rate-limit fastify-swagger --save
```

---

### 🖴 Choosing a Database

By default **MYSQL** is the database of choice but support for other database types like sqlite, postgres, mongodb, and mssql. To use the any of these, either change the configuration in the `.env` file, or download the corresponding wrapper library, like [sqlite3](https://www.npmjs.com/package/sqlite3).

The configuration portion involves replicating the settings required for the database type of choice.

**For MongoDB, TypeORM is not a feature rich as Mongoose. Therefore I created another boilerplate for [Mongoose](https://github.com/msanvarov/nest-rest-mongo-boilerplate)**.

---

### ✅ Testing

#### Docker 🐳

```bash
# unit tests
$ docker exec -it nest yarn test

# e2e tests
$ docker exec -it nest yarn test:e2e

# test coverage
$ docker exec -it nest yarn test:cov
```

#### Non-Docker

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

---

### 💡 TypeDocs

The documentation for this boilerplate can be found [here](https://msanvarov.github.io/nest-rest-typeorm-boilerplate/).

On demand, the docs can be generated by typing `npm run typedocs`. This will produce a **docs** folder with the required files and **start hosting the files on localhost port 8080**.

```bash
# generate docs for code
$ npm run typedocs
```

---

### 📝 Open API

Out of the box, the web app comes with an [open api specification](https://swagger.io/specification/), that is used to describe RESTful APIs. Nest provides a dedicated module to work with it.

The configuration for Swagger can be found at this [location](https://github.com/msanvarov/nest-mongoose-boilerplate/tree/master/src/swagger).

---

### ✨ TypeORM

TypeORM is a Object-relational mapping that creates an abstraction layer over operations on databases. Please view the [documentation](https://typeorm.io/#/) for further details.

The configuration for TypeORM can be found in the [app module](https://github.com/msanvarov/nest-rest-typeorm-boilerplate/blob/master/src/modules/app/app.module.ts#L17).

---

### 🔊 Logs

This boilerplate comes with a winston module for logging, the configurations for winston can be found in the [app module](https://github.com/msanvarov/nest-mongoose-boilerplate/blob/master/src/modules/main/app.module.ts#L24).

---

### 👥 Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

---

## License

Nest is [MIT licensed](LICENSE).

[Author](https://msanvarov.github.io/personal-portfolio/)
