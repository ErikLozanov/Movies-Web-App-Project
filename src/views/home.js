import {html,render} from '../../node_modules/lit-html/lit-html.js';

const homeTemplate = () => html`
    <h1>Home Page</h1>
`

export function homeView() {
    render(homeTemplate(), document.querySelector('main'));
}