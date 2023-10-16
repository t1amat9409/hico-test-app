FROM node:18-alpine

RUN mkdir /backend
WORKDIR /backend

COPY package.json ./

COPY init.sh /docker-entrypoint-initdb.d/init-database.sh
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
    else echo "Lockfile not found." && exit 1; \
    fi

COPY . .
COPY backend.Dockerfile /backend/Dockerfile

ENV APP_PORT=3000
ENV TYPEORM_CONN=postgres
ENV TYPEORM_HOST=postgres
ENV TYPEORM_USER=postgres
ENV TYPEORM_PWD=
ENV TYPEORM_DB=employee-dev
ENV TYPEORM_PORT=5432
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV TYPEORM_SYNC=true
ENV TYPEORM_LOG=true
ENV TYPEORM_ENTITIES=src/entity/**/*.ts
ENV NODE_ENV=development

EXPOSE 3000

RUN node -v
RUN yarn

CMD yarn start:dev;
