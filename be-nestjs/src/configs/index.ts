import AppConfig from './app.config';
import AuthConfig from './auth.config';
import CacheConfig from './cache.config';
import DatabaseConfig from './database.config';
import LoggerConfig from './logger.config';
import NotifyConfig from './notify.config';
import RequestConfig from './request.config';
import S3Config from './s3.config';

export default [
  AppConfig,
  DatabaseConfig,
  LoggerConfig,
  RequestConfig,
  AuthConfig,
  CacheConfig,
  NotifyConfig,
  S3Config,
];
