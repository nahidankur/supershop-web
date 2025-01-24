import { FormArray, FormGroup } from '@angular/forms';

export function markFormGroupTouched(formGroup: FormGroup | FormArray): void {
    Object.values(formGroup.controls).forEach(control => {
        if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
        }
        if (control instanceof FormGroup) {
            Object.values(control.controls).forEach(c => {
                if (c.invalid) {
                    c.markAsDirty();
                    c.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
        if (control instanceof FormArray) {
            Object.values(control.controls).forEach(c => {
                if (c instanceof FormGroup) {
                    Object.values(c.controls).forEach(c => {
                        if (c.invalid) {
                            c.markAsDirty();
                            c.updateValueAndValidity({ onlySelf: true });
                        }
                    });
                }
            });
        }
    });
}

export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}
