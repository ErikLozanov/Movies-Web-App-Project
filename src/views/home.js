import {html,render} from '../../node_modules/lit-html/lit-html.js';


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


let searchInput = null;




export async function searchFunc(e) {
  e.preventDefault();
  let formData = new FormData(e.currentTarget);
  searchInput = formData.get('searchForm');
  debugger
  homeView();
}

export async function homeView(ctx) {
  const allMovies = await getAllMovies(searchInput);
  render(homeTemplate(allMovies), document.querySelector('main'));
  render(homeTemplate(allMovies), document.querySelector('main'));

}


export async function getAllMovies(searchInput) {
  let response = null;
  if(searchInput === null) {
    response = await fetch('http://localhost:3030/data/movies');
    console.log('hi');
  } else {
    response = await fetch(`http://localhost:3030/data/movies?where=title%20like%20%22${searchInput}%22`);
    console.log('bye');
  }

    const result = await response.json();

    return result;
}


