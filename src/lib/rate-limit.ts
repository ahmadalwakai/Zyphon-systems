import { RateLimiter } from 'limiter';

type Interval = 'second' | 'sec' | 'minute' | 'min' | 'hour' | 'hr' | 'day';

const limiters = new Map<string, RateLimiter>();

export function getRateLimiter(key: string, tokensPerInterval: number, interval: Interval): RateLimiter {
  if (!limiters.has(key)) {
    limiters.set(key, new RateLimiter({ tokensPerInterval, interval }));
  }
  return limiters.get(key)!;
}

export async function checkRateLimit(ip: string, endpoint: string, limit: number = 10, interval: Interval = 'minute'): Promise<boolean> {
  const key = `${endpoint}:${ip}`;
  const limiter = getRateLimiter(key, limit, interval);
  const hasToken = await limiter.tryRemoveTokens(1);
  return hasToken;
}
