/** Reads a required Vite env variable and fails fast when it is missing. */
function readRequired(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}. Copy .env.example to .env.`);
  }

  return value;
}

/** Single access point for environment configuration. */
export const env = {
  apiBaseUrl: readRequired('VITE_API_BASE_URL').replace(/\/+$/, ''),
} as const;
