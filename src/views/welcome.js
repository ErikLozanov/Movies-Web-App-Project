import {html,render,nothing} from '../../node_modules/lit-html/lit-html.js';



export function updateWelcome() {

    const isLogged = Boolean(localStorage.getItem('email'));

const welcomeTemplate = () => html`
    <li class="nav-link welcome">Welcome <span>${isLogged ? `back, ${localStorage.getItem('email')}` : nothing}</span>!</li>
`

    render(welcomeTemplate(), document.querySelector('.navbar-nav'));

}