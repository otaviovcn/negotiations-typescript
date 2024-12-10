export class View {
    constructor(selector, escape) {
        this.escape = false;
        this.element = document.querySelector(selector);
        if (escape) {
            this.escape = escape;
        }
    }
    update(model) {
        const exp = "/<script>[\s\S]*?/<\/script>/";
        let template = this.template(model);
        if (this.escape) {
            template = template.replace(exp, "");
        }
        this.element.innerHTML = template;
    }
}
