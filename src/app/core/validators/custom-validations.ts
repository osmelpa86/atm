import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class CustomValidations {
  static entryDeposit(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value === null || value === undefined) {
        return null;
      }

      if (value <= 0) {
        return {entryDeposit: 'El valor debe ser positivo'};
      }

      if (value > max) {
        return {entryDeposit: `El valor no debe ser mayor a ${max}`};
      }

      if (value % 10 !== 0) {
        return {entryDeposit: 'El valor debe ser múltiplo de 10'};
      }

      return null;
    };
  }

  static entryExtraction(max: number, getBalance: () => number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value === null || value === undefined) {
        return null;
      }

      if (value <= 0) {
        return {entryExtraction: 'El valor debe ser positivo'};
      }

      if (value > max) {
        return {entryExtraction: `El valor no debe ser mayor a ${max}`};
      }

      if (value > getBalance()) {
        return {entryExtraction: `El valor ${value} no debe ser mayor al balance ${getBalance()}`};
      }

      if (value % 10 !== 0) {
        return {entryExtraction: 'El valor debe ser múltiplo de 10'};
      }

      if (value % 10 !== 0) {
        return {entryExtraction: 'El valor debe ser múltiplo de 10'};
      }

      return null;
    };
  }
}
