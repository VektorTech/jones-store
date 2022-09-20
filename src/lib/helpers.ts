import { ObjectSchema } from "yup";

export function validateInput(input: any, schema: ObjectSchema<any>) {
  try {
    schema.validateSync(input, {
      strict: true,
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (err: any) {
    return err.errors;
  }
}
