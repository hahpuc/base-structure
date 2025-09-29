import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { firstValueFrom, Observable } from 'rxjs';

import { AppBaseComponent } from '@/app/shared/components/base/app.base.component';
import { UploadComponent } from '@/app/shared/components/forms/controls/upload-file/upload.component';
import { EUploadType } from '@/app/shared/constants/enum';
import { LanguageService } from '@/app/shared/services/language.service';
import { S3Service } from '@/app/shared/services/s3.service';
import { TranslationService } from '@/app/shared/services/translation.service';
import { BaseOption } from '@/app/shared/types/base';

// Interface for upload file objects
interface UploadFile {
  name?: string;
  type?: string;
  size?: number;
  originFileObj?: File | Blob | FileLikeObject;
  response?: File | unknown;
}

interface FileLikeObject {
  name?: string;
  type?: string;
  size?: number;
}

@Component({
  selector: 'app-import-modal-translation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzModalModule,
    NzFormModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule,
    UploadComponent,
  ],
  templateUrl: './import-modal.translation.component.html',
  styles: [
    `
      .upload-area ::ng-deep .ant-upload {
        width: 100%;
      }

      .upload-area ::ng-deep .ant-upload-drag {
        border: 2px dashed #d9d9d9;
        border-radius: 6px;
        background: #fafafa;
        text-align: center;
        padding: 20px;
        transition: border-color 0.3s;
      }

      .upload-area ::ng-deep .ant-upload-drag:hover {
        border-color: #1890ff;
      }
    `,
  ],
})
export class ImportModalTranslationComponent extends AppBaseComponent implements OnInit {
  @Input() isVisible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @ViewChild('fileUpload') fileUpload!: UploadComponent;

  form: FormGroup;
  languageOptions$: Observable<BaseOption[]>;
  isExporting = false;
  isImporting = false;

  // Upload configuration
  uploadAcceptType = EUploadType.document;
  uploadFileType = EUploadType.document;
  maxFileSize = 10 * 1024; // 10MB in KB

  // Import result
  importResult: {
    success: boolean;
    message: string;
    errorKey?: string;
  } | null = null;

  constructor(
    injector: Injector,
    private readonly languageService: LanguageService,
    private readonly translationService: TranslationService,
    private readonly s3Service: S3Service
  ) {
    super(injector);

    this.form = new FormGroup({
      languageId: new FormControl('', [Validators.required]),
    });

    this.languageOptions$ = this.languageService.getOptions();
  }

  ngOnInit(): void {
    this.languageOptions$ = this.languageService.getOptions();
  }

  trackByValue(index: number, item: BaseOption): string | number | boolean {
    return item.value;
  }

  get isLanguageSelected(): boolean {
    return this.form.get('languageId')?.value && this.form.get('languageId')?.valid;
  }

  get hasFileSelected(): boolean {
    return this.getSelectedFile() !== null;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.visibleChange.emit(false);
    this.resetForm();
  }

  handleExport(): void {
    if (!this.isLanguageSelected) {
      this.msgService.warning('Please select a language first');
      return;
    }

    this.isExporting = true;
    const languageId = this.form.get('languageId')?.value;

    const queryParams = {
      language_id: languageId,
      page: 1,
      limit: 10,
    };

    this.translationService.export(queryParams).subscribe({
      next: exportData => {
        // Handle the export download using the key
        if (exportData.key) {
          this.msgService.success('Export completed successfully');
          this.s3Service.downloadS3File(exportData.key, `translations_data.xlsx`);
        } else {
          this.msgService.error('Export failed: No export key provided');
        }
        this.isExporting = false;
      },
      error: error => {
        this.msgService.error('Export failed. Please try again.');
        this.isExporting = false;
      },
    });
  }

  async handleImport(): Promise<void> {
    if (!this.isLanguageSelected) {
      this.msgService.warning('Please select a language first');
      return;
    }

    if (!this.hasFileSelected) {
      this.msgService.warning('Please select a file to import');
      return;
    }

    this.isImporting = true;
    this.importResult = null;

    try {
      // Step 1: Validate file before upload
      const fileToUpload = this.getSelectedFile();
      if (!fileToUpload) {
        throw new Error('No file selected for upload');
      }

      // Validate file type
      const fileName = fileToUpload.name.toLowerCase();
      const isExcel = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');

      if (!isExcel) {
        throw new Error(
          `Please select a valid Excel file (.xlsx or .xls). Selected: ${fileToUpload.name}`
        );
      }

      // Validate file size
      if (fileToUpload.size === 0) {
        throw new Error('Selected file is empty. Please choose a valid Excel file.');
      }

      if (fileToUpload.size > this.maxFileSize * 1024) {
        const maxSizeMB = this.maxFileSize / 1024;
        throw new Error(`File size exceeds ${maxSizeMB}MB limit. Please choose a smaller file.`);
      }

      // Step 2: Upload file to S3
      this.msgService.loading('Uploading file...', { nzDuration: 0 });

      let s3Key: string;
      try {
        s3Key = await this.s3Service.uploadFileSync(fileToUpload);
      } catch (uploadError) {
        // Handle upload error
        let uploadErrorMessage = 'Failed to upload file to S3. Please try again.';
        if (uploadError instanceof Error) {
          uploadErrorMessage = `Upload failed: ${uploadError.message}`;
        }

        throw new Error(uploadErrorMessage);
      }

      if (!s3Key) {
        throw new Error('Failed to get S3 key after upload');
      }

      // Step 3: Call import API with S3 key
      this.msgService.loading('Processing import...', { nzDuration: 0 });

      const importResponse = await firstValueFrom(this.translationService.import({ key: s3Key }));

      // Step 4: Handle success response
      if (importResponse) {
        this.importResult = {
          success: true,
          message: importResponse.message,
          errorKey: importResponse.error_key || undefined,
        };

        // If there's an error key, it means there were validation errors
        if (importResponse.error_key && importResponse.error_key.trim() !== '') {
          this.importResult.success = false;
          this.importResult.errorKey = importResponse.error_key;
          this.msgService.warning('Import completed with errors. Please check the error file.');
        } else {
          this.msgService.success('Import completed successfully!');
        }
      }
    } catch (error: unknown) {
      // Step 5: Handle error response

      let errorMessage = 'Import failed. Please try again.';
      let errorKey: string | undefined;

      // Handle different error types
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === 'object' && 'error' in error) {
        const httpError = error as { error?: { message?: string; error_key?: string } };
        errorMessage = httpError.error?.message || errorMessage;
        errorKey = httpError.error?.error_key;
      }

      this.importResult = {
        success: false,
        message: errorMessage,
        errorKey: errorKey,
      };

      this.msgService.error(errorMessage);
    } finally {
      this.isImporting = false;
      this.msgService.remove(); // Remove loading message
    }
  }

  private getSelectedFile(): File | null {
    if (this.fileUpload?.fileList && this.fileUpload.fileList.length > 0) {
      const uploadFile = this.fileUpload.fileList[0];

      // Method 1: Try originFileObj first (most common case)
      if (uploadFile.originFileObj) {
        const file = uploadFile.originFileObj;

        // If it's already a File, return it
        if (file instanceof File) {
          return file;
        }

        // If it's a Blob or has the necessary properties, create a new File
        if (file && typeof file === 'object' && 'size' in file && 'type' in file) {
          try {
            const fileName = uploadFile.name || (file as FileLikeObject).name || 'upload.xlsx';
            const fileType =
              (file as FileLikeObject).type ||
              uploadFile.type ||
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

            const newFile = new File([file as Blob], fileName, {
              type: fileType,
              lastModified: Date.now(),
            });

            return newFile;
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Failed to create File object from originFileObj:', error);
          }
        }
      }

      // Method 2: Check if uploadFile itself is a File
      if (uploadFile instanceof File) {
        return uploadFile;
      }

      // Method 3: Try to extract file from other properties
      const typedUploadFile = uploadFile as UploadFile;
      if (typedUploadFile.response && typedUploadFile.response instanceof File) {
        return typedUploadFile.response;
      }

      // Method 4: Last resort - try to create File from available data
      if (uploadFile.name && uploadFile.size !== undefined) {
        try {
          // This is a fallback that might work in some cases
          // eslint-disable-next-line no-console
          console.warn('Using fallback File creation method');
          const blob = new Blob([], {
            type:
              uploadFile.type ||
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          return new File([blob], uploadFile.name, {
            type:
              uploadFile.type ||
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Fallback File creation failed:', error);
        }
      }

      // eslint-disable-next-line no-console
      console.error('Could not extract valid File object from upload component');
    }

    return null;
  }

  downloadErrorFile(errorKey: string): void {
    if (errorKey && errorKey.trim() !== '') {
      this.s3Service.downloadS3File(errorKey, 'import_errors.xlsx');
      this.msgService.info('Downloading error file...');
    }
  }

  private resetForm(): void {
    this.form.reset();
    this.isExporting = false;
    this.isImporting = false;
    this.importResult = null;

    // Reset file upload component
    if (this.fileUpload) {
      this.fileUpload.fileList = [];
    }
  }
}
