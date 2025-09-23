import { Component, inject } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getISOWeek } from 'date-fns';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    FormsModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzDatePickerModule,
  ],
  template: `
    <div class="flex flex-col md:flex-row gap-8">
      <div class="flex-1">
        <form nz-form [formGroup]="validateForm" class="login-form" (ngSubmit)="submitForm()">
          <nz-form-item>
            <nz-form-control nzErrorTip="Please input your username!">
              <nz-input-group>
                <input type="text" nz-input formControlName="username" placeholder="Username" />
              </nz-input-group>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-control nzErrorTip="Please input your Password!">
              <nz-input-group>
                <input type="password" nz-input formControlName="password" placeholder="Password" />
              </nz-input-group>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-control nzErrorTip="Please select your gender!">
              <nz-select formControlName="gender" nzPlaceHolder="Select gender">
                <nz-option nzValue="male" nzLabel="Male"></nz-option>
                <nz-option nzValue="female" nzLabel="Female"></nz-option>
                <nz-option nzValue="other" nzLabel="Other"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-control nzErrorTip="Please input your email!">
              <nz-input-group>
                <input type="email" nz-input formControlName="email" placeholder="Email" />
              </nz-input-group>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-control nzErrorTip="Please input your phone number!">
              <nz-input-group>
                <input type="tel" nz-input formControlName="phone" placeholder="Phone Number" />
              </nz-input-group>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-control nzErrorTip="Please select your birth date!">
              <nz-date-picker
                formControlName="birthDate"
                nzPlaceHolder="Select date"
              ></nz-date-picker>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-control nzErrorTip="Please input your age!">
              <nz-input-number
                formControlName="age"
                [nzMin]="0"
                [nzMax]="120"
                nzPlaceHolder="Age"
              ></nz-input-number>
            </nz-form-control>
          </nz-form-item>
          <div nz-row class="login-form-margin">
            <div nz-col [nzSpan]="12">
              <label nz-checkbox formControlName="remember">
                <span>Remember me</span>
              </label>
            </div>
            <div nz-col [nzSpan]="12">
              <a class="login-form-forgot">Forgot password</a>
            </div>
          </div>
          <button nz-button class="login-form-button login-form-margin" [nzType]="'primary'">
            Log in
          </button>
          Or
          <a>register now!</a>
        </form>
      </div>

      <div class="flex-1">
        <button nz-button (click)="createMessage('success')">Success</button>
        <button nz-button (click)="createMessage('error')">Error</button>
        <button nz-button (click)="createMessage('warning')">Warning</button>
      </div>
    </div>
  `,
  styles: [
    `
      .login-form {
        max-width: 300px;
      }

      .login-form-margin {
        margin-bottom: 16px;
      }

      .login-form-forgot {
        float: right;
      }

      .login-form-button {
        width: 100%;
      }

      nz-date-picker {
        margin: 0 8px 12px 0;
      }
    `,
  ],
})
export class NzDemoFormNormalLoginComponent {
  private fb = inject(NonNullableFormBuilder);
  validateForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    gender: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    phone: this.fb.control('', [Validators.required]),
    birthDate: this.fb.control(null, [Validators.required]),
    age: this.fb.control(null, [Validators.required, Validators.min(0), Validators.max(120)]),
    remember: this.fb.control(true),
  });

  constructor(
    private message: NzMessageService,
    private i18n: NzI18nService
  ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  createMessage(type: string): void {
    this.message.create(type, `This is a message of ${type}`, {
      nzDuration: 99000,
    });
  }

  isEnglish = false;

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date): void {
    console.log('week: ', getISOWeek(result));
  }

  changeLanguage(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
  }
}
