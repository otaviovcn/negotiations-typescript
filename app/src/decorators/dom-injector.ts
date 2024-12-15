export function domInjector(selector: string) {
  return function (target: any, propertyKey: string) {

    let element: HTMLElement; 

    const getter = function () {
      if(!element) {
        element = document.querySelector(selector) as HTMLElement;
        console.log(`Buscando elemento do DOM com o seletor  ${selector} para injetar em ${propertyKey}`);
      }
      return element;
    }

    Object.defineProperty(
      target,
      propertyKey,
      { get: getter }
    );

  }
}