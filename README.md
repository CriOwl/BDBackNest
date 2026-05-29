# BDBackNest

API NestJS con PostgreSQL.

## Requisitos

- Node.js 20+
- Docker Desktop o Docker Engine
- npm

## Desarrollo local

```bash
npm ci
npm run start:dev
```

Para ejecutar en modo producción local:

```bash
npm run build
npm start
```

`npm start` ejecuta `node dist/main.js`; no usa el CLI `nest`.

## Docker Compose

Levanta la API y PostgreSQL:

```bash
docker compose up --build
```

La API queda en:

```bash
http://localhost:3000
http://localhost:3000/health
```

Para detener:

```bash
docker compose down
```

Para borrar también el volumen de PostgreSQL:

```bash
docker compose down -v
```

## Docker build manual

```bash
docker build -t bdbacknest .
```

Si ves un error como `nest: not found`, reconstruye sin caché para tomar el Dockerfile actualizado:

```bash
docker compose build --no-cache api
docker compose up
```

La etapa `builder` instala devDependencies para que exista `@nestjs/cli` durante `npm run build`. La imagen final instala solo dependencias de producción y arranca con `node dist/main.js`.

## Variables principales

```env
PORT=3000
DB_HOST=postgres
DB_PORT=5432
DB_NAME=app_db
DB_USER=app_user
DB_PASSWORD=app_password
DB_SCHEMA=public
```
