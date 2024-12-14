export function escape() {
  return function (
    target: any,
    propetyKey: string,
    descriptor: PropertyDescriptor
  ) {

    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const exp = "/<script>[\s\S]*?/<\/script>/";
      let returnMethod = originalMethod.apply(this, args);

      if (typeof returnMethod === "string") {
        console.log(`@escape em ação para o método ${propetyKey} da classe ${this.constructor.name}`);

        returnMethod = returnMethod.replace(exp, "");
      }

      return returnMethod;
    }

    return descriptor;
  }
}