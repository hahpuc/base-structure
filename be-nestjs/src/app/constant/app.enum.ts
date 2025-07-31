export enum APP_ENV {
  PROD = 'production',
  STAGING = 'staging',
  DEV = 'development',
}

export enum ELocale {
  vi = 'vi',
  en = 'en',
}

export enum EStatus {
  inactive,
  active,
  pending = -1,
}

export enum ESystemType {
  text,
  number,
  textarea,
  password,
  editor,
  json,
  boolean,
}
