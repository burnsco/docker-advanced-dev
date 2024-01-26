FROM node:18-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /code

COPY pnpm-lock.yaml package.json  ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY app public next.config.mjs tsconfig.json ./

CMD pnpm dev


