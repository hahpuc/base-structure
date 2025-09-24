export type CachedTranslations = {
  [namespace: string]: {
    [key: string]: string;
  };
};

export type TranslationCacheKey = {
  language: string;
  namespace?: string;
};

export type TranslationResult = {
  value: string;
  key: string;
  namespace: string;
  language: string;
};
