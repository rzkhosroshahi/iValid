import Validate from "./index";

describe("required static methods", () => {
  test("empty string fullfill with strings", () => {
    expect(Validate.required("  ")).toBe(false);
  });
  test("string should be true", () => {
    expect(Validate.required("One")).toBe(true);
  });
});

describe("pattern static methods", () => {
  test("string with wrong pattern should be false", () => {
    expect(Validate.pattern("2", /[A-Z]/g)).toBe(false);
  });
  test("string with valid pattern should be true", () => {
    expect(Validate.pattern("A", /[A-Z]/g)).toBe(true);
  });
});

describe("Validator constructor", () => {
  test("Invalid form scheama", () => {
    const form = {
      email: {
        value: "val",
        validations: {
          required: {
            value: true
          },
          minLength: {
            length: 4
          },
          pattern: {
            pattern: /[A-Z]/g
          }
        }
      }
    };
    const expectedReult = [
      {
        field: "email",
        validation: ["pattern", "minLength"]
      }
    ];
    const validator = new Validate(form);
    expect(validator.validate()).toStrictEqual(expectedReult);
  });
  test("valid form result should be empty array", () => {
    const form = {
      email: {
        value: "val",
        validations: {
          required: {
            value: true
          },
          minLength: {
            length: 3
          }
        }
      }
    };
    const validator = new Validate(form);
    expect(validator.validate()).toStrictEqual([]);
  });
  test("multi field form", () => {
    const form = {
      email: {
        value: "val",
        validations: {
          required: {
            value: true
          },
          minLength: {
            length: 4
          }
        }
      },
      name: {
        value: "",
        validations: {
          required: {
            value: true
          }
        }
      }
    };
    const expectedReult = [
      {
        field: "email",
        validation: ["minLength"]
      },
      {
        field: "name",
        validation: ["required"]
      }
    ];
    const validator = new Validate(form);
    expect(validator.validate()).toStrictEqual(expectedReult);
  });
});
