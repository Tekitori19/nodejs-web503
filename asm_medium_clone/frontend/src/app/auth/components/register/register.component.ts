import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { register } from "../../store/action";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";
import { RouterLink } from "@angular/router";
import { selectIsSubmitting } from "../../store/reducer";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  imports: [ReactiveFormsModule, RouterLink, CommonModule]
})
export class RegisterComponent {
  form: FormGroup
  isSubmitting$

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.nonNullable.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
    this.isSubmitting$ = this.store.select(selectIsSubmitting)
  }

  onSubmit() {
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue()
    }
    this.store.dispatch(register({ request }))
    // this.authService.register(request).subscribe((res) => {
    //   console.log(res);
    // })
  }
}
