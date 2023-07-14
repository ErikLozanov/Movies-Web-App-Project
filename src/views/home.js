import {html,render} from '../../node_modules/lit-html/lit-html.js';
import { getSearchedMovie } from './search.js';


const movieCard = (movie) => html`
<div class="card" style="width: 18rem;">
  <img src="${movie.posterUrl}" class="card-img-top" alt="${movie.title}">
  <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <a href="/details/${movie._id}" class="btn btn-primary">Details</a>
  </div>
</div>
`;

const homeTemplate = (movies) => html`
    <div id="movieCards">
        ${movies.map(movieCard)}
</div>
`

export async function homeView(searchedMovie) {

    const allMovies = await getAllMovies();
    render(homeTemplate(allMovies), document.querySelector('main'));
  
}


async function getAllMovies() {
    const response = await fetch('http://localhost:3030/data/movies');

    const result = await response.json();

    return result;
}