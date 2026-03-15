/** Local: localhost. Server/CI: set BASE_URL or E2E_BASE_URL to the deployed app URL. */
export const BASE_URL =
  process.env.BASE_URL ?? process.env.E2E_BASE_URL ?? 'http://localhost:4200';
