export function inspect() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            console.log(`--- Método ${propertyKey} da classe ${this.constructor.name}`);
            console.log(`------ parâmetros ${JSON.stringify(args)}`);
            const returnMethod = originalMethod.apply(this, args);
            console.log(`------ retorno ${JSON.stringify(returnMethod)}`);
            return returnMethod;
        };
        return descriptor;
    };
}
