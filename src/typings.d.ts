/// <reference lib="dom" />

interface ImportMeta {
  url: string;

  readonly hot?: {
    readonly data: unknown;

    accept(): void;
    accept(cb: (mod: unknown) => void): void;
    accept(dep: string, cb: (mod: unknown) => void): void;
    accept(deps: readonly string[], cb: (mods: unknown[]) => void): void;

    /**
     * @deprecated
     */
    acceptDeps(): never;

    dispose(cb: (data: unknown) => void): void;
    decline(): void;
    invalidate(): void;

    on(event: string, cb: (...args: unknown[]) => void): void;
  };

  readonly env: ImportMetaEnv;

  glob(
    pattern: string
  ): Record<
    string,
    () => Promise<{
      [key: string]: unknown;
    }>
  >;

  globEager(
    pattern: string
  ): Record<
    string,
    {
      [key: string]: unknown;
    }
  >;
}
interface ImportMetaEnv {
  [key: string]: string | boolean | undefined;
  BASE_URL: string;
  MODE: string;
  DEV: boolean;
  PROD: boolean;
}

// CSS modules
type CSSModuleClasses = { readonly [key: string]: string };

declare module '*.module.css' {
  const s: CSSModuleClasses;
  export default s;
}
declare module '*.module.scss' {
  const s: CSSModuleClasses;
  export default s;
}
declare module '*.module.sass' {
  const s: CSSModuleClasses;
  export default s;
}
declare module '*.module.less' {
  const s: CSSModuleClasses;
  export default s;
}
declare module '*.module.styl' {
  const s: CSSModuleClasses;
  export default s;
}
declare module '*.module.stylus' {
  const s: CSSModuleClasses;
  export default s;
}

// CSS
declare module '*.css' {
  const css: string;
  export default css;
}
declare module '*.scss' {
  const css: string;
  export default css;
}
declare module '*.sass' {
  const css: string;
  export default css;
}
declare module '*.less' {
  const css: string;
  export default css;
}
declare module '*.styl' {
  const css: string;
  export default css;
}
declare module '*.stylus' {
  const css: string;
  export default css;
}

// Built-in asset types
// see `src/constants.ts`

// images
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.jpeg' {
  const src: string;
  export default src;
}
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.gif' {
  const src: string;
  export default src;
}
declare module '*.svg' {
  import { ReactElement, SVGProps } from 'react';
  const src: (props: SVGProps<SVGElement>) => ReactElement;
  export default src;
}
declare module '*.ico' {
  const src: string;
  export default src;
}
declare module '*.webp' {
  const src: string;
  export default src;
}

// media
declare module '*.mp4' {
  const src: string;
  export default src;
}
declare module '*.webm' {
  const src: string;
  export default src;
}
declare module '*.ogg' {
  const src: string;
  export default src;
}
declare module '*.mp3' {
  const src: string;
  export default src;
}
declare module '*.wav' {
  const src: string;
  export default src;
}
declare module '*.flac' {
  const src: string;
  export default src;
}
declare module '*.aac' {
  const src: string;
  export default src;
}

// fonts
declare module '*.woff' {
  const src: string;
  export default src;
}
declare module '*.woff2' {
  const src: string;
  export default src;
}
declare module '*.eot' {
  const src: string;
  export default src;
}
declare module '*.ttf' {
  const src: string;
  export default src;
}
declare module '*.otf' {
  const src: string;
  export default src;
}

// web worker
declare module '*?worker' {
  const workerConstructor: {
    new (): Worker;
  };
  export default workerConstructor;
}

declare module '*?worker&inline' {
  const workerConstructor: {
    new (): Worker;
  };
  export default workerConstructor;
}

declare module '*?raw' {
  const src: string;
  export default src;
}

declare module '*?url' {
  const src: string;
  export default src;
}

declare module 'big.js';
