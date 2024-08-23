import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60,
});

export async function rateLimiterMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.ip) {
    return res.status(400).json({ message: 'Invalid request IP' });
  }
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (error) {
    res.status(429).json({ message: 'Too many requests' });
  }
}
