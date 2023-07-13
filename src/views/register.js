import {html,render} from '../../node_modules/lit-html/lit-html.js';

const registerTemplate = () => html`
    <h1>Register Page</h1>
`

export function registerView() {
    console.log('hi!');
    render(registerTemplate(), document.querySelector('main'));
}