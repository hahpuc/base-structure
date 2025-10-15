export const getMediaUrl = (key?: string): string => {
  if (!key) return "";

  if (key.startsWith("http")) return key;

  return "https://johnsonbaby-game.s3.ap-southeast-1.amazonaws.com" + "/" + key;
};
