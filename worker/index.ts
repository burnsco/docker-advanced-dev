import { createClient } from 'redis';

const REDIS_URL = process.env.REDIS_URL || 'redis://redis:6379';

export function fib(index: number): number {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

const client = await createClient({
  url: REDIS_URL,
  socket: {
    reconnectStrategy: 1000,
  },
})
  .on('error', (err) => console.log('Redis Client Error', err))
  .connect();

const sub = client.duplicate();
sub.on('error', (err) => console.error(err));
await sub.connect();

sub.on('message', (channel, message) => {
  client.hSet('values', message, fib(parseInt(message)));
});

const listener = (message: any, channel: any) => console.log(message, channel);
sub.subscribe('insert', listener);
