import page from '../../node_modules/page/page.mjs';
import {html,render} from '../../node_modules/lit-html/lit-html.js';

const movieCard = (movie) => html`
<div class="card" style="width: 18rem;">
  <img src="${movie.posterUrl}" class="card-img-top" alt="${movie.title}">
  <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <a href="#" class="btn btn-primary">Details</a>
  </div>
</div>
`;

const myMoviesTemplate = (movies) => html`
    <div id="movieCards">
        ${movies.map(movieCard)}
</div>
`


const getMyMovies = async () => {
    const response = await fetch('http://localhost:3030/data/movies');

    const data = await response.json();

    return Object.values(data.filter(x=> x._ownerId == localStorage.ownerId));
}

export const myMoviesView = async (ctx) => {
    const myMovies = await getMyMovies();
    render(myMoviesTemplate(myMovies), document.querySelector('main'));
}