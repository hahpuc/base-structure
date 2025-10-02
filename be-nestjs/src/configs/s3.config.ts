import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs(
  's3',
  (): Record<string, any> => ({
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    bucketName: process.env.S3_BUCKET_NAME,
    publicUrl: process.env.S3_PUBLIC_URL,
  }),
);
