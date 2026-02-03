import { RateLimiter } from "../rate-limiter/rate-limiter";

export const passwordResetLimiter = new RateLimiter({
  limit: 3,
  windowMs: 60 * 60 * 1000, // 1h
});
