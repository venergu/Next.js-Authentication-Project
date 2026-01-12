export class Env {
  static get = (key: string, defaultValue?: string): string => {
    const value = process.env[key];

    if (value) return value;
    if (defaultValue) return defaultValue;
    throw new Error(`No env variable: "${key}"`);
  };
}
