import { Printable } from "./printable.js";

export function Print(...objects: Printable[]) {
  for (const object of objects) {
    console.log(object.convertToText());
  }
}