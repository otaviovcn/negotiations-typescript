export abstract class View<T> {

  protected element: HTMLElement;

  constructor(selector: string) {
    this.element = document.querySelector(selector);
  }

  update(model: T): void {
    this.element.innerHTML = this.template(model);    
  }

  abstract template(model: T): string;

}