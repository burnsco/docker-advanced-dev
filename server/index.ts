import cors from 'cors';
import type { Response } from 'express';
import express from 'express';
import { createClient } from 'redis';
import * as db from './db';

async function main() {
  const app = express();

  app.use(cors());
  const client = await createClient({
    url: 'redis://redis:6379',
  })
    .on('error', (err) => console.log('Redis Client Error', err))
    .connect();

  await client.set('views', 0);

  app.get('/', async (_, res: Response) => {
    const views = await client.get('views');
    res.send(`Views = ${views}`);

    views
      ? // set the views key, but parse it as int first then add one
        await client.set('views', parseInt(views) + 1)
      : await client.disconnect();
  });

  app.get('/foo', async (_, res: Response) => {
    const test = await db.query('SELECT NOW() as now');
    res.send(test);
  });

  const port = 3000;
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
main();
