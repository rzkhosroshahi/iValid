import { IScheama, requiredTypes, Validations, IErrors } from "./types";

class Validate {
  scheama: IScheama;
  errors?: Array<IErrors>;

  constructor(scheam: IScheama) {
    this.scheama = scheam;
  }
  public validate() {
    const invalids = new Map();
    Object.entries(this.scheama).forEach(([field, scheam]) => {
      Object.entries(scheam.validations).map(([validationKey, validation]) => {
        const validator = Validate[validationKey as keyof typeof Validations];
        const validatorKey =
          Validations[validationKey as keyof typeof Validations];
        if (validator(scheam.value, validation[validatorKey]) !== true) {
          if (invalids.has(field)) {
            invalids.set(field, [validationKey, ...invalids.get(field)]);
            return invalids;
          }
          invalids.set(field, [validationKey]);
        }
        return invalids;
      });
    });
    this.errors = Array.from(
      invalids,
      ([field, validation]: [string, Array<keyof typeof Validations>]) => ({
        field,
        validation
      })
    );
    return this.getErrors;
  }
  get getErrors(): Array<IErrors> | undefined {
    return this.errors;
  }
  static required(value: requiredTypes): boolean {
    if (typeof value === "string") {
      return Boolean(value.trim());
    }
    return Boolean(value);
  }
  static pattern(value: string, pattern: string | RegExp = ""): boolean {
    return Boolean(value.match(new RegExp(pattern)));
  }
  static minLength(val: string | number, length: number): boolean {
    if (typeof val === "string") {
      return val.length >= length;
    }
    return val.toString().length >= length;
  }
}

export default Validate;
