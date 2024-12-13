export function logRuntime(chosenUnit = "milliseconds") {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        let unit;
        let decimalPlaces;
        let divider;
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
        descriptor.value = function (...args) {
            const t1 = performance.now();
            const returnMethod = originalMethod.apply(this, args);
            const t2 = performance.now();
            console.log(`${propertyKey}, tempo de execução: ${((t2 - t1) / divider).toFixed(decimalPlaces)} ${unit}`);
            returnMethod;
        };
        return descriptor;
    };
}
