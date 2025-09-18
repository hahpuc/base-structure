import { CommonModule } from "@angular/common";
import { Component, Injector, OnInit } from "@angular/core";
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";

import { AppBaseComponent } from "@/app/shared/components/base/app.base.component";
import { Dictionary } from "@/app/shared/types/base";
import { diffFromNow } from "@/app/shared/utils/date";

@Component({
  templateUrl: "./login.component.html",
  imports: [
    CommonModule,

    RouterModule,
    FormsModule,
    //
    ReactiveFormsModule,
    NzIconModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
  ],
})
export class LoginComponent extends AppBaseComponent implements OnInit {
  validateForm!: FormGroup;

  isVisiblePassword = false;
  rememberMe = false;

  private _errorMsg?: string;
  private _lockedMsg?: string;
  private _intervalId?: number;

  get errorMsg(): string | undefined {
    return `${this._errorMsg || ""} ${this._lockedMsg || ""}`?.trim();
  }

  get returnUrl(): string {
    return this.getQueryParam("return_url") || "/";
  }

  constructor(injector: Injector, fb: NonNullableFormBuilder) {
    super(injector);

    this.validateForm = fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.redirect("/dashboard");
    }

    this.validateForm.statusChanges.subscribe((status) => {
      if (status === "VALID" && this._errorMsg) {
        this._errorMsg = undefined;
      }
    });
  }

  login() {
    if (this.validateForm.valid) {
      this.authService.login(this.validateForm.value).subscribe({
        next: (result) => {
          if (this.rememberMe) {
            localStorage.setItem("remember_me", "true");
          }
          this.authService.setTokenStorage(result);

          if (result.user.is_change_password) {
            localStorage.setItem("is_change_password", "true");
            return this.redirect("/change-password");
          }

          this.redirect("/");
        },
        error: (error: { message: string; data?: Dictionary }) => {
          this.validateForm.reset();

          if (error?.data?.["locked_end"]) {
            const lockedEnd = error.data["locked_end"] as string;
            this.updateCountdown(lockedEnd);
            this._intervalId = window.setInterval(() => {
              this.updateCountdown(lockedEnd);
            }, 1000);
          }

          this._errorMsg = error.message;

          this.msgService.error(
            this._errorMsg || "An error occurred while logging in."
          );
        },
      });
    } else {
      this.msgService.error("Please fill in all required fields.");
      this.validateFormGroup(this.validateForm);
    }
  }

  updateCountdown(lockedEnd: string): void {
    const timeDiff = diffFromNow(lockedEnd);

    if (timeDiff) {
      this._lockedMsg = `Please try again later ${timeDiff}.`;
    } else {
      this._errorMsg = undefined;
      this._lockedMsg = undefined;
      clearInterval(this._intervalId);
    }
  }
}
