FROM oven/bun:1

WORKDIR /code

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY app public next.config.mjs tsconfig.json ./

CMD bun dev


