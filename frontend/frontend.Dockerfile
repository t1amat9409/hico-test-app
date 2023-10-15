# dev.Dockerfile for development

FROM node:18-alpine

RUN mkdir /app
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

COPY . .
COPY frontend.Dockerfile /app/Dockerfile
ENV NODE_ENV=development

RUN node -v
RUN yarn add -D @esbuild/linux-arm64
RUN yarn

CMD yarn dev
