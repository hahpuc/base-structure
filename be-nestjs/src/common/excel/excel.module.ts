import { ExcelService } from '@common/excel/services/excel.service';
import { Global, Module } from '@nestjs/common';
@Global()
@Module({
  providers: [ExcelService],
  exports: [ExcelService],
})
export class ExcelModule {}
