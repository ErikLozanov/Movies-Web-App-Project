import {html,render} from '../../node_modules/lit-html/lit-html.js';

const myMoviesTemplate = () => html`
    <h1>My Movies Page</h1>
`

export function MyMoviesView() {
    render(myMoviesTemplate(), document.querySelector('main'));
}