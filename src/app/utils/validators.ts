import { FormGroup } from "@angular/forms";

export const isFormInvalid = (formGroup: FormGroup) => {
    const controls = formGroup.controls;
    
    for (const key in controls) {
        if (Object.prototype.hasOwnProperty.call(controls, key)) {
            const control = controls[key as keyof typeof controls];
            console.log(control)
            if(control.invalid) control.markAsTouched();
        }
    }
    
    return formGroup.invalid;
}