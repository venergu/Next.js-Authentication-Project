interface RateLimitConfig {
  limit: number;
  windowMs: number;
}

interface RateLimitStore {
  count: number;
  resetTime: number;
}

export class RateLimiter {
  private store: Map<string, RateLimitStore> = new Map();

  constructor(private config: RateLimitConfig) {
    setInterval(() => this.cleanup(), 10 * 60 * 1000);
  }

  async check(key: string): Promise<{
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
  }> {
    const now = Date.now();
    const data = this.store.get(key);

    if (!data) {
      const resetTime = now + this.config.windowMs;

      this.store.set(key, {
        count: 1,
        resetTime,
      });

      return {
        success: true,
        limit: this.config.limit,
        remaining: this.config.limit - 1,
        reset: Math.floor(resetTime / 1000),
      };
    }

    if (now >= data.resetTime) {
      const resetTime = now + this.config.windowMs;

      this.store.set(key, {
        count: 1,
        resetTime,
      });

      return {
        success: true,
        limit: this.config.limit,
        remaining: this.config.limit - 1,
        reset: Math.floor(resetTime / 1000),
      };
    }

    if (data.count >= this.config.limit) {
      return {
        success: false,
        limit: this.config.limit,
        remaining: 0,
        reset: Math.floor(data.resetTime / 1000),
      };
    }

    data.count++;
    this.store.set(key, data);

    return {
      success: true,
      limit: this.config.limit,
      remaining: this.config.limit - data.count,
      reset: Math.floor(data.resetTime / 1000),
    };
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, data] of this.store.entries()) {
      if (now > data.resetTime + 60 * 60 * 1000) {
        this.store.delete(key);
      }
    }
  }

  reset(key: string): void {
    this.store.delete(key);
  }
}
