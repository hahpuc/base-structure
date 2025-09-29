export enum EStatus {
  inactive,
  active,
}

export enum ESystemType {
  text,
  number,
  textarea,
  password,
  json,
}

export enum EUploadType {
  image = 'image/png,image/jpeg,image/bmp',
  document = 'application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,video/mp4',
  video = 'video/mp4,video/mkv',
}

export enum ELocale {
  vi = 'vi',
  en = 'en',
}
