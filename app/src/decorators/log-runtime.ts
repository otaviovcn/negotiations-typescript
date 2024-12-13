export function logRuntime(chosenUnit: string = "milliseconds") {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    let unit: string;
    let decimalPlaces: number;
    let divider: number;

    switch (chosenUnit) {
      case "seconds":
        unit = chosenUnit;
        divider = 1000;
        decimalPlaces = 4;
        break;
      case "minutes":
        unit = chosenUnit;
        divider = 60000;
        decimalPlaces = 8;
        break;
      default:
        unit = "milliseconds";
        divider = 1;
        decimalPlaces = 2;
        break;
    }

    descriptor.value = function (...args: any[]) {
      const t1 = performance.now();
      const returnMethod = originalMethod.apply(this, args);
      const t2 = performance.now();
      console.log(`${propertyKey}, tempo de execução: ${((t2 - t1) / divider).toFixed(decimalPlaces)} ${unit}`);
      returnMethod;
    }

    return descriptor;
  }
}
