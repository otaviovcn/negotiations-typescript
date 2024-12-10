export abstract class View<T> {

  protected element: HTMLElement;
  private escape: boolean = false;


  constructor(selector: string, escape?: boolean) {
    this.element = document.querySelector(selector);
    if (escape) {
      this.escape = escape;
    }
  }

  public update(model: T): void {
    const exp = "/<script>[\s\S]*?/<\/script>/";
    let template = this.template(model);

    if(this.escape) {
      template = template.replace(exp, "");
    }
    
    this.element.innerHTML = template;   
  }

  protected abstract template(model: T): string;

}