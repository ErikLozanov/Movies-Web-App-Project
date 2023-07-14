import page from '../../node_modules/page/page.mjs';
import {html,render, nothing} from '../../node_modules/lit-html/lit-html.js';


const editTemplate = (movie) => html`
<div class="loginForm" >
    <h1>Edit your movie.</h1>
    <form @submit=${onSubmit}>
  <div class="mb-3">
    <label for="movieTitle" class="form-label">Movie Name:</label>
    <input type="text" name="movieTitle" class="form-control" id="movieTitle" aria-describedby="emailHelp" value="${movie.title}">
  </div>
  <div class="mb-3">
    <label for="moviePlot" class="form-label">Movie Year:</label>
    <input type="text" name="movieYear" class="form-control" id="movieYear" value="${movie.year}">
  </div>
  <div class="mb-3">
    <label for="movieDirector" class="form-label">Director:</label>
    <input type="text" name="movieDirector" class="form-control" id="movieDirector" value="${movie.director}">
  </div>
  <div class="mb-3">
    <label for="movieImg" class="form-label">Add an image URL:</label>
    <input type="text" name="movieImg" class="form-control" id="movieImg" value="${movie.posterUrl}">
  </div>
  <div >
    <label for="moviePlot" class="form-label">Movie Description:</label>
    <textarea name="moviePlot" id="moviePlot" cols="79" rows="5">${movie.plot}</textarea>
  </div>
  <button type="submit" class="btn btn-primary">Edit Movie</button>
</form>
</div>
`;

async function loadMovie(detailsId) {
    const response = await fetch(`http://localhost:3030/data/movies/${detailsId}`);
    const data = await response.json();
    return data;
}

let detailsId = null;
export async function editView (ctx) {
    detailsId = ctx.params.detailsId
    const movie = await loadMovie(ctx.params.detailsId);
    render(editTemplate(movie), document.querySelector('main'));
}




async function onSubmit(e) {
    e.preventDefault();

    let title = document.getElementById('movieTitle');
    let year = document.getElementById('movieYear');
    let director = document.getElementById('movieDirector');
    let img = document.getElementById('movieImg');
    let plot = document.getElementById('moviePlot');

    try {
    if(title.value == '' || year.value == '' || director.value == '' || img.value == '' || plot.textContent == '') {
        throw new Error('Please fill in all inputs!');
    }    
    const response = await fetch(`http://localhost:3030/data/movies/${detailsId}`,{
        method: 'PUT',
        headers: {'X-Authorization': localStorage.token, 'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: title.value,
            year: year.value,
            director: director.value,
            posterUrl: img.value,
            plot: plot.value,
        })
    })

    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
    const result = await response.json();

    console.log(result);

    page.redirect(`/details/${detailsId}`);
} catch (error) {
    alert(error.message);
    throw error;
}


}