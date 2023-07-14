import page from '../../node_modules/page/page.mjs';
import {html,render, nothing} from '../../node_modules/lit-html/lit-html.js';


const detailsTemplate = (movie) => html`<div class="card text-center">
<div class="card-header">
<img src="${movie.posterUrl}" alt="${movie.title}" style="width: 300px height: 444px">
</div>
<div class="card-body">
  <h5 class="card-title">${movie.title}</h5>
  <p class="card-text">${movie.description}</p>
  ${localStorage.ownerId == movie._ownerId ?   
  html`<a href="#" class="btn btn-primary deleteBtn">Delete</a>
  <a href="#" class="btn btn-primary editBtn">Edit</a>` : nothing }

</div>
<div class="card-footer text-body-secondary">
  2 days ago
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