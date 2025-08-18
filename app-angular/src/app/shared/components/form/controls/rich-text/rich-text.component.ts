import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { ContentChange } from 'ngx-quill';

@Component({
  standalone: false,
  selector: 'app-rich-text',
  templateUrl: './rich-text.component.html',
  styleUrl: './rich-text.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichTextComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RichTextComponent),
      multi: true,
    },
  ],
})
export class RichTextComponent implements ControlValueAccessor, Validator {
  @Input() required = false;

  content: string = '';

  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // text styles
      [{ header: 1 }, { header: 2 }], // headers
      [{ list: 'ordered' }, { list: 'bullet' }], // lists
      [{ align: [] }], // alignment
      [
        {
          color: ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff'],
        },
        {
          background: ['#ffffff', '#ffcccc', '#ffe6cc', '#ffffcc', '#ccffcc', '#cce6ff', '#ebccff'],
        },
      ],
      ['link', 'image'], // link & image
      ['clean'], // remove formatting
    ],
  };

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.content = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Optionally handle disabled state
  }

  onContentChanged(event: ContentChange) {
    this.content = event.html || '';
    this.onChange(this.content);
    this.onTouched();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (
      this.required &&
      (!this.content || this.content === '<p><br></p>' || this.content.trim() === '')
    ) {
      return { required: true };
    }
    return null;
  }
}
