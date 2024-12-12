import { NegociacaoController } from './controllers/negotiation-controller.js';

const controller = new NegociacaoController();
const form = document.querySelector('.form');
if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        controller.adds();
    });
} else {
    throw new Error("O elemento não pode ser nulo");
}