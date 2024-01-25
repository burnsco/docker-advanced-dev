FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY index.ts ./

# run the app
USER bun
EXPOSE 5000/tcp
ENTRYPOINT [ "bun", "--watch", "index.ts" ]
