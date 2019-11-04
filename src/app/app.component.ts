import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup = null;
  firstValue = 3;
  secondValue = 3;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      age: [10, [Validators.required, Validators.min(10)]],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      postalCode: ['', [Validators.required, Validators.pattern('[0-9]{2}\-[0-9]{3}')]],
      result: [null, Validators.required]
    });

    this.form.setValidators(this.additionValidator());
  }

  onFormSubmit(): void {
    alert('Data in form is valid');
    this.initForm();
  }

  shouldShowErrorMessage(formControl: FormControl): boolean {
    if (formControl.dirty && formControl.invalid) {
      return true;
    }

    return false;
  }

  additionValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const resultControl = group.controls['result'];

      if (resultControl.value !== this.firstValue + this.secondValue) {
        resultControl.setErrors({badResult: true});
      } else {
        resultControl.setErrors(null);
      }

      return;
    };
  }
}
