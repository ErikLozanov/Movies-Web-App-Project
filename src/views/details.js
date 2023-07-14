import page from '../../node_modules/page/page.mjs';
import {html,render, nothing} from '../../node_modules/lit-html/lit-html.js';


const detailsTemplate = (movie) => html`
<div class="card mb-3" style="max-width: 1000px; margin: auto;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${movie.posterUrl}" class="img-fluid rounded-start" alt="${movie.title}">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">${movie.plot}</p>
        <p class="card-text"><small class="text-body-secondary">Last updated ${movie.runtime} mins ago</small></p>
        ${localStorage.ownerId == movie._ownerId ?   
  html`<a href="#" class="btn btn-primary deleteBtn">Delete</a>
  <a href="/edit/${movie._id}" class="btn btn-primary editBtn">Edit</a>` : nothing }
      </div>
    </div>
  </div>
</div>


`;

const getDetails = async (detailsId) => {
    const response = await fetch(`http://localhost:3030/data/movies/${detailsId}`);
    const data = await response.json();
    return data;
}

let detailsId = null;
export const detailsView = async (ctx) => {
    detailsId = ctx.params.detailsId;
    const movie = await getDetails(ctx.params.detailsId);

    render(detailsTemplate(movie), document.querySelector('main'));
}




// async function deleteItem() {

//     const confirmation = confirm('Are you sure you want to delete this furniture?');

//     if(confirmation) {
//         const response = await fetch(`http://localhost:3030/data/catalog/${detailsId}`,{
//             method: 'DELETE',
//             headers: {'X-Authorization': localStorage.token}
//         });
    
//         page.redirect('/catalog');
//     }

// }