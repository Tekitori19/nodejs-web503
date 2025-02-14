import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    selector: "mc-register",
    templateUrl: "./register.component.html",
    imports: [ReactiveFormsModule]
})
export class RegisterComponent {
  form: FormGroup

  constructor(private fb: FormBuilder) {
    this.form = this.fb.nonNullable.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    console.log(
      this.form.getRawValue()
    );
  }
}
