import {html,render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { addMovieView } from './views/addMovie.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { myMoviesView } from './views/myMovies.js';
import { registerView } from './views/register.js';
import * as welcome from './views/welcome.js';

page('/',homeView);
page('/my-movies', myMoviesView);
page('/login',loginView);
page('/register', registerView);
page('/add-movie', addMovieView);
page('/details/:detailsId', detailsView);
page('/edit/:detailsId', editView);

page.start();

welcome.updateWelcome();
updateNav();
export function updateNav() {

const isLogged = Boolean(localStorage.ownerId);
if(isLogged) {
    document.querySelectorAll('.user').forEach(x=> x.style.display = 'block');

    document.querySelectorAll('.guest').forEach(x=> x.style.display = 'none');
    welcome.updateWelcome();
} else {
    document.querySelectorAll('.user').forEach(x=> x.style.display = 'none');

    document.querySelectorAll('.guest').forEach(x=> x.style.display = 'block');
    welcome.updateWelcome();

}
}

document.querySelector('.logout').addEventListener('click',logout);

async function logout() {
    
    const response = await fetch('http://localhost:3030/users/logout',{
        headers: {'X-Authorization': localStorage.token}
    });

    localStorage.clear();
    updateNav();
}