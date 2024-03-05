interface ImportMetaEnv {
    readonly VITE_AES_KEY: string
    readonly VITE_ENV_MODE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
