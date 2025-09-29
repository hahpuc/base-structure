import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalComponent } from 'ng-zorro-antd/modal';
import {
  NzShowUploadList,
  NzUploadFile,
  NzUploadListType,
  NzUploadModule,
  NzUploadXHRArgs,
} from 'ng-zorro-antd/upload';
import { Observable, Subscription } from 'rxjs';

import { EUploadType } from '@/app/shared/constants/enum';
import { S3Service } from '@/app/shared/services/s3.service';

@Component({
  imports: [
    CommonModule,
    NzUploadModule,
    NzModalComponent,
    NzButtonModule,
    NzIconModule,
    NzUploadModule,
  ],
  selector: 'app-file-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent implements OnChanges {
  @Input() value?: string | null;
  @Input() accept: EUploadType = EUploadType.image;
  @Input() type: EUploadType = EUploadType.image;
  @Input() nzListType: NzUploadListType = 'picture-card';

  @Input() isSmall: boolean = false;

  @Input() maxSize: number = 0; // In KB - 0 is unlimited
  @Input() maxFileSize: number = 0; // In KB - 0 is unlimited
  @Input() isError = false;
  @Input() disabled: boolean = false;
  @Input() showUploadList: boolean | NzShowUploadList = true;
  previewImage: string | undefined = '';
  previewVisible = false;

  fileList: NzUploadFile[] = [];

  constructor(
    private readonly s3Service: S3Service,
    private readonly msgService: NzMessageService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']?.currentValue) {
      const el = changes['value'].currentValue;
      const fileName = el.split('/').pop();

      this.fileList = [
        {
          uid: '-1',
          name: fileName,
          status: 'done',
          url: this.s3Service.getFileUrl(changes['value'].currentValue),
        },
      ];
    }
  }

  dummyRequest(item: NzUploadXHRArgs): Subscription {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next('ok');
        observer.complete();
      }, 200);
    }).subscribe(value => {
      item.onSuccess?.(value, item.file, null);
    });
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      if (file.originFileObj) {
        file['preview'] = await this.s3Service.getFileAsBase64(file.originFileObj);
      }
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  async uploadImage(): Promise<string | void> {
    if (this.fileList[0]) {
      if (this.fileList[0].originFileObj) {
        const file = this.fileList[0].originFileObj as File;
        if (file.size > this.maxFileSize && this.maxFileSize > 0) {
          const limitSizeMB = this.maxFileSize / 1024;
          this.msgService.error('File size cannot exceed ' + limitSizeMB + 'MB');
          return;
        }

        const url = await this.s3Service.uploadFileSync(file);
        return url;
      }
      return this.fileList[0].url;
    }
  }

  hasFiles(): boolean {
    return this.fileList.length > 0;
  }
}
