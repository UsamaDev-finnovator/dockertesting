import { z } from "zod";

export function generateSchema(fields: any[]) {
  const shape: Record<string, any> = {};

  fields.forEach((field) => {
    let schema: any;

    switch (field.type) {
      case "number":
        schema = z.coerce.number().refine((v: number) => !isNaN(v), {
          message: `${field.label} must be a number`,
        });
        break;

      case "checkbox":
        schema = z.boolean().default(false);
        break;

      case "date":
        schema = z.string().refine((val: string) => !isNaN(Date.parse(val)), {
          message: `${field.label} is invalid`,
        });
        break;

      case "select":
        schema = z.string().min(1, `${field.label} is required`);
        break;

      default:
        schema = z.string();
    }

    // Required generic check
    if (field.required && field.type !== "checkbox") {
      schema = schema.refine(
        (val: any) => val !== "" && val !== null && val !== undefined,
        { message: `${field.label} is required` }
      );
    }

    // Text min/max only for strings
    if (field.minLength && field.type === "text") {
      schema = schema.min(
        field.minLength,
        `${field.label} must be at least ${field.minLength} chars`
      );
    }

    if (field.maxLength && field.type === "text") {
      schema = schema.max(
        field.maxLength,
        `${field.label} must be at most ${field.maxLength} chars`
      );
    }

    shape[field.name] = schema;
  });

  return z.object(shape);
}
