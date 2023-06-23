import { type ZodObject, type ZodRawShape, z } from "zod";

export const CollectFormIntoObj = (data: FormData) => {
  const obj: Record<string, string | Array<string>> = {};
  for (const [key, value] of data) {
    if (typeof value === "string") {
      const prev = obj[key];
      if (Array.isArray(prev)) {
        prev.push(value);
        obj[key] = prev;
      } else if (prev) {
        obj[key] = [prev, value];
      } else {
        obj[key] = value;
      }
    }
  }
  return obj;
};

export const RequireFormModel = <T extends ZodRawShape>(
  data: FormData,
  model: ZodObject<T>
) => {
  const obj = CollectFormIntoObj(data);
  const with_method = model.extend({
    method: z
      .enum([
        "post",
        "put",
        "delete",
        "patch",
        "POST",
        "PUT",
        "DELETE",
        "PATCH",
      ])
      .optional(),
  });
  return with_method.parse(obj);
};

export const InvalidMethod = (message?: string) => {
  throw new Response(message || "Invalid Method", { status: 405 });
};
