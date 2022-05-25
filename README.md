# iValid

## usage

## validators

- required
- pattern
- minLength

### Validators in field level

```typecript
Validate.required("field"); // true
Validate.required(" "); // false
```

```typecript
Validate.pattern("AZ", /[A-Z]/g); // true
Validate.pattern("boo", /[A-Z]/g); // false
```

```typecript
Validate.minLength("Reza", 4); // true
Validate.minLength("Reza", 5); // false
```

### Validate Scheama

```typecript
const form = {
	 name: {
		value: 'Foo',
		validations: {
			minLength: {
				length: 4
			},
			pattern: {
				pattern: /[A-Z]/g
			},
		},
	},
};
const validator = new Validate(form);
validator.validate(); // [{ filed: 'name', errors: ["pattern","minLength"] }]
```

```typecript
const form = {
	 name: {
		value: 'Foo',
		validations: {
			minLength: {
				length: 3
			},
		},
	},
};
const validator = new Validate(form);
validator.validate(); // []
```
