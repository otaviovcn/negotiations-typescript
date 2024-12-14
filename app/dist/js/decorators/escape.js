export function escape() {
    return function (target, propetyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const exp = "/<script>[\s\S]*?/<\/script>/";
            let returnMethod = originalMethod.apply(this, args);
            if (typeof returnMethod === "string") {
                console.log(`@escape em ação para o método ${propetyKey} da classe ${this.constructor.name}`);
                returnMethod = returnMethod.replace(exp, "");
            }
            return returnMethod;
        };
        return descriptor;
    };
}
