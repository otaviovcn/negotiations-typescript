export function inspect() {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {

    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
      console.log(`--- Método ${propertyKey}`);
      console.log(`------ parâmetros ${JSON.stringify(args)}`);
      const returnMethod = originalMethod.apply(this, args);
      console.log(`------ retorno ${JSON.stringify(returnMethod)}`);
      return returnMethod;
    }

    return descriptor;
  }
}