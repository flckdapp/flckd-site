/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_APP_STORE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
