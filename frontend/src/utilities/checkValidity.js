export const checkValidity = (fields, errors, data) => {
  Object.entries(data).forEach(([key, value]) => {
    fields.forEach(field => {
      if (field && field.attr && field.attr.id === key) {
        if (
          !field.rules &&
          field.attr &&
          field.attr.type === "number" &&
          (parseInt(value) <= 0 || !Number.isInteger(parseInt(value)))
        ) {
          errors.push({
            [key]: field.label + " must be an integer greater than zero"
          });
        } else if (
          !field.rules &&
          (field.control === "input" || field.control === "textarea") &&
          !value
        ) {
          errors.push({ [key]: field.label + " cannot be empty" });
        } else if (field.rule) {
          if (
            field.rule.minLength &&
            field.rule.maxLength &&
            (value.length < field.rule.minLength ||
              value.length > field.rule.maxLength)
          ) {
            errors.push({
              [key]: `${field.label} must be at least ${field.rule.minLength} and less than ${field.rule.maxLength} characters long`
            });
          } else if (
            field.rule.minLength &&
            value.length < field.rule.minLength
          ) {
            errors.push({
              [key]: `${field.label} must be at least ${field.rule.minLength} characters long`
            });
          } else if (
            field.rule.maxLength &&
            value.length > field.rule.maxLength
          ) {
            errors.push({
              [key]: `${field.label} must not be greater than ${field.rule.maxLength} characters long`
            });
          } else if (field.rule.validator) {
            if (!field.rule.validator(value)) {
              errors.push({
                [key]:
                  key === "email"
                    ? `Please enter a valid ${key} address`
                    : `Please enter a valid ${key}`
              });
            }
          }
        }
      }
    });
  });
  return errors;
};
