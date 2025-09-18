import { Injector } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from "@angular/forms";
import {
  ActivatedRoute,
  NavigationExtras,
  Params,
  Router,
} from "@angular/router";
import dayjs from "dayjs";
import { DisabledTimeConfig } from "ng-zorro-antd/date-picker";
import { NzMessageService } from "ng-zorro-antd/message";

import { environment } from "@/environments/environment";
import { AuthService } from "@services/auth.service";
import { PermissionService } from "@services/permission.service";
import { Dictionary } from "@shared/types/base";

export abstract class AppBaseComponent {
  protected readonly router: Router;
  protected readonly activeRoute: ActivatedRoute;
  protected readonly authService: AuthService;
  protected readonly msgService: NzMessageService;
  protected readonly permissionService: PermissionService;
  // protected readonly translateService: TranslateService;

  protected isValidating = false;

  nzErrorRequire = "This field is required.";
  nzInvalidType = "Invalid data type.";

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  protected constructor(readonly injector: Injector) {
    this.router = injector.get(Router);
    this.activeRoute = injector.get(ActivatedRoute);
    this.authService = injector.get(AuthService);
    this.permissionService = injector.get(PermissionService);
    this.msgService = injector.get(NzMessageService);
    // this.translateService = injector.get(TranslateService);
  }

  // MARK: Navigations
  protected redirect(url: string, params: Params = {}, isRelative = true) {
    const navigationExtras: NavigationExtras = {
      queryParams: params,
      relativeTo: isRelative ? this.activeRoute : null,
    };

    this.router.navigate([url], navigationExtras).then();
  }

  protected redirectOpenNewTab(
    url: string,
    params: Params = {},
    isRelative = true
  ) {
    const urlTree = this.router.createUrlTree([url], {
      relativeTo: isRelative ? this.activeRoute : null,
      queryParams: params,
    });
    const fullUrl = this.router.serializeUrl(urlTree);
    window.open(fullUrl, "_blank");
  }

  // MARK: Query Params
  protected setQueryParam(params: Dictionary): void {
    this.router
      .navigate([], {
        relativeTo: this.activeRoute,
        queryParams: { ...params },
        queryParamsHandling: "merge",
      })
      .then();
  }

  protected getRouteParam<T>(param: string): T {
    return this.activeRoute.snapshot.paramMap.get(param) as T;
  }

  protected getQueryParam<T>(param: string): T {
    return this.activeRoute.snapshot.queryParamMap.get(param) as T;
  }

  protected getAllQueryParam<T>(param: string): T[] {
    return this.activeRoute.snapshot.queryParamMap.getAll(param) as T[];
  }

  protected getAllQueryParams(): Dictionary {
    return { ...this.activeRoute.snapshot.queryParams };
  }

  // MARK: Form Utilities
  protected compareObject(a: Dictionary, b: Dictionary): boolean {
    const keysToCompare = Object.keys({ ...a, ...b }).filter(
      (key) =>
        ![null, undefined].includes(a[key] as null | undefined) ||
        ![null, undefined].includes(b[key] as null | undefined)
    );

    return keysToCompare.every((key) => a[key] == b[key]);
  }

  protected isFieldError(field: FormControl): boolean {
    return field.invalid && (field.dirty || field.touched);
  }

  protected formControlCompareWith(
    otherControlName: string,
    isEqual?: boolean
  ) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.parent) {
        return null;
      }
      const thisValue = control.value;
      const otherControl = control.parent.get(otherControlName);
      const otherValue = otherControl?.value;

      const isMismatch = isEqual
        ? thisValue === otherValue
        : thisValue !== otherValue;

      if (isMismatch) {
        return { confirm: true, error: true };
      }

      return null;
    };
  }

  protected validateFormGroup(formGroup: FormGroup): void {
    this.isValidating = true;

    Object.values(formGroup.controls).forEach((control: AbstractControl) => {
      if (control instanceof FormGroup) {
        this.validateFormGroup(control);
      } else if (control instanceof FormArray) {
        this.validateFormArray(control);
      } else {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });

    this.isValidating = false;
  }

  protected validateFormArray(formArray: FormArray) {
    formArray.controls.forEach((control: AbstractControl) => {
      if (control instanceof FormGroup) {
        this.validateFormGroup(control);
      } else if (control instanceof FormArray) {
        this.validateFormArray(control);
      }
    });
  }

  protected getFormControlError(control: AbstractControl | null): string {
    const errorMessages = {
      required: "This field is required",
      minlength: "Minimum length is ",
      maxlength: "Maximum length is ",
      email: "Please enter a valid email address",
      pattern: "Please match the required pattern",
      annoyingInvalid: "Selected time must be between 6:00 and 21:59.",
      pastDate: "The date and time cannot be in the past",
      minArrayLength: "At least one option is required",
      isParam: "Invalid parameter format",
    };

    if (control?.errors) {
      for (const [key, message] of Object.entries(errorMessages)) {
        if (control.errors[key]) {
          if (key === "minlength" || key === "maxlength") {
            return `${message}${control.errors[key].requiredLength}`;
          }
          if (key === "minArrayLength") {
            const { requiredLength } = control.errors["minArrayLength"];
            return `At least ${requiredLength} item(s) are required.`;
          }
          return message;
        }
      }
    }
    return "";
  }

  protected validateParameter() {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!this.isParamValid(control.value)) {
        return { isParam: true, error: true };
      }

      return null;
    };
  }

  private isParamValid(value: string): boolean {
    if (
      value.includes("< ") ||
      value.includes(" >") ||
      value.includes("<>") ||
      value.endsWith("<") ||
      /<[^>]*$/.test(value) ||
      /^(.+)\s+([^<]+)>$/.test(value)
    ) {
      return false;
    }

    const paramMatches = value.match(/<([^>]+)>/g);
    if (paramMatches) {
      return paramMatches.every((match) =>
        /^[a-z][a-zA-Z0-9_]*$/.test(match.slice(1, -1))
      );
    }

    return true;
  }

  // MARK: Date Utilities
  protected disabledDateLessThanCurrent = (value: Date) => {
    return dayjs().diff(value, "days") > 0;
  };

  protected disabledDateTime = (
    compareTime: Date = new Date(),
    isLessThan: boolean,
    disableDisturb: boolean = false,
    disturbTimeRange: [number, number] = [22, 6]
  ) => {
    const compareDayjs = dayjs(compareTime);
    const [startDisturbHour, endDisturbHour] = disturbTimeRange;

    const isInDisturbRange = (hour: number): boolean => {
      return hour >= startDisturbHour || hour < endDisturbHour;
    };

    return {
      nzDisabledDate: (date: Date): boolean =>
        isLessThan
          ? dayjs(date).isBefore(compareDayjs, "day")
          : dayjs(date).isAfter(compareDayjs, "day"),
      nzDisabledTime: (
        current: Date | Date[]
      ): DisabledTimeConfig | undefined => {
        if (!current || Array.isArray(current)) {
          return undefined;
        }

        const currentDayjs = dayjs(current);

        if (disableDisturb && isInDisturbRange(currentDayjs.hour())) {
          return {
            nzDisabledHours: () =>
              Array.from({ length: 24 }, (_, i) => i).filter((hour) =>
                isInDisturbRange(hour)
              ),
            nzDisabledMinutes: () => Array.from({ length: 60 }, (_, i) => i),
            nzDisabledSeconds: () => Array.from({ length: 60 }, (_, i) => i),
          };
        }

        if (currentDayjs.isSame(compareDayjs, "day")) {
          return {
            nzDisabledHours: () =>
              Array.from({ length: 24 }, (_, i) => i).filter((hour) =>
                isLessThan
                  ? hour < compareDayjs.hour() ||
                    (disableDisturb && isInDisturbRange(hour))
                  : hour > compareDayjs.hour() ||
                    (disableDisturb && isInDisturbRange(hour))
              ),
            nzDisabledMinutes: (selectedHour: number) =>
              selectedHour === compareDayjs.hour()
                ? Array.from({ length: 60 }, (_, i) => i).filter((min) =>
                    isLessThan
                      ? min < compareDayjs.minute()
                      : min > compareDayjs.minute()
                  )
                : [],
            nzDisabledSeconds: (selectedHour: number, selectedMinute: number) =>
              selectedHour === compareDayjs.hour() &&
              selectedMinute === compareDayjs.minute()
                ? Array.from({ length: 60 }, (_, i) => i).filter((sec) =>
                    isLessThan
                      ? sec < compareDayjs.second()
                      : sec > compareDayjs.second()
                  )
                : [],
          };
        }

        return undefined;
      },
    };
  };

  protected disabledDateTimeLessThan = (
    compareTime: Date = new Date(),
    disableDisturb: boolean = false,
    disturbTimeRange: [number, number] = [22, 6]
  ) =>
    this.disabledDateTime(compareTime, true, disableDisturb, disturbTimeRange);

  protected disabledDateTimeMoreThan = (
    compareTime: Date = new Date(),
    disableDisturb: boolean = false,
    disturbTimeRange: [number, number] = [22, 6]
  ) =>
    this.disabledDateTime(compareTime, false, disableDisturb, disturbTimeRange);

  protected getFileUrl(key: string): string {
    if (key.startsWith("http")) {
      return key;
    }

    return `${environment.media.publishUrl}/${key}`;
  }

  // MARK: Permissions
  protected hasPermission(permission?: string): boolean {
    if (permission) {
      return this.permissionService.currentPermissions?.includes(permission);
    }
    return true;
  }

  // MARK: Header Functions
  // protected setPageTitle(title: string) {
  //   this.headerService.setTitle(title);
  // }

  // protected setHeaderButtons(buttons: HeaderButton[]) {
  //   this.headerService.setButtons(buttons.filter((x) => x) || []);
  // }

  // protected l(key: string): string {
  //   return this.translateService.instant(key);
  // }
}
