import { env } from "@/services/env.service";

export const getMediaUrl = (key?: string): string => {
  if (!key) return "";

  if (key.startsWith("http")) return key;

  return env.s3.publicUrl + "/" + key;
};
