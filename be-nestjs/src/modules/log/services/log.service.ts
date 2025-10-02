import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream, existsSync, readdirSync } from 'fs';
import path from 'path';

@Injectable()
export class LogService {
  constructor() {}

  getListLog(): { data: string[] } {
    const listFile = readdirSync(path.resolve(process.cwd(), 'logs/debug'));
    const listLog = listFile.filter((file) => file.endsWith('.log'));

    listLog.sort().reverse();

    return { data: listLog };
  }

  readLogByName(logName: string): StreamableFile | [] {
    const logPath = path.resolve(process.cwd(), 'logs/debug', `${logName}`);

    const isExists = existsSync(logPath);

    if (!isExists) return [];

    const file = createReadStream(logPath);
    return new StreamableFile(file);
  }
}
