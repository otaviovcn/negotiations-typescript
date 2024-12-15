import { NegociacaoController } from './controllers/negotiation-controller.js';

const err = "O elemento não pode ser nulo";

const controller = new NegociacaoController();
const form = document.querySelector('.form');
if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        controller.adds();
    });
} else {
    throw new Error(err);
}

const botaoImportar = document.querySelector("#botao-importar");
if(botaoImportar) {
    botaoImportar.addEventListener("click", event => {
        controller.dataImport();
    })
} else {
    throw new Error(err);
}