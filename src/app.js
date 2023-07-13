import {html,render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { MyMoviesView } from './views/myMovies.js';
import { registerView } from './views/register.js';

page('/',homeView);
page('/my-movies', MyMoviesView);
page('/login',loginView);
page('/register', registerView);

page.start();


updateNav();
export function updateNav() {
const isLogged = Boolean(localStorage.ownerId);
if(isLogged) {
    document.querySelector('.user').style.display = 'block';
    document.querySelectorAll('.guest').forEach(x=> x.style.display = 'none');
} else {
    document.querySelector('.user').style.display = 'none';
    document.querySelectorAll('.guest').forEach(x=> x.style.display = 'block');

}
}