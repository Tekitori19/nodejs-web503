import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { register } from "../../store/action";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  imports: [ReactiveFormsModule]
})
export class RegisterComponent {
  form: FormGroup

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.nonNullable.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue()
    }

    this.store.dispatch(register({ request }))
  }
}
