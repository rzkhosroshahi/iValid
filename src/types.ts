export type requiredTypes = string | number | null | undefined;
export type pattern = string | RegExp;
export type length = number;
export type required = boolean;

export enum Validations {
  required = "value",
  pattern = "pattern",
  minLength = "length"
}

export interface Ilength {
  length: number;
}

export interface IPattern {
  pattern: string | RegExp;
}

export interface IRequired {
  value: boolean;
}

interface IValidation {
  pattern?: IPattern;
  required?: IRequired;
  minLength?: Ilength;
}

export interface IScheam {
  value: string;
  validations: IValidation;
}

export type IScheama = Record<string, IScheam>;

export interface IErrors {
  field: string;
  errors: Array<keyof typeof Validations>;
}
