import {html,render} from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

const myMoviesTemplate = () => html`
<div class="loginForm" >
    <h1>Add a favourite movie.</h1>
    <form @submit=${onSubmit}>
  <div class="mb-3">
    <label for="movieTitle" class="form-label">Movie Name:</label>
    <input type="email" name="movieTitle" class="form-control" id="movieTitle" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="movieYear" class="form-label">Movie Year:</label>
    <input type="text" name="movieYear" class="form-control" id="movieYear">
  </div>
  <div class="mb-3">
    <label for="movieDirector" class="form-label">Director:</label>
    <input type="text" name="movieDirector" class="form-control" id="movieDirector">
  </div>
  <div class="mb-3">
    <label for="movieImg" class="form-label">Add an image URL:</label>
    <input type="text" name="movieImg" class="form-control" id="movieImg">
  </div>
  <div >
    <label for="moviePlot" class="form-label">Movie Description:</label>
    <textarea name="moviePlot" id="moviePlot" cols="79" rows="5"></textarea>
  </div>
  <button type="submit" class="btn btn-primary">Add Movie</button>
</form>
</div>
`

export function addMovieView() {
    render(myMoviesTemplate(), document.querySelector('main'));
}



function onSubmit() {

}