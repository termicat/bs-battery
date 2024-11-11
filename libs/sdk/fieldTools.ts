import { FieldType } from "@lark-base-open/js-sdk";

export function typeofNumber(type: number) {
  return [
    FieldType.Rating,
    FieldType.Number,
    FieldType.Formula,
    FieldType.Lookup,
    FieldType.Progress,
  ].includes(type);
}
